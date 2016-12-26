function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=420;
    this.width=83;
    this.height=110;
    this.speedx=5;
    this.speedy=5;
    this.zhongli=5;
    this.status="runs";
    this.state=0;
    this.num=0;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
/*障碍物的类*/

function hinder(canvas,cobj,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.state=0;
    this.x=canvas.width-20;
    this.y=475;
    this.width=84;
    this.height=60;
    this.speedx=6;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this.hinderImg[this.state], 0, 0, 564, 400, 0, 0, this.width, this.height);
        this.cobj.restore();
    }

}

//粒子动画
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedy=3*Math.random()-3;
    this.speedx=3*Math.random();
    this.zhongli=0.3;
    this.speedr=0.1;
    this.cobj = cobj
    this.x = 0;
    this.y = 0;
    this.x1 = 20 * Math.random() - 10;
    this.y1 = 20 * Math.random() - 10;
    this.x2 = 20 * Math.random() - 10;
    this.y2 = 20 * Math.random() - 10;
    this.speedy = -2 - Math.random() - 2;
    this.speedx = (16 * Math.random() - 8)
    this.life = 4;
    this.r = 1;
    this.color = "red";
}
lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();

    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;

    }
}
function xue(cobj,x,y){
    var arr=[];
    for(var i=0;i<30;i++){
        var obj = new lizi(cobj);
        obj.x = x;
        obj.y = y;
        arr.push(obj);
    }
    var t=setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
            if(arr.length==0){
                clearInterval(t);
            }
        }
    },50)
}
//粒子动画结束
//子弹类
function zidan(canvas,cobj){
    this.x=0;
    this.y=0;
    this.width=50;
    this.height=10;
    this.color="red";
    this.speedx=5;
    this.jia=1;
    this.cobj=cobj;
    this.canvas=canvas;
}
zidan.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.fillStyle=this.color;
        cobj.fillRect(0,0,this.width,this.height);
        cobj.restore();
    }
}

/*游戏的主类*/
function game(canvas,cobj,runs,jumps,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.width=canvas.width;
    this.height=canvas.height;
    this.person=new person(canvas,cobj,runs,jumps);
    this.backx=0;
    this.backSpeed=6;
    this.hinderArr=[];
    this.score=0;
    this.zidan=new zidan(canvas,cobj);
}
game.prototype={
    play:function(start,mask){
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.run();
        this.key();
        this.mouse();
    },
    run:function(){
        //this.person.draw();
        var that=this;
        var num=0;
        var rand=(2+Math.ceil(6*Math.random()))*1000;
        setInterval(function(){
            num+=50;
            that.cobj.clearRect(0,0,that.width,that.height);
            /*用来计算显示的图片*/
            that.person.num++;
            if(that.person.status=="runs"){
                that.person.state=that.person.num%8;
            }else if(that.person.status=="jumps"){
                that.person.state=0;
            }

            /*让人物的x发生变化*/

            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/2){
                that.person.x=that.width/2;
                //that.person.speedx=3;
                //that.backSpeed=3;
            }
            that.person.draw();

            //操作障碍物
            if(num%rand==0){
                rand=(2+Math.ceil(6*Math.random()))*1000;
                num=0;
                var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
                obj.state=Math.floor(Math.random()*that.hinderImg.length);
                that.hinderArr.push(obj);
            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    //alert(1);
                    xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                    //xue(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height / 2,"red");
                    if(!that.hinderArr[i].flag){
                        that.person.life--;
                        console.log(that.person.life);
                        if(that.person.life==0){
                            alert("game over");
                            location.reload();
                        }
                        that.hinderArr[i].flag=true;
                    }
                }
                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.score++;
                        document.title=that.score;
                        that.hinderArr[i].flag1=true;

                    }

                }
            }

            /*操作子弹*/
            if(that.isfire){
                that.zidan.speedx+=that.zidan.jia;
                that.zidan.x+=that.zidan.speedx;
                that.zidan.draw();
            }


            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.backx+"px";
        },50)
    },
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){
                that.person.status="jumps";
                var inita=0;
                var speeda=5;
                var r=100;
                var y=that.person.y;
                var t=setInterval(function(){
                    inita+=speeda;
                    if(inita>180){
                        clearInterval(t);
                        flag=true;
                        that.person.status="runs";
                    }else{
                        var tops=Math.sin(inita*Math.PI/180)*r;
                        //y=y-top;
                        that.person.y=y-tops;
                    }

                },50)

            }
        }
    },
    mouse:function(){
        var that=this;
        document.querySelector(".mask").onclick=function(){
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y=that.person.y+that.person.height/2;
            that.zidan.speedx=5;
            that.isfire=true;
        }
    }
};