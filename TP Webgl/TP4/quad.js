// WebGL - Aassif Benassarou

/** @constructor */
var Quad = function (gl)
{
  this.vbo = new VBO.ArrayBuffer (gl, {data: Program.FLOAT32 (Quad.VERTICES), size: 2, type: gl.FLOAT})
  this.cmd = {mode: gl.TRIANGLE_STRIP, first: 0, count: 4};
  this.gl = gl;
};

Quad.prototype =
{
  constructor: Quad,

  draw: function ()
  {
    this.vbo.draw (0, this.cmd);
  }
};

Quad.VERTICES = [
  [-1, -1], 
  [+1, -1], 
  [-1, +1], 
  [+1, +1]
];

