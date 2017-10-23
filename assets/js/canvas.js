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

	// return activityGroupSymbolItem;
}

( function () {

	var elementType = '';

	tool.minDistance = 10;

	window.addEventListener('wheel', function (e) {
		e.preventDefault();

		var scrollDistance = e.deltaY;
		if (scrollDistance > 0) {
			project.view.zoom -= 0.02;
		} else {
			project.view.zoom += 0.02;
		}
	});


	var eventOptions = document.querySelectorAll('.element-option');

	eventOptions.forEach(function (eventOption) {
		eventOption.onclick = function () {
			elementType = this.getAttribute('data-type');
		};
	});

	project.view.onMouseUp = function (event) {
		if (elementType !== '') {
			if (elementType === 'event') {
				drawEvent(event.point.x, event.point.y);
				// insertProps(project.activeLayer.lastChild);
				elementType = '';
			} else if (elementType === 'activity') {
				drawActivity(event.point.x, event.point.y);
				// insertProps(project.activeLayer.lastChild);
				elementType = '';
			}
			insertProps(project.activeLayer.lastChild);
		}
	};

} )()

//////////////////////////////// TEST /////////////////////


// var vectorStart, vector, vectorPrevious, vectorItem;

// function processVector(event) {
// 	vector = event.point - vectorStart; // Create vector

// 	drawVector();
// }

// function drawVector() {

// 	if (vectorItem){
// 		vectorItem.remove();
// 	}
// 	var arrowVector = vector.normalize(10);


// 	var end = vectorStart + vector;
// 	vectorItem = new Group([
// 		new Path([vectorStart, end]),
// 		new Path([
// 			end + arrowVector.rotate(135),
// 			end,
// 			end + arrowVector.rotate(-135)
// 		])
// 	]);
// 	vectorItem.strokeColor = '#e4141b';
// }

// function onMouseDown(event){
// 	vectorStart = event.point;
// }
// function onMouseDrag(event){
// 	processVector(event);
// }
// function onMouseUp(event){
// 	var end = vectorStart + vector;
// 	// processVector(event);

// 	vectorPrevious = vectorItem.clone();
// }
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
function insertProps(lastItem) {
	// console.log(lastItem);
	var menu = document.querySelector('.props-menu');
	var menuNameInput = menu.querySelector('.prop-input');
	var menuNameSubmit = menu.querySelector('.prop-submit');

	menu.classList.add('open');
	menuNameInput.focus();

	menuNameSubmit.addEventListener('click', function () {
		// console.log(menuNameInput.value);

		lastItem.definition.item.children['elementText'].content = menuNameInput.value;

		menuNameInput.value = '';
		menu.classList.remove('open');
	}, { once: true });

	return;
}
(function() {
  var eventTriggers = document.querySelectorAll('.element');

  eventTriggers.forEach(function(trigger){
    trigger.addEventListener('click', function() {
      this.classList.toggle('selected');

      getSiblings(this).forEach(function (sibling) {
        sibling.classList.remove('selected');
      });

    });
  });

  var canvas = document.querySelector('canvas');

  canvas.addEventListener('click', function () {
    eventTriggers.forEach(function(trigger){
      trigger.classList.remove('selected');
    });
  });
}());

function getChildren(n, skipMe){
    var r = [];
    for ( ; n; n = n.nextSibling )
       if ( n.nodeType == 1 && n != skipMe)
          r.push( n );
    return r;
}

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}
