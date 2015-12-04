// WebGL - Aassif Benassarou


f

/** @constructor */
var RainbowQuad = function (canvas, range)
{
  var c = document.getElementById (canvas);
  var gl = c.getContext ('webgl', {antialias: true});
  //gl = WebGLDebugUtils.makeDebugContext(this.gl, throwOnGLError, logAndValidate);
  var r = document.getElementById (range);
  r.oninput = RainbowQuad.ONINPUT (this);

  this.gl         = gl;
  this.quad       = new Quad (gl);
  this.program    = new Program (gl, RainbowQuad.PROGRAM);
  this.blue       = RainbowQuad.RANGE (r);

  this.animate ();
};

RainbowQuad.prototype =
{
  constructor: RainbowQuad,

  animate: function ()
  {
    var gl = this.gl;

    gl.clearColor (0, 1, 0, 1);
    gl.clear (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.program.use ();
    this.program.uniforms ['b'] (this.blue);

    this.quad.draw ();

    gl.useProgram (null);

    requestAnimationFrame (this.animate.bind (this));
  }
};

RainbowQuad.PROGRAM =
{
  attribs: ['position'],

  uniforms: {'b': 'float'},

  vertex:
  [
    'precision mediump float;',
    'uniform float b;',
    'attribute vec2 position;',
    'varying vec4 color;',
    'void main ()',
    '{',
      'color = vec4 (0.5 * position + 0.5, b, 1);',
      'gl_Position = vec4 (position, 0, 1);',
    '}'
  ].join ('\n'),

  fragment:
  [
    'precision mediump float;',
    'varying vec4 color;',
    'void main ()',
    '{',
      'gl_FragColor = color;',
    '}'
  ].join ('\n')
};

RainbowQuad.RANGE = function (r)
{
  return r.value / 100;
}

RainbowQuad.ONINPUT = function (hello)
{
  return function (e) {
    hello.blue = RainbowQuad.RANGE (e.target);
  };
}



