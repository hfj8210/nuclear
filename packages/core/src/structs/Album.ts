import uuidv4 from 'uuid/v4';

import {
  SearchResultsAlbum,
  SearchResultsSource
} from '../plugins/plugins.types';

export default class Album {
  uuid: string;
  ids?: {
    [K in SearchResultsSource]?: string
  };
  artist: string;
  title: string;
  genres: string[];

  coverImage?: string;
  thumbnail?: string;

  constructor(data: Partial<Album> = {}) {
    this.uuid = uuidv4();

    this.ids = data.ids || {};
    this.artist = data.artist;
    this.title = data.title;
    this.genres = data.genres || [];
    this.coverImage = data.coverImage;
    this.thumbnail = data.thumbnail;
  }

  addSearchResultData(data: SearchResultsAlbum): void {
    this.ids = { ...this.ids, [data.source]: data.id };
    this.artist = data.artist;
    this.title = data.title;
    this.coverImage = data.coverImage;
    this.thumbnail = data.thumb;
  }

  static fromSearchResultData(data: SearchResultsAlbum): Album {
    const album = new Album();
    album.addSearchResultData(data);
    return album;
  }
}
