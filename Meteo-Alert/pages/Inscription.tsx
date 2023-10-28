import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';

const Inscription = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleInscription = () => {

    // Exemple fictif de Inscription
    if (email && motDePasse && prenom) {
      // Connectez-vous avec serviceCompte
      serviceCompte.inscription(email, motDePasse, {"prenom": prenom})
        .then((utilisateur) => {
          console.log(utilisateur);
          navigation.navigate('Accueil');
        })
        .catch((error) => {
          // Gérez les erreurs de Inscription ici
          console.error('Erreur de Inscription :', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Inscription</Text>

      {/* Formulaire de prénom */}
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      
      {/* Formulaire d'adresse e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      {/* Formulaire de mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true} // Masque le mot de passe
        value={motDePasse}
        onChangeText={setMotDePasse}
      />

      {/* Bouton de Inscription */}
      <Pressable style={styles.button} onPress={handleInscription}>
        <Text>Inscription</Text>
      </Pressable>

      {/* Bouton pour aller à la page d'inscription */}
      <Pressable onPress={() => navigation.navigate('Connexion')}>
        <Text>Aller à la connexion</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '20%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor:'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Inscription;