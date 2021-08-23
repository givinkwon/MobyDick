import React from "react";
import styled, { css } from "styled-components";

// New
import Banner0Container from "./Banner0";

import Banner2Container from "./Banner2";
import Banner3Container from "./Banner3";



import { inject, observer } from "mobx-react";
import axios from "axios";


class HomeConatiner extends React.Component {
  state = {
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  };

  componentDidMount() {

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
    const { width } = this.props;

    return (
            <div style={{ overflow: "hidden" }}>
              <Banner0Container width={width} />
              <Banner2Container width={width} />
              <Banner3Container width={width} />
 
            </div>
    )
}
}
export default HomeConatiner;

