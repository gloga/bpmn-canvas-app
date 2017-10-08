
function drawActivity(x, y){
	var activityWidth = 100;
  var activityHeight = 50;

  var activitySymbol = new Path.Rectangle({
		width: activityWidth,
    height: activityHeight,
    strokeWidth: 2,
    strokeColor: 'black',
    fillColor: 'white',
    type:'activity',
    subtype: ''
  });

  activityConnectors = makeConnectors(x, y, activityWidth, activityHeight);

	var activityGroup = new Group();
  activityGroup.addChildren([
		activitySymbol,
    activityConnectors
  ]);

  var activityGroupSymbolDefinition = new SymbolDefinition(activityGroup);

  return new SymbolItem(activityGroupSymbolDefinition);
}

// activityGroup.onMouseEnter = function(){
//   this.children[1].visible = true;
// };
// activityGroup.onMouseLeave = function(){
//   this.children[1].visible = false;
// };
