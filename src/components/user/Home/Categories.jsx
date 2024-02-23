import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../../../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const categories = [
  {
    id: 1,
    img: require("../../../image/Mandala.png"),
    title: "Mandala Prints",
    cat: "woman",
  },
  {
    id: 2,
    img: require("../../../image/18.png"),
    title: "Cultural Symbols Prints",
    cat: "man",
  },
  {
    id: 3,
    img: require("../../../image/16.png"),
    title: "Plain Tshirts",
    cat: "unisex",
  },
];
const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
