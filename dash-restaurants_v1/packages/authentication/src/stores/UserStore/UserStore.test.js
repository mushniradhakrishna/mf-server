import UserStore from './UserStore';

describe('UserStore functionality', () => {
	let store;
	beforeEach(() => {
		store = new UserStore();
		store.setUserName('test user');
	});

	//Should set correct username
	it('should set user name', () => {
		expect(store.name).toBe('test user');
	});

	//Should get correct first name
	it('should get correct first name', () => {
		expect(store.firstName).toBe('test');
	});
});
