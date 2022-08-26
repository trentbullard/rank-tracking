import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  <h1 className="ui center aligned header" style={{ paddingTop: "3em" }}>
    <Link href="/">MultiRank</Link>
    <span className="ui red sub header">BETA</span>
  </h1>
};

export default Header;
