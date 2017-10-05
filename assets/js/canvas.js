var activityGroup = new Group();

function drawActivity(x, y){
  var activityWidth = 100;
  var activityHeight = 50;

  var activitySymbol = new Path.Rectangle({
    width: activityWidth,
    height: activityHeight,
    strokeWidth: 2,
    strokeColor: 'black',
    fillColor: 'white',
    type:'activity',
    subtype: ''
  });

  activityConnectors = makeConnectors(x, y, activityWidth, activityHeight);

  activityGroup.addChildren([
    activitySymbol,
    activityConnectors
  ]);

  var activityGroupSymbolDefinition = new SymbolDefinition(activityGroup);

  return new SymbolItem(activityGroupSymbolDefinition);
}

// activityGroup.onMouseEnter = function(){
//   this.children[1].visible = true;
// };
// activityGroup.onMouseLeave = function(){
//   this.children[1].visible = false;
// };

elementType = '';

tool.minDistance = 10;

tool.onMouseDrag = function(event){
  // console.log(project.view);
  // console.log(event);
};

function onMouseMove (event){
  // console.log(event.point);
}


window.addEventListener('wheel', function(e){
  e.preventDefault();
  var scrollDistance = e.deltaY;
  if(scrollDistance > 0){
    project.view.zoom -= 0.02;
  }
  else{
    project.view.zoom += 0.02;
  }
});


var eventOptions = document.querySelectorAll('.element-option');

eventOptions.forEach(function(eventOption){
  eventOption.onclick = function (){
    elementType = this.getAttribute('data-type');
  };
});

project.view.onMouseUp = function(event){
  if(elementType === 'event'){
    drawEvent(event.point.x, event.point.y);
    elementType = '';
  }
  else if(elementType === 'activity'){
    drawActivity(event.point.x, event.point.y);
    elementType = '';
  }
  // console.log(project.activeLayer.children);
};

var connectorGroup = new Group({
  // visible: false
});

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

  connectorPoints.forEach(function(point, index){
    connectorSymbol.position = point;
    connectorGroup.addChild(connectorSymbol);
  });

  return connectorGroup;
}

var eventGroup = new Group();

function drawEvent(x, y){
  var eventDiameter = 40;
  var eventRadius = ( eventDiameter / 2 );

  console.debug('yo');
  console.log('yo');
  var eventSymbol = new Path.Circle({
    radius: eventRadius,
    center: [x, y],
    strokeWidth: 2,
    strokeColor: 'black',
    fillColor: 'white',
    type:'event',
    subtype: ''
  });

  eventConnectors = makeConnectors(x, y, eventDiameter, eventDiameter);

  eventGroup.addChildren([
    eventSymbol,
    eventConnectors
  ]);

  var eventGroupSymbolDefinition = new SymbolDefinition(eventGroup);

  return new SymbolItem(eventGroupSymbolDefinition, [x, y]);
}
//
// eventGroup.onMouseEnter = function(){
//   this.children[1].visible = true;
// };
// eventGroup.onMouseLeave = function(){
//   this.children[1].visible = false;
// };

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
