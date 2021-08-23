import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import App from "next/app";

import { Provider } from "mobx-react";
import { createGlobalStyle } from "styled-components";
import ScrollToTop from "components/ScrollToTop";
import stores from "stores";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// CSS Reset Code
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a{
    text-decoration:none;
    color:inherit;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    overflow-x: hidden;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .slick-disabled {
    display: none;
  }
  @font-face {
    font-family: "Roboto-iOS";
    src: url("/public/fonts/Roboto-Black.ttf") format('truetype');
    font-weight: 500;
  }
`;

class MyApp extends App {
  state = {
    ie_user: false,
    modal_shown: false,
    prepare: true,
    location: "",
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      ie_user: false,
      modal_shown: true,
      prepare: false,
    });
  };
  componentDidMount() {
    const { Home } = this.props;
    const userAgent = window.navigator.userAgent;
  }
  
  render() {
    const { Component, pageProps, Home } = this.props;
    return (
      <ScrollToTop>
        {console.log(this.state.modal_shown)}
        <GlobalStyle />

        <Provider {...stores}>
          <Component {...pageProps} />
        </Provider>
      </ScrollToTop>
    );
  }
}

export default MyApp;
