# DevSnippets

A dark-themed mobile app for saving, organizing, and reusing code snippets. Built with [Expo](https://expo.dev) (SDK 54), [expo-router](https://docs.expo.dev/router/introduction), and a local SQLite database — everything stays on-device.

## Features

- **Create snippets** — save a title, language, tags, and code body.
- **Organize** — pick from a list of supported languages and add/remove tags.
- **Browse & search** — home feed of all snippets with a live search bar.
- **Favourites** — mark snippets as favourite and view them on a dedicated screen.
- **Detail view** — read the full snippet, copy its code, edit or delete it.
- **Settings** — appearance, storage, AI, and about sections.
- **Local persistence** — snippets are stored in a `snippets` SQLite table via `expo-sqlite`.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Expo SDK 54, React Native 0.81, React 19 |
| Navigation | expo-router (file-based, typed routes) |
| Database | expo-sqlite |
| Language | TypeScript (strict) |
| Icons | @expo/vector-icons (Ionicons) |
| Lint | ESLint (`eslint-config-expo`) |

## Project structure

```
app/
  _layout.tsx              # Root stack; initializes the SQLite database on mount
  index.tsx                # Entry point -> renders HomeScreen
  (screens)/
    HomeScreen.tsx         # Snippet feed, search, bottom navigation
    CreateScreen.tsx       # Create form (title, language, tags, code)
    DetailsScreen.tsx      # Snippet detail, favourite, delete
    FavouriteScreen.tsx    # Favourited snippets
    SettingsScreen.tsx     # App preferences
    FileManagerScreen.tsx  # Placeholder (not yet implemented)
components/
  common/                  # Shared components (EmptyState, PrimaryButton - stubs)
  home/
    HomeHeader.tsx         # App title + file manager button
    SearchBar.tsx          # Search input
    SnippetCard.tsx        # Snippet list item
    BottomNavigation.tsx   # Favourite / Create (FAB) / Settings bar
db/
  db.ts                    # initDB(): opens devSnippets.db and creates the table
assets/                    # Icons, splash, and images
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npx expo start
   ```

   From the Expo CLI you can launch an Android emulator, iOS simulator, a development build, or Expo Go.

Other scripts:

```bash
npm run android   # start with Android
npm run ios       # start with iOS
npm run web       # start in the browser
npm run lint      # run ESLint
```

## Database schema

The database (`devSnippets.db`) is created on app start in `db/db.ts`:

| Column | Type | Notes |
| --- | --- | --- |
| `id` | INTEGER | Primary key, auto-increment |
| `title` | TEXT | Required |
| `code` | TEXT | Snippet body |
| `language` | TEXT | Programming language |
| `tags` | TEXT | JSON-encoded array of tags |
| `isFavourite` | INTEGER | `0`/`1`, defaults to `0` |
| `createdAT` | TEXT | Defaults to `CURRENT_TIMESTAMP` |
| `updatedAt` | TEXT | Defaults to `CURRENT_TIMESTAMP` |

## Conventions

- Import alias `@/*` maps to the project root (see `tsconfig.json`).
- Navigation uses `expo-router` typed routes under the `(screens)` group.
- Screens re-open the DB through `initDB()` for each query.

## Roadmap

- Implement `FileManagerScreen` and the `components/common` stubs.
- Wire up the Edit Snippet action.
- Copy-to-clipboard on the details screen.
- Settings for theme, font size, and AI provider / API key.
