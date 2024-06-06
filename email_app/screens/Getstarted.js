import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const Getstarted = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/email.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.get}>Get</Text>
        <Text style={styles.started}>Started</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            style={[styles.button, {backgroundColor: 'black'}]}
          >
            <Text style={[styles.buttonText, {color: 'white'}]}>Am deja un cont</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace('Signup')}
            style={[styles.button, {backgroundColor: 'white'}]}
          >
            <Text style={[styles.buttonText, {color: 'black'}]}>Cont nou</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  get: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  started: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    width: '100%',
  },
  button: {
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Getstarted;
