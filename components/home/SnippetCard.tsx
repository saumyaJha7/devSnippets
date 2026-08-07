import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type Snippet = {
  id: string;
  title: string;
  language: string;
  tags: string[];
  favourite: boolean;
};

type Props = {
  snippet: Snippet;
  onPress?: () => void;
};

export default function SnippetCard({ snippet, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
    >
      <View>
        <Text style={styles.title}>{snippet.title}</Text>

        <Text style={styles.subtitle}>
          {snippet.language} • {snippet.tags.join(" • ")}
        </Text>
      </View>

      <View style={styles.right}>
        {snippet.favourite && (
          <Ionicons
            name="heart"
            size={18}
            color="#EF4444"
            style={{ marginBottom: 8 }}
          />
        )}

        <Ionicons name="chevron-forward" size={22} color="#888" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#181A20",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2D35",
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  right: {
    alignItems: "center",
  },
});
