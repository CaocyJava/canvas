//把工具和形状放到一起
var actions = [$("#means_brush"),$("#means_eraser"),$("#means_paint"),$("#means_straw"),$("#means_text"),$("#means_magnifier"),
              $("#shape_line"),$("#shape_arc"),$("#shape_rect"),$("#shape_poly"),$("#shape_arcfill"),$("#shape_rectfill"),];
//线宽组
var lines = [$("#size_line1px"),$("#size_line3px"),$("#size_line5px"),$("#size_line8px")];
//颜色组
var colors = [$("#red"),$("#green"),$("#blue"),$("#yellow"),$("#white"),$("#black"),$("#pink"),$("#purple"),$("#cyan"),$("#orange")];


var beginx;
var beginy;
$(function(){
    $("#saveimg").on("click",function(){saveimg();});
    $("#clearimg").on("click",function(){clearimg();});

    $("#means_brush").on("click",function(){drawbrush(0);});
    $("#means_eraser").on("click",function(){draweraser(1);});
    $("#means_paint").on("click",function(){drawpaint(2);});
    $("#means_straw").on("click",function(){drawstraw(3);});
    $("#means_text").on("click",function(){drawtext(4);});
    $("#means_magnifier").on("click",function(){drawmagnifier(5);});
    $("#shape_line").on("click",function(){drawLine(6);});
    $("#shape_arc").on("click",function(){drawarc(7);});
    $("#shape_rect").on("click",function(){drawrect(8);});
    $("#shape_poly").on("click",function(){drawpoly(9);});
    $("#shape_arcfill").on("click",function(){drawarcfill(10);});
    $("#shape_rectfill").on("click",function(){drawrectfill(11);});

    $("#size_line1px").on("click",function(){lineWidth(0);});
    $("#size_line3px").on("click",function(){lineWidth(1);});
    $("#size_line5px").on("click",function(){lineWidth(2);});
    $("#size_line8px").on("click",function(){lineWidth(3);});

    $("#red").on("click",function(){drawcolor(this,0);});
    $("#green").on("click",function(){drawcolor(this,1);});
    $("#blue").on("click",function(){drawcolor(this,2);});
    $("#yellow").on("click",function(){drawcolor(this,3);});
    $("#white").on("click",function(){drawcolor(this,4);});
    $("#black").on("click",function(){drawcolor(this,5);});
    $("#pink").on("click",function(){drawcolor(this,6);});
    $("#purple").on("click",function(){drawcolor(this,7);});
    $("#cyan").on("click",function(){drawcolor(this,8);});
    $("#orange").on("click",function(){drawcolor(this,9);});

});
//状态设置函数
function setStatus(arr,num,type){
    for(var i=0;i<arr.length;i++){
        if(i==num){
            if(type==1){
                arr[i].css("background","yellow");
            }else{
                arr[i].css("border","1px solid #fff");
            }
        }else{
            if(type==1){
                arr[i].css("background","#ccc");
            }else{
                arr[i].css("border","1px solid #000");
            }
        }
    }
}

//画板
var canvas=document.getElementById('canvas');
var draw = canvas.getContext("2d");
//默认初始画笔工具
drawbrush(0);
//默认线宽
lineWidth(0);

