function drawActivity(x,y){
  var rectangle = new Rectangle(x- ( 100 / 2 ), y - ( 50 / 2 ), 100, 50);
  var cornerSize = new Size(10, 10);

  var path = new Path.RoundRectangle(rectangle, cornerSize);
  path.strokeColor = 'black';

  return path;
}

function drawEvent(x,y){
  var path = new Path.Circle({
    'radius': 20,
    'center': [x, y],
    'strokeColor': 'blue'
  });

  return path;
}

function draw(x,y){
  var selectedEvent = document.querySelector('.element.selected');
  if(!selectedEvent){
    return;
  }
  else{
    var trigger =  selectedEvent.getAttribute('data-trigger');
    if( trigger === 'event'){
      drawEvent(x,y);
    }
    else if(trigger === 'activity'){
      drawActivity(x,y);
    }
  }
}

var path;

function onMouseDown(event) {
  // console.log(event.downPoint.x);
  // console.log(event.downPoint.y);
  var x = event.downPoint.x;
  var y = event.downPoint.y;

  path = draw(x, y);
}
