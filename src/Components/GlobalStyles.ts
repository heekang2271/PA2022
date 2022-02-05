import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-family: 'Poppins', 'Spoqa Han Sans Neo', sans-serif;
    line-height: 1.5;
  }

  a {
    color: inherit;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
  }

  textarea {
    font-family: inherit;
    color: inherit;
    resize: none;
    border: none;
    outline: none;
  }
`;

export default GlobalStyles;
