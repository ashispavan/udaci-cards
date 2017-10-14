import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import * as API from '../helpers/asyncHelper';
import DeckItem from './DeckItem';

class Decks extends Component {

    constructor() {
        super();
        this.state = {
            decks: {}
        }
    }
    
    componentDidMount() {
        
        API.getDecks().then(result => {
            console.log("IN DECKS: ", result);
            this.setState({
                decks: result
            })
            }
        );

        
        
        
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', item)}>
            <DeckItem title={item.title} questions={item.questions} />
        </TouchableOpacity>
    )

    
    

    render() {

        console.log(this.state ? this.state.decks : "EMPTY");
        return (
            
                <FlatList 
                    data={Object.values(this.state.decks)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Decks;