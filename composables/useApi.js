import axios from 'axios';

export default function () {
	const api = axios.create({
		baseURL: 'http://localhost:1829/api',
		// baseURL: 'http://95.85.127.85:1829/api',
		timeout: 10000,
	});

	const get = async (url, config = {}) => {
		try {
			const response = await api.get(url, config);
			return response.data;
		} catch (error) {
			console.error(`API Error: ${url}`, error);
			throw error;
		}
	};

	const post = async (url, data, config = {}) => {
		try {
			const response = await api.post(url, data, config);
			return response.data;
		} catch (error) {
			console.error(`API Error: ${url}`, error);
			throw error;
		}
	};

	return { get, post };
}
