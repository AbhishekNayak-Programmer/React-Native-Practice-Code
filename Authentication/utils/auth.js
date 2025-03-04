import axios from "axios";

const API_KEY = "AIzaSyBsuCYbPKmfEbtHdLjHi3VEkojJUNUpMRI";

const Authenticate = async (mode, email, password) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data.idToken;
};

export const createUser = (email, password) => {
  return Authenticate("signUp", email, password);
};

export const login = (email, password) => {
  return Authenticate("signInWithPassword", email, password);
};
