import { useContext } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import dayjs from "dayjs";
import {Circles} from "react-loader-spinner"


export default function TransactionContainer() {
  const {transacoes} = useContext(UserContext);

  function total() {
    const soma = transacoes.reduce((acc, cur) => cur.type === "income" ? acc + cur.value : acc - cur.value, 0)
    return soma.toFixed(2)
  }
  const balance = total()
    
  return (
    <TransactionsContainer>
      {!transacoes ? <Circles/> : transacoes.length === 0 ? <p>Não há registros</p>: 
        <ul>
          {transacoes.map((op) =>
            <ListItemContainer>
              <div>
                <span>{dayjs(op.date).format("DD/MM")}</span>
                <strong>{op.description}</strong>
              </div>
              <Value color={op.type === "income" ? "positivo": "negativo"}>
                {op.value.toFixed(2).toString().replace(".", ",")}
              </Value>
            </ListItemContainer>
          )}
        </ul>
      }
    <article>
      <strong>Saldo</strong>
      <Value color={balance >= 0 ? "positivo" : "negativo"}>{balance.toString().replace(".", ",")}</Value>
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
  ul {
    overflow-y: auto;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  article {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid lightgray;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const Value = styled.div`
  font-size: 18px;
  text-align: right;
  font-weight: 600;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`