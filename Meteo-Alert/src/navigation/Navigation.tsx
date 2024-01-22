import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Demo from "../screens/Demo";

import Connexion from "../screens/Connexion";
import Inscription from "../screens/Inscription";
import Accueil from "../screens/Accueil";
import DetailLieu from "../screens/DetailLieu";
import RechercheLieu from "../screens/RechercheLieu";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Demo" component={Demo} options={{headerShown: false}}/>
        <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
        <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="RechercheLieu" component={RechercheLieu} options={{ headerShown: false }} />
        <Stack.Screen name="DetailLieu" component={DetailLieu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
