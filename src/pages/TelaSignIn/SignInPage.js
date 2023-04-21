import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo.jsx"
import { useState } from "react"
import axios from "axios";

export default function SignInPage() {
  const navigate = useNavigate
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(false);

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    const user = {email: email, password: password };
    const URL = "url aqui -> usar dotenv"; //url de exemplo. ver url certa quando o back estiver pronto.
    axios.post(URL, user)
      .then((res) => {
        console.log(res.data);
        setDisabled(false);
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
