import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


export function useQuickIn() {
  const {user} = useContext(UserContext)
  const {token} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(token || user) navigate("/home")
  }, [user, token, navigate])
}