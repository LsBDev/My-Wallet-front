import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo.jsx"
import { useContext, useState } from "react"
import axios from "axios";
import AuthContext from "../../contexts/AuthContext.js";

export default function SignInPage() {
  const navigate = useNavigate
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const {setToken} = useContext(AuthContext);

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    const user = {email: email, password: password };
    const URL = "https://localhost:27017/mywallet/singIn";
    axios.post(URL, user)
      .then((res) => {
        console.log(res.data);
        if(res.data.statusCode === 404) return alert("E-mail não cadastrado!");
        setDisabled(false);
        setToken(res.data.token) // O back precisa enviar um obj com a prop TOKEN ou enviar só o TOKEN
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        setDisabled(false);
      })
  }


  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} disabled={disabled} onChange={e => setEmail(e.target.value)} required/>
        <input placeholder="Senha" type="password" value={password} autocomplete="new-password"  disabled={disabled} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
