import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

class App extends Component {
  componentDidMount() {
    axios.get('/messanger/getMessages')
      .then((res) => {
        this.props.updateMessages(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSubmit = () => {
    this.props.submitMessage();
  }

  handleTextChange = (e) => {
    this.props.handlTextChange(e.target.value);
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="message-area">
            {this.props.messages.map((message, i) => <Message key={i} data={message} />)}
          </div>
        </div>
        <div>
          <input type="text" value={this.props.text} onChange={this.handleTextChange} />
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
    text: state.messageReducer.text,
  };
};

const mapDispatchToProps = { updateMessages, handlTextChange, submitMessage };

export default connect( // from react-redux
  mapStateToProps,
  mapDispatchToProps,
)(App);
