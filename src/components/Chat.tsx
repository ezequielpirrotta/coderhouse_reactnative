import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import io, { Socket } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket: Socket = io('http://tu-servidor-websockets');

  useEffect(() => {
    // Conéctate al servidor de WebSockets al montar el componente
    socket.connect();

    // Maneja los mensajes recibidos
    socket.on('message', (message: IMessage) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [message]));
    });

    // Desconéctate del servidor cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    if (newMessages.length === 0) {
      return;
    }

    const { _id, createdAt, text, user } = newMessages[0];

    const newMessage: IMessage = {
      _id: _id || messages.length + 1,
      text,
      createdAt: createdAt || new Date(),
      user: user || {
        _id: 1,
        name: 'Usuario', // Puedes personalizar el nombre del usuario
      },
    };

    // Envía el mensaje al servidor a través de WebSockets
    socket.emit('message', newMessage);

    // Actualiza el estado local con el nuevo mensaje
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));

    // Limpia el cuadro de entrada
    setInputMessage('');
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          placeholder="Escribe un mensaje..."
        />
      </View>
    </View>
  );
};
'<Button title="Enviar" onPress={() => onSend(inputMessage)} />'

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
   },
   input: {
      flex: 1,
      height: 40,
      marginRight: 10,
      borderColor: 'darkCream',
      borderWidth: 1,
      paddingLeft: 10,
   },
});

export default Chat;
