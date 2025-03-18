import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, PlayerScreen } from "@/screen";
import { RootStackParamList } from '@/types';
const Stack = createStackNavigator<RootStackParamList>(); 

export default function Index() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen  name="Player" component={PlayerScreen} />
      </Stack.Navigator>
  );
}
