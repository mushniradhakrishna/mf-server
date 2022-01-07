import jwt_decode from 'jwt-decode';
/*
 * This service gives data from decoded token
 * @param {null}}
 * @return {null}
 */
export const TokenService = {
	/*
	 * This function returns the Full Name from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getUserName(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.fullName || 'test';
	},
	/*
	 * This function returns email the from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getEmail(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.email || '';
	},
	/*
	 * This function returns the Job Code from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getJobCode(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.jobCode || '';
	},
	/*
	 * This function returns the roles from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getRoles(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.roles || '';
	},
	/*
	 * This function returns the actions from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getActions(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.actions || '';
	},
	/*
	 * This function returns the  iat from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getIat(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.iat || new Date();
	},
	/*
	 * This function returns the  Token Expiry time from decoded Token
	 * @param {token}
	 * @return {null}
	 */
	getTokenExpiry(token) {
		let decodedToken = jwt_decode(token);
		return decodedToken.exp || new Date();
	},
};
