import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Components/Navigation';
import { AuthProvider } from './Context/context';

export default function App() {
  return (
  <AuthProvider>
    <Navigation/>
  </AuthProvider>
  );
}

