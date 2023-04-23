import React, { useState } from "react";
import NavItem from "./NavItem";
import UIMode from "./UIMode";
import Link from "next/link";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {Avatar, Box, Paper, Typography, Button, Menu} from "@mui/material";
import { prototype } from "events";


const MENU_LIST = [
  // { text: "Home", href: "/" },
  { text: "Account", href: "/pii" },  
  { text: "Audits", href: "/audit"},
  { text: "Catalog", href: "/catalog" },
  { text: "Register", href: "/account" },
  { text: "Cart", href: "/cart"},
  { text: "Driver Application", href: "/driverApplication"}
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link legacyBehavior href={"/"}>
            <a>
              <box><h1 className="logo"><Button color="inherit"
                 endIcon={<LocalShippingIcon/>}> Good Drivers </Button></h1> </box>    
            </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <center>
                <NavItem active={activeIdx === idx} {...menu} />
              </center>
            </div>
          ))}
        </div>
        <Button endIcon={<UIMode/>}></Button>
      </nav>
    </header>
  );
};

export default Navbar;