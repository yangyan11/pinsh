 $(function(){
     var clientH=$(window).height();

     var num=0;
     var flag=true;
     touch.on("body","swipeup",".fullpage",function(){
         if(!flag){
             return;
         }
         num++;
         var les=$("section").length;
         if(num==les){
             num=les-1;
             return;
             flag=false;

         }

         $(".fullpage").css("marginTop",-num*clientH)
     });

     touch.on("body","swipedown",".fullpage",function(){
         if(!flag){
             return;
         }
         num--;
         if(num==-1){
             num=0;
             return;
             flag=false;

         }

         $(".fullpage").css("marginTop",-num*clientH)
     });

     $(".fullpage")[0].addEventListener("webkitTransition",function(){
         flag=true;
     });


     /*对于菜单的操作*/

     var flag1=true;
     $(".menu-option").click(function(){
         if(flag1){
             /*按钮*/
             $(this).find(".menu-option-tline").css({
                     transform:"translate(0,7px) rotate(45deg)"
                 });
             $(this).find(".menu-option-bline").css({
                 transform:"translate(0,-7px) rotate(-45deg)"
             });

             /*菜单*/
             $(".menu a").each(function(index,obj){
                 $(obj).css({
                     opacity:0,
                     animation:"menu .3s linear forwards "+0.2*index+"s"
                 })
             });


             flag1=false;
         }else{
             /*按钮*/
             $(this).find(".menu-option-tline").css({
                 transform:"translate(0,0) rotate(0deg)"
             });
             $(this).find(".menu-option-bline").css({
                 transform:"translate(0,0) rotate(0deg)"
             });

             /*菜单*/
             $(".menu a").each(function(index,obj){
                 $(obj).css({
                     opacity:1,
                     animation:"menu1 0.3s linear forwards "+(1.2-0.2*index)+"s"
                 })
             });
             flag1=true;
         }
     })
     $(window).resize(function(){
         clientH=$(window).height();
         var clientW=$(window).width();
         $(".fullpage").css("mariginTop",clientH*-num);
         if(clientW>1000){
             $(".menu a").css({
                 animation:"none",
                 opacity:0,
                 transform:"rotate(0deg)"
             })
         }
         $(".menu-option .menu-option-bline,.menu-option-tline").css({
             transform:"translate(0,0) rotate(0deg)"
         });
         flag1=true;
     })
 });