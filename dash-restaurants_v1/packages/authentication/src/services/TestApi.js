import { API } from './BaseApi';

const TestAPI = {
	getFunc(key, userId, options = {}) {
		const path = `data/sample.json`;
		API.makeGetRequest(path, key, {}, options);
	},
};
export default TestAPI;
