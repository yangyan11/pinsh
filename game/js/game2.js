/**
 * Created by sd on 2016/11/23.
 */
/*游戏的人物类*/
function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=400;
    this.width=74*2;
    this.height=64*2;
    /*this.y=420;
    this.width=83;
    this.height=118;*/
    /*this.y=420;
    this.width=100;
    this.height=87;*/
    this.status="runs";
    this.state=0;/*第几张图片*/
    this.num=0;
    this.speedx=6;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this[this.status][this.state], 0, 0, 827, 1181, 0, 0, this.width, this.height);
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
    this.y=420;
    this.width=84;
    this.height=60;
    this.speedx=6;
    this.flag=true;
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
    this.x=0;
    this.y=0;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedy=3*Math.random()-1.5;
    this.speedx=3*Math.random()-1.5;
    this.zhongli=0.3;
    this.speedr=0.1;

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
    for(var i=0;i<10;i++){
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
/*游戏主类*/
function game(canvas,cobj,runs,jumps,hinderImg,runA,jumpA,hitA){
    this.canvas=canvas;
    this.width=canvas.width;
    this.height=canvas.height;
    this.runA=runA;
    this.jumpA=jumpA;
    this.hitA=hitA;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.person=new person(canvas,cobj,runs,jumps);
    this.backx=10;
    this.backSpeed=8;
    this.hinderArr=[];
    this.isfire=false;
    this.score=0;
    this.zidan=new zidan(canvas,cobj);
    //this.name=name;
}
game.prototype={
    play:function(start,mask){
        this.name=prompt("请输入名字","mali");
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        this.run();
        this.key();
        this.mouse();
    },
    run:function(){
        var that=this;
        that.runA.play();
        var num=0;
        var rand=(2+Math.ceil(6*Math.random()))*1000;
        setInterval(function(){
            num+=50;
            that.cobj.clearRect(0,0,that.width,that.height);
            that.person.num++;/*用来计算显示的图片*/
            if(that.person.status=="runs"){
                that.person.state=that.person.num%8;
            }else if(that.person.status=="jumps"){
                that.person.state=0;
            }
            /*让人物的X发生变化*/
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/3){
                that.person.x=that.width/3;
                that.backSpeed=6;
            }
            that.person.draw();
            /*操作障碍物*/
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
                    if(that.hinderArr[i].flag){
                        that.hitA.play();
                        xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                        that.hinderArr[i].flag=false;
                        that.person.life--;
                        console.log(that.person.life);
                        if(that.person.life==0){
                            //location.href="game.php?score="+that.score;
                            /*$.ajax({
                                url:"game.php",
                                data:{score:that.score},
                                success:function(e){
                                    if(e=="ok"){
                                        alert("ok");
                                        location.reload();
                                    }
                                }
                            })*/
                            //var obj=new XMLHttpRequest()
                            var messages=localStorage.messages?JSON.parse(localStorage.messages):[];
                            var temp={name:that.name,score:that.score};
                            if(messages.length>0){
                                messages.sort(function(a,b){
                                    return a.score<b.score;//最后一个最小
                                })
                                if(temp.score>messages[messages.length-1].score){
                                    if(messages.length==5){
                                        messages[messages.length-1]=temp;
                                    }else if(messages.length<5){
                                        messages.push(temp);

                                    }
                                }
                            }else{
                                messages.push(temp);
                            }

                            //排序,冒泡排序

                            /*for(var j=0;j<messages.length;j++){
                                if(temp.score>message[i].score){
                                    messages[i]=temp;
                                    break;
                                }
                            }*/
                            //messages.push(temp);
                            localStorage.message=JSON.stringify(messages);
                            location.reload();
                        }

                    }
                }
                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
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
            /*让背景移动*/
            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.backx+"px";
        },50)
    },
    /*人物跳跃*/
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){
                that.jumpA.play();
                that.runA.pause();
                that.person.status="jumps";
                var inita=0;
                var speeda=5;
                var r=150;
                var y=that.person.y;
                var t=setInterval(function(){/*跳跃*/
                    inita+=speeda;
                    if(inita>180){
                        clearInterval(t);
                        flag=true;
                        that.person.status="runs";
                        that.runA.play();
                    }else{
                        var top=Math.sin(inita*Math.PI/180)*r;
                        that.person.y=y-top;
                    }
                },50)
            }
        }
    },
    /*发射子弹*/
    mouse:function(){
        var that=this;
        document.querySelector(".mask").onclick=function(){
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y=that.person.y+that.person.height/2;
            that.zidan.speedx=5;
            that.isfire=true;
        }
    }
}
