import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import icon from '../../assets/img/meet.png';

class Popup extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    //fetch from local storage every time the popup is activated
    chrome.storage.sync.get(['meetID'], (result) => {
      console.log('Value currently is ' + result);
      this.setState({
        id: result.meetID,
      });
    });
    chrome.storage.sync.get(['email'], (result) => {
      console.log('Value currently is ' + result);
      this.setState({
        email: result.email,
      });
    });

    //Listens to messages sent by background
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === 'something_completed') {
        //  To do something
        console.log(request);

        this.setState({
          isLoading: false,
          id: request.meetID,
          email: request.org,
        });
      }
      if (request.msg === 'copy_link') {
        this.copyToClip();
      }
      if (request.msg === 'user_changed') {
        console.log('inside user change');
        this.setState({
          isLoading: false,
        });
      }
      if (request.msg === 'btn_press') {
        console.log('inside btn press');
        this.setState({
          isLoading: true,
        });
      }
    });
  }

  switchUser = () => {
    this.setState({
      id: '',
      email: '',
      isLoading: true,
    });

    chrome.storage.sync.set({ meetID: '' }, function () {
      console.log('Value is set to null');
    });
    chrome.storage.sync.set({ email: '' }, function () {
      console.log('Value is set to null');
    });

    chrome.runtime.sendMessage({ message: 'switch_user' });
  };

  createMeet = () => {
    this.setState({
      isLoading: true,
    });
    console.log('creating');
    chrome.runtime.sendMessage({ message: 'get_event' });
  };

  copyToClip = () => {
    console.log('Copying...');
    let content = document.getElementById('con');
    content.select();
    document.execCommand('copy');
  };

  render() {
    return (
      <div className="App">
        <div className="nav">
          <div className="welcome"></div>
          <div className="switch">
            <h3 onClick={this.switchUser} className="switch-img">
              Switch User
            </h3>
          </div>
        </div>

        <div className="main">
          <div className="container">
            <div className="meet">
              <div className="icon">
                <img src={icon} width="40px" alt="" />
              </div>
              <button
                className="meetBtn"
                onClick={this.createMeet}
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <div className="loader"></div>
                ) : (
                  <span>&#x2b; &nbsp;New meeting</span>
                )}
              </button>
            </div>
            <div className="shortcut">
              <p className="clipboard-para">
                Click above or press Alt+N to create a new meeting
              </p>
            </div>
          </div>
          {this.state.id && (
            <div className="clipboard">
              <div>
                <input
                  className="clipboard-input"
                  id="con"
                  onClick={this.copyToClip}
                  value={this.state.id}
                  readOnly="readOnly"
                />
                <p className="clipboard-para">
                  Click above to copy the Link or press Alt+C
                </p>
              </div>
            </div>
          )}
        </div>
        {this.state.email && (
          <div>
            <p className="footer">Organizer: {this.state.email}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Popup;
