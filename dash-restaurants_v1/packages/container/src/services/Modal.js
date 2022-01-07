const Modal = {
	/* show method to render the pop up based on popup type
	 * @param {string,string,string,array} popup type, popup title, popup message,actions list
	 * @return {function} callback function if exist
	 */
	show(type, title, message, buttons) {
		//if popup type is an alert
		if (type === 'alert') {
			alert(message);
			if (typeof buttons[0].callback === 'function') {
				buttons[0].callback();
			}
		}
		//if popup type is a confirm
		else if (type === 'confirm') {
			const result = confirm(message);
			if (result && typeof buttons[0].callback === 'function') {
				buttons[0].callback();
			} else {
				buttons[1].callback();
			}
		}
	},
};
export default Modal;
