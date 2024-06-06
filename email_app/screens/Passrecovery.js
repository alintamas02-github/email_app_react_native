// PassRecovery.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebase'; 
import COLORS from '../constants/colors';
import Button from '../constants/button';

const PassRecovery = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Success', 'Password reset email sent!');
        } catch (error) {
            console.error('Error:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Recuperare Parolă
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Introduceți adresa de email pentru a recupera parola.</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Email</Text>
                    <View style={{ width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                        <TextInput
                            placeholder='Introduceti adresa de mail'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                            style={{ width: "100%" }}
                        />
                    </View>
                </View>

                <Button
                    title="Trimite"
                    filled
                    onPress={handlePasswordReset}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default PassRecovery;
