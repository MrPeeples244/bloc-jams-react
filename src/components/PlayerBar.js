import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" className="controls" onClick={this.props.handlePrevClick}>
            <span className="player-icon ion-ios-skipbackward"></span>
          </button>
          <button id="play-pause" className="controls" onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'ion-ios-pause' : 'ion-ios-play'}></span>
          </button>
          <button id="next" className="controls"onClick={this.props.handleNextClick}>
            <span className="player-icon ion-ios-skipforward"></span>
          </button>
        </section>
          <div id="ranges">
            <section id="buffer"></section>
            <section id="time-control">
              <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
              <input
                type="range"
                className="seek-bar-time"
                value={(this.props.currentTime / this.props.duration) || 0}
                max="1"
                min="0"
                step="0.001"
                onChange={this.props.handleTimeChange}
                />
              <div className="total-time">{this.props.formatTime(this.props.duration) || 0}</div>
            </section>
            <section id="volume-control">
              <div className="icon ion-volume-low"></div>
              <input
              type="range"
              className="seek-bar-volume"
              value={this.props.volume}
              onChange={this.props.handleVolChange}
              max="1"
              min="0"
              step=".01"
              />
              <div className="icon ion-volume-high"></div>
            </section>
        </div>
      </section>
    );
  }
}

export default PlayerBar;
