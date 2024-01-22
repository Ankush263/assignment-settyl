import axios from 'axios';

const URL = 'http://localhost:3000';

const USER_URL = `${URL}/api/v1/user`;
const DOCS_URL = `${URL}/api/v1/document`;

const USER_API = axios.create({ baseURL: USER_URL });
const DOCS_API = axios.create({ baseURL: DOCS_URL });

export const signup = (signupDetails: { email: string; password: string }) =>
	USER_API.post('/signup', signupDetails);

export const login = (loginDetails: { email: string; password: string }) =>
	USER_API.post(`/login`, loginDetails);

export const createDocs = (docs: { contents: object }, _token: string) =>
	DOCS_API.post('/', docs, { headers: { Authorization: `Bearer ${_token}` } });

export const updteDocs = (_id: string, docs: object, _token: string) =>
	DOCS_API.patch(`/${_id}`, docs, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMyDocs = (_token: string) =>
	DOCS_API.get(`/myDocs`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
