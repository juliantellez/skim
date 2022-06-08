import React from 'react';
import logo from '../../public/skim.png';
import './Home.css';
import { ConnectToTwitter } from '../../modules/Twitter/ConnectToTwitter';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <ConnectToTwitter />
      </header>
    </div>
  );
}

export default Home;
