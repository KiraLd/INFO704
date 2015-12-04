// WebGL - Aassif Benassarou

/** @constructor */
var FirstProgram = function (gl, projection)
{
  Program.call (this, gl, FirstProgram.PROGRAM);
  this.projection = projection || Matrix.ID;
};

FirstProgram.prototype = Object.create (Program.prototype);

FirstProgram.prototype.constructor = FirstProgram;

FirstProgram.prototype.use = function ()
{
  Program.prototype.use.call (this);
  this.uniforms ['P'] (this.projection);
};

FirstProgram.prototype.setModelView = function (M)
{
  this.uniforms ['M'] (M);
};

FirstProgram.prototype.setColor = function (c)
{
  this.uniforms ['c'] (c);
};

FirstProgram.PROGRAM = 
{
  attribs: ['p'],

  uniforms: {'M': 'mat4', 'P': 'mat4', 'c': 'vec4'},

  vertex:
    [
      'precision mediump float;',
      'attribute vec2 p;',
      'uniform mat4 M, P;',
      'void main ()',
      '{',
        'gl_Position = P * M * vec4 (p, 0.0, 1.0);',
      '}'
    ].join ('\n'),

  fragment:
    [
      'precision mediump float;',
      'uniform vec4 c;',
      'void main ()',
      '{',
        'gl_FragColor = c;',
      '}'
    ].join ('\n')
};

