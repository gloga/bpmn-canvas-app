function makeConnectors (x, y, width, height){

	var connectorSymbol = new Path.Circle({
		radius: 6,
		fillColor: 'grey',
		type: 'connector',
		name: 'connector'
	});

	var connectorPoints = [
		new Point(x + (width / 2) , y),
		new Point(x , y + (height / 2)),
		new Point(x - (width / 2) , y),
		new Point(x , y - (height / 2))
	];

	var connectorGroup = new Group({
		// visible: false,
		name: 'connectorGroup'
	});

	var connectorSymbolDefinition = new Symbol(connectorSymbol);

	connectorPoints.forEach(function(point, index){
		connectorGroup.addChild( new SymbolItem(connectorSymbolDefinition, point) );
	});

	return connectorGroup;
}






function addConnectorEvents(){

	var connectorGroups = project.getItems({
		class: Group,
		name: 'connectorGroup'
	});
	console.log( connectorGroups );

	connectorGroups.forEach(function(connectorGroup){

		connectorGroup.onClick = function (e){
			var oneConnector = this.hitTest(e.point);

			if(oneConnector){

				drawConnection(e, oneConnector.item);


				// console.log( oneConnector.item.bounds.center );
			}
		};
	});

	project.view.onMouseMove = function (e){
		e.stop();

		// console.log( this );
		drawConnection(e);

		// var oneConnector = connectorGroup.hitTest(e.point);
		// if (oneConnector) {
			// 		console.log( 'yes' );
			// 	// 	end = oneConnector.item.bounds.center;
			// 	}
		}

		// connectorGroup.onMouseUp = function (e){

			// 	// vectorPrevious = vectorItem.clone();
			// 	var oneConnector = this.hitTest(e.point);
			// 	// console.log( oneConnector );
			// 	if (oneConnector) {
				// 		console.log( oneConnector );
				// 		// drawConnection(e, oneConnector.item);

				// 	}
				// 	else{
					// 		// console.log( 'no' );
					// 		// vectorItem.remove();
					// 	}
					// }

					var vectorStart, vector, vectorPrevious, vectorItem;

					var clickStart = false;
					function drawConnection(event, item){
						// console.log(event );
						if (event.type === 'click'){
							console.log( clickStart );
							if (!clickStart) {
								vectorStart = item.bounds.center;
								var fromItem = item;
								clickStart = true;
							}
							else{
								end = item.bounds.center;
								vectorPrevious = vectorItem.clone();
								clickStart = false;
							}
						}
						else if (event.type === 'mousemove'){
							vector = event.point - vectorStart; // Create vector

							if (vectorItem) {
								vectorItem.remove();
							}
							var arrowVector = vector.normalize(10);

							var end = vectorStart + vector;

							vectorItem = new Group({
								children: [
									new Path([vectorStart, end]),
									new Path([ end + arrowVector.rotate(135), end, end + arrowVector.rotate(-135)])
								],
								name: 'connection'
							});
							vectorItem.strokeColor = 'blue';
						}
						else if (event.type === 'mouseup'){
							console.log( 'yes' );
						}
					}

			}