import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Link from 'next/link';
import SigninButton from "./SigninButton";

export default function Appbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>    
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">        
        <NavbarItem>
          <SigninButton />          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}