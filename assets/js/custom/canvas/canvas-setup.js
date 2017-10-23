( function () {

	var elementType = '';

	tool.minDistance = 10;

	window.addEventListener('wheel', function (e) {
		e.preventDefault();

		var scrollDistance = e.deltaY;
		if (scrollDistance > 0) {
			project.view.zoom -= 0.02;
		} else {
			project.view.zoom += 0.02;
		}
	});


	var eventOptions = document.querySelectorAll('.element-option');

	eventOptions.forEach(function (eventOption) {
		eventOption.onclick = function () {
			elementType = this.getAttribute('data-type');
		};
	});

	project.view.onMouseUp = function (event) {
		if (elementType !== '') {
			if (elementType === 'event') {
				drawEvent(event.point.x, event.point.y);
				// insertProps(project.activeLayer.lastChild);
				elementType = '';
			} else if (elementType === 'activity') {
				drawActivity(event.point.x, event.point.y);
				// insertProps(project.activeLayer.lastChild);
				elementType = '';
			}
			insertProps(project.activeLayer.lastChild);
		}
	};

} )()

//////////////////////////////// TEST /////////////////////


// var vectorStart, vector, vectorPrevious, vectorItem;

// function processVector(event) {
// 	vector = event.point - vectorStart; // Create vector

// 	drawVector();
// }

// function drawVector() {

// 	if (vectorItem){
// 		vectorItem.remove();
// 	}
// 	var arrowVector = vector.normalize(10);


// 	var end = vectorStart + vector;
// 	vectorItem = new Group([
// 		new Path([vectorStart, end]),
// 		new Path([
// 			end + arrowVector.rotate(135),
// 			end,
// 			end + arrowVector.rotate(-135)
// 		])
// 	]);
// 	vectorItem.strokeColor = '#e4141b';
// }

// function onMouseDown(event){
// 	vectorStart = event.point;
// }
// function onMouseDrag(event){
// 	processVector(event);
// }
// function onMouseUp(event){
// 	var end = vectorStart + vector;
// 	// processVector(event);

// 	vectorPrevious = vectorItem.clone();
// }