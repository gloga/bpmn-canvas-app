function drawEvent(x, y){

	var eventDiameter = 40;
	var eventRadius = ( eventDiameter / 2 );

	var eventSymbol = new Path.Circle({
		radius: eventRadius,
		center: [x, y],
		strokeWidth: 2,
		strokeColor: 'black',
		fillColor: 'white',
		type:'event',
		subtype: ''
	});

	var eventConnectors = makeConnectors(x, y, eventDiameter, eventDiameter);

	var eventGroup = new Group({
		children: [eventSymbol, eventConnectors],
		name: 'eventGoup'
	});

	var eventGroupSymbolDefinition = new SymbolDefinition(eventGroup);
	var eventGroupSymbolItem = new SymbolItem (eventGroupSymbolDefinition, [x, y]);

	eventGroupSymbolItem.onMouseEnter = function eventGrouponMouseEnter(){
		console.log(this.definition.item[1]);
		// this.defnition.item.children[1].visible = true;
	};
	eventGroupSymbolItem.onMouseLeave = function eventGrouponMouseLeave(){
		console.log(this.definition.item[1]);
		// this.defnition.item.children[1].visible = false;
	};

	return eventGroupSymbolItem;
}