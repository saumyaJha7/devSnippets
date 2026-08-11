import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

export default function DetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const snippetId = Array.isArray(id) ? id[0] : id;

  const [snippetDetails, setSnippetDetails] = useState<SnippetsType | null>(
    null,
  );

  useEffect(() => {
    const fetchSnippetDetails = async () => {
      try {
        const dbInstance = await initDB();

        if (!dbInstance) {
          console.error("initDB returned undefined");
          return;
        }

        const snippet = await dbInstance.getFirstAsync<SnippetsType>(
          "SELECT * FROM snippets WHERE id = ?",
          snippetId,
        );

        setSnippetDetails(snippet);
      } catch (error) {
        console.error("Failed to load snippet details:", error);
      }
    };

    fetchSnippetDetails();
  }, [id]);

  if (!snippetDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading snippet...</Text>
      </View>
    );
  }

  const tags = Array.isArray(snippetDetails.tags) ? snippetDetails.tags : [];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={21} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerActions}>
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={snippetDetails.favourite ? "heart" : "heart-outline"}
                size={21}
                color={snippetDetails.favourite ? "#EF4444" : "#FFFFFF"}
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="ellipsis-horizontal" size={21} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Title */}

        <View style={styles.titleSection}>
          <Text style={styles.title}>{snippetDetails.title}</Text>

          <View style={styles.languageContainer}>
            <View style={styles.languageDot} />

            <Text style={styles.language}>{snippetDetails.language}</Text>
          </View>
        </View>

        {/* Tags */}

        <View style={styles.tagsContainer}>
          {tags.map((tag: any) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Code */}

        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <View style={styles.codeLanguage}>
              <Ionicons name="code-slash" size={16} color="#858C98" />

              <Text style={styles.codeLanguageText}>
                {snippetDetails.language}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.copyButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="copy-outline" size={16} color="#AEB5C0" />

              <Text style={styles.copyText}>Copy</Text>
            </Pressable>
          </View>

          <View style={styles.codeBody}>
            <Text style={styles.code}>{snippetDetails.code}</Text>
          </View>
        </View>

        {/* Metadata */}

        <View style={styles.metadata}>
          <View>
            <Text style={styles.metadataLabel}>Created</Text>

            <Text style={styles.metadataValue}>{snippetDetails.createdAt}</Text>
          </View>

          <View>
            <Text style={styles.metadataLabel}>Updated</Text>

            <Text style={styles.metadataValue}>{snippetDetails.updatedAt}</Text>
          </View>
        </View>

        {/* Edit Button */}

        <Pressable
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.editButtonPressed,
          ]}
        >
          <Ionicons name="create-outline" size={19} color="#FFFFFF" />

          <Text style={styles.editButtonText}>Edit Snippet</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F1115",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#858C98",
    fontSize: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 30,
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: "#181A20",

    borderWidth: 1,
    borderColor: "#282B33",

    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.65,
  },

  titleSection: {
    marginBottom: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,

    marginBottom: 10,
  },

  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  languageDot: {
    width: 7,
    height: 7,
    borderRadius: 4,

    backgroundColor: "#5E81F4",

    marginRight: 8,
  },

  language: {
    color: "#858C98",
    fontSize: 14,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,

    marginBottom: 24,
  },

  tag: {
    backgroundColor: "#20232A",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 8,
  },

  tagText: {
    color: "#AEB5C0",
    fontSize: 12,
  },

  codeContainer: {
    backgroundColor: "#121419",

    borderWidth: 1,
    borderColor: "#282B33",

    borderRadius: 16,

    overflow: "hidden",

    marginBottom: 24,
  },

  codeHeader: {
    height: 48,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#181A20",

    borderBottomWidth: 1,
    borderBottomColor: "#282B33",
  },

  codeLanguage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  codeLanguageText: {
    color: "#858C98",
    fontSize: 12,
  },

  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 7,
  },

  copyText: {
    color: "#AEB5C0",
    fontSize: 12,
  },

  codeBody: {
    padding: 16,
  },

  code: {
    color: "#D7DAE0",
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 22,
  },

  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 4,

    marginBottom: 28,
  },

  metadataLabel: {
    color: "#666D78",
    fontSize: 11,

    marginBottom: 5,
  },

  metadataValue: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  editButton: {
    height: 54,

    borderRadius: 15,

    backgroundColor: "#5E81F4",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  editButtonPressed: {
    opacity: 0.8,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
