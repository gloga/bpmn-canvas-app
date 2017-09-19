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
};
