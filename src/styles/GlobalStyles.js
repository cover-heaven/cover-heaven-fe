import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size:14px;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family:"Pretendard";
    font-weight: 800;
  }
  /* ::-webkit-scrollbar {
    display: none;
  } */
  input {
    border: none;
    outline: none;  
  }
  button {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  a {
    text-decoration: none;
  }
`;
