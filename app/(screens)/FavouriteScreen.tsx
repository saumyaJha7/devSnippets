import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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

const FavouriteScreen = () => {
  const router = useRouter();

  const [favouriteSnippets, setFavouriteSnippets] = useState<SnippetsType[]>(
    [],
  );

  useEffect(() => {
    const fetchFavouriteSnippets = async () => {
      try {
        const dbInstance = await initDB();

        if (!dbInstance) {
          console.error("initDB returned undefined");
          return;
        }

        const favSnippets = await dbInstance.getAllAsync<SnippetsType>(
          "SELECT * FROM snippets WHERE isFavourite = true",
        );

        setFavouriteSnippets(favSnippets);
      } catch (error) {
        console.log("error while fetching fav snippets : ", error);
      }
    };

    fetchFavouriteSnippets();
  }, []);

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="heart-outline" size={30} color="#666D78" />
        </View>

        <Text style={styles.emptyTitle}>No favourites yet</Text>

        <Text style={styles.emptyDescription}>
          Snippets you mark as favourite will appear here.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={21} color="#FFFFFF" />
          </Pressable>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Favourites</Text>

            <View style={styles.countContainer}>
              <Ionicons name="heart" size={13} color="#EF4444" />

              <Text style={styles.count}>{favouriteSnippets.length}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Your most useful snippets, all in one place.
        </Text>
      </View>

      {/* Snippets */}

      <FlatList
        data={favouriteSnippets}
        keyExtractor={(item) => item.id}
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          favouriteSnippets.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 26,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,

    backgroundColor: "#181A20",

    borderWidth: 1,
    borderColor: "#282B33",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  pressed: {
    opacity: 0.65,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 8,

    backgroundColor: "#241A1D",
  },

  count: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },

  subtitle: {
    color: "#858C98",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 56,
  },

  listContent: {
    paddingBottom: 40,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 64,
    height: 64,

    borderRadius: 20,

    backgroundColor: "#181A20",

    borderWidth: 1,
    borderColor: "#282B33",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  emptyTitle: {
    color: "#E6E8EB",
    fontSize: 18,
    fontWeight: "600",

    marginBottom: 7,
  },

  emptyDescription: {
    color: "#666D78",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
});
