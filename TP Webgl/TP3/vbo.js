// WebGL - Aassif Benassarou

/** @constructor */
var VBO = function (gl, o)
{
  this.target = o.target || gl.ARRAY_BUFFER;

  this.id = gl.createBuffer ();
  gl.bindBuffer (this.target, this.id);
  gl.bufferData (this.target, o.data, o.usage || gl.STATIC_DRAW);
  gl.bindBuffer (this.target, null);

  this.gl = gl;
};

/** @constructor */
VBO.ArrayBuffer = function (gl, o)
{
  var options =
  {
    target: gl.ARRAY_BUFFER,
    data: o.data,
    usage: o.usage || gl.STATIC_DRAW
  };

  VBO.call (this, gl, options);
  this.size   = o.size;
  this.type   = o.type;
};

VBO.ArrayBuffer.prototype =
{
  constructor: VBO.ArrayBuffer,

  bind: function (index)
  {
    this.gl.bindBuffer (this.target, this.id);
    this.gl.enableVertexAttribArray (index);
    this.gl.vertexAttribPointer (index, this.size, this.type, false, 0, 0);
  },

  unbind: function (index)
  {
    this.gl.bindBuffer (this.target, null);
    this.gl.disableVertexAttribArray (index);
  },

  draw: function (index, cmd)
  {
    this.bind (index);
    this.gl.drawArrays (cmd.mode, cmd.first, cmd.count);
    this.unbind (index);
  }
};

/** @constructor */
VBO.ElementArrayBuffer = function (gl, o)
{
  var options =
  {
    target: gl.ELEMENT_ARRAY_BUFFER, 
    data: o.data,
    usage: o.usage || gl.STATIC_DRAW
  };

  VBO.call (this, gl, options);
  this.mode  = o.mode || gl.TRIANGLES;
  this.count = o.count;
  this.type  = o.type;
};

VBO.ElementArrayBuffer.prototype = 
{
  constructor: VBO.ElementArrayBuffer,

  draw: function ()
  {
    this.gl.bindBuffer (this.target, this.id);
    this.gl.drawElements (this.mode, this.count, this.type, 0);
    this.gl.bindBuffer (this.target, null);
  }
};
