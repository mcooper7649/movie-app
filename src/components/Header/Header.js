import React from 'react';
import './Header.css';
import ListSharpIcon from '@mui/icons-material/ListSharp';

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      👀 THE Watchlist 👀{' '}
    </span>
  );
};

export default Header;
