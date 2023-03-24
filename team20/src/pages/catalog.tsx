import { IconButton, InputAdornment, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { iTunesAlbum } from "@/types/catalogTypes";
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//<svg data-testid="ShoppingCartIcon"></svg>

export default function Account() {
  const [searchResults, setSearchResults] = useState<iTunesAlbum[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const search = (searchTerm: string) => {};

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1>Catalog</h1>
      <div>
        <TextField
          value={searchTerm}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => search(searchTerm)}>
                <Search />
              </IconButton>
            ),
          }}
        ></TextField>
      </div>
    </>
  );
}
