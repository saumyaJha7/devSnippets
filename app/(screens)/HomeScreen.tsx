import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import BottomNavigation from "@/components/home/BottomNavigation";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import SnippetCard from "@/components/home/SnippetCard";

const snippets = [
  {
    id: "1",
    title: "React useEffect",
    language: "JavaScript",
    tags: ["React", "Hooks"],
    favourite: true,
  },
  {
    id: "2",
    title: "JWT Authentication",
    language: "Node.js",
    tags: ["Auth", "Backend"],
    favourite: false,
  },
  {
    id: "3",
    title: "Binary Search",
    language: "C++",
    tags: ["DSA"],
    favourite: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onSettingsPress = () => {
    router.push("/(screens)/SettingsScreen");
  };

  return (
    <View style={styles.container}>
      <HomeHeader />

      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        data={snippets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <SnippetCard snippet={item} />}
      />

      <BottomNavigation onSettingsPress={onSettingsPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
});
