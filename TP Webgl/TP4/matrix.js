// WebGL - Aassif Benassarou

var Matrix = {};

Matrix.ID = [
 [1, 0, 0, 0],
 [0, 1, 0, 0],
 [0, 0, 1, 0],
 [0, 0, 0, 1]
];

Matrix.ROTATION = function (axis, angle)
{
  var c = Math.cos (angle);
  var s = Math.sin (angle);
  var t = 1 - c;
  var x = axis[0], y = axis[1], z = axis[2];
  var tx = t * x, ty = t * y;
  return [
    [tx * x + c,     tx * y + s * z, tx * z - s * y, 0],
    [tx * y - s * z, ty * y + c,     ty * z + s * x, 0],
    [tx * z + s * y, ty * z - s * x, t  * z * z + c, 0],
    [0,              0,              0,              1]
  ];
};

Matrix.TRANSLATION = function (x, y, z)
{
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [x, y, z, 1]
  ];
};

Matrix.SCALE = function (x, y, z)
{
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1]
  ];
};

Matrix.TRANSPOSE = function (m)
{
  return m[0].map (function (col, c){
    return m.map (function (row, r){
        return m[r][c];
    });
  });
};

Matrix.NORMAL = function (m) // FIXME
{
  return m.slice (0, 3).map (function (row) {return row.slice (0, 3);});
};

Matrix.MULTIPLY = function (m)
{
  var m1 = Matrix.TRANSPOSE (m.shift ());
  var m2 = m.length > 1 ? Matrix.MULTIPLY (m) : m [0];
  return m2.map (function (row) {
    return m1.map (function (col) {
      return col.reduce (function (sum, v, k) {
        return sum + v * row [k];
      }, 0);
    });
  });
};

Matrix.ORTHO = function (l, r, t, b, n, f)
{
  return [
    [    +2/(r-l),            0,            0, 0],
    [           0,     +2/(t-b),            0, 0],
    [           0,            0,     -2/(f-n), 0],
    [-(r+l)/(r-l), -(t+b)/(t-b), -(f+n)/(f-n), 1]
  ];
}

Matrix.PERSPECTIVE = function (angle, r, n, f)
{
  var a = 1 / Math.tan (angle / 2);
  return [
    [a/r, 0,           0,  0],
    [  0, a,           0,  0],
    [  0, 0, (n+f)/(n-f), -1],
    [  0, 0, 2*n*f/(n-f),  0]
  ];
}

Matrix.ARRAY = function (d)
{
  var f = function (t, d, k)
  {
    if (k < d.length)
      for (var i = 0; i < t.length; ++i)
        t[i] = f (new Array (d [k]), d, k+1);

    return t;
  }

  return (d instanceof Array) ? f (new Array (d [0]), d, 1) : [];
};

