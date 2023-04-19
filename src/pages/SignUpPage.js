import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [disabled, setDisabled] = useState(false);


  function register(event) {
    event.preventDefault();
    setDisabled(true);
    const dataSingUp = {email: email, name: name, password: password, newPassword: newPassword}
    axios.post("url aqui", dataSingUp)
      .then((res) => {
        console.log(res.data);
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} disabled={disabled} required />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} required/>
        <input placeholder="Senha" type="password" value={password} autocomplete="new-password" onChange={e => setPassword(e.target.value)} disabled={disabled} required />
        <input placeholder="Confirme a senha" type="password" value={newPassword} autocomplete="new-password"  onChange={e => setNewPassword(e.target.value)} disabled={disabled} required />
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
