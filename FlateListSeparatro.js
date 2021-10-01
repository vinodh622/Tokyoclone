

import React from 'react'
import {
    View,
  } from 'react-native';
import {StylesAll} from './commanStyle/objectStyle';

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: 'lightgray',
        }}
      />
    );
  };

  export default FlatListItemSeparator
  