import { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const idToken = await createUser(email, password);
      authContext.authenticate(idToken);
    } catch (error) {
      Alert.alert(
        "Authentication Failed!",
        "Could not create user, Please check your inputs or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
