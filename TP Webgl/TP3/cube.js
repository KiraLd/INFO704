/**constructor**/
var Cube = function(gl)
{
	this.vbo = new VBO.ArrayBuffer(gl, {data: Program.FLOAT32(Cube.VERTICES), size: 3, type: gl.FLOAT})
	this.cmd = {mode: gl.TRIANGLE_STRIP, first: 0, count: 26};
	this.gl = gl;
};

Cube.prototype =
{
	constructor: Cube,
	
	draw: function()
	{
		this.vbo.draw(0,this.cmd);
	}
};

Cube.VERTICES = [
	-1,-1,1, 1,-1,1, -1,1,1, 1,1,1,
        // Right face
        1,1,1, 1,-1,1, 1,1,-1, 1,-1,-1,
        // Back face
        1,-1,-1, -1,-1,-1, 1,1,-1, -1,1,-1,
        // Left face
        -1,1,-1, -1,-1,-1, -1,1,1, -1,-1,1,
        // Bottom face
        -1,-1,1, -1,-1,-1, 1,-1,1, 1,-1,-1,
       
        // move to top
        1,-1,-1, -1,1,1,

        // Top Face
        -1,1,1, 1,1,1, -1,1,-1, 1,1,-1
	
];
	