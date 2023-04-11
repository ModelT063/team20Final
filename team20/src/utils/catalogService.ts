import { iTunesJSONResponse, iTunesResult } from "@/types/catalogTypes";

export const getAlbumsFromiTunes = async (
  searchTerm: string
): Promise<iTunesResult> => {
  // fetch albums based on search term from itunes
  return fetch(
    "https://itunes.apple.com/search?" +
      new URLSearchParams({
        term: searchTerm.replaceAll(" ", "+"),
        media: "music",
        entity: "album",
      }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const getCatalogAlbums = async (
  catalog: number[]
): Promise<iTunesResult> => {

  const idString = "";
  catalog.forEach((v) => idString.concat(`${v},`))

  return fetch(
    "https://itunes.apple.com/lookup?" +
      new URLSearchParams({
        id: idString,
      }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .catch((e) => console.log(e));
};


