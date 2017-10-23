function drawEvent(x, y){

	var eventDiameter = 50;
	var eventRadius = ( eventDiameter / 2 );

	var event = new Path.Circle({
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

	var eventSymbol = new Symbol(event);
	var eventSymbolItem = eventSymbol.place([x, y]);

	var eventText = new PointText ({
		fontSize: 16,
		fillColor: 'black',
		justification: 'center',
		name: 'elementText',
		point: [x, y + eventDiameter]
	});

	var eventConnectors = makeConnectors(x, y, eventDiameter, eventDiameter);
	addConnectorEvents();

	var eventGroup = new Group({
		children: [
			eventSymbolItem,
			eventText,
			eventConnectors,
			// test
		],
		name: 'eventGroup'
	});

	// eventGroup.bounds.width *= 1.5;
	// eventGroup.bounds.height *= 1.5;
	// console.log(eventGroup.bounds );


	eventGroup.firstChild.onClick = function (event) {
		this.selected = true;
	};
	eventGroup.firstChild.onDoubleClick = function (event) {
		this.selected = false;
	};
	eventGroup.firstChild.onMouseDrag = function (event) {
		if(this.selected){
			this.parent.position += event.delta;
		}
	};

	eventGroup.onMouseEnter = function(){
		// this.children['connectorGroup'].visible = true;
	};
	eventGroup.onMouseLeave = function(){
		// this.children['connectorGroup'].visible = false;
	};

	// return eventGroupSymbolItem;
}