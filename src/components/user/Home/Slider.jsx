import styled from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";
import { mobile } from "../../../responsive";
import { Link } from "react-router-dom";
// import p2Image from "./path/to/p2.jpg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.$slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.$bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  white-space: nowrap;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: black;
  border-color: white;
  color: white;
  cursor: pointer;
`;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
  return array;
}

const sliderItems = shuffleArray([
  {
    id: 1,
    img: require("../../../image/1.png"),
    title: "Mandala Designs",
    desc: "Elevate your style with our Mandala Design T-shirt, a blend of intricate patterns and spiritual symbolism.",
    bg: "f5fafd",
  },

  {
    id: 2,
    img: require("../../../image/2.png"),
    title: "Baucha Maicha Designs",
    desc: "Elevate your fashion game with these bold, eye-catching prints that celebrate the spirit of individuality and cultural diversity.",
    bg: "f5fafd",
  },

  {
    id: 3,
    img: require("../../../image/3.png"),
    title: "Plain Designs",
    desc: "Discover the epitome of simplicity and versatility with our Plain T-shirts collection.",
    bg: "f5fafd",
  },
]);

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  //using slide arrays

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <FaArrowCircleLeft />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide $bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="/products/woman">
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <FaArrowCircleRight />
      </Arrow>
    </Container>
  );
}
