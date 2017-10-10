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

var elementType = '';

tool.minDistance = 10;

// tool.onMouseDrag = function(event){
//   // console.log(project.view);
// 	// console.log(event);
// };

// function onMouseMove (event){
//   // console.log(event.point);
// }


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
	if (elementType === 'event') {
		drawEvent(event.point.x, event.point.y);
		insertProps();
		elementType = '';
	} else if (elementType === 'activity') {
		drawActivity(event.point.x, event.point.y);
		insertProps();
		elementType = '';
	}
};

function insertProps(){
	var menu = document.querySelector('.props-menu');
	var menuNameInput = menu.querySelector('.prop-input');
	var menuNameSubmit = menu.querySelector('.prop-submit');

	menu.classList.add('open');
	menuNameInput.focus();

	var lastItem = project.activeLayer.lastChild;
	console.log(lastItem.definition.item.children);

	menuNameSubmit.addEventListener('click', function(){
		lastItem.definition.item.children['elementText'].content = menuNameInput.value;
		// menuNameInput.value = '';
	});
}
function makeConnectors (x, y, width, height){

	var connectorSymbol = new Path.Circle({
		radius: 4,
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
		visible: false,
		name: 'connectorGroup'
	});

	var connectorSymbolDefinition = new SymbolDefinition(connectorSymbol);

	connectorPoints.forEach(function(point, index){
		connectorGroup.addChild( new SymbolItem(connectorSymbolDefinition, point) );
	});

	return connectorGroup;
}

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