//保存按钮
function saveimg(){

}
//清除按钮
function clearimg(){
    draw.clearRect(0,0,880,400);
}
//画笔
function drawbrush(num){
    setStatus(actions,num,1);
    var flag=false;
    canvas.onmousedown=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        draw.beginPath();
        draw.moveTo(x,y);
        flag=true;
    };
    canvas.onmousemove=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        if(flag){
            draw.lineTo(x,y);
            draw.stroke();
        }
    };
    canvas.onmouseup=function(){
        flag=false;
    };
    canvas.onmouseout=function(){
        flag=false;
    };
}
function draweraser(num){
    setStatus(actions,num,1);
    var flag = false;
    canvas.onmousedown=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        draw.clearRect(x-draw.lineWidth,y-draw.lineWidth,draw.lineWidth*2,draw.lineWidth*2);
        flag=true;
    };
    canvas.onmousemove=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        if(flag){
            draw.clearRect(x-draw.lineWidth,y-draw.lineWidth,draw.lineWidth*2,draw.lineWidth*2);
        }
    };
    canvas.onmouseup=function(){
        flag = false;
    };
    canvas.onmouseout=function(){
        flag = false;
    };
}
function drawpaint(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function () {
        draw.fillRect(0,0,880,400);
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=null;
}
function drawstraw(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        var obj = draw.getImageData(x,y,1,1);//获取区域像素信息
        var color = "rgb("+obj.data[0]+","+obj.data[1]+","+obj.data[2]+")";
        draw.strokeStyle=color;
        draw.fillStyle=color;
        drawbrush(0);
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=null;
}
function drawtext(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        var startX = e.pageX - this.offsetLeft;
        var startY = e.pageY - this.offsetTop;
        var content=window.prompt('请输入你的名字','');
        if(content!=null){
            draw.fillText(content,startX,startY);
        }

    }
    canvas.onmousemove=null;
    canvas.onmouseup=null;
    canvas.onmouseout=null;
}
function drawmagnifier(num){
    setStatus(actions,num,1);
    var scale = window.prompt("请输入放大百分比[请输入整数]","100");
    var scaleW = 880*scale/100;
    var scaleH = 400*scale/100;
    canvas.style.width = parseInt(scaleW) + "px";
    canvas.style.height = parseInt(scaleH) + "px";
}
//形状方法
function drawLine(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        draw.beginPath();
        draw.moveTo(x,y);
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        draw.lineTo(x,y);
        draw.stroke();
    }
}
function drawarc(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        beginx = e.pageX-this.offsetLeft;
        beginy = e.pageY-this.offsetTop;
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var endx = e.pageX-this.offsetLeft;
        var endy = e.pageY-this.offsetTop;
        var a = endx-beginx;
        var b = endy-beginy;
        var r = Math.sqrt(a*a+b*b);
        draw.beginPath();
        draw.arc(beginx,beginy,r,0,360,false);
        draw.stroke();
    }
}
function drawrect(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        beginx = e.pageX-this.offsetLeft;
        beginy = e.pageY-this.offsetTop;
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var endx = e.pageX-this.offsetLeft-beginx;
        var endy = e.pageY-this.offsetTop-beginy;
        draw.beginPath();
        draw.strokeRect(beginx,beginy,endx,endy);
        draw.stroke();
    }
}
function drawpoly(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        beginx = e.pageX-this.offsetLeft;
        beginy = e.pageY-this.offsetTop;
        draw.beginPath();
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var endx = e.pageX-this.offsetLeft;
        var endy = e.pageY-this.offsetTop;
        var middlex = 2*beginx-endx;
        draw.moveTo(beginx,beginy);
        draw.lineTo(endx,endy);
        draw.lineTo(middlex,endy);
        draw.closePath();
        draw.stroke();
    }
}
function drawarcfill(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        beginx = e.pageX-this.offsetLeft;
        beginy = e.pageY-this.offsetTop;
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var endx = e.pageX-this.offsetLeft;
        var endy = e.pageY-this.offsetTop;
        var a = endx-beginx;
        var b = endy-beginy;
        var r = Math.sqrt(a*a+b*b);
        draw.beginPath();
        draw.arc(beginx,beginy,r,0,360,false);
        draw.fill();
    }
}
function drawrectfill(num){
    setStatus(actions,num,1);
    canvas.onmousedown=function(e){
        beginx = e.pageX-this.offsetLeft;
        beginy = e.pageY-this.offsetTop;
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=function(e){
        var endx = e.pageX-this.offsetLeft-beginx;
        var endy = e.pageY-this.offsetTop-beginy;
        draw.beginPath();
        draw.fillRect(beginx,beginy,endx,endy);
        draw.strokeRect(beginx,beginy,endx,endy);
        draw.fill();
    }
}
//线宽方法
function lineWidth(num){
    setStatus(lines,num,1);
    switch (num){
        case 0: draw.lineWidth=1;
            break;
        case 1: draw.lineWidth=3;
            break;
        case 2: draw.lineWidth=5;
            break;
        case 3: draw.lineWidth=8;
            break;
        default : draw.lineWidth=1;
    }
}
//颜色方法
function drawcolor(obj,num){
    setStatus(colors,num,0);
    draw.strokeStyle=obj.id;
    draw.fillStyle=obj.id;
}

