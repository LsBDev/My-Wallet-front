import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"


export default function TransactionContainer() {
  const {transacoes} = useContext(UserContext);
  

  console.log(transacoes) 
    
    return (
      <TransactionsContainer>
      <ul>
      {transacoes.map((op) =>
          <ListItemContainer>
            <div>
              <span>{op.date}</span>
              <strong>{op.description}</strong>
            </div>
            <Value color={parseInt(op.value) < 0 ? "negativo": "positivo"}>{op.value}</Value>
          </ListItemContainer>
        )}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value color={"positivo"}>00,00</Value>
      </article>
    </TransactionsContainer>
    )
}


const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  overflow-x: hidden;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`