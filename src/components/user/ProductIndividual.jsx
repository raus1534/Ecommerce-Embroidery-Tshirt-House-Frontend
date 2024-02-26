import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../../responsive";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { useAuth, useNotification } from "../../hooks";
import { addToCart } from "../../api/cart";
import { getProductDetail } from "../../api/product";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 75%;
  height: 75vh;
  object-fit: cover; //crop
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export default function ProductIndividual() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const { updateNotification } = useNotification();
  const { authInfo, cart, setCart, cartTotal, setCartTotal } = useAuth();
  const userId = authInfo?.profile?._id;

  const handleAddToCart = async () => {
    const isInCart = cart.some(({ productDetail }) => {
      return product._id === productDetail._id;
    });
    if (isInCart) return updateNotification("warning", "Item Already In Cart");
    const price = product.price * quantity;
    setCart([...cart, { productDetail: product, quantity }]);
    await addToCart(
      userId,
      JSON.stringify({ productId: product._id, quantity }),
      price
    );
    setCartTotal(cartTotal + price);
  };
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const getProductDetails = async (productId) => {
    const { product, error } = await getProductDetail(productId);
    if (error) return updateNotification("error", error);
    setProduct({ ...product });
    setSize(product?.size[0]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetails(productId);
    // eslint-disable-next-line
  }, []);

  const { title, desc, img, price, color } = product;
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
          <Price>Rs {price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {color?.map((c) => (
                <FilterColor color={c} key={c} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {!authInfo?.profile ? (
              <Button>
                <Link to="/login">LOGIN TO ADD TO CART</Link>
              </Button>
            ) : (
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            )}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
}
