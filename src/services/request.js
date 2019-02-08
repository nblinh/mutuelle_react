import axios from 'axios';

export const httpClient = axios.create({
    //baseURL: "process.env.REACT_APP_API_URL",
    //baseURL: "http://127.0.0.1:5000",
    baseURL: "http://localhost:8080",
});

export const normalizeParams = params =>
    Object.keys(params).reduce((acc, key) => {
        const value = params[key];

        if (typeof value === 'boolean') {
            return {
                ...acc,
                [key]: value ? 'oui' : 'non',
            };
        }

        return {
            ...acc,
            [key]: value,
        };
    }, {});

export const getRefunds = params =>
    httpClient.get('/refunds', {
        params: normalizeParams(params),
    });

export const getQuestions = () => httpClient.get('/question');
export const getProducts = () =>
    httpClient.get('/products').then(({ data }) => data);
