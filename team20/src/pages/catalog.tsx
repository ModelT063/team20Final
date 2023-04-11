import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import {
  AlignHorizontalRight,
  Colorize,
  Filter,
  Filter1,
  FilterList,
  Fullscreen,
  Message,
  Search,
  ShoppingCart,
  ShoppingCartCheckout,
  DeleteForeverRounded,
} from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { iTunesAlbum } from "@/types/catalogTypes";
import { getAlbumsFromiTunes, getCatalogAlbums } from "@/utils/catalogService";
import { UserInfo, UserType } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userInfoState, userID } from "@/lib/userData";

export default function Account() {
  const [searchResults, setsearchResults] = useState<iTunesAlbum[]>([]);
  const [sponsorCatalog, setSponsorCatalog] = useState<number[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const search = (searchTerm: string) => {
    getAlbumsFromiTunes(searchTerm).then((v) => setsearchResults(v.results));
  };

  function filter_prompt(): void {
    prompt("Enter your user ID to filter your results to your albums\n");
  }

  function checkout_prompt(): void {
    prompt("You have 0 items in your cart.\n Click 'OK' to checkout\n");
  }

  // get current user info from recoil and grab the user type for props
  const userType =
    useRecoilValue(userInfoState).length === 0
      ? -1
      : parseInt(useRecoilValue(userInfoState)[0]["User_Type"]);
  const loggedInUserID = useRecoilValue(userID);

  // get the sponsor catalog values
  useEffect(() => {
    if (loggedInUserID === "") {
      console.error("Failed to get user ID, could not add to catalog");
      return;
    }

    fetch(
      `http://localhost:3000/api/sponsor_driver_relationship/read/${loggedInUserID}`
    )
      .then((res) =>
        res
          .json()
          .then((userData) => {
            fetch(
              `http://localhost:3000/api/catalog/read/${userData[0].Sponsor_Org_ID}`
            )
              .then((res) => res.json().then((res) => setSponsorCatalog(res)))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }, [loggedInUserID]);

  // use this to set searchResults to be the albums found in sponsorCatalog
  const displaySponsorCatalog = async () => {
    const results = await getCatalogAlbums(sponsorCatalog);
    setsearchResults(results.results);
  };

  const addToCart = async (id: number) => {
    let cognitoUser = JSON.parse(localStorage.getItem("CognitoUser") || "{}");
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
        ids: userData[0].Cart,
      },
    };
    fetch(`http://localhost:3000/api/users/update/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  };

  const addToCatalog = async (id: number) => {
    // would need to get the sponsor user's organization ID in this part by calling
    // api in sponsor_driver_relationship to get
    // let cognitoUser = JSON.parse(localStorage.getItem("CognitoUser") || "{}");
    // let userID = cognitoUser.username;
    if (loggedInUserID === "") {
      console.error("Failed to get user ID, could not add to catalog");
      return;
    }

    const res = await fetch(
      `http://localhost:3000/api/sponsor_driver_relationship/read/${loggedInUserID}`
    );
    let userData = await res.json();

    // once this completes we can get the organization ID from userData using userData[x].Sponsor_Org_ID
    // we will now pull from the getcatalog endpoint
    const next_res = await fetch(
      `http://localhost:3000/api/catalog/read/${userData[0].Sponsor_Org_ID}`
    );
    let catalogArray = await next_res.json();
    if (!catalogArray[0].catalog.includes(id)) {
      catalogArray[0].catalog.push(id); // new ID has been added to the array
    }

    // now we need to update the entry in the database with the new array
    const updatedCatalog = {
      Catalog_Name: catalogArray[0].Catalog_Name,
      iTunes_Endpoint: {
        ids: catalogArray[0].catalog,
      },
    };
    fetch(
      `http://localhost:3000/api/catalog/update/${catalogArray[0].Catalog_ID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatalog),
      }
    );
  };

  return (
    <>
      <Navbar />
      {userType === -1 ? (
        <Box display="flex" justifyContent="center">
          <Typography>Failed to load user info, please try again</Typography>
        </Box>
      ) : (
        <Box margin="8px">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h4">Catalog</Typography>
            <div>
              <Button endIcon={<FilterList />} onClick={() => filter_prompt()}>
                Filter
              </Button>

              <IconButton onClick={() => checkout_prompt()}>
                Cart <ShoppingCart />
              </IconButton>
            </div>
          </Box>

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
              sx={{ width: "75%", alignSelf: "center" }}
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
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="center"
              width="100%"
            >
              {searchResults.length == 0 ? (
                <Typography>
                  Please type a search term and click the magnifying glass
                </Typography>
              ) : (
                searchResults.map((v) => (
                  <AlbumTile
                    album={v}
                    userType={userType}
                    catalog={[]}
                    addToCatalog={addToCatalog}
                    addToCart={addToCart}
                  />
                ))
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

type AlbumTileProps = {
  album: iTunesAlbum;
  userType: number;
  catalog: number[];
  addToCatalog: (id: number) => void;
  addToCart: (id: number) => void;
};

const AlbumTile = (props: AlbumTileProps) => {
  const album = props.album;
  const type = props.userType;

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
        <div>
          <img
            // I'm editing the artwork url because it will change the quality of the image
            src={album.artworkUrl100.replaceAll("100x100", "1000x1000")}
            width={200}
            height={200}
          />
          <Typography variant="h5">{album.collectionName}</Typography>
          <Typography>${album.collectionPrice}</Typography>
        </div>
        <div>
          {type === UserType.sponsor ? (
            <Button
              variant="outlined"
              onClick={() => props.addToCatalog(album.collectionId)}
            >
              Add to Catalog
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => props.addToCart(album.collectionId)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Box>
    </Paper>
  );
};
