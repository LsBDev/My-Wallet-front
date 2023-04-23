import styled from "styled-components";
import dayjs from "dayjs";

export default function TransactionsPage() {
const dados = {
  value: "valor",
  description: "description",
  day: dayjs().format("DD"/"MM") // setar os dados aqui e usar na tela de mostrar transacoes (usar context)
}


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type="text"/>
        <input placeholder="Descrição" type="text" />
        <button>Salvar TRANSAÇÃO</button>
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
