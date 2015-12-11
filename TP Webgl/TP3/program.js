// WebGL - Aassif Benassarou

/** @constructor */
var Program = function (gl, params)
{
  var id = gl.createProgram ();

  gl.attachShader (id, Program.SHADER (gl, gl.VERTEX_SHADER,   params.vertex));
  gl.attachShader (id, Program.SHADER (gl, gl.FRAGMENT_SHADER, params.fragment));

  gl.linkProgram (id);
  if (! gl.getProgramParameter (id, gl.LINK_STATUS))
    throw gl.getProgramInfoLog (id);

  for (var i = 0; i < params.attribs.length; ++i)
    gl.bindAttribLocation (id, i, params.attribs[i]);

  this.uniforms = {};
  for (var name in params.uniforms)
    switch (params.uniforms[name])
    {
      case 'int'   : this.uniforms[name] = Program.UNIFORM1i (gl, id, name); break;

      case 'float' : this.uniforms[name] = Program.UNIFORM1f (gl, id, name); break;

      case 'vec2'  : this.uniforms[name] = Program.UNIFORM2fv (gl, id, name); break;
      case 'vec3'  : this.uniforms[name] = Program.UNIFORM3fv (gl, id, name); break;
      case 'vec4'  : this.uniforms[name] = Program.UNIFORM4fv (gl, id, name); break;

      case 'mat2'  : this.uniforms[name] = Program.UNIFORMMATRIX2fv (gl, id, name); break;
      case 'mat3'  : this.uniforms[name] = Program.UNIFORMMATRIX3fv (gl, id, name); break;
      case 'mat4'  : this.uniforms[name] = Program.UNIFORMMATRIX4fv (gl, id, name); break;
    }

  this.gl = gl;
  this.id = id;
};



Program.prototype =
{
  constructor: Program,

  use: function ()
  {
    this.gl.useProgram (this.id);
  }
};

Program.SHADER = function (gl, type, source)
{
  var shader = gl.createShader (type);
  gl.shaderSource (shader, source);
  gl.compileShader (shader);
  if (! gl.getShaderParameter (shader, gl.COMPILE_STATUS))
    throw gl.getShaderInfoLog (shader);

  return shader;
};

Program.FLATTEN = function (t)
{
  if (t instanceof Array)
  {
    var f = [];
    for (var i = 0; i < t.length; ++i)
      f = f.concat (Program.FLATTEN (t [i]));
    return f;
  }
  else
    return t;
};

Program.UINT8 = function (t)
{
  return new Uint8Array (Program.FLATTEN (t));
};

Program.UINT16 = function (t)
{
  return new Uint16Array (Program.FLATTEN (t));
};

Program.FLOAT32 = function (t)
{
  return new Float32Array (Program.FLATTEN (t));
};

Program.SOURCE = function (id)
{
  return document.getElementById (id).textContent;
};

Program.LOCATION = function (gl, id, name)
{
  return gl.getUniformLocation (id, name);
};

Program.UNIFORM1 = function (gl, id, name, f)
{
  var l = Program.LOCATION (gl, id, name);
  return function (x) {f.call (gl, l, x);};
};

Program.UNIFORM1i = function (gl, id, name) {return Program.UNIFORM1 (gl, id, name, gl.uniform1i);};
Program.UNIFORM1f = function (gl, id, name) {return Program.UNIFORM1 (gl, id, name, gl.uniform1f);};

Program.UNIFORMfv = function (gl, id, name, f)
{
  var l = Program.LOCATION (gl, id, name);
  return function (v) {f.call (gl, l, new Float32Array (v));};
}

Program.UNIFORM2fv = function (gl, id, name) {return Program.UNIFORMfv (gl, id, name, gl.uniform2fv);};
Program.UNIFORM3fv = function (gl, id, name) {return Program.UNIFORMfv (gl, id, name, gl.uniform3fv);};
Program.UNIFORM4fv = function (gl, id, name) {return Program.UNIFORMfv (gl, id, name, gl.uniform4fv);};

Program.UNIFORMMATRIXfv = function (gl, id, name, f)
{
  var l = Program.LOCATION (gl, id, name);
  return function (m) {f.call (gl, l, false, Program.FLOAT32 (m));};
}

Program.UNIFORMMATRIX2fv = function (gl, id, name) {return Program.UNIFORMMATRIXfv (gl, id, name, gl.uniformMatrix2fv);};
Program.UNIFORMMATRIX3fv = function (gl, id, name) {return Program.UNIFORMMATRIXfv (gl, id, name, gl.uniformMatrix3fv);};
Program.UNIFORMMATRIX4fv = function (gl, id, name) {return Program.UNIFORMMATRIXfv (gl, id, name, gl.uniformMatrix4fv);};

