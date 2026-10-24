import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Stack } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import { Text } from 'react-native';
import migrations from '../src/infrastructure/db/migrations/migrations';

export const unstable_settings = {
  anchor: '(tabs)',
};

const expoDb = openDatabaseSync('mydb.db');
const db = drizzle(expoDb);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Text>Meus ovos</Text>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
