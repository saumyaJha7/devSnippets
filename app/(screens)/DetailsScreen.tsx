import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  console.log("id", id);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{id}</Text>
    </View>
  );
}
