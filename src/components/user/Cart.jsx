import styled from "styled-components";
import { mobile } from "../../responsive";
import { useAuth } from "../../hooks";
import Footer from "./Footer";
import { placeOrder } from "../../api/order";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 200px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { authInfo, cart, cartTotal } = useAuth();
  const userId = authInfo?.profile?._id;

  const navigate = useNavigate();
  console.log(cart);

  const handleOnCheckOut = async () => {
    const { message } = await placeOrder(authInfo?.profile?._id);
    if (message) navigate("/");
  };
  useEffect(() => {
    if (!userId) navigate("/", { replace: true });
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Tshirt</Title>
          <Top>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag({cart?.length})</TopText>
            </TopTexts>
          </Top>
          <Bottom>
            <Info>
              {cart.map(({ productDetail, quantity }, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={productDetail.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {productDetail.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {productDetail._id}
                      </ProductId>
                      <ProductColor color={productDetail.color} />
                      <ProductSize>
                        <b>Size:</b> {productDetail.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <div onClick={() => handleOnAddClick(product, index)}>
                      <Add />
                    </div> */}

                      <ProductAmount>{quantity}</ProductAmount>
                      {/* <Remove /> */}
                    </ProductAmountContainer>
                    <ProductPrice>
                      Rs {productDetail.price * quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs {cartTotal}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs {cartTotal ? 590 : 0}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  Rs {cartTotal ? cartTotal + 590 : 0}
                </SummaryItemPrice>
              </SummaryItem>

              <Button onClick={handleOnCheckOut}>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
      {/* <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
        <div className="flex">
          <input type="text" />
          <Button>Place Order</Button>
        </div>
      </div> */}
    </>
  );
};

export default Cart;
