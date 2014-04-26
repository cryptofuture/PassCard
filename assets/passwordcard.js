function PasswordCard(number,digitArea,includeSymbols)
{
	this.number=number;
	this.digitArea=digitArea;
	this.includeSymbols=includeSymbols;
	this.grid=null;
	
	this.WIDTH=29;
	this.HEIGHT=7;
	this.BODY_HEIGHT=this.HEIGHT-1;
	this.HEADER_CHARS="■□▲△○●★☂☀☁☹☺♠♣♥♦♫€¥£$!?¡¿⊙◐◩�".split("");
	this.DIGITS="01234567";
	this.DIGITS_AND_LETTERS="23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	this.DIGITS_LETTERS_AND_SYMBOLS="23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@#$%&*<>?€+{}[]()/\\";
}
PasswordCard.prototype.getGrid=function()
{
	if(this.grid==null) this.generateGrid();
	return this.grid;
}
PasswordCard.prototype.generateGrid=function()
{
	this.grid=new Array(this.HEIGHT);
	for(var i=0;i<this.HEIGHT;i++) this.grid[i]=new Array(this.WIDTH);
	var random=new Random(this.number);
	var headerChars=this.HEADER_CHARS;
	for(var i=headerChars.length;i>1;i--)
	{
		var k=i-1;
		var j=parseInt(random.nextInt(i).toString());
		var tmp=headerChars[k];
		headerChars[k]=headerChars[j];
		headerChars[j]=tmp;
	}
	if(headerChars.length>this.WIDTH)
	{
		alert("How the hell did this happen?!");
		var tmp=headerChars;
		headerChars=new Int8Array(this.WIDTH);
		for(var i=0;i<this.WIDTH;i++) headersChars[i]=tmp[i];
	}
	this.grid[0]=headerChars;
	
	var t;
	if(this.digitArea)
	{
		var halfHeight=1+((this.HEIGHT-1)/2);
		for(var y=1;y<halfHeight;y++)
		{
			for(var x=0;x<this.WIDTH;x++)
			{
				if(this.includeSymbols&&((x%2)==0))
				{
					t=parseInt(random.nextInt(this.DIGITS_LETTERS_AND_SYMBOLS.length).toString());
					this.grid[y][x]=this.DIGITS_LETTERS_AND_SYMBOLS.charAt(t);
				}
				else
				{
					t=parseInt(random.nextInt(this.DIGITS_AND_LETTERS.length).toString());
					this.grid[y][x]=this.DIGITS_AND_LETTERS.charAt(t);
				}
			}
		}
		for(var y=halfHeight;y<this.HEIGHT;y++)
		{
			for(var x=0;x<this.WIDTH;x++)
			{
				t=parseInt(random.nextInt(this.DIGITS.length).toString());
				this.grid[y][x]=this.DIGITS.charAt(t);
			}
		}
	}
	else
	{
		for(var y=1;y<this.HEIGHT;y++)
		{
			for(var x=0;x<this.WIDTH;x++)
			{
				if(this.includeSymbols&&((x%2)==0))
				{
					t=parseInt(random.nextInt(this.DIGITS_LETTERS_AND_SYMBOLS.length).toString());
					this.grid[y][x]=this.DIGITS_LETTERS_AND_SYMBOLS.charAt(t);
				}
				else
				{
					t=parseInt(random.nextInt(this.DIGITS_AND_LETTERS.length).toString());
					this.grid[y][x]=this.DIGITS_AND_LETTERS.charAt(t);
				}
			}
		}
	}
}

addEventListener("load",function()
{
	var seed=localStorage.seed||randomSeed();
	document.getElementById("seed").value=seed;
	var fontsig={i:[10,17],o:[10,17]};
	onFontLoad(function()
	{
		onFontLoad(function()
		{
			document.getElementById("generateBtn").addEventListener("click",generate,false);
		},"FreeMonoBold","16px",fontsig);
	},"FreeMono","16px",fontsig);
	 //find some way to check this
},false);

function generate()
{
	var showgrid=document.getElementById("grid").checked;
	var highcontrast=document.getElementById("highcontrast").checked;
	//var antiAlias=false;
	
	var seed=document.getElementById("seed").value;
	localStorage.seed=seed;
	var digitarea=document.getElementById("numbersonly").checked;
	var symbols=document.getElementById("symbols").checked;
	
	var card=new PasswordCard(seed,digitarea,symbols);
	var grid=card.getGrid();
	
	var canvcard=new CanvasCard("cardCanvas",seed,grid);
	canvcard.measure();
	canvcard.drawBorders();
	canvcard.drawValues(highcontrast);
	if(showgrid) canvcard.drawGrid();
	//if(antiAlias) canvcard.antiAlias();
	canvcard.getLink(function(link)
	{
		document.getElementById("saveLink").href=link;
	});
}

function onFontLoad(cb,font,size,table,interval)
{
	var div=document.createElement("div");
	div.style.fontFamily=font;
	div.style.fontSize=size;
	div.style.position="absolute";
	div.style.top="-100px"
	div.style.left="-100px"
	document.body.appendChild(div);
	var checkInterval=setInterval(function()
	{
		for(character in table)
		{
			div.textContent=character;
			var t=table[character];
			var s=getComputedStyle(div);
			if(parseInt(s.width)!=t[0]||parseInt(s.height)!=t[1]) return;
		}
		div.parentNode.removeChild(div);
		clearTimeout(checkInterval);
		cb();
	},interval||200);
}

function randomSeed()
{
	var r="";
	for(var i=0;i<16;i++)
	{
		r+=Math.floor(Math.random()*17).toString(16);
	}
	while(r.charAt(0)=="0") r=r.substr(1);
	return r;
}