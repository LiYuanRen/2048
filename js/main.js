var board = new Array();//4*4的方块
var score = 1000;
var conflictedFlag = new Array();//记录数组是否已经被合并过
var successFlag = false;
var freePosition = new Array(); //记录方块中的空闲的格子

var startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;

$(document).ready(function() {
	prepareForMobile();
	newGame();
});
 
function prepareForMobile(){
	if(deviceWidth > 500){
		gridContainerLength = 500;
		cellSpaceLength = 100;
		cellInterval = 20;
	}
	var gridContainer = $('#grid_container');
	var gridCell = $('.grid_cell');
	gridContainer.css('width', gridContainerLength - cellInterval * 2);
	gridContainer.css('height', gridContainerLength - cellInterval * 2);
	gridContainer.css('padding', cellInterval);
	gridContainer.css('border-radius', 0.02 * gridContainerLength);

	gridCell.css('width', cellSpaceLength);
	gridCell.css('height', cellSpaceLength);
	gridCell.css('border-radius', 0.08 * cellSpaceLength);

}

function newGame() {
	//初始化棋盘
	init();
	//在随机两个格子生成数字
	randomGenerationNumber();
	randomGenerationNumber();
}

function init(){
	for( var i = 0; i < 4; i++){
		for( var j = 0; j < 4; j++){
			var girdCell = $('#grid_cell_'+ i + '_' + j);
			girdCell.css("top" , getPosTop(i, j));
			girdCell.css("left" , getPosLeft(i, j));
		}
	}

	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		conflictedFlag[i] = new Array();
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
			conflictedFlag[i][j] = false;
		}
	}

	successFlag = false;
	score = 0;
	$('#score').text(score);
	updateBoardView();
}


function randomGenerationNumber(){
	if(noSpace()){
		return false;
	}

	//随机生成一个位置
	freeSpace();
	var randXY = freePosition[Math.floor(Math.random() * freePosition.length)];
	var randX = randXY[0];
	var randY = randXY[1];

	//随机生成一个数字
	var randNum = Math.random() > 0.5 ? 2 : 4;
	board[randX][randY] = randNum;
	showOneNumberAnimation(randX, randY, randNum);
}

function updateBoardView(){
	$('.number_cell').remove();
	for( var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			$('#grid_container').append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');
			var numberCell = $('#number_cell_'+ i + '_' + j);
			if(board[i][j] != 0){
				numberCell.css('width', cellSpaceLength);
				numberCell.css('height', cellSpaceLength);
				numberCell.css('top', getPosTop(i, j));
				numberCell.css('left', getPosLeft(i, j));
				numberCell.css('background-color', getBackgroundColor(board[i][j]));
				numberCell.css('color', getColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			else{
				numberCell.css('width', '0px');
				numberCell.css('height', '0px');		
				numberCell.css('top', getPosTop(i, j) + cellSpaceLength / 2);
				numberCell.css('left', getPosLeft(i, j) + cellSpaceLength / 2);
			}

			conflictedFlag[i][j] = false;
			if(board[i][j] == 2048){
				successFlag = true;
			}
		}
	}

	$('.number_cell').css('line-height', cellSpaceLength + 'px');
	$('.number_cell').css('font-size', 0.6 * cellSpaceLength + 'px');
	$('.number_cell').css('border-radius', 0.08 * cellSpaceLength);

	$('#score').text(score);
	setTimeout('isGameOver()',220);	
}

function isGameOver(){
	if(noSpace(board) && noMove(board)){
		alert("游戏失败!再来挑战一次吧");
		newGame();
	}
	if(successFlag){
		alert("恭喜你！成功通关！");
		newGame();
	}
}
 

document.addEventListener('touchstart',touchHandle);
document.addEventListener('touchmove',touchHandle);
document.addEventListener('touchend',touchHandle);

function touchHandle(event){
	switch(event.type){
		case 'touchstart':
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			break;
		case 'touchmove':
			event.preventDefault();
			break;
		case 'touchend':
			endX = event.changedTouches[0].pageX;
			endY = event.changedTouches[0].pageY;
			var moveX = endX - startX;
			var moveY = endY - startY;
			if(Math.abs(moveX) < 0.2 * deviceWidth && Math.abs(moveY) < 0.2 * deviceWidth){
				return;
			}
			//x
			if(Math.abs(moveX) >= Math.abs(moveY)){
				//right
				if(moveX >= 0){
					if(moveRight()){
		 				setTimeout('randomGenerationNumber()',210);	
		 			}
				}
				//left
				else{
					 if(moveLeft()){
		 				setTimeout('randomGenerationNumber()',210);
		 			}
				}
			}
			//y
			else{
				//down
				if(moveY >= 0){
		 			if(moveDown()){
		 				setTimeout('randomGenerationNumber()',210);
		 			}
				}
				//up
				else{
		 			 if(moveUp()){
		 				setTimeout('randomGenerationNumber()',210);	
		 			}
				}
			}
			break;
	}
}

$(document).keydown(function(event){
 	switch(event.keyCode){
 		case 37:
 			event.preventDefault();
 			if(moveLeft()){
 				setTimeout('randomGenerationNumber()',210);
 			}
 			break;
 		case 38:
 			event.preventDefault();
 			 if(moveUp()){
 				setTimeout('randomGenerationNumber()',210);	
 			}
 			break;
 		case 39:
 			event.preventDefault();
 			if(moveRight()){
 				setTimeout('randomGenerationNumber()',210);	
 			}
 			break;
 		case 40:
 			event.preventDefault();
 			if(moveDown()){
 				setTimeout('randomGenerationNumber()',210);
 			}
 			break;
 		case 116:
 			break;
 		default:
 			$('#tip').text('温馨提示：请使用↑ ↓ ← →箭头进行操作');
 			break;
 	}
 });

 function moveLeft(){
 	if(!canMoveLeft()){
 		return false;
 	}
 	for(var j = 1; j < 4; j++){
 		for(var i = 0; i < 4; i++){
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
						showMoveAnimation(i, j, i, k);//方块移动
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !conflictedFlag[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						conflictedFlag[i][k] = true;
						break;
					}
				}
			}

		}
	}
	setTimeout('updateBoardView()',200);//控制数字刷新，做加法
	return true;
 }

 function moveRight(){
 	if(!canMoveRight()){
 		return false;
 	}
 	for(var j = 2; j >= 0; j--){
 		for(var i = 0; i < 4; i++){
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						showMoveAnimation(i, j, i, k);//方块移动
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !conflictedFlag[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						conflictedFlag[i][k] = true;
						break;
					}
				}
			}

		}
	}
	setTimeout('updateBoardView()',200);//控制数字刷新，做加法
	return true;
 }

 function moveUp(){
 	if(!canMoveUp()){
 		return false;
 	}
 	for(var i = 1; i < 4; i++){
 		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < i; k++){
					if(board[k][j] == 0 && noBlockVertical(k, i, j, board)){
						showMoveAnimation(i, j, k, j);//方块移动
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !conflictedFlag[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						conflictedFlag[k][j] = true;
						break;
					}
				}
			}

		}
	}
	setTimeout('updateBoardView()',200);//控制数字刷新，做加法
	return true;
 }

 function moveDown(){
 	if(!canMoveDown()){
 		return false;
 	}
 	for(var i = 2; i >= 0; i--){
 		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
						showMoveAnimation(i, j, k, j);//方块移动
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !conflictedFlag[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						conflictedFlag[k][j] = true;
						break;
					}
				}
			}

		}
	}
	setTimeout('updateBoardView()',200);//控制数字刷新，做加法
	return true;
 }