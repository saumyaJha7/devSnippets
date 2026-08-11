import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { initDB } from "../../db/db";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "Go",
  "Rust",
];

export default function CreateScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [showLanguages, setShowLanguages] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    const getDbInstance = async () => {
      const dbInstance = await initDB();
      setDb(dbInstance);
    };
    getDbInstance();
  }, []);

  const handleCreateSnippet = async () => {
    // 1. validate the input
    // 2. insert to db
    // 3. get the inserted id
    // 4. navigate to the snippet detail screen with the id

    if (!title || !code || !language) {
      alert("Please fill all the required fields");
      return;
    }

    const result = await db.runAsync(
      `INSERT INTO snippets
   (title, code, language, tags, isFavourite)
   VALUES (?, ?, ?, ?, ?)`,
      [title, code, language, JSON.stringify(tags), false],
    );

    const snippetId = result.lastInsertRowId;

    router.push({
      pathname: "/(screens)/DetailsScreen",
      params: {
        id: snippetId.toString(),
      },
    });
  };

  const addTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    // Prevent duplicate tags
    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, newTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

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
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.heading}>Create Snippet</Text>

          <Text style={styles.description}>Save a reusable piece of code</Text>
        </View>

        {/* Title */}

        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>

          <TextInput
            placeholder="e.g. React useEffect"
            placeholderTextColor="#666D78"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Language */}

        <View style={styles.field}>
          <Text style={styles.label}>Language</Text>

          <Pressable
            onPress={() => setShowLanguages((prev) => !prev)}
            style={({ pressed }) => [
              styles.input,
              pressed && styles.inputPressed,
            ]}
          >
            <Text
              style={[styles.placeholder, language && styles.selectedLanguage]}
            >
              {language || "Select language"}
            </Text>

            <Ionicons
              name={showLanguages ? "chevron-up" : "chevron-down"}
              size={18}
              color="#858C98"
            />
          </Pressable>

          {showLanguages && (
            <View style={styles.languageList}>
              {LANGUAGES.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setLanguage(item);
                    setShowLanguages(false);
                  }}
                  style={({ pressed }) => [
                    styles.languageOption,
                    pressed && styles.languageOptionPressed,
                  ]}
                >
                  <Text style={styles.languageText}>{item}</Text>

                  {language === item && (
                    <Ionicons name="checkmark" size={18} color="#5E81F4" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Tags */}

        <View style={styles.field}>
          <Text style={styles.label}>Tags</Text>

          <View style={styles.tagsContainer}>
            {/* Existing tags */}

            {tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>

                <Pressable onPress={() => removeTag(tag)} hitSlop={8}>
                  <Ionicons name="close" size={14} color="#9CA3AF" />
                </Pressable>
              </View>
            ))}

            {/* Input */}

            <TextInput
              value={tagInput}
              onChangeText={setTagInput}
              placeholder="Add a tag..."
              placeholderTextColor="#666D78"
              style={styles.tagInput}
              onSubmitEditing={addTag}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              onPress={addTag}
              hitSlop={8}
              style={({ pressed }) => [
                styles.addTagButton,
                pressed && styles.addTagButtonPressed,
              ]}
            >
              <Ionicons name="add" size={20} color="#5E81F4" />
            </Pressable>
          </View>

          <Text style={styles.helper}>Press enter or + to add a tag</Text>
        </View>

        {/* Code */}

        <View style={styles.field}>
          <Text style={styles.label}>Code</Text>

          <TextInput
            placeholder="// Write your code here..."
            placeholderTextColor="#666D78"
            style={styles.codeInput}
            multiline
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            value={code}
            onChangeText={setCode}
          />
        </View>

        {/* Create */}

        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.createButtonPressed,
          ]}
          onPress={handleCreateSnippet}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />

          <Text style={styles.createButtonText}>Create Snippet</Text>
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

  header: {
    marginBottom: 32,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#181A20",
    borderWidth: 1,
    borderColor: "#282B33",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  pressed: {
    opacity: 0.65,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  description: {
    color: "#858C98",
    fontSize: 15,
    marginTop: 6,
  },

  field: {
    marginBottom: 22,
  },

  label: {
    color: "#E6E8EB",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
  },

  input: {
    minHeight: 52,
    backgroundColor: "#181A20",
    borderWidth: 1,
    borderColor: "#282B33",
    borderRadius: 14,
    paddingHorizontal: 15,

    color: "#FFFFFF",
    fontSize: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    color: "#666D78",
    fontSize: 15,
  },

  helper: {
    color: "#666D78",
    fontSize: 12,
    marginTop: 7,
  },

  codeInput: {
    height: 230,
    backgroundColor: "#121419",
    borderWidth: 1,
    borderColor: "#282B33",
    borderRadius: 14,

    padding: 15,

    color: "#E6E8EB",
    fontSize: 14,
    fontFamily: "monospace",

    lineHeight: 21,
  },

  createButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#5E81F4",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    marginTop: 8,
  },

  createButtonPressed: {
    opacity: 0.8,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  inputPressed: {
    opacity: 0.8,
  },

  selectedLanguage: {
    color: "#FFFFFF",
  },

  languageList: {
    marginTop: 8,

    backgroundColor: "#181A20",
    borderWidth: 1,
    borderColor: "#282B33",
    borderRadius: 14,

    overflow: "hidden",
  },

  languageOption: {
    minHeight: 48,

    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#282B33",
  },

  languageOptionPressed: {
    backgroundColor: "#22252D",
  },

  languageText: {
    color: "#E6E8EB",
    fontSize: 15,
  },

  tagsContainer: {
    minHeight: 52,

    backgroundColor: "#181A20",
    borderWidth: 1,
    borderColor: "#282B33",
    borderRadius: 14,

    paddingHorizontal: 10,
    paddingVertical: 8,

    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",

    gap: 8,
  },

  tagChip: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#252933",

    borderRadius: 8,

    paddingHorizontal: 10,
    paddingVertical: 7,

    gap: 5,
  },

  tagText: {
    color: "#D7DAE0",
    fontSize: 13,
  },

  tagInput: {
    flex: 1,

    minWidth: 100,

    color: "#FFFFFF",
    fontSize: 14,

    paddingVertical: 6,
    paddingHorizontal: 4,
  },

  addTagButton: {
    width: 32,
    height: 32,

    borderRadius: 8,

    justifyContent: "center",
    alignItems: "center",
  },

  addTagButtonPressed: {
    opacity: 0.6,
  },
});
