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
		};
	function x(a){
		return new Vector((a&1)*2-1,(a&2)-1,(a&4)/2-1)
		
	};

	window.onload=function(){
		function a(f){
			mouseX=f.pageX;mouseY=f.pageY;
			for(f=gl.canvas;f;f=f.offsetParent){
				mouseX-=f.offsetLeft;mouseY-=f.offsetTop
			};

			deltaMouseX=mouseX-h;deltaMouseY=mouseY-i;h=mouseX;i=mouseY
		};

		function b(f){switch(f){case 8:return"BACKSPACE";case 9:return"TAB";case 13:return"ENTER";
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
				
			};

			return f>=65&&f<=90?String.fromCharCode(f):f
			
		};

		function c(){
			var f=new Date;
			if(gl.autoDraw){
				window.update&&window.update((f-v)/1E3);
				window.draw&&window.draw();s(c)
				
			};

			else 
			setTimeout(c,100);
			v=f
			
		};

		var d=document.createElement("canvas");
		d.width=800;d.height=600;window.gl=null;
		try{
			gl=d.getContext("webgl")
			
		};

		catch(e){
		};

		try{
			gl=gl||d.getContext("experimental-webgl")
			
		};

		catch(g){
		};

		gl||u("WebGL not supported");
		window.mouseX=window.mouseY=window.deltaMouseX=window.deltaMouseY=0;
		window.mouseDragging=false;
		var h=0,i=0;
		document.onmousedown=function(f){
			a(f);
			mouseDragging=true;
			window.mousePressed&&window.mousePressed()
			
		};

		document.onmousemove=function(f){
			a(f);
			if(!mouseDragging&&window.mouseMoved)
			window.mouseMoved();
			else 
			mouseDragging&&window.mouseDragged&&window.mouseDragged()
			
		};

		document.onmouseup=function(f){
			a(f);
			mouseDragging=false;
			window.mouseReleased&&window.mouseReleased()
			
		};

		window.key=null;
		window.keys={
		};

		document.onkeydown=function(f){
			if(!f.altKey&&!f.ctrlKey&&!f.metaKey){
				key=b(f.keyCode);keys[key]=true;
				window.keyPressed&&window.keyPressed()
				
			};

			
		};

		document.onkeyup=function(f){
			if(!f.altKey&&!f.ctrlKey&&!f.metaKey){
				key=b(f.keyCode);
				keys[key]=false;
				window.keyReleased&&window.keyReleased()
				
			};

			
		};

		gl.MODELVIEW=305397761;
		gl.PROJECTION=305397762;
		gl.modelviewMatrix=new Matrix;gl.projectionMatrix=new Matrix;
		var j=[],q=[],k,l;
		gl.matrixMode=function(f){
			switch(f){
			case gl.MODELVIEW:k="modelviewMatrix";l=j;break;
			case gl.PROJECTION:k="projectionMatrix";l=q;break;
			default:u("invalid matrix mode "+f)
				
			};

			
		};

		gl.loadIdentity=function(){
			gl[k].m=(new Matrix).m
			
		};

		gl.loadMatrix=function(f){
			gl[k].m=f.m.slice()
			
		};

		gl.multMatrix=function(f){
			gl[k].m=gl[k].multiply(f).m
			
		};


		gl.perspective=function(f,n,o,p){
			gl.multMatrix(Matrix.perspective(f,n,o,p))
		};


		gl.frustum=function(f,n,o,p,r,m){
			gl.multMatrix(Matrix.frustum(f,n,o,p,r,m))
		};


		gl.ortho=function(f,n,o,p,r,m){
			gl.multMatrix(Matrix.ortho(f,n,o,p,r,m))
		};


		gl.scale=function(f,n,o){
			gl.multMatrix(Matrix.scale(f,n,o))
		};


		gl.translate=function(f,n,o){
			gl.multMatrix(Matrix.translate(f,
			n,o))
		};

		gl.rotate=function(f,n,o,p){
			gl.multMatrix(Matrix.rotate(f,n,o,p))
		};

		gl.lookAt=function(f,n,o,p,r,m,z,A,B){
			gl.multMatrix(Matrix.lookAt(f,n,o,p,r,m,z,A,B))
		};

		gl.pushMatrix=function(){
			l.push(gl[k].m.slice())
		};

		gl.popMatrix=function(){
			gl[k].m=l.pop()
		};

		gl.project=function(f,n,o,p,r,m){
			p=p||gl.modelviewMatrix;r=r||gl.projectionMatrix;m=m||gl.getParameter(gl.VIEWPORT);f=r.transformPoint(p.transformPoint(new Vector(f,n,o)));return new Vector(m[0]+m[2]*(f.x*0.5+0.5),m[1]+m[3]*(f.y*0.5+0.5),f.z*0.5+0.5)
		};

		gl.unProject=function(f,n,o,p,r,m){
			p=p||gl.modelviewMatrix;r=r||gl.projectionMatrix;m=m||gl.getParameter(gl.VIEWPORT);f=new Vector((f-m[0])/m[2]*2-1,(n-m[1])/m[3]*2-1,o*2-1);return r.multiply(p).inverse().transformPoint(f)
		};

		gl.matrixMode(gl.MODELVIEW);gl.autoDraw=true;var s=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(f){
			setTimeout(f,1E3/60)
		};

		,v=new Date;window.setup&&window.setup();c()
	};

	Matrix=function(){
		this.m=Array.prototype.concat.apply([],arguments);if(!this.m.length)this.m=
		[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
	};

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
		
	};

	Matrix.prototype.transpose=function(){
		var a=this.m;return new Matrix(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15])
	};

	Matrix.prototype.multiply=function(a){
		var b=this.m;a=a.m;return new Matrix(b[0]*a[0]+
		b[1]*a[4]+b[2]*a[8]+b[3]*a[12],b[0]*a[1]+b[1]*a[5]+b[2]*a[9]+b[3]*a[13],b[0]*a[2]+b[1]*a[6]+b[2]*a[10]+b[3]*a[14],b[0]*a[3]+b[1]*a[7]+b[2]*a[11]+b[3]*a[15],b[4]*a[0]+b[5]*a[4]+b[6]*a[8]+b[7]*a[12],b[4]*a[1]+b[5]*a[5]+b[6]*a[9]+b[7]*a[13],b[4]*a[2]+b[5]*a[6]+b[6]*a[10]+b[7]*a[14],b[4]*a[3]+b[5]*a[7]+b[6]*a[11]+b[7]*a[15],b[8]*a[0]+b[9]*a[4]+b[10]*a[8]+b[11]*a[12],b[8]*a[1]+b[9]*a[5]+b[10]*a[9]+b[11]*a[13],b[8]*a[2]+b[9]*a[6]+b[10]*a[10]+b[11]*a[14],b[8]*a[3]+b[9]*a[7]+b[10]*a[11]+b[11]*a[15],b[12]*
		a[0]+b[13]*a[4]+b[14]*a[8]+b[15]*a[12],b[12]*a[1]+b[13]*a[5]+b[14]*a[9]+b[15]*a[13],b[12]*a[2]+b[13]*a[6]+b[14]*a[10]+b[15]*a[14],b[12]*a[3]+b[13]*a[7]+b[14]*a[11]+b[15]*a[15])
	};

	Matrix.prototype.transformPoint=function(a){
		var b=this.m;return(new Vector(b[0]*a.x+b[1]*a.y+b[2]*a.z+b[3],b[4]*a.x+b[5]*a.y+b[6]*a.z+b[7],b[8]*a.x+b[9]*a.y+b[10]*a.z+b[11])).divide(b[12]*a.x+b[13]*a.y+b[14]*a.z+b[15])
	};

	Matrix.prototype.transformVector=function(a){
		var b=this.m;return new Vector(b[0]*a.x+b[1]*a.y+b[2]*a.z,
		b[4]*a.x+b[5]*a.y+b[6]*a.z,b[8]*a.x+b[9]*a.y+b[10]*a.z)
	};

	Matrix.perspective=function(a,b,c,d){
		a=Math.tan(a*Math.PI/360)*c;b=a*b;return Matrix.frustum(-b,b,-a,a,c,d)
	};

	Matrix.frustum=function(a,b,c,d,e,g){
		return new Matrix(2*e/(b-a),0,(b+a)/(b-a),0,0,2*e/(d-c),(d+c)/(d-c),0,0,0,-(g+e)/(g-e),-2*g*e/(g-e),0,0,-1,0)
	};

	Matrix.ortho=function(a,b,c,d,e,g){
		return new Matrix(2/(b-a),0,0,(b+a)/(b-a),0,2/(d-c),0,(d+c)/(d-c),0,0,-2/(g-e),(g+e)/(g-e),0,0,0,1)
	};

	Matrix.scale=function(a,b,c){
		return new Matrix(a,0,
		0,0,0,b,0,0,0,0,c,0,0,0,0,1)
	};

	Matrix.translate=function(a,b,c){
		return new Matrix(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1)
	};

	Matrix.rotate=function(a,b,c,d){
		if(a&&(b||c||d)){
			var e=Math.sqrt(b*b+c*c+d*d);a*=Math.PI/180;b/=e;c/=e;d/=e;e=Math.cos(a);a=Math.sin(a);var g=1-e;return new Matrix(b*b*g+e,b*c*g-d*a,b*d*g+c*a,0,c*b*g+d*a,c*c*g+e,c*d*g-b*a,0,d*b*g-c*a,d*c*g+b*a,d*d*g+e,0,0,0,0,1)
		};

		else return new Matrix
	};

	Matrix.lookAt=function(a,b,c,d,e,g,h,i,j){
		a=new Vector(a,b,c);d=new Vector(d,e,g);i=new Vector(h,i,
		j);h=a.subtract(d).unit();i=i.cross(h).unit();j=h.cross(i).unit();return new Matrix(i.x,i.y,i.z,-i.dot(a),j.x,j.y,j.z,-j.dot(a),h.x,h.y,h.z,-h.dot(a),0,0,0,1)
	};

	Indexer=function(){
		this.unique=[];this.indices=[];this.map={
		};

		
	};

	Indexer.prototype.add=function(a){
		var b=JSON.stringify(a);if(!(b in this.map)){
			this.map[b]=this.unique.length;this.unique.push(a)
		};

		return this.map[b]
	};

	Buffer=function(a,b){
		this.buffer=null;this.target=a;this.type=b;this.data=[]
	};

	Buffer.prototype.compile=function(a){
		for(var b=[],
		c=0;c<this.data.length;c+=1E4)b=Array.prototype.concat.apply(b,this.data.slice(c,c+1E4));if(b.length){
			this.buffer=this.buffer||gl.createBuffer();this.buffer.length=b.length;this.buffer.spacing=b.length/this.data.length;gl.bindBuffer(this.target,this.buffer);gl.bufferData(this.target,new this.type(b),a||gl.STATIC_DRAW)
		};

		
	};

	Mesh=function(a){
		a=a||{
		};

		this.vertexBuffers={
		};

		this.indexBuffers={
		};

		this.addVertexBuffer("vertices","gl_Vertex");if(!("coords"in a)||a.coords)this.addVertexBuffer("coords","gl_TexCoord");
		if(!("normals"in a)||a.normals)this.addVertexBuffer("normals","gl_Normal");this.addIndexBuffer("triangles");this.addIndexBuffer("lines")
	};

	Mesh.prototype.addVertexBuffer=function(a,b){
		(this.vertexBuffers[b]=new Buffer(gl.ARRAY_BUFFER,Float32Array)).name=a;this[a]=[]
	};

	Mesh.prototype.addIndexBuffer=function(a){
		this.indexBuffers[a]=new Buffer(gl.ELEMENT_ARRAY_BUFFER,Int16Array);this[a]=[]
	};

	Mesh.prototype.compile=function(){
		for(var a in this.vertexBuffers){
			var b=this.vertexBuffers[a];b.data=this[b.name];
			b.compile()
		};

		for(var c in this.indexBuffers){
			b=this.indexBuffers[c];b.data=this[c];b.compile()
		};

		
	};

	Mesh.prototype.transform=function(a){
		this.vertices=this.vertices.map(function(c){
			return a.transformPoint(Vector.fromArray(c)).toArray()
		};

		);if(this.normals){
			var b=a.inverse().transpose();this.normals=this.normals.map(function(c){
				return b.transformVector(Vector.fromArray(c)).unit().toArray()
			};

			)
		};

		this.compile();return this
	};

	Mesh.prototype.computeNormals=function(){
		this.normals||this.addVertexBuffer("normals","gl_Normal");
		for(var a=0;a<this.vertices.length;a++)this.normals[a]=new Vector;
		for(a=0;a<this.triangles.length;a++){
			var b=this.triangles[a],c=Vector.fromArray(this.vertices[b[0]]),d=Vector.fromArray(this.vertices[b[1]]),e=Vector.fromArray(this.vertices[b[2]]);
			c=d.subtract(c).cross(e.subtract(c)).unit();
			this.normals[b[0]]=this.normals[b[0]].add(c);
			this.normals[b[1]]=this.normals[b[1]].add(c);this.normals[b[2]]=this.normals[b[2]].add(c)
		};

		for(a=0;a<this.vertices.length;a++)this.normals[a]=this.normals[a].unit().toArray();
		this.compile();return this
	};

	Mesh.prototype.computeWireframe=function(){
		for(var a=new Indexer,b=0;b<this.triangles.length;b++)for(var c=this.triangles[b],d=0;d<c.length;d++){
			var e=c[d],g=c[(d+1)%c.length];a.add([Math.min(e,g),Math.max(e,g)])
		};

		this.lines=a.unique;this.compile();return this
	};

	Mesh.prototype.getAABB=function(){
		var a={min:new Vector(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)
		};

		a.max=a.min.negative();for(var b=0;b<this.vertices.length;b++){
			var c=Vector.fromArray(this.vertices[b]);
			a.min=Vector.min(a.min,c);a.max=Vector.max(a.max,c)
		};

		return a
	};

	Mesh.prototype.getBoundingSphere=function(){
		var a=this.getAABB();a={center:a.min.add(a.max).divide(2),radius:0
		};

		for(var b=0;b<this.vertices.length;b++)a.radius=Math.max(a.radius,Vector.fromArray(this.vertices[b]).subtract(a.center).length());return a
	};

	Mesh.plane=function(a,b,c){
		c=new Mesh(c);a=a||1;b=b||1;for(var d=0;d<=b;d++)for(var e=d/b,g=0;g<=a;g++){
			var h=g/a;c.vertices.push([2*h-1,2*e-1,0]);c.coords&&c.coords.push([h,e]);c.normals&&
			c.normals.push([0,0,1]);if(g<a&&d<b){
				h=g+d*(a+1);c.triangles.push([h,h+1,h+a+1]);c.triangles.push([h+a+1,h+1,h+a+2])
			};

			
		};

		c.compile();return c
	};

	var y=[[0,4,2,6,-1,0,0],[1,3,5,7,+1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,+1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,+1]];Mesh.cube=function(a){
		a=new Mesh(a);for(var b=0;b<y.length;b++){
			for(var c=y[b],d=b*4,e=0;e<4;e++){
				a.vertices.push(x(c[e]).toArray());a.coords&&a.coords.push([e&1,(e&2)/2]);a.normals&&a.normals.push([c[4],c[5],c[6]])
			};

			a.triangles.push([d,d+1,d+2]);a.triangles.push([d+
			2,d+1,d+3])
		};

		a.compile();return a
	};

	Mesh.sphere=function(a,b){
		var c=new Mesh(b),d=new Indexer;a=a||6;for(var e=0;e<8;e++)for(var g=x(e),h=g.x*g.y*g.z>0,i=[],j=0;j<=a;j++){
			for(var q=0;j+q<=a;q++){
				var k=j/a,l=q/a,s=(a-j-q)/a;l={vertex:(new Vector(k+(k-k*k)/2,l+(l-l*l)/2,s+(s-s*s)/2)).unit().multiply(g).toArray()
				};

				if(c.coords)l.coord=g.y>0?[1-k,s]:[s,1-k];i.push(d.add(l))
			};

			if(j>0)for(q=0;j+q<=a;q++){
				k=(j-1)*(a+1)+(j-1-(j-1)*(j-1))/2+q;l=j*(a+1)+(j-j*j)/2+q;c.triangles.push(h?[i[k],i[l],i[k+1]]:[i[k],i[k+
				1],i[l]]);j+q<a&&c.triangles.push(h?[i[l],i[l+1],i[k+1]]:[i[l],i[k+1],i[l+1]])
			};

			
		};

		c.vertices=d.unique.map(function(v){
			return v.vertex
		};

		);if(c.coords)c.coords=d.unique.map(function(v){
			return v.coord
		};

		);if(c.normals)c.normals=c.vertices;c.compile();return c
	};

	Mesh.load=function(a,b){
		b=b||{
		};

		if(!a.coords)b.coords=false;if(!a.normals)b.normals=false;var c=new Mesh(b);c.vertices=a.vertices;if(c.coords)c.coords=a.coords;if(c.normals)c.normals=a.normals;c.triangles=a.triangles||[];c.lines=a.lines||[];c.compile();
		return c
	};

	HitTest=function(a,b,c){
		this.t=arguments.length?a:Number.MAX_VALUE;this.hit=b;this.normal=c
	};

	HitTest.prototype.mergeWith=function(a){
		if(a.t>0&&a.t<this.t){
			this.t=a.t;this.hit=a.hit;this.normal=a.normal
		};
	};

	Raytracer=function(){
		var a=gl.getParameter(gl.VIEWPORT),b=gl.modelviewMatrix.m,c=new Vector(b[0],b[4],b[8]),d=new Vector(b[1],b[5],b[9]),e=new Vector(b[2],b[6],b[10]);b=new Vector(b[3],b[7],b[11]);this.eye=new Vector(-b.dot(c),-b.dot(d),-b.dot(e));c=a[0];d=c+a[2];e=a[1];b=e+a[3];this.ray00=
		gl.unProject(c,e,1).subtract(this.eye);this.ray10=gl.unProject(d,e,1).subtract(this.eye);this.ray01=gl.unProject(c,b,1).subtract(this.eye);this.ray11=gl.unProject(d,b,1).subtract(this.eye);this.viewport=a
	};

	Raytracer.prototype.getRayForPixel=function(a,b){
		a=(a-this.viewport[0])/this.viewport[2];b=1-(b-this.viewport[1])/this.viewport[3];var c=Vector.lerp(this.ray00,this.ray10,a),d=Vector.lerp(this.ray01,this.ray11,a);return Vector.lerp(c,d,b).unit()
	};

	Raytracer.hitTestBox=function(a,b,c,d){
		var e=c.subtract(a).divide(b),
		g=d.subtract(a).divide(b),h=Vector.min(e,g);e=Vector.max(e,g);h=h.max();e=e.min();if(h>0&&h<e){
			a=a.add(b.multiply(h));c=c.add(1.0E-6);d=d.subtract(1.0E-6);return new HitTest(h,a,new Vector((a.x>d.x)-(a.x<c.x),(a.y>d.y)-(a.y<c.y),(a.z>d.z)-(a.z<c.z)))
		};

		return null
	};

	Raytracer.hitTestSphere=function(a,b,c,d){
		var e=a.subtract(c),g=b.dot(b),h=2*b.dot(e);e=e.dot(e)-d*d;e=h*h-4*g*e;if(e>0){
			g=(-h-Math.sqrt(e))/(2*g);a=a.add(b.multiply(g));return new HitTest(g,a,a.subtract(c).divide(d))
		};

		return null
	};

	Raytracer.hitTestTriangle=
	function(a,b,c,d,e){
		var g=d.subtract(c),h=e.subtract(c);e=g.cross(h).unit();d=e.dot(c.subtract(a)).divide(e.dot(b));if(d>0){
			a=a.add(b.multiply(d));var i=a.subtract(c);c=h.dot(h);b=h.dot(g);h=h.dot(i);var j=g.dot(g);g=g.dot(i);i=c*j-b*b;j=(j*h-b*g)/i;g=(c*g-b*h)/i;if(j>=0&&g>=0&&j+g<=1)return new HitTest(d,a,e)
		};

		return null
	};

	Shader=function(a,b){
		function c(h,i,j){
			for(;(result=h.exec(i))!=null;)j(result)
		};

		function d(h,i){
			var j=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(i);i=j?j[1]+h+i.substr(j[1].length):
			h+i;c(/\bgl_\w+\b/g,h,function(q){
				i=i.replace(RegExp(q,"g"),"_"+q)
			};

			);return i
		};

		function e(h,i){
			var j=gl.createShader(h);gl.shaderSource(j,i);gl.compileShader(j);gl.getShaderParameter(j,gl.COMPILE_STATUS)||u("compile error: "+gl.getShaderInfoLog(j));return j
		};

		a=d("attribute vec3 gl_Vertex;attribute vec2 gl_TexCoord;attribute vec3 gl_Normal;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",
		a);b=d("precision highp float;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",b);this.program=gl.createProgram();gl.attachShader(this.program,e(gl.VERTEX_SHADER,a));gl.attachShader(this.program,e(gl.FRAGMENT_SHADER,b));gl.linkProgram(this.program);gl.getProgramParameter(this.program,gl.LINK_STATUS)||u("link error: "+gl.getProgramInfoLog(this.program));this.attributes={
		};

		var g={
		};

		c(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,
		a+b,function(h){
			g[h[2]]=1
		};

		);this.isSampler=g;this.needsMVP=(a+b).indexOf("gl_ModelViewProjectionMatrix")!=-1
	};

	Shader.prototype.uniforms=function(a){
		gl.useProgram(this.program);for(var b in a){
			var c=gl.getUniformLocation(this.program,b);if(c){
				var d=a[b];if(d instanceof Vector)d=[d.x,d.y,d.z];else if(d instanceof Matrix)d=d.m;if(Object.prototype.toString.call(d)=="[object Array]")switch(d.length){
				case 1:gl.uniform1fv(c,new Float32Array(d));break;case 2:gl.uniform2fv(c,new Float32Array(d));break;case 3:gl.uniform3fv(c,
					new Float32Array(d));break;case 4:gl.uniform4fv(c,new Float32Array(d));break;case 9:gl.uniformMatrix3fv(c,false,new Float32Array([d[0],d[3],d[6],d[1],d[4],d[7],d[2],d[5],d[8]]));break;case 16:gl.uniformMatrix4fv(c,false,new Float32Array([d[0],d[4],d[8],d[12],d[1],d[5],d[9],d[13],d[2],d[6],d[10],d[14],d[3],d[7],d[11],d[15]]));break;default:u("don't know how to load uniform \""+b+'" of length '+d.length)
				};

				else Object.prototype.toString.call(d)=="[object Number]"?(this.isSampler[b]?gl.uniform1i:gl.uniform1f).call(gl,
				c,d):u('attempted to set uniform "'+b+'" to invalid value '+d)
			};	
		};

		return this
	};

	Shader.prototype.draw=function(a,b){
		this.drawBuffers(a.vertexBuffers,a.indexBuffers[b==gl.LINES?"lines":"triangles"],b||gl.TRIANGLES)

	};

	Shader.prototype.drawBuffers=function(a,b,c){
		this.uniforms({_gl_ModelViewMatrix:gl.modelviewMatrix,_gl_ProjectionMatrix:gl.projectionMatrix

		};


		);
		this.needsMVP&&this.uniforms({_gl_ModelViewProjectionMatrix:gl.projectionMatrix.multiply(gl.modelviewMatrix)
		};

		);
		for(var d in a){
			var e=a[d],g=this.attributes[d]||
			gl.getAttribLocation(this.program,d.replace(/^gl_/,"_gl_"));
			if(g!=-1){
				this.attributes[d]=g;gl.bindBuffer(gl.ARRAY_BUFFER,e.buffer);gl.enableVertexAttribArray(g);gl.vertexAttribPointer(g,e.buffer.spacing,gl.FLOAT,false,0,0)
			};

			
		};

		for(d in this.attributes)d in a||gl.disableVertexAttribArray(this.attributes[d]);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b.buffer);gl.drawElements(c,b.buffer.length,gl.UNSIGNED_SHORT,0);return this
	};

	Texture=function(a,b,c){
		c=c||{
		};

		this.id=gl.createTexture();this.width=a;this.height=
		b;this.format=c.format||gl.RGBA;this.type=c.type||gl.UNSIGNED_BYTE;gl.bindTexture(gl.TEXTURE_2D,this.id);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,c.filter||c.magFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,c.filter||c.minFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,c.wrap||c.wrapS||gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,c.wrap||c.wrapT||gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,
		0,this.format,a,b,0,this.format,this.type,null)
		
	};

	Texture.prototype.bind=function(a){
		gl.activeTexture(gl.TEXTURE0+(a||0));gl.bindTexture(gl.TEXTURE_2D,this.id)
	};

	Texture.prototype.unbind=function(a){
		gl.activeTexture(gl.TEXTURE0+(a||0));gl.bindTexture(gl.TEXTURE_2D,null)
	};

	var w,t;Texture.prototype.drawTo=function(a){
		var b=gl.getParameter(gl.VIEWPORT);w=w||gl.createFramebuffer();t=t||gl.createRenderbuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,w);gl.bindRenderbuffer(gl.RENDERBUFFER,t);if(this.width!=t.width||
				this.height!=t.height){
			t.width=this.width;t.height=this.height;gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,this.width,this.height)
		};

		gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.id,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,t);gl.viewport(0,0,this.width,this.height);a();gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.bindRenderbuffer(gl.RENDERBUFFER,null);gl.viewport(b[0],b[1],b[2],b[3])
	};

	Texture.prototype.swapWith=function(a){
		var b;
		b=a.id;a.id=this.id;this.id=b;b=a.width;a.width=this.width;this.width=b;b=a.height;a.height=this.height;this.height=b
	};

	Texture.fromImage=function(a,b){
		b=b||{
		};

		var c=new Texture(a.width,a.height,b);gl.texImage2D(gl.TEXTURE_2D,0,c.format,c.format,c.type,a);b.minFilter&&b.minFilter!=gl.NEAREST&&b.minFilter!=gl.LINEAR&&gl.generateMipmap(gl.TEXTURE_2D);return c
	};

	Vector=function(a,b,c){
		this.x=a||0;this.y=b||0;this.z=c||0
	};

	Vector.prototype.negative=function(){
		return new Vector(-this.x,-this.y,-this.z)
	};

	Vector.prototype.add=function(a){
		var b=a instanceof Vector;return new Vector(this.x+(b?a.x:a),this.y+(b?a.y:a),this.z+(b?a.z:a))
	};

	Vector.prototype.subtract=function(a){
		var b=a instanceof Vector;return new Vector(this.x-(b?a.x:a),this.y-(b?a.y:a),this.z-(b?a.z:a))
	};

	Vector.prototype.multiply=function(a){
		var b=a instanceof Vector;return new Vector(this.x*(b?a.x:a),this.y*(b?a.y:a),this.z*(b?a.z:a))
	};

	Vector.prototype.divide=function(a){
		var b=a instanceof Vector;return new Vector(this.x/(b?a.x:a),this.y/
		(b?a.y:a),this.z/(b?a.z:a))
	};

	Vector.prototype.dot=function(a){
		return this.x*a.x+this.y*a.y+this.z*a.z
	};

	Vector.prototype.cross=function(a){
		return new Vector(this.y*a.z-this.z*a.y,this.z*a.x-this.x*a.z,this.x*a.y-this.y*a.x)
	};

	Vector.prototype.length=function(){
		return Math.sqrt(this.dot(this))
	};

	Vector.prototype.unit=function(){
		return this.divide(this.length())
	};

	Vector.prototype.min=function(){
		return Math.min(Math.min(this.x,this.y),this.z)
	};

	Vector.prototype.max=function(){
		return Math.max(Math.max(this.x,
		this.y),this.z)
	};

	Vector.prototype.toAngles=function(){
		return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())
		};

		
	};

	Vector.prototype.toArray=function(a){
		return[this.x,this.y,this.z].slice(0,a||3)
	};

	Vector.fromAngles=function(a,b){
		return new Vector(Math.cos(a)*Math.cos(b),Math.sin(b),Math.sin(a)*Math.cos(b))
	};

	Vector.random=function(){
		return Vector.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))
	};

	Vector.min=function(a,b){
		return new Vector(Math.min(a.x,b.x),Math.min(a.y,
		b.y),Math.min(a.z,b.z))
	};

	Vector.max=function(a,b){
		return new Vector(Math.max(a.x,b.x),Math.max(a.y,b.y),Math.max(a.z,b.z))
	};

	Vector.lerp=function(a,b,c){
		return a.add(b.subtract(a).multiply(c))
	};

	Vector.fromArray=function(a){
		return new Vector(a[0],a[1],a[2])
	};


};

)();
