import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useNotification } from "../hooks";

const Container = styled.div`
  height: 87vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    /* url("https://blog.placeit.net/wp-content/uploads/2022/12/t-shirt-mockup-featuring-a-happy-woman-showing-her-thumbs-up-m25773-r-el2.png")
    center; */
      url("https://designs4yall.com/cdn/shop/products/unisex-staple-t-shirt-athletic-heather-front-63cd9804c49f0.jpg?v=1674418201&width=1445")
      center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { user, error } = await registerUser(registerInfo);
    if (error) return updateNotification("error", error);
    if (user) {
      updateNotification("success", "Account Registered Successfully");
      navigate("/login", { user });
    }
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="firstName" placeholder="name" onChange={handleChange} />
          <Input
            name="lastName"
            placeholder="lastname"
            onChange={handleChange}
          />
          <Input
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <Input name="email" placeholder="email" onChange={handleChange} />
          <Input
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Input
            name="rePassword"
            placeholder="confirm password"
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}
