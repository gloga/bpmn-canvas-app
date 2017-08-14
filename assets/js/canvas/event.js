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
    // selectPath(this, event);
  }
  eventSymbol.onMouseLeave = function (event) {
    // unselectPath(this, event);
  }

  eventSymbol.onMouseDrag = function (event) {
    movePath(this, event);
  }

  eventSymbol.onMouseDown = function(event){
    console.log(this);
    console.log(this.hitTest(event.point, { segments: true }));
  }
}
