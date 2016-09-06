function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $('#number_cell_' + fromX +'_' +fromY);
	numberCell.animate({
		left: getPosLeft(toX, toY),
		top: getPosTop(toX, toY),
	},200);
}

function showOneNumberAnimation(i, j, randNumber){
	var numberCell = $('#number_cell_' + i + '_' + j);
	numberCell.css('background-color', getBackgroundColor(randNumber));
	numberCell.css('color', getColor(randNumber));
	numberCell.text(randNumber);
	numberCell.animate({
		width: cellSpaceLength,
		height: cellSpaceLength,
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 50);
}