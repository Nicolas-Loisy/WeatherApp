import React from 'react';
import { View, Text, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>Page profile</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>
      <Text>Page d'accueil</Text>

      <Button
        title="Aller a la Home Page"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

export default Profile;
