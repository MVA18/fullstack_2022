import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import Details from './Details';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flex: 0,
    flexDirection: 'row',
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
  },
  details: {
    marginLeft: '20px'
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
        <View style={{flex: 1, flexShrink: 2, marginTop: '5px', marginLeft: '15px'}}>
          <Text fontWeight="bold">
            {person.fullName}
          </Text>
          <Text color='textSecondary' fontSize='subheading' style={{marginTop: '10px'}}>
            {person.description}
          </Text>
          <View style={{flexDirection: 'row', marginTop: '5px'}}>
            <Text style={styles.tag}>
              {person.language}
            </Text>
        </View>
        </View>
      </View>
      <View style={{flex: 1, flexShrink: 2, flexDirection:'row', justifyContent: 'space-between', marginTop: '20px', marginLeft: '20px', marginRight: '50px'}}>
      <Details value={person.stargazersCount} label={'Stars'} />
      <Details value={person.forksCount} label={'Forks'} />
      <Details value={person.reviewCount} label={'Reviews'} />
      <Details value={person.ratingAverage} label={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;
