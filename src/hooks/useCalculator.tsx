import { useRef, useState } from 'react';

enum Operators {
  addition, substraction, multiplication, division
}

export const useCalculator = () => {
  
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

  const calculate = () => {
    // transform strings to numbers
    const numberOne = Number( number );
    const numberTwo = Number( previousNumber );

    switch( lastOperation.current ) {
      case Operators.addition:
        setNumber( `${ numberOne + numberTwo }` );
        break;
      
      case Operators.substraction:
        setNumber( `${ numberTwo - numberOne }` );
        break;

      case Operators.multiplication:
        setNumber( `${ numberOne * numberTwo }` );
        break;

      case Operators.division:
        setNumber( `${ numberTwo / numberOne }` );
        break;
    }

    setPreviousNumber('0');
  }

  return {
    buildNumber,
    clean,
    positiveNegative,
    calculate,
    btnAddition,
    btnSubstraction,
    btnMultiplication,
    btnDelete,
    btnDivision,
    number,
    previousNumber,
  }
}
