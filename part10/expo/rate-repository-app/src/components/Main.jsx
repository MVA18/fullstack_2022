import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flexGrow: 1,
    flex: 1,
  },
});

const Main = () => {
  return (
    <>
    <AppBar/>
    <View style={styles.container}>
      <RepositoryList/>
    </View>
    </>
  );
};

export default Main;