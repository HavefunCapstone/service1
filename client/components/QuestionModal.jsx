import React from "react";
import axios from 'axios';


export default class QuestionModal extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            showModal: false,
            body:"",
            name:"",
            email:"",
            id:props.id,
            fetchData:props.fetchData,
        };
        this.addQuestion = this.addQuestion.bind(this);
    }
    
    addQuestion() {
        const data = {
          body: this.state.body,
          name: this.state.name,
          email: this.state.email,
          product_id: this.state.id,
        };
        console.log(data);
        axios
          .post("/api/qa/questions", data)  
          .then((result) => {
              console.log(result.config.data, "gdgdghdjf")
            })
            .catch((err) => {
                console.error(err);
            });
            console.log('question add')
      }


    render() {
        return (
            <>
               <button
        className=" m-2 bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={()=>this.setState({showModal: true})}
      >
        Add Question +
      </button>
      {this.state.showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form className="text-center">
                    <h2 className="text-2xl">
                        Ask Your Question
                    </h2>
                    <h4 className="text-base">
                        About the product name
                    </h4><br/>
                    <p>What is your question? *</p>
                    <input type="text" className="w-3/4 rounded p-2 border border-gray-300 m-4" placeholder="" required onChange={(e)=>{this.setState({[e.target.name] : e.target.value})}} name="body"/>
                    <p>What is your nickname? *</p>
                    <input type="text" className="w-3/4 rounded p-2 border border-gray-300 m-4" placeholder="Example: jackson11!" required name="name" onChange={(e)=>{this.setState({[e.target.name] : e.target.value})}}/>
                    <p className="text-gray-500 text-opacity-75 text-sm">For privacy reasons, do not use your full name or email address</p>
                    <p>Your email *</p>
                    <input type="email" className="w-3/4 rounded p-2 border border-gray-300 m-4" placeholder="Why did you like the product or not?" required name="email" onChange={(e)=>{this.setState({[e.target.name] : e.target.value})}}/>
                    <p className="text-gray-500 text-opacity-75 text-sm">For authentication reasons, you will not be emailed</p>
                    </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>this.setState({showModal: false})}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>{this.setState({showModal: false});this.addQuestion()}}
                  >
                    Submit your Question
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} 
            </>
        )
    }
}
