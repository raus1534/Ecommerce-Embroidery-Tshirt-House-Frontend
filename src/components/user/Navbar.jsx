import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

const Container = styled.div`
  height: 60px;
  ${mobile({ backgroundColor: "red" })}
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  text-decoration: none;
  font-weight: bold;
  font-color: "blue";
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 40px;
  color: inherit;
  ${mobile({ fontSize: "12px" })}/* Add additional link styles here */
`;

export default function Navbar() {
  const { authInfo, handleLogout, cart } = useAuth();
  const profile = authInfo?.profile;

  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate("/cart");
  };
  const handleOnLogout = () => {
    handleLogout();
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <FaSearch style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>
            <StyledLink className="text-xl" to="/">
              Embroidery Tshirt House
            </StyledLink>
          </Logo>
        </Center>
        <Right>
          {!profile ? (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          ) : null}

          {profile ? (
            <>
              <MenuItem onClick={handleOnLogout}>LOGOUT</MenuItem>

              <MenuItem onClick={navigateToCart}>
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </>
          ) : null}
        </Right>
      </Wrapper>
    </Container>
  );
}
