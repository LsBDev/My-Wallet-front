import { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useQuickOut } from "../../hooks/useQuickOut";

export default function TransactionsPage() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {tipo} = useParams()
  const texto = tipo === "entrada" ? "Entrada" : "Saída"
  useQuickOut()

  function finished(event) {
    event.preventDefault();
    const config = {
      headers: {authorization: `Bearer ${token}`}
    }
    const transacao = {value: value, description: description, type: tipo === "entrada" ? "income" : "expense"};
    axios.post(`${process.env.REACT_APP_API_URL}/transactions`, transacao, config)
      .then((res) => {
        console.log(res);
        setValue("");
        setDescription("");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }

  return (
    <TransactionsContainer>
      <h1>Nova {texto}</h1>
      <form onSubmit={finished}>
        <input placeholder="Valor" type="text" onChange={e => setValue(e.target.value)}/>
        <input placeholder="Descrição" type="text" onChange={e => setDescription(e.target.value)}/>
        <button type="submit">Salvar {texto}</button>
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
