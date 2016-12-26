function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=200;
    this.y=0;
    this.width=83;
    this.height=110;
    this.speedx=5;
    this.speedy=5;
    this.zhongli=5;
    this.status="runs";
    this.state=0;
}
person.prototype={
    draw:function() {
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
function game(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.width=canvas.width;
    this.height=canvas.height;
    this.cobj=cobj;
    this.person=new person(canvas,cobj,runs,jumps);

}
game.prototype={
    play:function(){
        var that=this;
        var num=0;
        var top=0;
        var num1=0;
        setInterval(function(){
            that.cobj.clearRect(0,0,that.width,that.height);
            num++;
            num1+=7;
            that.person.state=num%8;
            //that.person.x+=that.person.speedx;

            if(top>=420){
                top=420
            }else{
                that.person.y+=that.person.zhongli;
                top+=that.person.speedy;
            }
            that.person.y=top;
            that.person.draw();
            that.canvas.style.backgroundPositionX=-num1+"px";
        },50)
    }
};

/*游戏的主类*/

