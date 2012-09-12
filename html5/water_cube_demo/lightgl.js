﻿/*
* lightgl.js
* http://github.com/evanw/lightgl.js/
*
* Copyright 2011 Evan Wallace
* Released under the MIT license
*/
(function(){
	function u(a){
		window.handleError&&window.handleError(a);
		throw a;
		
	function x(a){
		return new Vector((a&1)*2-1,(a&2)-1,(a&4)/2-1)
		
	window.onload=function(){
		function a(f){
			mouseX=f.pageX;mouseY=f.pageY;
			for(f=gl.canvas;f;f=f.offsetParent){
				mouseX-=f.offsetLeft;mouseY-=f.offsetTop
			case 16:
				return"SHIFT";
			case 27:
				return"ESCAPE";
			case 32:
				return"SPACE";
			case 37:
				return"LEFT";
			case 38:
				return"UP";
			case 39:
				return"RIGHT";
			case 40:
				return"DOWN"
				
			return f>=65&&f<=90?String.fromCharCode(f):f
			
		function c(){
			var f=new Date;
			if(gl.autoDraw){
				window.update&&window.update((f-v)/1E3);
				window.draw&&window.draw();s(c)
				
			else 
			setTimeout(c,100);
			v=f
			
		var d=document.createElement("canvas");
		d.width=800;d.height=600;window.gl=null;
		try{
			gl=d.getContext("webgl")
			
		try{
			gl=gl||d.getContext("experimental-webgl")
			
		gl||u("WebGL not supported");
		window.mouseX=window.mouseY=window.deltaMouseX=window.deltaMouseY=0;
		window.mouseDragging=false;
		var h=0,i=0;
		document.onmousedown=function(f){
			a(f);
			mouseDragging=true;
			window.mousePressed&&window.mousePressed()
			
		document.onmousemove=function(f){
			a(f);
			if(!mouseDragging&&window.mouseMoved)
			window.mouseMoved();
			else 
			mouseDragging&&window.mouseDragged&&window.mouseDragged()
			
		document.onmouseup=function(f){
			a(f);
			mouseDragging=false;
			window.mouseReleased&&window.mouseReleased()
			
		window.key=null;
		window.keys={
		document.onkeydown=function(f){
			if(!f.altKey&&!f.ctrlKey&&!f.metaKey){
				key=b(f.keyCode);keys[key]=true;
				window.keyPressed&&window.keyPressed()
				
			
		document.onkeyup=function(f){
			if(!f.altKey&&!f.ctrlKey&&!f.metaKey){
				key=b(f.keyCode);
				keys[key]=false;
				window.keyReleased&&window.keyReleased()
				
			
		gl.MODELVIEW=305397761;
		gl.PROJECTION=305397762;
		gl.modelviewMatrix=new Matrix;gl.projectionMatrix=new Matrix;
		var j=[],q=[],k,l;
		gl.matrixMode=function(f){
			switch(f){
			case gl.MODELVIEW:k="modelviewMatrix";l=j;break;
			case gl.PROJECTION:k="projectionMatrix";l=q;break;
			default:u("invalid matrix mode "+f)
				
			
		gl.loadIdentity=function(){
			gl[k].m=(new Matrix).m
			
		gl.loadMatrix=function(f){
			gl[k].m=f.m.slice()
			
		gl.multMatrix=function(f){
			gl[k].m=gl[k].multiply(f).m
			
			gl.multMatrix(Matrix.perspective(f,n,o,p))
			n,o))
		gl.unProject=function(f,n,o,p,r,m){
		[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
	Matrix.prototype.inverse=function(){
		var a=this.m,b=new Matrix(a[5]*a[10]*a[15]-a[5]*a[14]*a[11]-a[6]*a[9]*a[15]+a[6]*a[13]*a[11]+a[7]*a[9]*a[14]-a[7]*a[13]*a[10],-a[1]*a[10]*a[15]+a[1]*a[14]*a[11]+a[2]*a[9]*a[15]-a[2]*a[13]*a[11]-a[3]*a[9]*a[14]+a[3]*a[13]*a[10],a[1]*a[6]*a[15]-a[1]*a[14]*a[7]-a[2]*a[5]*a[15]+a[2]*a[13]*a[7]+a[3]*a[5]*a[14]-a[3]*a[13]*a[6],-a[1]*a[6]*a[11]+a[1]*a[10]*a[7]+a[2]*a[5]*a[11]-a[2]*a[9]*a[7]-a[3]*a[5]*a[10]+a[3]*a[9]*a[6],-a[4]*a[10]*
		a[15]+a[4]*a[14]*a[11]+a[6]*a[8]*a[15]-a[6]*a[12]*a[11]-a[7]*a[8]*a[14]+a[7]*a[12]*a[10],a[0]*a[10]*a[15]-a[0]*a[14]*a[11]-a[2]*a[8]*a[15]+a[2]*a[12]*a[11]+a[3]*a[8]*a[14]-a[3]*a[12]*a[10],-a[0]*a[6]*a[15]+a[0]*a[14]*a[7]+a[2]*a[4]*a[15]-a[2]*a[12]*a[7]-a[3]*a[4]*a[14]+a[3]*a[12]*a[6],a[0]*a[6]*a[11]-a[0]*a[10]*a[7]-a[2]*a[4]*a[11]+a[2]*a[8]*a[7]+a[3]*a[4]*a[10]-a[3]*a[8]*a[6],a[4]*a[9]*a[15]-a[4]*a[13]*a[11]-a[5]*a[8]*a[15]+a[5]*a[12]*a[11]+a[7]*a[8]*a[13]-a[7]*a[12]*a[9],-a[0]*a[9]*a[15]+a[0]*a[13]*
		a[11]+a[1]*a[8]*a[15]-a[1]*a[12]*a[11]-a[3]*a[8]*a[13]+a[3]*a[12]*a[9],a[0]*a[5]*a[15]-a[0]*a[13]*a[7]-a[1]*a[4]*a[15]+a[1]*a[12]*a[7]+a[3]*a[4]*a[13]-a[3]*a[12]*a[5],-a[0]*a[5]*a[11]+a[0]*a[9]*a[7]+a[1]*a[4]*a[11]-a[1]*a[8]*a[7]-a[3]*a[4]*a[9]+a[3]*a[8]*a[5],-a[4]*a[9]*a[14]+a[4]*a[13]*a[10]+a[5]*a[8]*a[14]-a[5]*a[12]*a[10]-a[6]*a[8]*a[13]+a[6]*a[12]*a[9],a[0]*a[9]*a[14]-a[0]*a[13]*a[10]-a[1]*a[8]*a[14]+a[1]*a[12]*a[10]+a[2]*a[8]*a[13]-a[2]*a[12]*a[9],-a[0]*a[5]*a[14]+a[0]*a[13]*a[6]+a[1]*a[4]*a[14]-
		a[1]*a[12]*a[6]-a[2]*a[4]*a[13]+a[2]*a[12]*a[5],a[0]*a[5]*a[10]-a[0]*a[9]*a[6]-a[1]*a[4]*a[10]+a[1]*a[8]*a[6]+a[2]*a[4]*a[9]-a[2]*a[8]*a[5]);
		a=a[0]*b.m[0]+a[1]*b.m[4]+a[2]*b.m[8]+a[3]*b.m[12];
		if(a==0)
		return new Matrix;
		for(var c=0;c<16;c++)
		b.m[c]/=a;
		return b
		
	Matrix.prototype.transpose=function(){
		var a=this.m;return new Matrix(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15])
		b[1]*a[4]+b[2]*a[8]+b[3]*a[12],b[0]*a[1]+b[1]*a[5]+b[2]*a[9]+b[3]*a[13],b[0]*a[2]+b[1]*a[6]+b[2]*a[10]+b[3]*a[14],b[0]*a[3]+b[1]*a[7]+b[2]*a[11]+b[3]*a[15],b[4]*a[0]+b[5]*a[4]+b[6]*a[8]+b[7]*a[12],b[4]*a[1]+b[5]*a[5]+b[6]*a[9]+b[7]*a[13],b[4]*a[2]+b[5]*a[6]+b[6]*a[10]+b[7]*a[14],b[4]*a[3]+b[5]*a[7]+b[6]*a[11]+b[7]*a[15],b[8]*a[0]+b[9]*a[4]+b[10]*a[8]+b[11]*a[12],b[8]*a[1]+b[9]*a[5]+b[10]*a[9]+b[11]*a[13],b[8]*a[2]+b[9]*a[6]+b[10]*a[10]+b[11]*a[14],b[8]*a[3]+b[9]*a[7]+b[10]*a[11]+b[11]*a[15],b[12]*
		a[0]+b[13]*a[4]+b[14]*a[8]+b[15]*a[12],b[12]*a[1]+b[13]*a[5]+b[14]*a[9]+b[15]*a[13],b[12]*a[2]+b[13]*a[6]+b[14]*a[10]+b[15]*a[14],b[12]*a[3]+b[13]*a[7]+b[14]*a[11]+b[15]*a[15])
		b[4]*a.x+b[5]*a.y+b[6]*a.z,b[8]*a.x+b[9]*a.y+b[10]*a.z)
		0,0,0,b,0,0,0,0,c,0,0,0,0,1)
		j);h=a.subtract(d).unit();i=i.cross(h).unit();j=h.cross(i).unit();return new Matrix(i.x,i.y,i.z,-i.dot(a),j.x,j.y,j.z,-j.dot(a),h.x,h.y,h.z,-h.dot(a),0,0,0,1)
		c=0;c<this.data.length;c+=1E4)b=Array.prototype.concat.apply(b,this.data.slice(c,c+1E4));if(b.length){
		if(!("normals"in a)||a.normals)this.addVertexBuffer("normals","gl_Normal");this.addIndexBuffer("triangles");this.addIndexBuffer("lines")
			b.compile()
		for(var a=0;a<this.vertices.length;a++)this.normals[a]=new Vector;
		for(a=0;a<this.triangles.length;a++){
			c=d.subtract(c).cross(e.subtract(c)).unit();
			this.normals[b[0]]=this.normals[b[0]].add(c);
			this.normals[b[1]]=this.normals[b[1]].add(c);this.normals[b[2]]=this.normals[b[2]].add(c)
		this.compile();return this
			a.min=Vector.min(a.min,c);a.max=Vector.max(a.max,c)
			c.normals.push([0,0,1]);if(g<a&&d<b){
			2,d+1,d+3])
				1],i[l]]);j+q<a&&c.triangles.push(h?[i[l],i[l+1],i[k+1]]:[i[l],i[k+1],i[l+1]])
		return c
		gl.unProject(c,e,1).subtract(this.eye);this.ray10=gl.unProject(d,e,1).subtract(this.eye);this.ray01=gl.unProject(c,b,1).subtract(this.eye);this.ray11=gl.unProject(d,b,1).subtract(this.eye);this.viewport=a
		g=d.subtract(a).divide(b),h=Vector.min(e,g);e=Vector.max(e,g);h=h.max();e=e.min();if(h>0&&h<e){
	function(a,b,c,d,e){
			h+i;c(/\bgl_\w+\b/g,h,function(q){
		a);b=d("precision highp float;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",b);this.program=gl.createProgram();gl.attachShader(this.program,e(gl.VERTEX_SHADER,a));gl.attachShader(this.program,e(gl.FRAGMENT_SHADER,b));gl.linkProgram(this.program);gl.getProgramParameter(this.program,gl.LINK_STATUS)||u("link error: "+gl.getProgramInfoLog(this.program));this.attributes={
		a+b,function(h){
					new Float32Array(d));break;case 4:gl.uniform4fv(c,new Float32Array(d));break;case 9:gl.uniformMatrix3fv(c,false,new Float32Array([d[0],d[3],d[6],d[1],d[4],d[7],d[2],d[5],d[8]]));break;case 16:gl.uniformMatrix4fv(c,false,new Float32Array([d[0],d[4],d[8],d[12],d[1],d[5],d[9],d[13],d[2],d[6],d[10],d[14],d[3],d[7],d[11],d[15]]));break;default:u("don't know how to load uniform \""+b+'" of length '+d.length)
				c,d):u('attempted to set uniform "'+b+'" to invalid value '+d)
		this.needsMVP&&this.uniforms({_gl_ModelViewProjectionMatrix:gl.projectionMatrix.multiply(gl.modelviewMatrix)
		for(var d in a){
			gl.getAttribLocation(this.program,d.replace(/^gl_/,"_gl_"));
			if(g!=-1){
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b.buffer);gl.drawElements(c,b.buffer.length,gl.UNSIGNED_SHORT,0);return this
		b;this.format=c.format||gl.RGBA;this.type=c.type||gl.UNSIGNED_BYTE;gl.bindTexture(gl.TEXTURE_2D,this.id);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,c.filter||c.magFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,c.filter||c.minFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,c.wrap||c.wrapS||gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,c.wrap||c.wrapT||gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,
		0,this.format,a,b,0,this.format,this.type,null)
		
				this.height!=t.height){
		b=a.id;a.id=this.id;this.id=b;b=a.width;a.width=this.width;this.width=b;b=a.height;a.height=this.height;this.height=b
	Vector.prototype.add=function(a){
		(b?a.y:a),this.z/(b?a.z:a))
		this.y),this.z)
		b.y),Math.min(a.z,b.z))