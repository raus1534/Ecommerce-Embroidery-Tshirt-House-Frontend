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
    img: require("../../../image/4.png"),
    title: "Mandala Prints",
    cat: "woman",
  },
  {
    id: 2,
    img: require("../../../image/5.png"),
    title: "Cultural Symbols Prints",
    cat: "men",
  },
  {
    id: 3,
    img: require("../../../image/6.png"),
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
