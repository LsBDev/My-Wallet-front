import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo.jsx"
import { useContext, useState } from "react"
import axios from "axios";
import AuthContext from "../../contexts/AuthContext.js";
import UserContext from "../../contexts/UserContext.js";
import { useQuickIn } from "../../hooks/useQuickIn.js";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const {setToken} = useContext(AuthContext);
  const {setUser} = useContext(UserContext);

  useQuickIn()

  function login(event) {
    event.preventDefault();
    setDisabled(true);
    const user = {email: email, password: password};
    axios.post(`${process.env.REACT_APP_API_URL}/signIn`, user)
      .then((res) => {
        console.log(res.data);
        if(res.data.statusCode === 404) return console.log("E-mail não cadastrado!");
        setDisabled(false);
        setToken(res.data.token);
        setUser(res.data.userName);
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", res.data.userName)
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
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

      <Cadastro to="/cadastro">
        Primeira vez? Cadastre-se!
      </Cadastro>
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
const Cadastro = styled(Link)`
  margin-top: 15px;
`
