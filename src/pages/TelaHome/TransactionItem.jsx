import styled from "styled-components"


export default function TransactionItem({transactions}) {
    
    return (
        transactions.map((op) => 
            <ListItemContainer>
            <div>
              <span>{op.date}</span>
              <strong>{op.description}</strong>
            </div>
            <Value color={parseInt(op.value) < 0 ? "negativo": "positivo"}>{op.value}</Value>
          </ListItemContainer>
        )
    )
}

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
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`