import { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function TransactionsPage() {
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  function finished(event) {
    event.preventDefault();
    const config = {
      headers: {authorization: `Bearer ${token}`}
    };
    const transacao = {value: value, description: description};
    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/tipo`, transacao, config)
      .then((res) => {
        console.log(res)
        setValue("");
        setDescription("");
        navigate("home");        
      })
      .catch((err) => console.log(err.response))
      console.log("entrou no catch")

  }


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={finished}>
        <input placeholder="Valor" type="text" onChange={e => setValue(e.target.value)}/>
        <input placeholder="Descrição" type="text" onChange={e => setDescription(e.target.value)}/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
