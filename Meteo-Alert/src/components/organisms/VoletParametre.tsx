import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import Button from '../atoms/Button';
import { t } from 'i18next';
import Logo from '../atoms/Logo';
import { useUtilisateur } from '../../services/context/UtilisateurContext';
import Field from '../molecules/Field';
import dtMotDePasse from '../../models/datatype/dtMotDePasse';
import ReglesMDP from '../atoms/ReglesMDP';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

interface VoletParametreProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoletParametre: React.FC<VoletParametreProps> = ({ isOpen, onClose }) => {
  const { utilisateur, modifierMotDePasse, deconnexion } = useUtilisateur();

  const [ancienMotDePasseValue, setAncienMotDePasseValue] = useState<string>("");
  const [motDePasseValue, setMotDePasseValue] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<dtMotDePasse | null>(null);

  const motDePasseRegles = dtMotDePasse.checkRules(motDePasseValue);

  useEffect(() => {
    const rules = dtMotDePasse.checkRules(motDePasseValue);
    if (!Object.values(rules).includes(false)) {
      setMotDePasse(new dtMotDePasse(motDePasseValue));
    }
  }, [motDePasseValue]);

  const handleModifierMotDePasse = async () => {
    if (!motDePasse) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Modification du mot de passe impossible",
        textBody: "Le nouveau mot de passe ne respecte pas les règles attendues",
        button: "Fermer",
      });

      return;
    }

    try {
      await modifierMotDePasse(ancienMotDePasseValue, motDePasse.value)
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Modification du mot de passe terminée",
        textBody: "Votre mot de passe a bien été modifié !",
        button: "Fermer",
      });
    } catch (error: any) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Modification du mot de passe impossible",
        textBody: t(`erreur.auth.${error}`),
        button: "Fermer",
      });
    }
  }

  const handleDeconnexion = async () => {
    await deconnexion();
  };

  return (

    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.volet}>
        
        <TouchableOpacity onPress={onClose}>
          <View style={styles.closeButtonLogo} >
            <Logo imageSource={require('../../assets/icons/icon-refus.png')} color='white' size={30} />
          </View>
        </TouchableOpacity>

        {/* Contenu du volet */}
        <View style={styles.voletContent} >
          <Text style={styles.text}>{utilisateur?.getPrenom()}</Text>
          <Text style={styles.text}>{utilisateur?.getMail()}</Text>

          {/* Formulaire de modification de mot de passe */}
          <Field onChangeText={setAncienMotDePasseValue} iconSource={require('../../assets/icons/key-solid.png')} fieldName={"Ancien mot de passe"} isPassword />
          <Field onChangeText={setMotDePasseValue} iconSource={require('../../assets/icons/key-solid.png')} fieldName={"Nouveau mot de passe"} isPassword />
          <ReglesMDP
            rules={motDePasseRegles}
          />

          <Button
            onPress={handleModifierMotDePasse}
            title={"Modifier votre mot de passe"}
            styleBtn="noBg"
          />
          {/* Bouton de connexion */}
          <Button
            onPress={handleDeconnexion}
            title={t('voletParametre.deconnexion')}
            styleBtn="noBg"
          />
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  volet: {
    width: '80%',
    height: '100%',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#1E375A',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  voletContent: {
    marginTop: 50,
    height: "90%",
  },
  closeButtonLogo: {
    color: '#FFF',
    fontSize: 16,
    padding: 10,
  },
  text: {
    color: "white",
    marginLeft: 20,
    fontSize: 15
  }
});

export default VoletParametre;
