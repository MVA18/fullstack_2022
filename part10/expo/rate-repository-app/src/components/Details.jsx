import React from 'react';
import { View } from 'react-native';
import Text from './Text';

const Details = ({ label, value }) => {
  const formatNumber = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
  };

  return (
    <View>
      <Text fontWeight='bold' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {formatNumber(value)}
      </Text>
      <Text color='textSecondary' fontSize='subheading' style={{marginTop: '5px'}}>
        {label}
      </Text>
    </View>
  );
};

export default Details;
