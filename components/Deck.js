import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';

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

        return (
            
            (this.state.title ? <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.questions.length}</Text>

                <Button
                raised
                icon={{name: 'cached'}}
                title='Start Quiz' />


            </View> : <View><Text>Nothing</Text></View>
            )
            
        );
    }
}

export default Deck;