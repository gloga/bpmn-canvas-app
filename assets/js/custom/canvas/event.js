var eventGroup = new Group();

function drawEvent(x, y){
  var eventDiameter = 40;
  var eventRadius = ( eventDiameter / 2 );

  console.debug('yo');
  console.log('yo');
  var eventSymbol = new Path.Circle({
    radius: eventRadius,
    center: [x, y],
    strokeWidth: 2,
    strokeColor: 'black',
    fillColor: 'white',
    type:'event',
    subtype: ''
  });

  eventConnectors = makeConnectors(x, y, eventDiameter, eventDiameter);

  eventGroup.addChildren([
    eventSymbol,
    eventConnectors
  ]);

  var eventGroupSymbolDefinition = new SymbolDefinition(eventGroup);

  return new SymbolItem(eventGroupSymbolDefinition, [x, y]);
}
//
// eventGroup.onMouseEnter = function(){
//   this.children[1].visible = true;
// };
// eventGroup.onMouseLeave = function(){
//   this.children[1].visible = false;
// };
