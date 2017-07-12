var rectangle = new Rectangle();

var cornerSize = new Size(10, 10);

var path;


function onResize(event) {
	// Whenever the window is resized, recenter the path:
	// path.position = view.center;
}

function onMouseDown(event) {
  console.log(event.downPoint.x);
  console.log(event.downPoint.y);
  rectangle.x = event.downPoint.x;
  rectangle.y = event.downPoint.y;
  rectangle.width = 200;
  rectangle.height = 200;

	// Add a segment to the path at the position of the mouse:
  path = new Path.RoundRectangle(rectangle, cornerSize);
  path.fillColor = 'black';
	// myPath.add(event.point);
}
