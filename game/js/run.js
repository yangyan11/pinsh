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
  var runA=document.querySelector(".runA");
  //alert(runA);
  var jumpA=document.querySelector(".jumpA");
  var hitA=document.querySelector(".hitA");
  var fireA=document.querySelector(".fireA");
  var overA=document.querySelector(".voerA");
  //alert(hinderImg);

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
    var gameObj=new game(canvas,cobj,runs,jumps,hinderImg,runA,jumpA,hitA,fireA,overA);

    gameObj.play(start,mask);
  })

};