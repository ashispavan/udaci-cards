import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import {createStore, applyMiddleware, compose,} from 'redux';
import {Provider} from 'react-redux';
import ReduxPromise from 'redux-promise';
import {persistStore, autoRehydrate} from 'redux-persist';
import reducer from './reducers/index';
import Decks from './components/Decks';
import Deck from './components/Deck';
import { StackNavigator, TabNavigator } from 'react-navigation';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import { AppLoading } from 'expo';


const store = createStore(reducer,  compose(
   autoRehydrate()
));

export default class App extends React.Component {

  state = {
    isReady: false
  }
  componentDidMount() {
    persistStore(store,{storage: AsyncStorage}, () => {this.setState({isReady: true})});
  }
  

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <Stack />   
      </Provider>
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
  },
  NewCard: {
    screen: NewCard
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
