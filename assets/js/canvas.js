function selectPath(element, event) {
  element.selected = true;
}
function unselectPath(element, event) {
  element.selected = false;
}
function movePath(element, event) {
  element.position += event.delta;
}

function drawActivity(cursorX,cursorY){
  var activity = new Group();
  var activityWidth = 100;
  var activityHeight = 50;

  var activitySymbol = new Path.Rectangle({
    x: cursorX - ( activityWidth / 2 ),
    y: cursorY - ( activityHeight / 2 ),
    width: activityWidth,
    height: activityHeight,
    radius: 10,
    strokeColor: 'blue',
    fillColor: 'white',
    userName: 'element',
    type : 'activity'
  });
  var connectors = [];

  var connector1 = new Path.Circle({
    radius: 5,
    center: [cursorX + ( activityWidth / 2 ), cursorY],
    fillColor: 'grey',
    type: 'connector'
  });

  var connector2 = connector1.clone();
  connector2.position.x = cursorX;
  connector2.position.y = cursorY + ( activityHeight / 2 );

  var connector3 = connector1.clone();
  connector3.position.x = cursorX - ( activityWidth / 2 );
  connector3.position.y = cursorY;

  var connector4 = connector1.clone();
  connector4.position.x = cursorX;
  connector4.position.y = cursorY - (activityHeight / 2);

  activity.addChildren([activitySymbol, connector1, connector2, connector3, connector4]);

  activity.onMouseMove = function (event) {
    var conector = this.hitTestAll(event.point, { type: 'connector' });
    console.log(this.children);
  }
  activity.onMouseEnter = function (event) {
    selectPath(this, event);
  }
  activity.onMouseLeave = function (event) {
    unselectPath(this, event);
  }

  activity.onMouseDrag = function (event) {
    movePath(this, event);
  }

  activity.onMouseDown = function(event){
    console.log(this);
    // console.log(this.hitTest(event.point, { segments: true }));
  }
}

function drawEvent(cursorX,cursorY){
  var eventSymbol = new Path.Circle({
    radius: 20,
    center: [cursorX, cursorY],
    strokeColor: 'green',
    fillColor: 'white',
    userName: 'element',
    type : 'event'
  });

  eventSymbol.onMouseEnter = function (event) {
    selectPath(this, event);
  }
  eventSymbol.onMouseLeave = function (event) {
    unselectPath(this, event);
  }

  eventSymbol.onMouseDrag = function (event) {
    this.position += event.delta;
  }

  eventSymbol.onMouseDown = function(event){
    console.log(this);
    console.log(this.hitTest(event.point, { segments: true }));
  }
}

function draw(x,y){
  var selectedElement = document.querySelector('.element.selected');

  if(!selectedElement){
    return;
  }
  else{
    var trigger =  selectedElement.getAttribute('data-trigger');
    if( trigger === 'event'){
      drawEvent(x, y);
    }
    else if(trigger === 'activity'){
      drawActivity(x, y);
    }
  }
}
var items;

function onMouseUp(event) {
  // console.log(event.downPoint.x);
  // console.log(event.downPoint.y);
  var x = event.downPoint.x;
  var y = event.downPoint.y;

  draw(x, y);
  // console.log(project.activeLayer.children);
  items = project.getItems({
    class: Path,
    userName: 'element'
  });
}
if(items){
  items.forEach(function (item) {
    console.log(item);
    item.onMouseMove = function(event) {
      this.selected = 'true';
    }
  });
}
