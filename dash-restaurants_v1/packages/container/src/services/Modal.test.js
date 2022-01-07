import Modal from './Modal';

describe('Modal Service', () => {
	let mockFunc = jest.fn();
	const alertButtons = [
		{
			label: 'OK',
			callback: mockFunc,
		},
	];
	const confirmButtons = [
		{ label: 'OK', callback: mockFunc },
		{ label: 'Cancel', callback: mockFunc },
	];

	//should render alert pop up if type is alert
	it('should render alert pop up if type is alert', () => {
		const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
		Modal.show('alert', '', '', alertButtons);
		expect(alertMock).toBeCalled();
	});

	//should render alert pop up if type is alert and execute ok button function
	it('should render alert pop up if type is alert and execute ok button function', () => {
		Modal.show('alert', '', '', alertButtons);
		expect(mockFunc).toHaveBeenCalled();
	});

	//should render confirm pop up if type is confirm and execute ok button function
	it('should render confirm pop up if type is confirm and execute ok button function', () => {
		window.confirm = jest.fn(() => true);
		Modal.show('confirm', '', '', confirmButtons);
		expect(window.confirm).toBeCalled();
	});

	//should render confirm pop up if type is confirm and execute cancel button function
	it('should render confirm pop up if type is confirm and execute cancel button function', () => {
		window.confirm = jest.fn(() => false);
		Modal.show('confirm', '', '', confirmButtons);
		expect(window.confirm).toBeCalled();
	});
});
