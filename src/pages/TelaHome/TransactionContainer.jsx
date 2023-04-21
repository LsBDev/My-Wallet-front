import styled from "styled-components"
import TransactionItem from "./TransactionItem.jsx"

export default function TransactionContainer() {
    // const [saldo, setSaldo] = useState(0)
    const transactions = [
      {date: "30/11", description: "Almoço mãe", value: "-120,00"}, 
      {date: "15/11", description: "Salário", value: "3000,00"},
      {date: "16/11", description: "Desconto Salário", value: "-2500,00"}
  ]
    
    
    return (
        <TransactionsContainer>
        <ul>
          <TransactionItem transactions={transactions}/>
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