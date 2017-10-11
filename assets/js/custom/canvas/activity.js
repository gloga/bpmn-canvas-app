function drawActivity(x, y){

	var activityWidth = 100;
	var activityHeight = 50;

	var activitySymbol = new Path.Rectangle({
		rectangle: {
			x: x - ( activityWidth / 2 ),
			y: y - (activityHeight / 2 ),
			width: activityWidth,
			height: activityHeight
		},
		strokeWidth: 2,
		strokeColor: 'black',
		fillColor: 'white',
		type: 'activity',
		name: 'activity',
		userName: '',
		subtype: ''
	});

	var activityText = new PointText({
		fontSize: 18,
		fillColor: 'black',
		justification: 'center',
		name: 'elementText',
		point: [x, y + activityHeight]
	});

	var activityConnectors = makeConnectors(x, y, activityWidth, activityHeight);

	var activityGroup = new Group({
		children: [activitySymbol, activityText, activityConnectors],
		name: 'activtyGroup'
	});

	var activityGroupSymbolDefinition = new SymbolDefinition(activityGroup);
	var activityGroupSymbolItem = new SymbolItem(activityGroupSymbolDefinition, [x, y]);

	activityGroupSymbolItem.onMouseEnter = function () {
		this.definition.item.children['connectorGroup'].visible = true;
	};
	activityGroupSymbolItem.onMouseLeave = function () {
		this.definition.item.children['connectorGroup'].visible = false;
	};

	activityGroupSymbolItem.onMouseDrag = function (event) {
		this.position += event.delta;
	};

	return activityGroupSymbolItem;
}
