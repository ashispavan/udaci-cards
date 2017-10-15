import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

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

        console.log('INSIDE DECK: ', this.state);
    }
    

    render() {

        console.log("NAV PROPS: ", this.props.navigation)

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

export default Deck;