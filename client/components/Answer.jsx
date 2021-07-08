import React from 'react';
import moment from 'moment';
import axios from 'axios';

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reported: false,
            answer_id: 452946,
            helped: false,
            answerHelpfulCounter: 0,
        }
        this.reportAnswer = this.reportAnswer.bind(this);
        this.renderReport = this.renderReport.bind(this);
        this.increaseHelpful = this.increaseHelpful.bind(this);
        this.renderHelpful = this.renderHelpful.bind(this);
    }

    reportAnswer() {
        const id = this.state.answer_id;
        axios({
          url: `/qa/answers/${id}/report`,
          method: 'put',
        }).then(() => {
          this.setState({ reported: true });
        });
      }

      renderReport() {
        // on click update report 
          if(this.state.reported){
              return (<p className="text-red-500 px-2">Reported</p>)
          }
          return (<p className="cursor-pointer px-2" onClick={this.reportAnswer}>Report</p>)
      }

      increaseHelpful() {
        const id = this.state.answer_id;
        axios({
          url: `/qa/answers/${id}/helpful`,
          method: 'put',
        }).then(() => {
          this.setState({ helped: true });
        });
      }

      renderHelpful() {
        if (this.state.helped) {
          return (
            <>
              <button disabled >Thank you for your feedback! ({this.props.answer.helpfulness + 1})
              </button>
            </>
          );
        }
        return (
          <>
            <button className="px-2" onClick={this.increaseHelpful}>Helpful Yes ({this.props.answer.helpfulness})
            </button>
          </>
        );
      }

    render() {
        return (
            <>
            <div className="flex" >
                <p className="text-base font-semibold">A: {this.props.answer.body}</p>
            </div>
            <div className="">
                <p className="">
                    by {this.props.answer.answerer_name} at {moment(this.props.answer.date).format("MMM Do, YY")}
                </p>
            {/* on click update helpful */}
                <div className="flex text-sm text-gray-700">
                     {this.renderHelpful()} | {this.renderReport()}
                </div>
            </div><br/>
            </>
        )
    }
}
