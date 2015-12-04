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
	
var scene;
var X1 = [0,1,2,3,4,5,6,7,8];
var X2 = [9,10,11,12,13,14,15,16,17];
var X3 = [18,19,20,21,22,23,24,25,26];
var Y1 = [0,1,2,9,10,11,18,19,20];
var Y2 = [3,4,5,12,13,14,21,22,23];
var Y3 = [6,7,8,15,16,17,24,25,26];
var Z1 = [2,5,8,11,14,17,20,23,26];
var Z2 = [1,4,7,10,13,16,19,22,25];
var Z3 = [0,3,6,9,12,15,18,21,24];
var axe = [[1,0,0],[0,1,0],[0,0,1]];
var scene_angle = new Array(27);

function echangeZ1()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Z1[i]];
	}
	var indice = [20,11,2,23,14,5,26,17,8];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeZ2()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Z2[i]];
	}
	var indice = [19,10,1,22,13,4,25,16,7];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeZ3()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Z3[i]];
	}
	var indice = [18,9,0,21,12,3,24,15,6];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeX1()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[X1[i]];
	}
	var indice = [6,3,0,7,4,1,8,5,2];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeX2()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[X2[i]];
	}
	var indice = [15,12,9,16,13,10,17,14,11];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeX3()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[X3[i]];
	}
	var indice = [24,21,18,25,22,19,26,23,20];
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeY1()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Y1[i]];
	}
	var indice = [2,11,20,1,10,19,0,9,18]
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeY2()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Y2[i]];
	}
	var indice = [5,14,23,4,13,22,3,12,21]
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}

function echangeY3()
{
	var temp = new Array(9);
	var angle = new Array(9);
	for(i = 0; i < 9; i++)
	{
		temp[i] = scene[Y3[i]];
	}
	var indice = [8,17,26,7,16,25,6,15,24]
	for(i = 0; i < 9; i++)
	{
		scene[indice[i]] = temp[i];
	}
}



function indice(a,b,c)
{
	return 3*a+3*b+c;
}

function setFace()
{
	Z1 = new Array(9);
}

function keyEvent(event)
{
		var key = event.keyCode || event.which;
		if(key == 97)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Y1[i]].n;
				scene[Y1[i]].angle[n] = 0;
				scene[Y1[i]].axe[n] = 1;
				scene[Y1[i]].n++;
			}
			echangeY1();
			
		}
		if(key == 98)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Y2[i]].n;
				scene[Y2[i]].angle[n] = 0;
				scene[Y2[i]].axe[n] = 1;
				scene[Y2[i]].n++;
			}
			echangeY2();
		}
		if(key == 99)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Y3[i]].n;
				scene[Y3[i]].angle[n] = 0;
				scene[Y3[i]].axe[n] = 1;
				scene[Y3[i]].n++;
			}
			echangeY3();
		}
	
		if(key == 100)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Z1[i]].n;
				scene[Z1[i]].angle[n] = 0;
				scene[Z1[i]].axe[n] = 2;
				scene[Z1[i]].n++;
			}
			echangeZ1();
			
		}
		if(key == 101)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Z2[i]].n;
				scene[Z2[i]].angle[n]  = 0;
				scene[Z2[i]].axe[n] = 2;
				scene[Z2[i]].n++;
			}
			echangeZ2();
		}
		if(key == 102)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[Z3[i]].n;
				scene[Z3[i]].angle[n]  = 0;
				scene[Z3[i]].axe[n] = 2;
				scene[Z3[i]].n++;
			}
			echangeZ3();
		}
		
		if(key == 103)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[X1[i]].n;
				scene[X1[i]].angle[n]  = 0;
				scene[X1[i]].axe[n] = 0;
				scene[X1[i]].n++;
			}
			echangeX1();
		}
		if(key == 104)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[X2[i]].n;
				scene[X2[i]].angle[n]  = 0;
				scene[X2[i]].axe[n] = 0;
				scene[X2[i]].n++;
			}
			echangeX2();
		}
		if(key == 105)
		{
			for(i = 0; i < 9; i++)
			{
				var n = scene[X3[i]].n;
				scene[X3[i]].angle[n]  = 0;
				scene[X3[i]].axe[n] = 0;
				scene[X3[i]].n++;
			}
			echangeX3();
		}
}
	
