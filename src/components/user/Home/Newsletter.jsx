import styled from "styled-components";

import { IoMdSend } from "react-icons/io";
import { mobile } from "../../../responsive";
import { useAuth, useNotification } from "../../../hooks";
import { useState } from "react";
import { isValidEmail } from "../../../utils/helper";
import { publishNewsLetter } from "../../../api/user";

const Container = styled.div`
  height: 50vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const userId = authInfo?.profile?._id;

  const publishUserNewsLetter = async () => {
    if (!userId) return updateNotification("error", "You Must Be Logged In");
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid Email");
    const { message, error } = await publishNewsLetter(userId, email);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setEmail("");
  };
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favourite products.</Desc>
      <InputContainer>
        <Input
          placeholder="Your Email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Button onClick={publishUserNewsLetter}>
          <IoMdSend />
        </Button>
      </InputContainer>
    </Container>
  );
}
