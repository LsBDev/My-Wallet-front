import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../../components/MyWalletLogo.jsx"
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate;


  function register(event) {
    event.preventDefault();
    if(password !== confirmPassword) {
      return alert("Senhas não conferem!");
    }

    setDisabled(true);
    const dataSingUp = {email: email, name: name, password: password, confirmPassword: confirmPassword}
    axios.post("https://localhost:5000/mywallet/singUp", dataSingUp)
      .then((res) => {
        console.log(res.data);
        setDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setDisabled(false);
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} disabled={disabled} required />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} required/>
        <input placeholder="Senha" type="password" value={password} autocomplete="new-password" onChange={e => setPassword(e.target.value)} disabled={disabled} required />
        <input placeholder="Confirme a senha" type="password" value={confirmPassword} autocomplete="new-password"  onChange={e => setConfirmPassword(e.target.value)} disabled={disabled} required />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
