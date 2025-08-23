import { useLogin } from "../../context/login.context";

export const Profile = () => {
  const { id, name, email, token } = useLogin();

};