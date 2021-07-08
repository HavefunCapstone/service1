import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
import { Scrollbars } from 'react-custom-scrollbars-2';

export default class QuestionList extends React.Component {
    constructor(props){
        super(props); 
        console.log(props,"first")
        this.state = {
            beginSearsh: false,
            inputSearch: "",
            showQuestion: 2,
        };
        this.handelChangeSearch = this.handelChangeSearch.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    handelChangeSearch(e) {
        // console.log(e.target.value)
        if(e.target.value.length > 3) {
          this.setState({ beginSearsh: true });
        } else {
          this.setState({ beginSearsh: false });
        }
        this.setState({ inputSearch: e.target.value });
      }

      loadMore() {
        this.setState({
          showQuestion: this.state.showQuestion + 2
        })
      }
    
    render() {
        // {console.log(questions, "anis")}
        // var tempProps = JSON.parse(JSON.stringify(this.props));
        //     Object.preventExtensions(tempProps);
        //     console.log(tempProps, "second");
        // const { questionsList } = this.props.questions;
        return (
            <>
            <div>
               <div className="flex">
                <input value={this.state.inputSearch} onChange={this.handelChangeSearch} className="w-3/4 rounded p-2 border border-gray-300 m-4" type="text" placeholder="Have a question? Search for answers…" />
                <button className="bg-white w-auto flex justify-end items-center text-gray-500 p-2 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                </button>
                </div> 
            </div>
            <div className="p-8">
                <h2 className="text-xl font-bold">Question & Answer:</h2><br/>
                <div className="flex flex-col">
                <Scrollbars autoHeight autoWidth autoHeightMin={300} autoHeightMax={500} autoShow>
                { this.props.questions
                .sort((a, b) =>(a.question_helpfulness > b.question_helpfulness) ? -1 : 1)
                .filter((ele, idx) => idx < this.state.showQuestion && (!this.state.beginSearsh || ele.question_body.includes(this.state.inputSearch)))
                .map(question =>{
                    console.log(question)
                    return(<Question question={question}
                    key={question.question_id} />)}  
                )}
                </Scrollbars>
                </div>
                <div className="">
                    <button onClick={this.loadMore} className="border-1 border-gray-800 bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150">
                        More Answered Questions
                    </button>
                    {/* <button className="" onClick={()=>this.props.addQuestion()}>
                        Add a Question +
                    </button> */}
                    <QuestionModal fetchData={this.props.fetchData} id={this.props.id} />
                </div>
            </div>
            </>
        )
    }
}
