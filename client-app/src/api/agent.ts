import axios, { AxiosResponse } from 'axios';
import Movie from '../Models/Movie';
import { MoviesResult } from '../Models/MoviesResult';

const IMDBBaseURL = "http://www.omdbapi.com/";

const responseBody = (response: AxiosResponse) => response.data;
const IMDBapiKey = '?apikey=5fa84309';

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(IMDBBaseURL + url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(IMDBBaseURL + url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(IMDBBaseURL + url, body).then(responseBody),
    del: (url: string) => axios.delete(IMDBBaseURL + url).then(responseBody),
}

const Movies = {
    list: (query: string, page: number): Promise<MoviesResult> => requests.get(`${IMDBapiKey}&s=${query}&page=${page}`),
    details: (id: string): Promise<Movie> => requests.get(`${IMDBapiKey}&i=${id}`),
}

export default {
    Movies,
}