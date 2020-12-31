import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from "styled-components";

import InfoContainer from "./Detail/Info";
import BannerContainer from './Banner'
import Step1Container from "./Step1";
import Step2Conatiner from "./Step2";
import SearchBarContainer2 from "Partner/NewSearchBar2";
import CompleteBannerContainer from "./Detail/NewComplete";
import CounterContainer from "./Counter"

import Router from 'next/router';

//counter
import 'react-count-animation/dist/count.min.css';
import AnimationCount from 'react-count-animation';

@inject('Partner','Request')
@observer
class RequestConatiner extends React.Component {

  async componentDidMount () {
    await this.props.Partner.init(); // 제품 분야 불러오기 위함
  }

  render () {
    return (

    );
  }
}

export default RequestConatiner

const MarginContainer = styled.div`
  height: 200px;
  margin-bottom: 200px;
`
