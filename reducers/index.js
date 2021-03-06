import {ADD_NEW_DECK, ADD_NEW_QUESTION, FETCH_DECKS} from '../actions'

export default function decksReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {...state, ...action.decks};

        case ADD_NEW_DECK:
            return {...state, ...action.deck};

        case ADD_NEW_QUESTION:
            const {title, questions, question, answer} = action.params;
            const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ]);

            return {
                ...state,
                [title]: {...state[title], questions: newQuestions},
            };

        default:
            return state;
    }
}
