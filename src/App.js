import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/TelaHome/HomePage"
import SignInPage from "./pages/TelaSignIn/SignInPage.js"
import SignUpPage from "./pages/TelaSignUp/SignUpPage.js"
import TransactionsPage from "./pages/TelaTransaction/TransactionPage.js"
import { useState } from "react"
import AuthContext from "./contexts/AuthContext"
import UserContext from "./contexts/UserContext"

export default function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [transacoes, setTransacoes] = useState([]);
  // o usuário tb por contexto e qq outra coisa necessária
  

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserContext.Provider value={{user, setUser, transacoes, setTransacoes}}>
        <PagesContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
            </Routes>
          </BrowserRouter>
        </PagesContainer>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
