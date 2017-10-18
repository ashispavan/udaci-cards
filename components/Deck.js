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
            title: this.props.navigation.state.params.title,
            questions: this.props.navigation.state.params.questions
        })

    }
    

    render() {
        return (
            
            (this.state.title ? <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.questions.length}</Text>

                <Button onPress={() => this.props.navigation.navigate('NewCard')}
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
