function selectPath(element, event) {
  element.selected = true;
}
function unselectPath(element, event) {
  element.selected = false;
}
function movePath(element, event) {
  element.position += event.delta;
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
