function logGLCall(functionName, args) {   
	   console.log("gl." + functionName + "(" + 
		  WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");   
	}
	
	function throwOnGLError(err, funcName, args) {
		throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
	}
	
	function validateNoneOfTheArgsAreUndefined(functionName, args) {
		  for (var ii = 0; ii < args.length; ++ii) {
			if (args[ii] === undefined) {
			  console.error("undefined passed to gl." + functionName + "(" +
							 WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
			}
		  }
	}
	
	function logAndValidate(functionName, args) {
		logGLCall(functionName, args);
		validateNoneOfTheArgsAreUndefined (functionName, args);
	}


var RainbowCube = function(canvas, range)
{
	var c = document.getElementById(canvas);
	var gl = c.getContext('webgl', {antialias: true});
	gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, logAndValidate);
	var r = document.getElementById(range);
	r.oninput = RainbowCube.ONINPUT(this);
	this.w = c.width;
    this.h = c.height;
	
	this.gl = gl;
	this.axe = [0, 1, 0];
	this.cube = new Cube(gl);
	this.program = new Program(gl, RainbowCube.PROGRAM);
	var angle = 45*0.0174533;
	this.projection = Matrix.PERSPECTIVE(angle, this.w/this.h, 1, 5);
	
	this.blue = RainbowCube.RANGE(r);
	this.animate();
};

RainbowCube.prototype =
{
	constructor: RainbowCube,
	
	animate: function()
	{
		var gl = this.gl;
		gl.clearColor(0, 0, 0, 1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		//gl.enable(gl.CULL_FACE);
		//gl.cullFace(gl.BACK);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		this.program.use();
		this.program.uniforms ['P'] (this.projection);
		//this.program.uniforms ['P'] (Matrix.ID);
		console.debug(this.blue);
		var echelle = Matrix.SCALE(1,1,1);
		var translation = Matrix.TRANSLATION(0,0,-5);
		var angle = this.blue*360*0.0174533;
		var rotation = Matrix.ROTATION(this.axe, angle);
		var matrix = Matrix.MULTIPLY([translation, echelle, rotation]);
		this.program.uniforms ['M'] (matrix);
		this.cube.draw(this.program.position, this.program.couleur);
		
		gl.useProgram(null);
		
		requestAnimationFrame(this.animate.bind(this));
	}
};
//,
RainbowCube.PROGRAM =
{
  attribs: ['position', 'couleur'],

  uniforms: {'M': 'mat4', 'P': 'mat4'},

  vertex:
  [
    'precision mediump float;',
    'attribute vec3 position;',
	'attribute vec3 couleur;',
    'varying vec4 color;',
	'uniform mat4 M, P;',
    'void main ()',
    '{',
      'color = vec4 (couleur,1);',
      'gl_Position =  P * M * vec4 (position, 1);',
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

RainbowCube.RANGE = function (r)
{
  return r.value / 100;
}

RainbowCube.ONINPUT = function (hello)
{
  return function (e) {
    hello.blue = RainbowCube.RANGE (e.target);
  };
}

