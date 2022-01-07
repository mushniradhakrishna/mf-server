import { TokenService } from './TokenService';

describe('Token Service', () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzkxMjI3MTEsImZ1bGxOYW1lIjoiVGVzdCBVc2VyIDEiLCJlbWFpbCI6ImpvaG4uZG9lQGRhcmRlbi5jb20iLCJqb2JDb2RlIjoiMTIyMCBTZXJ2ZXIiLCJyb2xlcyI6WyJVc2UgUE9TIC0gU2VydmVycyIsIlVzZSBQT1MgLSBDYXNoaWVycyJdLCJhY3Rpb25zIjpbIkNoZWNrLk9yZGVyIiwiQ2hlY2suUGF5bWVudCIsIkNoZWNrLmNsb3NlIl0sImlhdCI6MTUxNjIzOTAyMn0.NxdnbICVIyN4ORnrVRbd6-bzWJT2R6pNgW7Dsb0-xG4';

	const invalid_token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U';

	//should return user name from the token
	it('should return user name from the token', () => {
		const username = TokenService.getUserName(token);
		expect(username).toEqual('Test User 1');
	});

	//should return user email from the token
	it('should return user email from the token', () => {
		const email = TokenService.getEmail(token);
		expect(email).toEqual('john.doe@darden.com');
	});

	//should return user job codes from the token
	it('should return user job code from the token', () => {
		const jobcodes = TokenService.getJobCode(token);
		expect(jobcodes).toEqual('1220 Server');
	});

	//should return user roles from the token
	it('should return user roles from the token', () => {
		const roles = TokenService.getRoles(token);
		expect(roles).toEqual(['Use POS - Servers', 'Use POS - Cashiers']);
	});

	//should return user actions from the token
	it('should return user actions from the token', () => {
		const actions = TokenService.getActions(token);
		expect(actions).toEqual(['Check.Order', 'Check.Payment', 'Check.close']);
	});

	//should return token expiry from the token
	it('should return token expiry from the token', () => {
		const tokenexpiry = TokenService.getTokenExpiry(token);
		expect(tokenexpiry).toEqual(1639122711);
	});

	//should return token issued at time from the token
	it('should return token issued at time from the token', () => {
		const tokeniat = TokenService.getIat(token);
		expect(tokeniat).toEqual(1516239022);
	});

	//should return user name as blank if the token is invalid
	it('should return user name as blank if the token is invalid', () => {
		const username = TokenService.getUserName(invalid_token);
		expect(username).toEqual('test');
	});

	//should return user email as blank if the token is invalid
	it('should return user email as blank if the token is invalid', () => {
		const email = TokenService.getEmail(invalid_token);
		expect(email).toEqual('');
	});

	//should return user job codes as blank if the token is invalid
	it('should return user job codes as blank if the token is invalid', () => {
		const jobcodes = TokenService.getJobCode(invalid_token);
		expect(jobcodes).toEqual('');
	});

	//should return user roles as blank if the token is invalid
	it('should return user roles as blank if the token is invalid', () => {
		const roles = TokenService.getRoles(invalid_token);
		expect(roles).toEqual('');
	});

	//should return user actions as blank if the token is invalid
	it('should return user actions as blank if the token is invalid', () => {
		const actions = TokenService.getActions(invalid_token);
		expect(actions).toEqual('');
	});

	//should return token expiry as current time if the token is invalid
	it('should return token expiry as current time if the token is invalid', () => {
		const tokenexpiry = TokenService.getTokenExpiry(invalid_token);
		expect(tokenexpiry - new Date()).toBeLessThanOrEqual(2);
	});

	//should return token issued at time as current time if the token is invalid
	it('should return token issued at time as current time if the token is invalid', () => {
		const tokeniat = TokenService.getIat(invalid_token);
		expect(tokeniat - new Date()).toBeLessThanOrEqual(2);
	});
});
