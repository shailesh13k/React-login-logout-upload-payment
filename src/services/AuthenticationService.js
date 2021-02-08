import axios from "axios";
import { API_BASE_URL } from "./apiConstants";
class AuthenticationService {
  signin = (email, password) => {
    return axios
      .post(API_BASE_URL + "/api/auth/signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("authorization", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  signOut() {
    localStorage.removeItem("authorization");
  }

  register = async (firstName, lastName, mobile, email, password) => {
    return axios.post(API_BASE_URL + "/api/auth/signup", {
      firstName,
      lastName,
      mobile,
      email,
      password,
    });
  };

  getCurrentUser() {
    //alert(localStorage.getItem("user"));
    return JSON.parse(localStorage.getItem("authorization"));
  }
}

export default new AuthenticationService();
