export type iTunesResult = {
  resultCount: number;
  results: any[];
};

export type iTunesJSONResponse = {
  data?: iTunesResult;
  errors?: Array<{ message: string }>;
};

export type iTunesAlbum = {
  wrapperType: string;
  collectionType: string;
  artistId: number;
  collectionId: number;
  amgArtistId: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright: string;
  country: string;
  currency: string;
  releaseDate: Date;
  primaryGenreName: string;
  button: number;
};
