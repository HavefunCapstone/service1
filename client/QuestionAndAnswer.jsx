import "./index.css";
import React from "react";
import QuestionList from "./components/QuestionList.jsx";
import axios from "axios";


export default class QuestionAndAnswer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: [],
      product_id: 11010,
      maxQuestions: false,
      showAnswer:false,
      showQuestion: false,
      currentQuestionId:0,
      displayedQuestions: [],
      help: null,
    }
    this.showQuestion = this.showQuestion.bind(this);
    this.showAnwswer = this.showAnwswer.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    axios.get('/api/qa/questions/' + this.state.product_id)
    .then((result) => {
      console.log(result.data.results);
      this.setState({questions: result.data.results})
    })
    .catch(err => {
      console.log(err);
    })
  }



  showQuestion (){
    console.log('clicked')
    this.setState ({
      showQuestion:true, 
    })
  }

  showAnwswer (QId){
    console.log(QId,'clicked')
    this.setState ({
      showAnswer:true,
      currentQuestionId:QId
    })
  }

  
  render() {
    return (
      <div>
        <QuestionList 
        questions={this.state.questions}
        fetchData={this.fetchData}
        id={this.state.product_id}
         />
      </div>
    )
  }
}

