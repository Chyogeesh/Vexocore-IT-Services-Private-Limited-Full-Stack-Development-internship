import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import API from '../api';
import * as Notifications from 'expo-notifications';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { token } = await Notifications.getExpoPushTokenAsync();
      const { data } = await API.post('/auth/login', { email, password, fcmToken: token.data });
      localStorage.setItem('token', data.token); // Use AsyncStorage in production
      localStorage.setItem('user', JSON.stringify(data.user));
      navigation.navigate('Tasks');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
