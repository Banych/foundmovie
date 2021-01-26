import { IYouTubeVideo } from "./IYouTubeVideo";

export interface IYouTubeResult {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: IYouTubeVideo[]
}