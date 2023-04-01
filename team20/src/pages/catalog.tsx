import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Button,
  Grid
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Fullscreen, Search} from "@mui/icons-material";
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
        gap="2rem"
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
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        width="100%">
          {searchResults.length == 0 ? (
            <Typography>
              Please type a search term and click the magnifying glass
            </Typography>
          ) : (
            searchResults.map((v) => <AlbumTile album={v} />)
          )}
        </Grid>
      </Box>
    </>
  );
}

type AlbumTileProps = {
  album: iTunesAlbum;
};

const AlbumTile = (props: AlbumTileProps) => {
  const album = props.album;

  const addToCatalog = async (id: number) => {
    // would need to get the sponsor user's organization ID in this part by calling
    // api in sponsor_driver_relationship to get 
    let cognitoUser = JSON.parse(sessionStorage.getItem('CognitoUser') || '{}');
    let userID = cognitoUser.username;
    const res = await fetch(`http://localhost:3000/api/sponsor_driver_relationship/read/${userID}`)
    let userData = await res.json();
    // once this completes we can get the organization ID from userData using userData[x].Sponsor_Org_ID
    // we will now pull from the getcatalog endpoint
    const next_res = await fetch(`http://localhost:3000/api/catalog/read/${userData[0].Sponsor_Org_ID}`)
    let catalogArray = await next_res.json();
    if (!catalogArray[0].catalog.includes(id)) {
      catalogArray[0].catalog.push(id); // new ID has been added to the array
    }
    // now we need to update the entry in the database with the new array
    const updatedCatalog = {
      Catalog_Name: catalogArray[0].Catalog_Name,
      iTunes_Endpoint: {
        ids: catalogArray[0].catalog
      }
    };
    fetch(`http://localhost:3000/api/catalog/update/${catalogArray[0].Catalog_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCatalog)
    });
  }

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
        <Button variant = "outlined" onClick={() => addToCatalog(album.collectionId)}>Add to Catalog</Button>
      </Box>
    </Paper>
  );
};
