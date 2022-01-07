import { makeAutoObservable } from 'mobx';

function UserStore() {
	const store = makeAutoObservable({
		name: 'John Doe',
		get firstName() {
			return store.name.split(' ')[0];
		},
		setUserName(name) {
			store.name = name;
		},
	});
	return store;
}
export default UserStore;
