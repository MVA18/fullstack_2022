import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
    text: {
    paddingTop: Constants.statusBarHeight + 25,
    textAlign: 'left',
    padding: 25,
    color: 'white',
    backgroundColor: '#24292e'
  },
});

const AppBar = () => {
  return <View>
    <Text  style={styles.text}>Repositories</Text>
  </View>;
};

export default AppBar;