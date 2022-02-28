import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import ButtonCalc from '../components/ButtonCalc';
import { styles } from '../theme/appTheme';

enum Operators {
  addition, substraction, multiplication, division
}

const CalculatorScreen = () => {

  const [ previousNumber, setPreviousNumber ] = useState('0')
  const [ number, setNumber ] = useState('0');

  const lastOperation = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  };

  const buildNumber = ( textNumber: string ) => {
    
    // not accept double point
    if ( number.includes('.') && textNumber === '.' ) return;

    if ( number.startsWith('0') || number.startsWith('-0') ) {
      
      // decimal point
      if ( textNumber === '.' ) {
        setNumber( number + textNumber );

      // another cero and there is a point
      } else if( textNumber === '0' && number.includes('.') ) {
        setNumber( number + textNumber );

      // diferent than cero and don't have a point
      } else if( textNumber !== '0' && !number.includes('.') ) {
        setNumber( textNumber );
        
      // avoid 0000.0
      } else if ( textNumber === '0' && !number.includes('.') ) {
        setNumber( number );
      } else {
        setNumber( number + textNumber )
      }
      
    } else {
      setNumber( number + textNumber );
    }
  };

  const positiveNegative = () => {
    if ( number.includes('-') ) {
      setNumber( number.replace('-', '') );
    } else {
      setNumber( '-' + number );
    }
  };

  const btnDelete = () => {

    // number have a value
    if ( number.length === 1 ) {
      setNumber('0')
    // number have two values and start with negative
    } else if ( number.length === 2 && number.startsWith('-') ) {
      setNumber('0')
    } else {
      // delete last value
      setNumber(number.slice(0, -1));
    }
  };

  const changePreviousNumber = () => {
    if ( number.endsWith('.') ) {
      setPreviousNumber( number.slice(0,-1) );
    } else {
      setPreviousNumber( number );
    }
    setNumber('0');
  };

  const btnDivision = () => {
    changePreviousNumber();
    lastOperation.current = Operators.division;
  }

  const btnMultiplication = () => {
    changePreviousNumber();
    lastOperation.current = Operators.multiplication;
  }

  const btnAddition = () => {
    changePreviousNumber();
    lastOperation.current = Operators.addition;
  }

  const btnSubstraction = () => {
    changePreviousNumber();
    lastOperation.current = Operators.substraction;
  }

  return (
    <View style={ styles.calculatorContainer }>
      {
        ( previousNumber !== '0' ) && (
          <Text style={ styles.littleResult }>{ previousNumber }</Text>
        )
      }
      <Text 
        style={ styles.result }
        numberOfLines={ 1 }
        adjustsFontSizeToFit
      >
        { number }
      </Text>

      {/* Row of buttons */}
      <View style={ styles.row }>
        <ButtonCalc text="C" color="#9B9B9B" action={ clean } />
        <ButtonCalc text="+/-" color="#9B9B9B" action={ positiveNegative } />
        <ButtonCalc text="del" color="#9B9B9B" action={ btnDelete } />
        <ButtonCalc text="/" color="#FF9427" action={ btnDivision } />
      </View>

      <View style={ styles.row }>
        <ButtonCalc text="7" action={ buildNumber } />
        <ButtonCalc text="8" action={ buildNumber } />
        <ButtonCalc text="9" action={ buildNumber } />
        <ButtonCalc text="x" color="#FF9427" action={ btnMultiplication } />
      </View>

      <View style={ styles.row }>
        <ButtonCalc text="4" action={ buildNumber } />
        <ButtonCalc text="5" action={ buildNumber } />
        <ButtonCalc text="6" action={ buildNumber } />
        <ButtonCalc text="-" color="#FF9427" action={ btnSubstraction } />
      </View>

      <View style={ styles.row }>
        <ButtonCalc text="1" action={ buildNumber } />
        <ButtonCalc text="2" action={ buildNumber } />
        <ButtonCalc text="3" action={ buildNumber } />
        <ButtonCalc text="+" color="#FF9427" action={ btnAddition } />
      </View>

      <View style={ styles.row }>
        <ButtonCalc text="0" width action={ buildNumber } />
        <ButtonCalc text="." action={ buildNumber } />
        <ButtonCalc text="=" color="#FF9427" action={ buildNumber } />
      </View>        

    </View>
  )
}

export default CalculatorScreen;