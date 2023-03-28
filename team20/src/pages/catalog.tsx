import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Fullscreen, Search } from "@mui/icons-material";
import { useState } from "react";
import { iTunesAlbum } from "@/types/catalogTypes";
import { getAlbumsFromiTunes } from "@/utils/catalogService";
import Image from "next/image";

export default function Account() {
  const [searchResults, setSearchResults] = useState<iTunesAlbum[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const search = (searchTerm: string) => {
    getAlbumsFromiTunes(searchTerm).then((v) => setSearchResults(v.results));
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Catalog</h1>
      <Box
        width="100%"
        justifyContent="center"
        display="flex"
        color="0xFFFFFF"
        flexDirection="column"
        padding="8px"
      >
        <TextField
          fullWidth
          value={searchTerm}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => search(searchTerm)}>
                <Search />
              </IconButton>
            ),
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></TextField>
        <Box>
          {searchResults.length == 0 ? (
            <Typography>
              Please type a search term and click the magnifying glass
            </Typography>
          ) : (
            searchResults.map((v) => <AlbumTile album={v} />)
          )}
        </Box>
      </Box>
    </>
  );
}

type AlbumTileProps = {
  album: iTunesAlbum;
};

const AlbumTile = (props: AlbumTileProps) => {
  const album = props.album;

  return (
    <Paper
      sx={{
        padding: "8px",
        margin: "8px",
        maxWidth: "min-content",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="fit-content"
        alignItems="center"
        textAlign="center"
      >
        <img
          src={album.artworkUrl100.replaceAll("100x100", "1000x1000")}
          width={200}
          height={200}
        />
        <Typography variant="h5">{album.collectionName}</Typography>
        <Typography>${album.collectionPrice}</Typography>
      </Box>
    </Paper>
  );
};
