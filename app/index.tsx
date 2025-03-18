import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, PlayerScreen } from "@/screen";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
}
