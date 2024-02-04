import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ServiceCompteFactory from '../services/compteUtilisateur/ServiceCompteFactory';
import Button from '../components/atoms/Button';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import ClickableText from '../components/atoms/ClickableText';
import Field from '../components/molecules/Field';
import { useTranslation } from 'react-i18next';
import { useUser } from '../services/context/UserContext';
import LogoMeteo from '../assets/icons/svg/logo-meteo.svg';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import MyStatusBar from '../components/atoms/MyStatusBar';

const Connexion = () => {
  const { t } = useTranslation();
  
  // hook useUser pour accéder au contexte d'utilisateur
  const { setUtilisateur, utilisateur } = useUser();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const serviceCompte = ServiceCompteFactory.getServiceCompte();

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  /*const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);*/

  const handleConnexion = () => {
    // Vérification de la validité de l'email et du mot de passe
    /*if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!motDePasse) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }*/

    if (email && motDePasse) {
      serviceCompte.connexion(email, motDePasse)
        .then((utilisateurConn) => {
          setUtilisateur(utilisateurConn); // fonction du contexte pour mettre à jour l'utilisateur

          navigation.navigate('Accueil');
        })
        .catch((error) => {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: t("connexion.popup.title"),
            textBody: t("connexion.popup.body"),
            button: t("connexion.popup.btn"),
          });
        })
      ;
    }
  };

  return (
    <>
      <MyStatusBar/>
        <LayoutTemplate>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 0}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.inner}>
                <LogoMeteo {...styles.logoMeteo}/>
                <Text style={styles.text}>{t('connexion.titre')}</Text>

                {/* Formulaire d'adresse e-mail */}
                <Field onChangeText={setEmail} iconSource={require('../assets/icons/at-solid.png')} fieldName={t('connexion.email')} keyboardType='email-address' autoCorrect={false} onSubmitEditing={handleConnexion}/>
                {/* Formulaire de mot de passe */}
                <Field onChangeText={setMotDePasse} iconSource={require('../assets/icons/key-solid.png')} fieldName={t('connexion.mdp')} keyboardType='visible-password' onSubmitEditing={handleConnexion} isPassword/>

                <View style={styles.viewForgetMdp}>
                  <ClickableText
                    text={t('connexion.forget_mdp')}
                    onPress={() => null}
                  />
                </View>

                {/* Bouton de connexion */}
                <Button
                    onPress={handleConnexion}
                    title={t('connexion.connexion')}
                    styleBtn="whiteBg"
                />

                {/* Bouton pour aller à la page d'inscription */}
                <Button
                    onPress={() => navigation.navigate('Inscription')}
                    title={t('connexion.redirect_inscription')}
                    styleBtn="noBg"
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </LayoutTemplate>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  text: {
    color: 'white',
    fontSize: 80,
    fontFamily: 'Jomhuria-Regular',
  },
  logoMeteo: {
    width: 200,
    height: 200,
  },
  viewForgetMdp: {
    width: '85%', 
    alignItems:"flex-end", 
    marginBottom: 30
  }
});

export default Connexion;
