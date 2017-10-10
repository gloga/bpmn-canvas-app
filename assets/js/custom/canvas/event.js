function drawEvent(x, y){

	var eventDiameter = 50;
	var eventRadius = ( eventDiameter / 2 );

	var eventSymbol = new Path.Circle({
		radius: eventRadius,
		center: [x, y],
		strokeWidth: 2,
		strokeColor: 'black',
		fillColor: 'white',
		type:'event',
		name:'event',
		userName: '',
		subtype: ''
	});

	var eventText = new PointText ({
		fontSize: 16,
		fillColor: 'black',
		justification: 'center',
		name: 'elementText',
		point: [x, y + eventDiameter]
	});

	var eventConnectors = makeConnectors(x, y, eventDiameter, eventDiameter);

	var eventGroup = new Group({
		children: [eventSymbol, eventText, eventConnectors],
		name: 'eventGroup'
	});

	var eventGroupSymbolDefinition = new SymbolDefinition(eventGroup);
	var eventGroupSymbolItem = new SymbolItem (eventGroupSymbolDefinition, [x, y]);

	eventGroupSymbolItem.onMouseEnter = function(){
		this.definition.item.children['connectorGroup'].visible = true;
	};
	eventGroupSymbolItem.onMouseLeave = function(){
		this.definition.item.children['connectorGroup'].visible = false;
	};

	eventGroupSymbolItem.onMouseDrag = function (event) {
		this.position += event.delta;
	};

	return eventGroupSymbolItem;
}