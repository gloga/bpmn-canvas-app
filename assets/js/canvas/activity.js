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
    radius: 3,
    center: [cursorX + ( activityWidth / 2 ), cursorY],
    fillColor: 'grey',
    visible: false,
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
    var conector = this.hitTestAll(event.point, {});
    console.log(conector);
  }
  activity.onMouseEnter = function (event) {

  }
  activity.onMouseLeave = function (event) {
    // unselectPath(this, event);
  }

  activity.onMouseDrag = function (event) {
    movePath(this, event);
  }

  activity.onMouseDown = function(event){
    // console.log(this);
    // console.log(this.hitTest(event.point, { segments: true }));
  }
}
