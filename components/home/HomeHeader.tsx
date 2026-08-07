import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onFileManagerPress?: () => void;
};

export default function HomeHeader({ onFileManagerPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DevSnippets</Text>

      <Pressable onPress={onFileManagerPress}>
        <Ionicons name="folder-open-outline" size={26} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  heading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
});
