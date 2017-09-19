var activityOption = document.querySelector('.element-option-activity');

// activityOption.onclick = function(){
//   console.log('yo');
//   var activty = new Group();
//   var activityWidth = 100;
//   var activityHeight = 50;
//
//   var activitySymbol = new Path.Rectangle({
//     width: activityWidth,
//     height: activityHeight,
//     radius: 10,
//     strokeWidth: 2,
//     strokeColor: 'black',
//     fillColor: 'white'
//   });
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
};

function drawEvent(x, y){
  elementStyle = {
    center: [x,y],
    radius: 20,
    strokeWidth: 2,
    strokeColor: 'black',
    fillColor: 'white',
    type:'event',
    subtype: ''
  };
  var eventSymbol = new Path.Circle(elementStyle);
}
