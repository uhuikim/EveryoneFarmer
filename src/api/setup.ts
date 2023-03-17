import axios from 'axios';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

instance.interceptors.request.use(async (config) => {
    if (config.headers) {
        const accessToken = localStorage.getItem('monong_access_token');
        if (accessToken) config.headers['MO-MNG-TOKEN'] = accessToken;
    }
    return config;
});

export const getApi = async (url: string, params = {}) => {
    const result = await instance.get(url, { params });
    return result;
};

export const postApi = async (url: string, body = {}) => {
    const result = await instance.post(url, body);
    return result;
};
