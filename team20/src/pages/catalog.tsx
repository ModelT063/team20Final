import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Popover,
  CircularProgress
} from "@mui/material";
import Navbar from "../components/Navbar";
import { AlignHorizontalRight, Colorize, Filter, Filter1, FilterList, Fullscreen, Message, Search, ShoppingCart, ShoppingCartCheckout, DeleteForeverRounded} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { iTunesAlbum } from "@/types/catalogTypes";
import { getAlbumsFromiTunes } from "@/utils/catalogService";
import { UserInfo, UserType } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/lib/userData";

export default function Account() {
  const [searchResults, setSearchResults] = useState<iTunesAlbum[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const search = (searchTerm: string) => {
    getAlbumsFromiTunes(searchTerm).then((v) => setSearchResults(v.results));
  };

  function filter_prompt(): void {  
      prompt("Enter your user ID to filter your results to your albums\n");
  }
  function checkout_prompt(): void {  
    prompt("You have 0 items in your cart.\n Click 'OK' to checkout\n");
}
function delete_prompt(): void {  
  prompt("Are you sure want to delete this item from the catalog\n");
}
  let info = useRecoilValue(userInfoState);
  let type = info[0]['User_Type']; // get current user info from recoil and grab the user type for props
  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Catalog 

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="right"
        width="100%">

    <Button 
      endIcon={<FilterList/>}
      onClick={() => filter_prompt()}
      >Filter</Button>

    <Button 
      endIcon={<ShoppingCart/>}
      onClick={() => checkout_prompt()}
      >Filter</Button>

        </Grid>
      </h1>
       
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
            searchResults.map((v) => <AlbumTile album={v} type={type} />)
          )}
        </Grid>
      </Box>
    </>
  );
}

type AlbumTileProps = {
  album: iTunesAlbum;
  type: string;
};

const AlbumTile = (props: AlbumTileProps) => {
  const album = props.album;
  const type = parseInt(props.type as string);

  const addToCart = async (id: number) => {
    let cognitoUser = JSON.parse(localStorage.getItem('CognitoUser') || '{}');
    let userID = cognitoUser.username;
    const res = await fetch(`http://localhost:3000/api/users/read/${userID}`);
    let userData = await res.json();
    userData[0].Cart.push(id);
    const updatedUser = {
      Email: userData[0].Email,
      User_Type: userData[0].User_Type,
      User_Status: 1,
      F_Name: userData[0].F_Name,
      L_Name: userData[0].L_Name,
      Points: userData[0].Points,
      Cart: {
        ids: userData[0].Cart
      }
    };
    fetch(`http://localhost:3000/api/users/update/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser)
    });
  }

  const addToCatalog = async (id: number) => {
    // would need to get the sponsor user's organization ID in this part by calling
    // api in sponsor_driver_relationship to get 
    let cognitoUser = JSON.parse(localStorage.getItem('CognitoUser') || '{}');
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
  function delete_prompt(): void {
    throw new Error("Function not implemented.");
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
        {type == UserType.sponsor ? <Button variant = "outlined" onClick={() => addToCatalog(album.collectionId)}>Add to Catalog</Button> :
        type == UserType.driver ? <Button variant = "outlined" onClick={() => addToCart(album.collectionId)}>Add to Cart</Button> : null}
        <Button endIcon={<DeleteForeverRounded/>} onClick={() => delete_prompt()} >Filter</Button>
      </Box>
    </Paper>
  );
};
