import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

export const getIdFromJWT = () => {
  const token = Cookie.get("authToken");
  const decoded = jwtDecode(token);
  console.log(decoded);
};
