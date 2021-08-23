import React from "react";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

// test
import HomeConatiner from "containers/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const logo_ic = "/static/images/components/MobileNav/MobileLogo.svg";

class Home extends React.Component {
  state = {
    width: null,
  };
  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    return (
      <>
        <Head>
          {/*Tradingview*/}
          <title>MOBYDICK</title>
        </Head>

        <div onContextMenu={(e) => e.preventDefault()}>

          <>
            {width && (
              <HomeConatiner width={width} reqList={Home.request_list} /> // 볼트앤너트 메인 페이지
            )}
          </>

        </div>
      </>
    );
  }
}

export default Home;
