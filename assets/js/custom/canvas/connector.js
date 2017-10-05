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
