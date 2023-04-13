import React, { useState } from "react";
import NavItem from "./NavItem";
import UIMode from "./UIMode";
import Link from "next/link";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {Avatar, Box, Paper, Typography, Button, Menu} from "@mui/material";
import { prototype } from "events";

const MENU_LIST = [
  // { text: "Home", href: "/" },
  { text: "Audit Reports", href: "/audit"},
  { text: "Catalog", href: "/catalog" },
  { text: "Register User", href: "/account" },
  { text: "Personal Information", href: "/pii" },  
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link legacyBehavior href={"/"}>
            <a>
              <h1 className="logo"><Button color="inherit"
                 endIcon={<LocalShippingIcon/>}> Good Drivers </Button></h1>     
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
        <UIMode></UIMode>
      </nav>
    </header>
  );
};

export default Navbar;