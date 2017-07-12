// Create a Paper.js Path to draw a line into it:
	var path = new Path();

  var circle = new Path.Circle({
    center: [80, 50],
    radius: 35,
    strokeColor: 'red'
});
circle.strokeWidth = 10;
	// Give the stroke a color
	path.strokeColor = 'blue';
	path.strokewidth = 13;
	var start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.arcTo(start + [ 100, -50 ], -30);

console.log('yo2');
