import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebase';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Inbox = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser.uid;
        const mailRef = collection(db, 'users', userId, 'mail');
        const q = query(mailRef);

        const getMessages = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const messagesData = [];
                querySnapshot.forEach((doc) => {
                    const message = { id: doc.id, ...doc.data() };
                    messagesData.push(message);
                });
                setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching messages: ', error);
            }
        };

        getMessages();
    }, []);

    const deleteMessage = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'mail', id));
            setMessages(messages.filter(message => message.id !== id));
        } catch (error) {
            console.error('Error deleting message: ', error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {messages.length === 0 ? (
                <Text style={styles.noMailText}>Niciun mail momentan</Text>
            ) : (
                messages.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <View style={styles.messageTextContainer}>
                            <Text style={styles.label}>De la:</Text>
                            <Text style={styles.messageText}>{message.from}</Text>
                            <Text style={styles.label}>Catre:</Text>
                            <Text style={styles.messageText}>{message.to}</Text>
                            <Text style={styles.label}>Subiect:</Text>
                            <Text style={styles.messageText}>{message.subject}</Text>
                            <Text style={styles.label}>Mesaj:</Text>
                            <Text style={styles.messageText}>{message.body}</Text>
                            {message.timestamp && (
                                <>
                                    <Text style={styles.label}>Data:</Text>
                                    <Text style={styles.messageText}>{formatDate(message.timestamp)}</Text>
                                </>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => deleteMessage(message.id)}>
                            <Icon name="trash" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    messageContainer: {
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 20,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
    },
    messageTextContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#000',
        marginBottom: 2,
    },
    messageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    noMailText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    }
});

export default Inbox;
