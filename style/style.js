import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#CECE87',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#CECE87',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  boldtext: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 15,
    margin: 5
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  textinput: {
    marginTop: 15,
    marginBottom: 30,
    flexDirection: 'row',
    textAlign: 'center'
  },
  button: {
    margin: 30,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: "darkturquoise",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  }
});