function insertProps(lastItem) {
	// console.log(lastItem);
	var menu = document.querySelector('.props-menu');
	var menuNameInput = menu.querySelector('.prop-input');
	var menuNameSubmit = menu.querySelector('.prop-submit');

	menu.classList.add('open');
	menuNameInput.focus();

	menuNameSubmit.addEventListener('click', function () {
		// console.log(menuNameInput.value);

		lastItem.definition.item.children['elementText'].content = menuNameInput.value;

		menuNameInput.value = '';
		menu.classList.remove('open');
	}, { once: true });

	return;
}