import React from "react";
import { FaFacebook } from "react-icons/fa6";
import styled from "styled-components";
import { SiGooglemaps } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { mobile } from "../../responsive";
import Khalti from "../../image/Khalti.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#ff848" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 30%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Embroidery Tshirt House</Logo>
        <Desc>
          A hidden gem nestled in the lively streets of Thamel, Kathmandu
          established in 2058 B.S
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon color="B4B4B8">
            <SiGooglemaps />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="/cart">Cart</Link>
          </ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <SiGooglemaps style={{ marginRight: "10px" }} />
          Mandala Street,Thamel
        </ContactItem>
        <ContactItem>
          <FaPhoneAlt style={{ marginRight: "10px" }} />
          +977 9851068963
        </ContactItem>
        <ContactItem>
          <IoMdMail style={{ marginRight: "10px" }} />
          embroidery330@gmail.com
        </ContactItem>
        <Payment src={Khalti} />
      </Right>
    </Container>
  );
};

export default Footer;
