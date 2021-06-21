import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Router from 'next/router'

// components
import Nav from "components/Nav";
import Footer from "components/Footer";

import RequestDetailConatiner from "containers/Request/Detail";
import CompleteBannerContainer from "containers/Request/Detail/NewComplete";
import * as AccountAPI from "axios/Account";

@inject("Answer", "Auth")
class Complete extends React.Component {
  componentDidMount () {
        // page ip 기록
        const formData = new FormData();

        formData.append("url", window.location.href);
        console.log(window.location.href)
        const req = {
          data: formData,
        };
      
        AccountAPI.setUserPageIP(req)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
    
      }

  render() {
    return (
      <div>
        <Nav />
        <CompleteBannerContainer/>
        <Footer />
      </div>
    );
  }
};

export default withRouter(Complete);