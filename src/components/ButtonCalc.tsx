import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
  width?: boolean;
  action: ( textNumber: string ) => void;
}

const ButtonCalc = ({ text, color = '#2D2D2D', width = false, action }: Props ) => {
  return (
    <TouchableOpacity
      onPress={ () => action( text ) }
    >
      <View 
        style={{
          ...styles.button,
          backgroundColor: color,
          width: ( width ) ? 154 : 70,
        }}
      >
        <Text 
          style={{
            ...styles.textButton,
            color: ( color === '#9B9B9B' ) ? 'black' : 'white'
          }}
        >
          { text }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonCalc;