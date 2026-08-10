import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
};

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onPress,
  showChevron = true,
}: SettingRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#B8C0CC" />
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>

        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>

      {value && <Text style={styles.value}>{value}</Text>}

      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color="#666D78" />
      )}
    </Pressable>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.sectionContainer}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
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
              pressed && styles.backButtonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.heading}>Settings</Text>

          <Text style={styles.description}>Manage your app preferences</Text>
        </View>

        {/* Appearance */}

        <SettingsSection title="APPEARANCE">
          <SettingRow icon="contrast-outline" title="Theme" value="System" />

          <View style={styles.divider} />

          <SettingRow
            icon="text-outline"
            title="Editor Font Size"
            value="14"
            showChevron={false}
          />
        </SettingsSection>

        {/* Storage */}

        <SettingsSection title="STORAGE">
          <SettingRow
            icon="server-outline"
            title="Storage Usage"
            subtitle="24 snippets • 8 files"
          />

          <View style={styles.divider} />

          <SettingRow icon="refresh-outline" title="Clear Cache" />
        </SettingsSection>

        {/* AI */}

        <SettingsSection title="AI">
          <SettingRow
            icon="sparkles-outline"
            title="AI Provider"
            subtitle="Configure code explanations"
          />

          <View style={styles.divider} />

          <SettingRow
            icon="key-outline"
            title="API Key"
            subtitle="Securely stored on device"
          />
        </SettingsSection>

        {/* About */}

        <SettingsSection title="ABOUT">
          <SettingRow
            icon="information-circle-outline"
            title="About DevSnippets"
          />

          <View style={styles.divider} />

          <SettingRow
            icon="code-slash-outline"
            title="Version"
            value="1.0.0"
            showChevron={false}
          />
        </SettingsSection>

        <Text style={styles.footer}>DevSnippets</Text>

        <Text style={styles.footerVersion}>Built for developers</Text>
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
    paddingTop: 70,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 34,
    flex: 1,
    alignItems: "flex-start",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  description: {
    color: "#858C98",
    fontSize: 15,
    marginTop: 6,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    color: "#737B88",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },

  sectionContainer: {
    backgroundColor: "#181A20",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#282B33",
    overflow: "hidden",
  },

  row: {
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 12,

    flexDirection: "row",
    alignItems: "center",
  },

  rowPressed: {
    opacity: 0.65,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 11,

    backgroundColor: "#22252D",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,
  },

  rowContent: {
    flex: 1,
  },

  rowTitle: {
    color: "#F2F3F5",
    fontSize: 15,
    fontWeight: "500",
  },

  rowSubtitle: {
    color: "#7E8692",
    fontSize: 12,
    marginTop: 4,
  },

  value: {
    color: "#858C98",
    fontSize: 14,
    marginRight: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#282B33",
    marginLeft: 65,
  },

  footer: {
    color: "#555C68",
    textAlign: "center",
    fontSize: 13,
    marginTop: 4,
  },

  footerVersion: {
    color: "#414751",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
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

  backButtonPressed: {
    opacity: 0.65,
  },
});
