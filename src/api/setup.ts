import axios from 'axios';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getApi = async (url: string, params = {}) => {
    const result = await instance.get(url, { params });
    return result;
};

export const postApi = async (url: string, body = {}) => {
    const result = await instance.post(url, body);
    return result;
};
