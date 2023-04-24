import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FilterList from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import { useState, useEffect, useMemo } from "react";
import { iTunesAlbum } from "@/types/catalogTypes";
import { getAlbumsFromiTunes, getCatalogAlbums } from "@/utils/catalogService";
import { UserInfo, UserType } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userInfoState, userID } from "@/lib/userData";
import Link from "next/link";

export default function Catalog() {
  // make sure proper things show up depending on the user that's logged in
  const [searchResults, setsearchResults] = useState<iTunesAlbum[]>([]);
  const [sponsorCatalog, setSponsorCatalog] = useState<number[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchITunes = (searchTerm: string) => {
    getAlbumsFromiTunes(searchTerm).then((v) => setsearchResults(v.results));
  };

  function filter_prompt(): void {
    prompt("Enter your user ID to filter your results to your albums\n");
  }

  // get current user info from recoil and grab the user type for props
  const recoilType = useRecoilValue(userInfoState);
  const userType =
    recoilType.length === 0 ? -1 : parseInt(recoilType[0]["User_Type"]);
  const loggedInUserID = useRecoilValue(userID);

  // use this to set searchResults to be the albums found in sponsorCatalog
  // test if this works
  const displaySponsorCatalog = async () => {
    const results = await getCatalogAlbums(sponsorCatalog);
    setsearchResults(results.results);
  };

  // get the sponsor catalog values and set those as display values if driver
  useEffect(() => {
    if (loggedInUserID === "") {
      console.error("Failed to get user ID, could not get catalog");
      return;
    }

    fetch(
      `${process.env.APP_URL}api/sponsor_driver_relationship/read/${loggedInUserID}`
    )
      .then((res) =>
        res
          .json()
          .then((userData) => {
            fetch(
              `${process.env.APP_URL}api/catalog/read/${userData[0].Sponsor_Org_ID}`
            )
              .then((res) => res.json().then((res) => setSponsorCatalog(res)))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));

    if (userType === UserType.driver) displaySponsorCatalog();
  }, [loggedInUserID]);

  const addToCart = async (id: number) => {
    // let cognitoUser = JSON.parse(localStorage.getItem("CognitoUser") || "{}");
    // let userID = cognitoUser.username;
    const res = await fetch(
      `${process.env.APP_URL}api/users/read/${loggedInUserID}`
    );
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
    fetch(`${process.env.APP_URL}api/users/update/${loggedInUserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(() => console.log("Added to cart"))
      .catch((e) => {
        console.log("Failed to add to cart");
        console.log(e);
      });
  };

  // check if this actually works and how much it can do
  const addToCatalog = async (id: number) => {
    // would need to get the sponsor user's organization ID in this part by calling
    // api in sponsor_driver_relationship to get
    // let cognitoUser = JSON.parse(localStorage.getItem("CognitoUser") || "{}");
    // let userID = cognitoUser.username;
    if (loggedInUserID === "") {
      console.error("Failed to get user ID, could not add to catalog");
      return;
    }

    const userData = await fetch(
      `${process.env.APP_URL}api/sponsor_driver_relationship/read/${loggedInUserID}`
    ).then((r) => {
      return r.json().then((v) => {
        return v;
      });
    });
    // let userData = await res.json();
    if (!userData || userData.length === 0) {
      console.error("Failed to get user data");
      return;
    }

    // once this completes we can get the organization ID from userData using userData[x].Sponsor_Org_ID
    // we will now pull from the getcatalog endpoint
    const next_res = await fetch(
      `${process.env.APP_URL}api/catalog/read/${userData[0].Sponsor_Org_ID}`
    );
    const catalogArray = await next_res.json();
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
      `${process.env.APP_URL}api/catalog/update/${catalogArray[0].Catalog_ID}`,
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
        // if user information fails to load entirely
        <Box margin="8px" display="flex" justifyContent="center">
          <Typography>Failed to load user info, please try again</Typography>
        </Box>
      ) : userType === UserType.driver && sponsorCatalog.length === 0 ? (
        // if user is a driver and sponsor catalog is empty or fails to load
        <Box
          margin="8px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography>Failed to load sponsor catalog!</Typography>
          <Typography>
            This could mean you are not assigned to a sponsor or your
            sponsor&#39s catalog is empty
          </Typography>
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
              <Link legacyBehavior href="/cart">
                <Button endIcon={<ShoppingCart />}>Cart</Button>
              </Link>
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
            {userType !== UserType.driver && (
              <TextField
                sx={{ width: "75%", alignSelf: "center" }}
                value={searchTerm}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        searchITunes(searchTerm);
                      }}
                    >
                      <Search />
                    </IconButton>
                  ),
                }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              ></TextField>
            )}
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
                    key={v.collectionId}
                    album={v}
                    userType={userType}
                    catalog={sponsorCatalog}
                    action={
                      userType === UserType.driver ? addToCart : addToCatalog
                    }
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
  action: (id: number) => void;
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
              onClick={() => props.action(album.collectionId)}
            >
              Add to Catalog
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => props.action(album.collectionId)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Box>
    </Paper>
  );
};
