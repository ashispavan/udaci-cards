import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {

    state = {
        title: '',
        questions: []
    }

    componentDidMount() {
        this.setState({
            title: this.props.navigation.state.params.title
        })

    }
    

    render() {

        const {title} = this.state;
        const questions = this.props.decks[title] && this.props.decks[title].questions;
        return (
            
            (title ? <View>
                <Text>{title}</Text>
                <Text>{questions.length}</Text>

                <Button onPress={() => this.props.navigation.navigate('NewCard', {title, questions})}
                title='Add Card' />
                <Button onPress={() => console.log('Quiz started')}
                title='Start Quiz' />


            </View> : <View><Text>Nothing</Text></View>
            )
            
        );
    }
}

function mapStateToProps(state, {navigation}) {
    return {
        decks: state,
        navigation: navigation
    };
}

export default connect(mapStateToProps)(Deck);
