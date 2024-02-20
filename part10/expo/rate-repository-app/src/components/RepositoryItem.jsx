import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4
  },
  tag: {
    color: 'white',
    backgroundColor: '#0366d6',
    padding: 8,
    borderRadius: 4, 
  }
});

const RepositoryItem = ({ person }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={person.ownerAvatarUrl}
        />
        <View style={{flex: 1, flexWrap: 'wrap', marginTop: '5px', marginLeft: '15px'}}>
          <Text fontWeight="bold">
            {person.fullName}
          </Text>
          <Text color='textSecondary' fontSize='subheading' style={{marginTop: '10px'}}>
            {person.description}
          </Text>
          <View style={{flex: 1, flexGrow: 0, marginTop: '5px'}}>
            <Text style={styles.tag}>
              {person.language}
            </Text>
          </View>
        </View>
      </View>
      <Text>
        Stars: {person.stargazersCount}
      </Text>
      <Text>
        Forks: {person.forksCount}
      </Text>
      <Text>
        Reviews: {person.reviewCount}
      </Text>
      <Text>
        Rating: {person.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem;
