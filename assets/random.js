function Random(seed)
{
	this.nc=new BigInteger("5DEECE66D",16);
	this.n1shift48min1=new BigInteger("281474976710655");
	
	if(typeof seed=="number") this.seed=new BigInteger(seed.toString());
	else if(typeof seed=="string") this.seed=new BigInteger(seed,16);
	else this.seed=new BigInteger(new Date().getTime().toString());
	this.seed=this.seed.xor(this.nc).and(this.n1shift48min1);
	this.confineSeed();
}
Random.prototype.next=function(bits)
{
	this.seed=this.seed.multiply(this.nc).add(new BigInteger("11")).and(this.n1shift48min1);
	this.confineSeed();
	return this.seed.shiftRight(48-bits);
}
Random.prototype.nextInt=function(n)
{
	if(!n) return Random.confine(this.next(32),32);
	n=new BigInteger(n.toString());
	if(n.and(n.negate()).equals(n)) return Random.confine(n.multiply(this.next(31)).shiftRight(31),32);
	var bits,val;
	do
	{
		bits=this.next(31);
		val=bits.mod(n);
	}
	while(bits.subtract(val).add(n.subtract(BigInteger.ONE)).compareTo(BigInteger.ONE)==-1);
	return Random.confine(val,32);
}
Random.prototype.nextLong=function()
{
	var r=Random.confine(this.nextInt().shiftLeft(32),64);
	r=Random.confine(r.add(this.nextInt()),64);
	return r;
}
Random.prototype.confineSeed=function()
{
	this.seed=Random.confine(this.seed,64);
}
Random.confine=function(number,bitspace)
{
	if(typeof number=="number") number=new BigInteger(number.toString());
	var max=new BigInteger("2").pow(bitspace-1);
	var min=max.negate();
	max=max.subtract(BigInteger.ONE);
	var total=new BigInteger("2").pow(bitspace);
	while(number.compareTo(max)>0)
	{
		number=number.subtract(total);
	}
	while(number.compareTo(min)<0)
	{
		number=number.add(total);
	}
	return number;
}