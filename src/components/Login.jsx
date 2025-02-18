import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useAuth, useNotification } from "../hooks";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 87vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://designs4yall.com/cdn/shop/products/unisex-staple-t-shirt-athletic-heather-front-63cd9804c49f0.jpg?v=1674418201&width=1445")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const validateLoginInInfo = (loginInfo) => {
  const { username, password } = loginInfo;
  if (!username.trim()) return { ok: false, error: "Username is Missing" };
  if (!password.trim()) return { ok: false, error: "Password is Missing" };
  return { ok: true };
};

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const { handleLogin } = useAuth();
  const { updateNotification } = useNotification();

  const { username, password } = loginInfo;
  const handleClick = (e) => {
    e.preventDefault();
    const { error, ok } = validateLoginInInfo(loginInfo);
    if (!ok) return updateNotification("error", error);
    handleLogin(username, password);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <Container>
      <Wrapper>
        <Title className="text-center">SIGN IN</Title>
        <Form>
          <Input
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={username}
          />
          <Input
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link to="/register" className="pt-2 text-sm">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}
