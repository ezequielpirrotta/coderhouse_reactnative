import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Mi primera app de Android!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: '2px',
    borderColor: 'solid black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
