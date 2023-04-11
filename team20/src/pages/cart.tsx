import Navbar from "@/components/Navbar";
import { userID } from "@/lib/userData";
import { iTunesAlbum } from "@/types/catalogTypes";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Cart() {
  const [userCart, setUserCart] = useState<number[]>([]);
  const [cartAlbums, setCartAlbums] = useState<iTunesAlbum[]>([]);

  const loggedInUserID = useRecoilValue(userID);

  useEffect(() => {
    if (loggedInUserID === "") {
      console.error("Failed to get user ID, could not add to catalog");
      return;
    }

    fetch(`http://localhost:3000/api/users/read/${loggedInUserID}`)
      .then((res) =>
        res
          .json()
          .then((userData) => setUserCart(userData.Cart))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e))
      .catch((e) => console.log(e));
  });

  return (
    <>
      <Navbar />
      {userCart.length === 0 ? (
        <Typography>User Cart is empty</Typography>
      ) : (
        userCart.map((v) => <Typography>{v}</Typography>)
      )}
    </>
  );
}
