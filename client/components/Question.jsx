import React from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx'

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      answers: [],
      question_id:47584,
      questionHelpfulCounter: 0,
      helped: false,
    }
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    axios.get('/api/qa/questions/' + this.state.question_id + '/answers')
    .then((result) => {
      console.log(result.data.results , "front");
      this.setState({answers: result.data.results})
    })
    .catch(err => {
      console.log(err);
    })
  }

  //helpfull question
  markQuestionHelpful(question_id) {
    let apiUrl = "/api/qa/questions";

    //sends the id and new author/text to our api
    axios
      .put(`${apiUrl}/${question_id}/helpful`)
      .then(() =>{ 
        this.setState({questionHelpfulCounter: 1, helped: true});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
    
      <div className="flex justify-between">
        <div className="">
          <p className="text-lg font-semibold">Q: {this.props.question.question_body}</p>
        <div className="">
          <AnswersList answers={this.state.answers} />
        </div>
          </div>
          <div className="px-48"></div>
          <div className="flex max-w-screen-xl mx-auto text-sm content-start">
          <p className="">
            Helpful
          <a className="cursor-pointer m-2" onClick={()=> this.markQuestionHelpful()}>
            Yes ({this.props.question.question_helpfulness + this.state.questionHelpfulCounter})
          </a>
          </p>
        </div><br/>
      </div>
      
    )
  }
}
