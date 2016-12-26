window.onload=function(){
  var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    canvas.width=clientW;
    canvas.height=clientH;

    var runs=document.querySelectorAll(".run");

    var jumps=document.querySelectorAll(".jump");
    //alert(jumps);
    var hinderImg=document.querySelectorAll(".hinder");
  //alert(hinderImg);
    var gameObj=new game(canvas,cobj,runs,jumps,hinderImg);

    //var gameObj=new game(canvas,cobj,runs,jumps);
    //
    //gameObj.play();

  //选项卡

  var start=$(".start");
  //遮罩
  var mask=$(".mask");
  //按钮
  var startBtn=$(".btn");

  startBtn.one("click",function(){

    gameObj.play(start,mask);
  })

};