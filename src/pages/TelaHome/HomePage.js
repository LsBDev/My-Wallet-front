import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import TransactionContainer from "./TransactionContainer.jsx";
import AuthContext from "../../contexts/AuthContext.js";
import axios from "axios"
import UserContext from "../../contexts/UserContext.js";

export default function HomePage() {
  const {token} = useContext(AuthContext);
  const [transacoes, setTransacoes] = useState();
  const {user} = useContext(UserContext);

  console.log(transacoes)

  useEffect(() => {
    const config = {
      headers: {authorization: `Bearer ${token}`}
    };
    axios.get(`${process.env.REACT_APP_API_URL}/home`, config)
      .then((res) => {
        setTransacoes(res.data);
      })
      .catch(err => console.log(err.response.data))
  }, [])

  // const valueList = transactions.map((op) => parseInt(op.value))
  // let soma = 0;
  // for(let i = 0; i < valueList.length; i++) {
  //   soma = soma + valueList[i];
  // }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user}</h1>
        <BiExit />
      </Header>

      <TransactionContainer transacoes={transacoes}/>

      <ButtonsContainer>
        <Link to="/nova-transacao/:entrada">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </Link>
         <Link to="/nova-transacao/:saida">
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>        
         </Link>
            
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px; 
  
  /* button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  } */
  a {
    width: 50%;
    height: 95px;
    padding: 10px;
    background: #a328d6;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    p {
      font-size: 18px;
    }
  }
`
// const Value = styled.div`
//   font-size: 16px;
//   text-align: right;
//   color: ${(props) => (props.color === "positivo" ? "green" : "red")};
// `
