tool.minDistance = 10;
function onMouseMove (event){
  // console.log(event.point);
}
tool.onMouseDrag = function(event){
  console.log(event);
};
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

console.log(project.view);
