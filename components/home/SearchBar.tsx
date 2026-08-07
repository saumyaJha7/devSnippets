import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#8A8F99" />

      <TextInput
        style={styles.input}
        placeholder="Search snippets..."
        placeholderTextColor="#8A8F99"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181A20",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A2D35",
    paddingHorizontal: 14,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    color: "white",
    paddingVertical: 14,
    marginLeft: 10,
    fontSize: 16,
  },
});
