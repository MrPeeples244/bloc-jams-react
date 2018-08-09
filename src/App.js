import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div className="navContainer">
              <div id="landingLink">
                <Link to='/'><img src="./assets/images/bloc_jams_logo.png" alt="blocjamslogo" /></Link>
              </div>
              <div id="hero-title">
                Turn the music up!
              </div>
              <div id="libraryLink">
                <Link to='/library'>Library</Link>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
