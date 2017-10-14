import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Decks from './components/Decks';
import Deck from './components/Deck';
import { StackNavigator, TabNavigator } from 'react-navigation';
import NewDeck from './components/NewDeck';


export default class App extends React.Component {
  render() {
    return (
        <Stack />   
    );
  }
}

const Tabs = TabNavigator({
  Home: {
    screen: Decks
  },
  NewDeck: {
    screen: NewDeck
  }
});


const Stack = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  }
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
