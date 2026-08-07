import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onFavouritePress?: () => void;
  onCreatePress?: () => void;
  onSettingsPress?: () => void;
};

export default function BottomNavigation({
  onFavouritePress,
  onCreatePress,
  onSettingsPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.item} onPress={onFavouritePress}>
        <Ionicons name="heart-outline" size={24} color="#fff" />
        <Text style={styles.text}>Favourite</Text>
      </Pressable>

      <Pressable style={styles.fab} onPress={onCreatePress}>
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>

      <Pressable style={styles.item} onPress={onSettingsPress}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
        <Text style={styles.text}>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,

    backgroundColor: "#181A20",
    borderRadius: 22,

    borderWidth: 1,
    borderColor: "#2A2D35",

    paddingVertical: 14,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  item: {
    alignItems: "center",
  },

  text: {
    color: "#C5C8CE",
    fontSize: 12,
    marginTop: 5,
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5E81F4",

    justifyContent: "center",
    alignItems: "center",

    marginTop: -40,

    borderWidth: 4,
    borderColor: "#0F1115",
  },
});
