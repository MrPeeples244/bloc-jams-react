import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHover: false,
      volume: 50
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime});
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumecontrol: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    }
    else {
        if (!isSameSong) {this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = currentIndex+1;
    if (newIndex < this.state.album.songs.length) {
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }
    else {
      const newSong = this.state.album.songs[0];
      this.setSong(newSong);
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolChange(e) {
    const newVol = e.target.value;
    this.audioElement.volume = newVol;
    this.setState({ volume: newVol });
  }

  setIcon(song, index) {
      if(this.state.isPlaying && this.state.currentSong === song){
          return <span className="ion-ios-pause"></span>;
      }
      if(!this.state.isPlaying && this.state.currentSong === song){
          return <span className="ion-ios-play"></span>;
      }
      if(this.state.isHover !== song){
          return <span>{index+1}</span>;
      }
      else{
          return <span className="ion-ios-play"></span>;
      }
  }

  formatTime(time) {
    if(typeof time !== 'number'){
      return <span>"--:--"</span>
    }
    else{
      const mins = Math.floor(time/60);
      const secs = Math.trunc(time%60);
      if(typeof secs !== 'number'){
        return <span>"--:--"</span>
      }
      if(typeof mins !== 'number'){
        return <span>"--:--"</span>
      }
      if(secs<10){
        return <span>{"0"+mins+":0"+secs}</span>
      }
      else return <span>{"0"+mins+":"+secs}</span>
    }}


  handleHover(song) {
    this.setState({ isHover: song });
  }

  handleHoverOff(song) {
    this.setState({ isHover: false });
  }


  render() {
    return (
      <section className="album">
        <div className="album-container">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover}
               alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map( (song, index) =>

              <tr className="song" key={index}
              onClick={() => this.handleSongClick(song)}
              onMouseEnter={() => this.handleHover(song)}
              onMouseLeave={() => this.handleHoverOff(song)}>


                <td>{this.setIcon(song, index)}</td>
                <td>{song.title}</td>
                <td>{this.formatTime(Number(song.duration))}</td>
              </tr>
            )
          }
          </tbody>
        </table>
        </div>
        <PlayerBar
        isPlaying={this.state.isPlaying}
        currentSong={this.state.currentSong}
        currentTime={this.audioElement.currentTime}
        duration={this.audioElement.duration}
        currentVol={this.audioElement.volume}
        handleSongClick={() => this.handleSongClick(this.state.currentSong)}
        handlePrevClick={() => this.handlePrevClick()}
        handleNextClick={() => this.handleNextClick()}
        handleTimeChange={(e) => this.handleTimeChange(e)}
        handleVolChange={(e) => this.handleVolChange(e)}
        formatTime={(time) => this.formatTime(time)}
        />
      </section>
    );
  }
}

export default Album;
