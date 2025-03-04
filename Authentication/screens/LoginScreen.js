import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContent = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const idToken = await login(email, password);
      authContent.authenticate(idToken);
    } catch (err) {
      Alert.alert(
        "Authentication Failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Logging you in..." />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
