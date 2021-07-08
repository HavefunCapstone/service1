import React from 'react';
import Answer from './Answer.jsx';

export default class AnswersList extends React.Component {
    render() {
        return (    
            <div>
                {this.props.answers.map(answer => {
                    return (<Answer answer={answer} key={answer.id} />)
                })}
            </div>
        )
    }
}
