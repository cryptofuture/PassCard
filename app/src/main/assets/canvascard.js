function CanvasCard(canvasid,seed,grid)
{
	this.seed=seed.toString();
	this.grid=grid;
	this.canvas=document.getElementById(canvasid);
	this.context=this.canvas.getContext("2d");
	this.font="FreeMono";
	this.codefont="FreeMonoBold";
}
CanvasCard.prototype.measure=function(width,height)
{
	this.fontsize=30;
	this.codefontsize=this.fontsize*0.5;
	var c=this.context;
	c.font=this.codefontsize+"px "+this.codefont;
	this.codeCharWidth=c.measureText("1").width;
	c.font=this.fontsize+"px "+this.font;
	this.charWidth=c.measureText(this.grid[0][0]).width;
	this.lineWidth=c.measureText(this.grid[0].join("")).width;
    //this.cornerRadius=20;
	//this.borderWidth=1;
	//this.halfBorder=this.borderWidth/2;
	this.xmargin=30;
	this.ymargin=35;
	this.charheight=this.fontsize;
	this.canvas.width=this.lineWidth+(this.xmargin*2);
	this.canvas.height=(this.grid.length*this.charheight)+(this.ymargin*2)+this.codefontsize;
};
/*CanvasCard.prototype.drawBorders=function()
{
	var c=this.context;
	c.fillStyle="white";
	c.fillRect(0,0,c.canvas.width,c.canvas.height);
	c.strokeStyle="grey";
	c.lineWidth=this.borderWidth;
	var leftx=this.cornerRadius+this.halfBorder;
	var topy=this.cornerRadius+this.halfBorder;
	var rightx=c.canvas.width-this.cornerRadius-this.halfBorder;
	var bottomy=this.canvas.height-this.cornerRadius-this.halfBorder;
	c.beginPath();
	c.moveTo(this.cornerRadius,this.halfBorder);
	c.arc(rightx,topy,this.cornerRadius,-Math.PI/2,0,false);
	c.arc(rightx,bottomy,this.cornerRadius,0,Math.PI/2,false);
	c.arc(leftx,bottomy,this.cornerRadius,Math.PI/2,Math.PI,false);
	c.arc(leftx,topy,this.cornerRadius,Math.PI,-Math.PI/2,false);
	c.stroke();
};
 */
CanvasCard.prototype.drawValues=function(highContrast)
{
	var colorArray;
	var normalColorArray=["#ffffff","#c0c0c0","#ffc0c0","#c0ffc0","#ffffc0","#c0c0ff","#ffc0ff","#c0ffff"];
	var highContrastColorArray=["#ffffff","#808080","#ff8080","#80ff80","#ffff80","#8080ff","#ff80ff","#80ffff"];
	if(highContrast) colorArray=highContrastColorArray;
	else colorArray=normalColorArray;
	
	var c=this.context;
	var symbols=this.grid[0].join("");
	var x=this.xmargin;
	var y=this.ymargin;
	var codegap=this.codeCharWidth*1.5;
	//print symbols
	c.textBaseline="top";
	c.font=this.fontsize+"px "+this.font;
	c.fillStyle="black";
	c.fillText(symbols,x+codegap,y);
	y+=this.fontsize/4;
	for(var i=1;i<this.grid.length;i++)
	{
		y+=this.fontsize;
		c.fillStyle=colorArray[i-1];
		c.fillRect(x,y,this.lineWidth+codegap,this.fontsize);
		c.fillStyle="black";
		c.font=this.fontsize+"px "+this.font;
		c.fillText(this.grid[i].join(""),x+codegap,y);
		c.font=this.codefontsize+"px "+this.codefont;
		c.fillText(i.toString(),x,y+(this.codefontsize/2));
	}
	y+=this.fontsize*1.5;
	c.font=this.codefontsize+"px "+this.codefont;
	var seedsize=c.measureText(this.seed).width;
	c.fillText(this.seed,(c.canvas.width/2)-(seedsize/2),y);
};
CanvasCard.prototype.drawGrid=function()
{
	var c=this.context;
	var y=this.ymargin+(this.fontsize*0.25);
	var x=this.xmargin;
	var codegap=this.codeCharWidth*1.5;
	c.strokeStyle="black";
	c.lineWidth=1;
	for(var i=0;i<this.grid.length;i++)
	{
		y+=this.fontsize;
		c.beginPath();
		c.moveTo(x,y);
		c.lineTo(x+this.lineWidth+codegap,y);
		c.stroke();
	}
	
	x+=codegap;
	y=this.ymargin;
	var linelen=c.canvas.height-this.ymargin-(this.fontsize*1.5);
	for(var i=0;i<this.grid[0].length;i++)
	{
		x+=this.charWidth;
		c.beginPath();
		c.moveTo(x,y);
		c.lineTo(x,y+linelen);
		c.stroke();
	}
};
CanvasCard.prototype.antiAlias=function()
{
	//This isn't working very well right now
	var c=this.context;
	var ca=this.canvas;
	var scaleDown=0.95;
	c.drawImage(ca,0,0,ca.width,ca.height,0,0,ca.width*scaleDown,ca.height*scaleDown);
	c.drawImage(ca,0,0,ca.width*scaleDown,ca.height*scaleDown,0,0,ca.width,ca.height);
	/*
	var data=c.getImageData(0,0,ca.width,ca.height);
	for(var y=0;y<data.height;y+=2)
	{
		for(var x=0;x<data.width;x+=2)
		{
			var pix1=data.data[((y*data.width)+x)*4];
			var pix2=data.data[((y*data.width)+x+1)*4];
			var pix3=data.data[((y*data.width)+x+2)*4];
			var pix4=data.data[((y*data.width)+x+3)*4];
		}
	}
	c.putImageData(data,0,0);
	*/
	/*
	http://www.codeproject.com/KB/recipes/colorspace1.aspx
	http://www.scribd.com/doc/6912465/Efficient-antialiasing-algorithm-for-computer-generated-images
	*/
};
CanvasCard.prototype.getLink=function(cb)
{
	if(!window.BlobBuilder&&window.WebKitBlobBuilder) window.BlobBuilder=window.WebKitBlobBuilder;
	if(!window.URL&&window.webkitURL) window.URL=window.webkitURL;
	
	if(this.canvas.toBlob)
	{
		this.canvas.toBlob(returnLink);
	}
	else
	{
		var dataurl=this.canvas.toDataURL();
		try
		{
			var data=dataurl.substr(dataurl.indexOf(",")+1).trim();
			data=atob(data);
			var builder=new BlobBuilder();
			builder.append(data);
			if(!returnLink(builder.getBlob("image/png"))) cb(dataurl);
		}
		catch(e)
		{
			cb(dataurl);
		}
	}
	function returnLink(blob)
	{
		var url=window.URL.createObjectURL(blob);
		if(!url) return false;
		cb(url);
		return true;
	}
};