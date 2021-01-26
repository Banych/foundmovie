import axios, { AxiosResponse } from 'axios';
import { IYouTubeResult } from '../Models/IYouTubeResult';

const YouTubeApiBaseURL = "https://www.googleapis.com/youtube/v3/search/";

const responseBody = (response: AxiosResponse) => response.data;
const youtubeApiKey = 'AIzaSyCXwcnpNU-6tmpgGJ9dMDrZbgEOtPTP86Y';
const queryWithApiKeyYouTube = `?key=${youtubeApiKey}`;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(YouTubeApiBaseURL + url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(YouTubeApiBaseURL + url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(YouTubeApiBaseURL + url, body).then(responseBody),
    del: (url: string) => axios.delete(YouTubeApiBaseURL + url).then(responseBody),
}

const YouTube = {
    search: (query: string): Promise<IYouTubeResult> => requests.get(`${queryWithApiKeyYouTube}&q=${query}&type=video`)
}

export default {
    YouTube
}