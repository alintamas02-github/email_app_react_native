import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import { getFirestore, collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import COLORS from '../constants/colors';
import { db, auth } from '../Firebase/firebase';



const SendMail = ({ route }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
 
  

  const handleSendEmail = async () => {
    try {
      // Send the email
      await fetch("http://192.168.x.xxx:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "alex.gabor.8@gmail.com",
          to: to,
          subject: subject,
          body: body,
        }),
      });

      
      const user = auth.currentUser;
      if (user) {
        
        const userDocRef = doc(db, 'users', user.uid);
        await addDoc(collection(userDocRef, 'mail'), {
          from: "alex.gabor.8@gmail.com",
          to: to,
          subject: subject,
          body: body,
          timestamp: serverTimestamp() 
        });
      }

      
      setSuccessMessage("Email sent successfully!");
      Alert.alert('Success', 'Sent successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        
        setTo('');
        setSubject('');
        setBody('');
    
        
      }, 2000);
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to send email.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Trimite un mail </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="To"
            value={to}
            onChangeText={setTo}
            placeholderTextColor={COLORS.black}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            placeholderTextColor={COLORS.black}
          />
        </View>
        <View style={[styles.inputContainer, { height: 100 }]}>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Message"
            value={body}
            onChangeText={setBody}
            placeholderTextColor={COLORS.black}
            multiline
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Send Email" onPress={handleSendEmail} color={COLORS.primary} />
        </View>
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.black,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 18,
  },
});

export default SendMail;
