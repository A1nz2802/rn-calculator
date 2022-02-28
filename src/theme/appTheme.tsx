import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  calculatorContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end'
  },
  result: {
    color: 'white',
    fontSize: 40,
    textAlign: 'right',
    marginBottom: 10,
  },
  littleResult: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20,
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10
  },
  button: {
    height: 70,
    width: 70,
    backgroundColor: '#333333',
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 7
  },
  textButton: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
  }
});