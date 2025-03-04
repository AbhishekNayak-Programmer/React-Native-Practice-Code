import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = (props) => {
  const inputStyles = [styles.input];

  if (props.textInputConfig && props.textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, props.style]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={inputStyles} {...props.textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
