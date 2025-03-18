import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PlayerScreen, PlaylistScreen } from "@/screen";
import { RootStackParamList } from "@/types";
import * as SplashScreen from "expo-splash-screen";
const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
    </Stack.Navigator>
  );
}