var Rubiks = function(canvas, range, masque)
{
	var c = document.getElementById(canvas);
	var gl = c.getContext('webgl',{antialias: true});
	var r = document.getElementById(range);
	var image = document.getElementById(masque);
	this.cubeTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.cubeTexture);
	var texture = gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	
	r.oninput = Rubiks.ONINPUT(this);
	//gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, logAndValidate);
	this.w = c.width;
	this.h = c.height;
	this.gl = gl;
	this.echelle = Matrix.SCALE(1/3, 1/3, 1/3);
	this.size = 2/3;
	scene = new Array(27);
	for(i = 0; i < 27; i++)
	{
		scene[i] = new Cube(gl);
	}
	this.setTranslation();
	var angle = 45*0.0174533;
	this.projection = Matrix.PERSPECTIVE(angle, this.w/this.h, 1, 50);
	this.program = new Program(gl, Rubiks.PROGRAM);
	this.blue = Rubiks.RANGE(r);
	this.axe = [0, 1, 0];
	this.cubeTextureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeTextureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, Program.FLOAT32(Cube.TEXTURE), gl.STATIC_DRAW);
	
	this.animate();
}

Rubiks.prototype =
{
	constructor: Rubiks,
	
	animate: function()
	{
		var gl = this.gl;
		gl.clearColor(0,0,0,1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		this.program.use();
		this.program.uniforms['P'](this.projection);
		for(i = 0; i < 27; i++)
		{
			var angle = (this.blue*360)*0.0174533;
			var rotation = Matrix.ROTATION(this.axe, angle);
			
			var matrix = Matrix.MULTIPLY([this.translation,rotation]);
			var n = scene[i].n;
			
			for(j = n-1; j >=0; j--)
			{
				if(scene[i].angle[j] != 90)
				{
					scene[i].angle[j] += 5;
				}
				//console.debug(axe[scene[i].axe[j]]);
				//console.debug(scene[i].angle[j]);
				var rotate = Matrix.ROTATION(axe[scene[i].axe[j]],scene[i].angle[j]*0.0174533);
				matrix = Matrix.MULTIPLY([matrix,rotate]);
			}
			matrix = Matrix.MULTIPLY([matrix,scene[i].translation,this.echelle]);
			this.program.uniforms['M'](matrix);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, this.cubeTextureBuffer);
			gl.vertexAttribPointer(this.program.textCoord, 2, gl.FLOAT, false, 0, 0);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.cubeTexture);
			gl.uniform1i(gl.getUniformLocation(this.program.id, "uSampler"),0);
			scene[i].draw(this.program.position, this.program.couleur);
		}
		gl.useProgram(null);
		requestAnimationFrame(this.animate.bind(this));
	},
	
	setTranslation: function()
	{
		
		var s = this.size;
		this.translation = Matrix.TRANSLATION(0,0,-5);
		this.matrix = Matrix.MULTIPLY([this.translation, this.echelle]);
		var m = 0;
		for(i = -s; i <= s; i = i+s)
		{
			for(j = -s; j <= s; j = j+s)
			{
				for(k = -s; k<= s; k = k+s)
				{
					scene[m].angle = new Array();
					scene[m].axe = new Array();
					scene[m].n = 0;
					scene[m].translation = Matrix.TRANSLATION(i,j,k);
					m++;
				}
			}
		}
	}
};

Rubiks.PROGRAM =
{
  attribs: ['position', 'couleur', 'aTextureCoord'],

  uniforms: {'M': 'mat4', 'P': 'mat4'},

  vertex:
  [
    'precision mediump float;',
    'attribute vec3 position;',
	'attribute vec3 couleur;',
	'attribute vec2 aTextureCoord;',
    'varying vec4 color;',
	'uniform mat4 M, P;',
	'varying highp vec2 vTextureCoord;',
    'void main ()',
    '{',
      'color = vec4 (couleur,1);',
      'gl_Position =  P * M * vec4 (position, 1);',
	  'vTextureCoord = aTextureCoord;',
    '}'
  ].join ('\n'),

  fragment:
  [
    'precision mediump float;',
    'varying vec4 color;',
	'varying highp vec2 vTextureCoord;',
	'uniform sampler2D uSampler;',
    'void main ()',
    '{',
	  'gl_FragColor = color*texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));',
    '}'
  ].join ('\n')
};

Rubiks.RANGE = function (r)
{
  return r.value / 100;
}

Rubiks.ONINPUT = function (hello)
{
  return function (e) {
    hello.blue = RainbowCube.RANGE (e.target);
  };
}

