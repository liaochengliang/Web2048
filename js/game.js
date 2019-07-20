//jquery准备函数
$(document).ready(function(){
	init();
	init_rank();
});
//创建一个二维数组，用来存储所有的数字
var number_cell=new Array();
var score=0;
var best=0;
var w=0;
//排行榜分数
var rank_num=new Array(10);

//初始化排名
function init_rank(){
	for(var i=0;i<10;i++){
		rank_num[i]=0;
		$("#num_"+(i+1)).html(' No.'+(i+1)+':  '+rank_num[i]);
	}	
}
//更新排行榜
function update_rank(num){
		if(rank_num[9]<num)
			rank_num[9]=num;
		else
		return;
		for(var i=9;i>0;i--){
			if(rank_num[i]>rank_num[i-1]){
				var t=rank_num[i];
				rank_num[i]=rank_num[i-1];
				rank_num[i-1]=t;
			}
		}
		for(var i=0;i<10;i++){
			$("#num_"+(i+1)).html(' No.'+(i+1)+':  '+rank_num[i]);
		}	
}

//初始化数字格
function init(){
	w=0;
	score=0;
	for(var i=0;i<4;i++){
		number_cell[i]=new Array(4);
		for(var j=0;j<4;j++){
			number_cell[i][j]=0;
		}
	}
	suiji();
	suiji();
	update_number_cell();
	hide_inform();
}
//更新数字格
function update_number_cell(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$(".div1" ).append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			//通过数字格的id来设置其显示的内容；
			$("#number-cell-"+i+"-"+j).css("top",30+i*120);
			$("#number-cell-"+i+"-"+j).css("left",30+j*120);
			if(number_cell[i][j]!=0)
			{
				$("#number-cell-"+i+"-"+j).css("color",getColor(number_cell[i][j]));
				$("#number-cell-"+i+"-"+j).css("background-color","#F5F5DC");
				$("#number-cell-"+i+"-"+j).html(number_cell[i][j]);
			}
		}
	}
	if(score>best)best=score;
	$("#name1").html("Score:  "+score);
	$("#name2").html("Best:  "+best);
}
//产生随机数
function suiji(){
	//产生随机格子数的坐标
	do{
		var ran_x=Math.floor(Math.random()*4);
		var ran_y=Math.floor(Math.random()*4);
	}while(number_cell[ran_x][ran_y]!=0)
	
	number_cell[ran_x][ran_y]=Math.random()<0.5?2:4;
}
//获得字体颜色
function getColor(number){
	switch(number){
		case 2:return "#8B658B";break;
		case 4:return "#FF8247";break;
		case 8:return "#FF7F24";break;
		case 16:return "#FF0000";break;
		case 32:return "#B03060";break;
		case 64:return "#9400D3";break;
		case 128:return "#6959CD";break;
		case 256:return "#B23AEE";break;
		case 512:return "#8B008B";break;
		case 1024:return "#8B7E66";break;
		case 2048:return "#8B0000";break;
	}
}

//响应键盘事件
$(document).keydown(function(even){
		switch(even.keyCode){
			case 37:{
				if(canMoveLeft()){
					move_left();
					suiji();
					update_number_cell();
				}
				break;
			}
			case 38:{
				if(canMoveUp()){
					move_up();
					suiji();
					update_number_cell();
				}
				break;
			}
			case 39:{
				if(canMoveRight()){
					move_right();
					suiji();
					update_number_cell();
				}
				break;
			}
			case 40:{
				if(canMoveDown()) {
					move_down();
					suiji();
					update_number_cell();
				}
				break;
			}
		}
		inform();
	}); 
