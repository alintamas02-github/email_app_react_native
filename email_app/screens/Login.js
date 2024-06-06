import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import COLORS from '../constants/colors';
import Button from '../constants/button';

const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Success: Conectat cu succes!');
            Alert.alert('Success', 'Conectat cu succes!');
            navigation.replace('Home', { userName: user.displayName || '', userId: user.uid }); 

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
                        Bine ati revenit! 😁
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Ne bucuram sa te revedem!</Text>
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

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Password</Text>
                    <View style={{ width: "100%", height: 48, borderColor: COLORS.black, borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                        <TextInput
                            placeholder='Introduceti parola'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            value={password}
                            onChangeText={setPassword}
                            style={{ width: "100%" }}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
                            {isPasswordShown ? (
                                <Ionicons name="eye-off" size={24} color={COLORS.black} />
                            ) : (
                                <Ionicons name="eye" size={24} color={COLORS.black} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Login"
                    filled
                    onPress={handleLogin}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />

                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Nu aveti un cont? </Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold", marginLeft: 6 }}>Register</Text>
                    </Pressable>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
                    <Pressable onPress={() => navigation.navigate("Passrecovery")}>
                        <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: "bold" }}>Ai uitat parola? Recuperează parola</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
