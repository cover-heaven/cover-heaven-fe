import { instance } from '../../api/instance';

export const getChatData = async (chatting_id) => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	};
	try {
		const response = await instance.get(`/chatting/${chatting_id}`, {
			headers
		});
		if (response.status === 200) {
			return response;
		}
	} catch (err) {
		alert(err);
		return null;
	}
};

export const getWorkData = async (job_offer_id) => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	};
	try {
		const response = await instance.get(`/job-offers/${job_offer_id}`, {
			headers
		});
		if (response.status === 200) {
			return response;
		}
	} catch (err) {
		alert(err);
		return null;
	}
};

export const postMatchStatus = async (chatting_id, stat) => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	};
	const body = { status: stat };
	try {
		await instance.post(`/chatting/${chatting_id}`, body, {
			headers
		});
	} catch (err) {
		alert(err);
	}
};

export const patchJobPost = async (job_offer_id, data) => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
	};
	const body = data;
	try {
		await instance.patch(`/job-offers/${job_offer_id}`, body, {
			headers
		});
	} catch (err) {
		alert(err);
	}
};
