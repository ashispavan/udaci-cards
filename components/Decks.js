import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../actions/index';
import { Button } from 'react-native-elements';
import * as API from '../helpers/asyncHelper';
import DeckItem from './DeckItem';

class Decks extends Component {

    state = {
        ready: false
    }
    
    componentDidMount() {      
        API.getDecks().then(result => {
            // console.log("IN DECKS: ", result);
            this.props.getDecks(result);
            this.setState({
                ready: !this.state.ready
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

        return (
            
                <FlatList 
                    data={Object.values(this.props.decks)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
}

// function mapDispatchToProps() {
//     return {
//         fetchAllDecks: getDecks
//     }
// }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default connect(mapStateToProps, {getDecks})(Decks);