import Navbar from "@/components/Navbar";
import { userID, userInfoState } from "@/lib/userData";
import { iTunesAlbum } from "@/types/catalogTypes";
import { UserType } from "@/types/user";
import { getAlbumsFromiTunes, getCatalogAlbums } from "@/utils/catalogService";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Cart() {
  const [userCart, setUserCart] = useState<number[]>([]);
  const [cartAlbums, setCartAlbums] = useState<iTunesAlbum[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const loggedInUserID = useRecoilValue(userID);
  const userType =
    useRecoilValue(userInfoState).length === 0
      ? -1
      : parseInt(useRecoilValue(userInfoState)[0]["User_Type"]);

  const clearCart = async () => {
    // let cognitoUser = JSON.parse(localStorage.getItem("CognitoUser") || "{}");
    // let userID = cognitoUser.username;
    const res = await fetch(
      `http://localhost:3000/api/users/read/${loggedInUserID}`
    );
    let userData = await res.json();
    userData[0].Cart = [];
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
    fetch(`http://localhost:3000/api/users/update/${loggedInUserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(() => {
        console.log("Cleared cart");
        setUserCart([]);
        setCartAlbums([]);
      })
      .catch((e) => {
        console.log("Failed to empty cart");
        console.log(e);
      });
  };

  useEffect(() => {
    if (loggedInUserID === "") {
      console.error("Failed to get user ID");
      return;
    }

    fetch(`http://localhost:3000/api/users/read/${loggedInUserID}`)
      .then((res) =>
        res
          .json()
          .then((userData) => {
            setUserCart(userData[0].Cart.map((v: number) => v));
          })
          .catch((e) => console.error(e))
      )
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getCatalogAlbums(userCart)
      .then((r) => {
        console.log(r);
        setCartAlbums(r.results);
      })
      .catch((e) => console.error(e));
  }, [userCart]);

  useEffect(() => {
    let number = 0;
    cartAlbums.forEach((v) => (number += v.collectionPrice));
    setTotalPrice(number);
  }, [cartAlbums]);

  return (
    <>
      <Navbar />
      {userType !== UserType.driver ? (
        <Box margin="8px" display="flex" justifyContent="center">
          <Typography>You can only purchase items as a driver</Typography>
        </Box>
      ) : userCart.length === 0 ? (
        <Box margin="8px" display="flex" justifyContent="center">
          <Typography>User Cart is empty</Typography>
        </Box>
      ) : userCart.length !== 0 && cartAlbums.length === 0 ? (
        <Box margin="8px" display="flex" justifyContent="center">
          <Typography>Failed to load cart</Typography>
        </Box>
      ) : (
        <Box
          width="100%"
          justifySelf="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {cartAlbums.map((v) => (
            <Box
              width="100%"
              justifySelf="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              key={v.collectionId}
            >
              <Box display="flex" flexDirection="row" width="75%">
                <img
                  // I'm editing the artwork url because it will change the quality of the image
                  src={v.artworkUrl100}
                  width={100}
                  height={100}
                />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box margin="0px 8px">
                    <Typography>{v.collectionName}</Typography>
                    <Typography>{v.artistName}</Typography>
                  </Box>
                  <Typography>{v.collectionPrice}</Typography>
                </Box>
              </Box>
              <Divider sx={{ margin: "8px" }} />
            </Box>
          ))}
          <Box
            width="75%"
            display="flex"
            alignItems="flex-end"
            flexDirection="column"
          >
            <Typography variant="h6">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button onClick={clearCart}>Complete Purchase</Button>
          </Box>
        </Box>
      )}
    </>
  );
}
