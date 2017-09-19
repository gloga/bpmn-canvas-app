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
