import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Button, Alert} from 'react-native';
import { FormLabel, FormInput} from 'react-native-elements';
import {addDeck} from '../actions/index';
import {addNewDeck} from '../helpers/asyncHelper';
import {NavigationActions} from 'react-navigation';
import { TextField } from 'react-native-material-textfield';


class NewDeck extends Component {

    state = {
        text: ''
    }

    addDeck = () => {
        const value = this.state.text;
        if(!value) {
            Alert.alert("Error", "Title cannot be empty");
            return;
        }
        const newDeck = {[value]: {title: value, questions: []}};
        
        this.props.dispatch(addDeck(newDeck));
        addNewDeck(newDeck).then(() => {
            Alert.alert('Success', 'New Deck Added',
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Deck', {
                    title: value,
                    questions : []
                })}
            ]);
            this.setState({text: ''});
        })
    }

    render() {
        return (
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextField  label="What is the title of your new Deck?" value={this.state.text} onChangeText={text => this.setState({text})} />
                <Button  onPress={this.addDeck}
                title='Submit' />
            </KeyboardAvoidingView>
            
        );
    }
}

function mapStateToProps(state, {navigation}) {
    return {
        decks: state,
        navigation: navigation
        
    };
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%'
    },
    buttonStyle: {

    }
  });

export default connect(mapStateToProps)(NewDeck);