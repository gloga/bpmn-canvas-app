
function makeConnectors (x, y, width, height){
	var connectorSymbol = new Path.Circle({
		radius: 4,
		fillColor: 'grey',
		type: 'connector',
	});

	var connectorPoints = [
		new Point(x + (width / 2), y),
		new Point(x, y + (height / 2)),
		new Point(x - (width / 2), y),
		new Point(x, y - (height / 2))
	];

	var connectorGroup = new Group({
		visible: false
	});

	var connectorSymbolDefinition = new SymbolDefinition(connectorSymbol);

	connectorPoints.forEach(function(point){
		connectorGroup.addChild(new SymbolItem(connectorSymbolDefinition, point));
	});

	return connectorGroup;
}
