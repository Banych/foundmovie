import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import SearchBox from "./SearchBox";

const NavBar = () => {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item header as={NavLink} exact to="/" name="logo">
          <img src="../assets/logo.png" alt="logo" />
          Foundmovie
        </Menu.Item>
        <Menu.Item name="search">
          <SearchBox />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
