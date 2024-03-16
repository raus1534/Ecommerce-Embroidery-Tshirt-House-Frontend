import styled from "styled-components";
import { mobile } from "../../responsive";
import { useAuth, useNotification } from "../../hooks";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import { removeFromCart, updateCart } from "../../api/cart";
import PlaceOrderModal from "../modal/PlaceOrderModal";
import { FaArrowLeft } from "react-icons/fa";
import Empty from "./Empty";

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2;
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
  font-size: 28px;
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

export default function Cart() {
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const { authInfo, cart, setCart, cartTotal, setCartTotal } = useAuth();
  const userId = authInfo?.profile?._id;

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleOnChangeProduct = async (activity, index, productId) => {
    const productPrice = cart[index]["productDetail"]["price"];
    const previousTotal = cartTotal;
    let newTotal = previousTotal;
    if (activity === "increase") {
      cart[index]["quantity"] += 1;
      newTotal = previousTotal + productPrice;
    } else {
      const quantity = cart[index]["quantity"];
      if (quantity > 1) {
        cart[index]["quantity"] -= 1;
        newTotal = previousTotal - productPrice;
      }
    }
    setCartTotal(newTotal);
    setCart([...cart]);
    updateUserCart(productId, index, newTotal);
  };

  const updateUserCart = async (productId, index, total) => {
    const { error, updated } = await updateCart(
      userId,
      productId,
      cart[index]["quantity"],
      total
    );
    if (!updated) return updateNotification("error", error);
  };

  const removeProductFromCart = async (productId, totalPrice, index) => {
    const newTotal = cartTotal - totalPrice;

    const { updated, error } = await removeFromCart(
      userId,
      productId,
      newTotal
    );
    if (!updated) return updateNotification("error", error);
    cart.splice(index, 1);
    setCartTotal(newTotal);
    setCart([...cart]);
  };

  const handleOnPlaceOrder = () => {
    setShowPlaceOrderModal(true);
  };
  const handleClosePlaceOrderModal = () => setShowPlaceOrderModal(false);

  useEffect(() => {
    if (!userId) navigate("/", { replace: true });
  }, [navigate, userId]);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Tshirt</Title>
          <Top>
            <Link to="/">
              <TopButton>
                {<FaArrowLeft className="mr-2" />}CONTINUE SHOPPING
              </TopButton>
            </Link>
            <TopTexts>
              <TopText>Shopping Bag({cart?.length})</TopText>
            </TopTexts>
          </Top>
          {cart.length ? (
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
                        <Remove
                          onClick={() =>
                            handleOnChangeProduct(
                              "decrease",
                              index,
                              productDetail._id
                            )
                          }
                        />
                        <ProductAmount>{quantity}</ProductAmount>
                        <Add
                          onClick={() =>
                            handleOnChangeProduct(
                              "increase",
                              index,
                              productDetail._id
                            )
                          }
                        />
                      </ProductAmountContainer>

                      <Delete
                        className="text-red-500"
                        onClick={() =>
                          removeProductFromCart(
                            productDetail._id,
                            productDetail.price * quantity,
                            index
                          )
                        }
                      />

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
                  <SummaryItemPrice>Rs {cartTotal ? 110 : 0}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    Rs {cartTotal ? cartTotal + 110 : 0}
                  </SummaryItemPrice>
                </SummaryItem>

                <Button onClick={handleOnPlaceOrder}>PLACE ORDER</Button>
              </Summary>
            </Bottom>
          ) : (
            <Empty emptyMessage="Cart is Empty" />
          )}
        </Wrapper>
        <Footer />
      </Container>
      <PlaceOrderModal
        userId={userId}
        visible={showPlaceOrderModal}
        onClose={handleClosePlaceOrderModal}
      />
    </>
  );
}
