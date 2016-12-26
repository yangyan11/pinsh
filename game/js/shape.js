function shape(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.history=[];
    this.bianNum=5;
    this.jiaoNum=5;
}

 shape.prototype={
    init:function(){
        this. cobj.lineWidth=this.lineWidth;
        this. cobj.strokeStyle=this.strokeStyle;
        this. cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.init();
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](startx,starty,movex,movey);
            };
            that.canvas.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
         that.cobj.rect(x,y,x1-x,y1-y);
        that.cobj[this.style]();
        that.cobj.closePath();
     },
     arc:function(x,y,x1,y1){
         this.cobj.beginPath();
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         this.cobj.arc(x,y,r,0,2*Math.PI);
         this.cobj[this.style]();
     },
     dbx:function(x,y,x1,y1){
         var angle=360/this.bianNum*Math.PI/180;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         this.cobj.beginPath();
         for(var i=0;i<this.bianNum;i++ ){
             this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     },
     djx:function(x,y,x1,y1){
         var angle=360/(this.jiaoNum*2)*Math.PI/180;
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         var r1=r/2;
         this.cobj.beginPath();
         for(var i=0;i<this.jiaoNum*2;i++ ){
             if(i%2!=0){
                 this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
             }else{
                 this.cobj.lineTo(x+r1*Math.cos(angle*i),y+r1*Math.sin(angle*i));
             }
         }
         this.cobj.closePath();
         this.cobj[this.style]();
     }
};