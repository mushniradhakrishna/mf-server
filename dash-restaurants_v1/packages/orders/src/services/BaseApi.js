import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';
import { STATUS, ACTION } from '../config/constants';

const NO_CONTENT = STATUS.NO_CONTENT;
const UNAUTHORIZED = STATUS.UNAUTHORIZED;
const base_url = process.env.API_URL;

const _pendingRequests = {};

//Abort pending requests
const abortPendingRequests = (key) => {
	if (_pendingRequests[key]) {
		_pendingRequests[key](ACTION.REQUEST_CANCELLED);
		_pendingRequests[key] = null;
	}
};

//check if the response is invalid token
const isInvalidToken = (resp) => {
	if (resp.status !== UNAUTHORIZED) {
		return false;
	}
	const authHeader = resp.headers.get('WWW-Authenticate') || '';
	return authHeader.includes('invalid_token');
};

//Process the response
const processResponse = (resp) => {
	if (isInvalidToken(resp)) {
		return { data: {} };
	}
	if (resp.status === NO_CONTENT) {
		const response = Object.assign({}, resp, { data: {} });
		return response;
	}
	return resp;
};

//Handle the response and call the callback function
const handleResponse = (key, options, resp, jsonResp) => {
	const jsonResponse = _.isEmpty(jsonResp) ? {} : jsonResp;
	const { status } = resp;
	const { errors } = Object.assign({}, jsonResponse);
	const response = {
		status,
		body: jsonResponse,
		errors,
		headers: resp.headers,
	};
	if (options && options.callback && typeof options.callback === 'function') {
		options.callback(response);
	}
};

//Main API Object
export const API = {
	responseData: [],
	//Get Headers
	getHeaders(accessToken, accept) {
		return {
			Accept: accept,
			'Content-Type': 'application/json',
			//Authorization: `Bearer ${accessToken}`,
		};
	},
	//Base Make Request function
	makeRequest(path, key, reqInit, options = {}) {
		const accept = 'application/json';
		const accessToken = '<API-TOKEN>';
		const CancelToken = axios.CancelToken;
		abortPendingRequests(key);
		const headers = this.getHeaders(accessToken, accept);
		const option = options;
		const init = Object.assign({}, reqInit, { headers });
		axios({
			baseURL: `${base_url}${path}`,
			...init,
			timeout: 30000,
			//withCredentials: process.env.NODE_ENV === 'development',
			withCredentials: false,
			cancelToken: new CancelToken(function executor(c) {
				_pendingRequests[key] = c;
			}),
		})
			.then((resp) => processResponse(resp))
			.then((resp) => {
				handleResponse(key, option, resp, resp.data);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	//Get Params
	getParams(queryParams = {}) {
		return queryParams;
	},
	//Get Request function
	makeGetRequest(path, key, queryParams, options = {}) {
		const getData = {
			method: 'GET',
			params: this.getParams(queryParams),
			paramsSerializer: (params) => {
				return qs.stringify(params, { arrayFormat: 'brackets' });
			},
		};
		this.makeRequest(path, key, getData, options);
	},
	//Post Request function
	makePostRequest(path, key, body, options = {}) {
		const postData = {
			method: 'POST',
			data: body,
			params: this.getParams(),
			paramsSerializer: (params) => {
				return qs.stringify(params, { arrayFormat: 'brackets' });
			},
		};
		this.makeRequest(path, key, postData, options);
	},
	//Put Request function
	makePutRequest(path, key, body, options = {}) {
		const putData = {
			method: 'PUT',
			data: body,
			params: this.getParams(),
			paramsSerializer: (params) => {
				return qs.stringify(params, { arrayFormat: 'brackets' });
			},
		};
		this.makeRequest(path, key, putData, options);
	},
	//Delete Request function
	makeDeleteRequest(path, key, queryParams, options = {}) {
		const deleteData = {
			method: 'DELETE',
			params: this.getParams(queryParams),
			paramsSerializer: (params) => {
				return qs.stringify(params, { arrayFormat: 'brackets' });
			},
		};
		this.makeRequest(path, key, deleteData, options);
	},
};