//判定是否能左移
function canMoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(number_cell[i][j]!=0){
 				if(number_cell[i][j-1]==0||number_cell[i][j]==number_cell[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
//判定是否能右移
function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(number_cell[i][j]!=0){
				if(number_cell[i][j+1]==0||number_cell[i][j]==number_cell[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}
//判定是否能上移
function canMoveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(number_cell[i][j]!=0){
				if(number_cell[i-1][j]==0||number_cell[i][j]==number_cell[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判定是否能下移
function canMoveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(number_cell[i][j]!=0){
				if(number_cell[i+1][j]==0||number_cell[i][j]==number_cell[i+1][j]){
					return true;
				}
			}
		}
	}
}

//下移
function move_left(){
	
	for(var i=0;i<4;i++){
		var f=0;
		for(var j=0;j<4;j++){
			if(number_cell[i][j]!=0){
				
				//判断前面第几个是空格
				for(var k=f;k<j;k++){
					if(number_cell[i][k]==0){
						number_cell[i][k]=number_cell[i][j];
						number_cell[i][j]=0;
						number_animate(i,j,i,k);
					}
					else if(number_cell[i][k]==number_cell[i][j]){
						var temp=0;
						for(var t=k+1;t<j;t++){
							temp+=number_cell[i][t];
						}
						if(temp==0){
							number_cell[i][k]+=number_cell[i][j];
							score+=number_cell[i][k];
							number_cell[i][j]=0;
							number_animate(i,j,i,k);
							f=k+1;
						}
					}
				}
			}	
		}
	}
}
//右移
function move_right(){
	
	for(var i=0;i<4;i++){
		var f=3;
		for(var j=3;j>=0;j--){
			if(number_cell[i][j]!=0){
				//判断后面第几个是空格
				for(var k=f;k>j;k--){
					if(number_cell[i][k]==0){
						number_cell[i][k]=number_cell[i][j];
						number_cell[i][j]=0;
						number_animate(i,j,i,k);
					}
					else if(number_cell[i][k]==number_cell[i][j]){
						var temp=0;
						for(var t=k-1;t>j;t--){
							temp+=number_cell[i][t];
						}
						if(temp==0){
							number_cell[i][k]+=number_cell[i][j];
							score+=number_cell[i][k];
							number_cell[i][j]=0;
							number_animate(i,j,i,k);
							f=k-1;
						}
					}
				}
			}	
		}
	}
}
//上移
function move_up(){
	
	for(var j=0;j<4;j++){
		var f=0;
		for(var i=0;i<4;i++){
			if(number_cell[i][j]!=0){
				//判断上面第几个是空格
				for(var k=f;k<i;k++){
					if(number_cell[k][j]==0){
						number_cell[k][j]=number_cell[i][j];
						number_cell[i][j]=0;
						number_animate(i,j,k,j);
					}
					else if(number_cell[k][j]==number_cell[i][j]){
						var temp=0;
						for(var t=k+1;t<i;t++){
							temp+=number_cell[t][j];
						}
						if(temp==0){
							number_cell[k][j]+=number_cell[i][j];
							score+=number_cell[k][j];
							number_cell[i][j]=0;
							number_animate(i,j,k,j);
							f=k+1;
						}	
					}
				}
			}	
		}
	}
}
//下移
function move_down(){
	for(var j=0;j<4;j++){
		var f=3;
		for(var i=3;i>=0;i--){
			if(number_cell[i][j]!=0){
				//判断下面第几个是空格
				for(var k=f;k>i;k--){
					if(number_cell[k][j]==0){
						number_cell[k][j]=number_cell[i][j];
						number_cell[i][j]=0;
						number_animate(i,j,k,j);
					}
					else if(number_cell[k][j]==number_cell[i][j]){
						var temp=0;
						for(var t=k-1;t>i;t--){
							temp+=number_cell[t][j];
						}
						if(temp==0){
							number_cell[k][j]+=number_cell[i][j];
							score+=number_cell[k][j];
							number_cell[i][j]=0;
							number_animate(i,j,k,j);
							f=k-1;
						}
						
					}
				}
			}	
		}
	}
}

//动画
function number_animate(formX,formY,toX,toY){
	//获得原始单元格对象
	var num_cell=$("#number-cell-"+formX+"-"+formY);
	//开始动画
	num_cell.animate({
		left:30+toY*120,
		top:30+toX*120
	},"",function(){update_number_cell()});
}
//判定是否结束游戏
function fail(){
	if(canMoveLeft()||canMoveRight()||canMoveUp()||canMoveDown())
	    return false;
	else
	    return true;
}
//判定游戏胜利
function win(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(number_cell[i][j]==2048){
				return true;
			}
		}
	}
	return false;	
}
//显示通知
function inform(){

	if(fail()&&score!=0){
		update_rank(score);
		$(".div_inform").css("top",300);
		$(".div_inform").css("left",650);
		$(".div_inform").css("visibility","visible");
		$(".div_inform").html("Game Over!"+"<br/>"+score);
		score=0;
	}
	if(w==1){
		hide_inform();
	}
	if(win()&&w==0){
		$(".div_inform").css("top",300);
		$(".div_inform").css("left",650);
		$(".div_inform").css("visibility","visible");
		$(".div_inform").html("Victory!");
		w=1;
	}
	
	
}
//隐藏通知
function hide_inform(){
	$(".div_inform").css("visibility","hidden");
}
