var deviceWidth = screen.availWidth;
var gridContainerLength = 0.92 * deviceWidth;
var cellSpaceLength = 0.18 * deviceWidth;
var cellInterval = 0.04 * deviceWidth;

function getPosTop(i, j){
	return cellInterval + (cellSpaceLength + cellInterval) * i;
}

function getPosLeft(i, j){
	return cellInterval + (cellSpaceLength + cellInterval) * j;
}

function getBackgroundColor(i){
	switch(i){
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
	}
	return black;
}

function getColor(i){
	if(i == 4 || i == 2){
		return '#776e65';
	}
	else
		return 'white';
}

function noSpace(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function freeSpace(){
	freePosition = [];
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				freePosition.push([i,j]);
			}
		}
	}
}

function noBlockHorizontal(row, col1, col2, board){
	for(var m =col1 + 1; m < col2; m++){
		if(board[row][m] != 0){
			return false;
		}
	}
	return true;
}

function noBlockVertical(row1, row2, col, board){
	for(var m =row1 + 1; m < row2; m++){
		if(board[m][col] != 0){
			return false;
		}
	}
	return true;
}

function canMoveLeft(){
	for(var i = 0; i < 4; i++){
		for(var j = 0;  j < 4; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] == 0 || board[i][j] == board[i][j-1])
					return true;				
			}
		}
	}
}

function canMoveRight(){
	for(var i = 0; i < 4; i++){
		for(var j = 0;  j < 3; j++){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1])
					return true;				
			}
		}
	}
}

function canMoveUp(){
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]){
					return true;
				}
			}
		}
	}
}

function canMoveDown(){
	for(var i = 0; i < 3; i++){
		for(var j = 0;  j < 4; j++){
			if(board[i][j] != 0){
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;				
			}
		}
	}
}

function noMove(){
	if(!canMoveDown() && !canMoveUp() && !canMoveRight() && !canMoveLeft()){
		return true;
	}
}