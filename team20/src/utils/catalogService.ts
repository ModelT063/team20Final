import { iTunesJSONResponse, iTunesResult } from "@/types/catalogTypes";

export const getAlbumsFromiTunes = async (
  searchTerm: string
): Promise<iTunesResult> => {
  // fetch albums based on search term from itunes
  const response = await fetch(
    "https://itunes.apple.com/search?" +
      new URLSearchParams({
        term: searchTerm,
        media: "music",
        entity: "album",
      }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  const { data, errors }: iTunesJSONResponse = await response.json();
  // if json response is ok and the data exists, otherwise return generic error
  if (response.ok) {
    if (data) return data;
    return Promise.reject(new Error("Failed to get data"));
  }

  // if errors are detected, return all error messages
  const error = new Error(
    errors?.map((e) => e.message).join("\n") ?? "unknown"
  );
  return Promise.reject(error);
};
