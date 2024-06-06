import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inbox from '../components/inbox';
import SendMail from '../components/sendmail';

const Home = ({ route, navigation }) => {
    const { userName = '', userId } = route.params;
    const [name, setName] = useState(userName || '');
    const [loading, setLoading] = useState(!userName);
    const [currentScreen, setCurrentScreen] = useState('Inbox');

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        if (!userId) return;

        const fetchUserDetails = async () => {
            try {
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name);
                } else {
                    setName('Utilizatorul nu există');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setName('Eroare la obținerea detaliilor utilizatorului');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleNavigation = (screenName) => {
        setCurrentScreen(screenName);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcome}>Bine ați venit,</Text>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{name}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon name="logout" size={25} color="#999" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                {currentScreen === 'Inbox' ? <Inbox /> : <SendMail navigation={navigation} />}
            </View>
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Inbox')}>
                    <Icon name="inbox" size={30} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('SendMail')}>
                    <Icon name="send" size={30} color="#999" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 10,
        padding: 16,
    },
    welcome: {
        fontSize: 14,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    logoutButton: {},
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#f8f8f8',
    },
    navButton: {
        padding: 10,
    },
});

export default Home;
