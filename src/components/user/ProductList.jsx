import styled from "styled-components";

import { mobile } from "../../responsive";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Newsletter from "./Home/Newsletter";
import Products from "./Products";
import Footer from "./Footer";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export default function ProductList() {
  const { category } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Container>
      <Title className="text-xl uppercase">{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
        </Filter>
        <Select name="color" onChange={handleFilters}>
          <Option disabled>Color</Option>
          <Option>white</Option>
          <Option>red</Option>
          <Option>black</Option>
          <Option>yellow</Option>
          <Option>green</Option>
          <Option>blue</Option>
        </Select>
        <Select name="size" onChange={handleFilters}>
          <Option disabled>Size</Option>
          <Option>XS</Option>
          <Option>S</Option>
          <Option>M</Option>
          <Option>L</Option>
          <Option>XL</Option>
        </Select>
        <Filter>
          <FilterText>Sort Products:</FilterText>
        </Filter>
        <Select onChange={(e) => setSort(e.target.value)}>
          <Option value="newest">Newest</Option>
          <Option value="asc">Price (asc)</Option>
          <Option value="desc">Price (desc)</Option>
        </Select>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
}
