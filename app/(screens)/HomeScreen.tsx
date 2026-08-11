import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import BottomNavigation from "@/components/home/BottomNavigation";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import SnippetCard from "@/components/home/SnippetCard";
import { initDB } from "@/db/db";

type SnippetsType = {
  id: string;
  title: string;
  language: string;
  tags: string[];
  favourite: boolean;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [snippets, setSnippets] = useState<SnippetsType[] | null>(null);

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const dbInstance = await initDB();

        if (!dbInstance) {
          console.error("initDB returned undefined");
          setSnippets(null);
          return;
        }

        const snippetsFromDb = await dbInstance.getAllAsync<SnippetsType>(
          "SELECT * FROM snippets",
        );
        setSnippets(snippetsFromDb);
      } catch (error) {
        console.error("Failed to load snippets:", error);
      }
    };

    loadSnippets();
  }, []);

  const onSettingsPress = () => {
    router.push("/(screens)/SettingsScreen");
  };

  const onCreatePress = () => {
    router.push("/(screens)/CreateScreen");
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
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onPress={() => {
              router.push({
                pathname: "/(screens)/DetailsScreen",
                params: {
                  id: item.id,
                },
              });
            }}
          />
        )}
      />

      <BottomNavigation
        onSettingsPress={onSettingsPress}
        onCreatePress={onCreatePress}
      />
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
