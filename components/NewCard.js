import React from 'react';
import {View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView} from 'react-native';
import { TextField } from 'react-native-material-textfield';



export default class SingleDeck extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    addQuestion = () => {

    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <TextField  label="Question" value={this.state.question} onChangeText={(text) => this.setState({question: text})} />
                <TextField label="Answer" value={this.state.answer} onChangeText={(text) => this.setState({answer: text})} />                
                <Button style={style.submitButton} onPress={this.addQuestion} title="Submit" />
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '75%'
    },
    submitButton: {
        marginTop: '50'
    }
});
