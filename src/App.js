import './App.css';
import './index.css';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    person: {
      fullName: 'Dridi Mohamed Amine',
      bio: 'I am a Web developer.',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRayHuIJ9-aepBq9hvVo6h54aevKLfUVlqNV9nzDXJgAUrI7RSj98BZ-GXEVeKRPIK7VHc&usqp=CAU',
      profession: 'Web Developer',
    },
    show: false,
    startTime: null,
    elapsedTime: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.show && !prevState.show) {

      this.setState({ startTime: Date.now() });
      this.intervalId = setInterval(this.updateElapsedTime, 1000);
    } else if (!this.state.show && prevState.show) {
      
      clearInterval(this.intervalId);
      this.setState({ startTime: null, elapsedTime: 0 });
    }
  }

  componentWillUnmount() {
   
    clearInterval(this.intervalId);
  }

  updateElapsedTime = () => {
    
    this.setState({
      elapsedTime: Math.floor((Date.now() - this.state.startTime) / 1000),
    });
  };

  showProfile = () => {
    this.setState({ show: true });
  };

  hideProfile = () => {
    this.setState({ show: false });
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { show, elapsedTime } = this.state;

    return (
      <div className="App">
        <h1>My Profile</h1>
        {show ? (
          <div>
            <img src={imgSrc} alt={fullName} />
            <h2>{fullName}</h2>
            <p>{bio}</p>
            <p>Profession: {profession}</p>
            <button onClick={this.hideProfile}>Hide Profile</button>
          </div>
        ) : (
          <div>
            <button onClick={this.showProfile}>Show Profile</button>
          </div>
        )}
        <p>Time Elapsed: {elapsedTime} seconds</p>
      </div>
    );
  }
}

export default App;