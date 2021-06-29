import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

// components
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import AnswerListConatiner from 'containers/Answer/List'

import * as AccountAPI from "axios/Account";

@inject('Auth', 'Answer', 'Loading')
@observer
class AnswerList extends React.Component {
  state = {
    data : null,
  }
  async componentDidMount() {
    const { Auth, Answer, Loading, router } = this.props

    // query param이 없다고 가정
    // ex) /answer/1 = ok, /answer/1?... = not ok
    const requestId = window.location.pathname.split('/').pop()

    Loading.setOpen(true)
    setTimeout(() => Loading.setOpen(false), 500)
    console.log('의뢰에 해당되는 제안서 목록 + 파트너사 정보 로딩 시작')
    if(requestId != 923){
        await Auth.checkLogin()
        // 프로젝트 id와 콜백 함수 전달
        if(Auth.logged_in_client) {
            Answer.loadAnswerListPage(Auth.logged_in_client.id, requestId, () => {
            console.log('의뢰에 해당되는 제안서 목록 로딩 끝')
        })
        }
    }

    if(requestId == 923){
        Answer.loadAnswerListPage(18, requestId, () => {
            console.log('의뢰에 해당되는 제안서 목록 로딩 끝')
        })
    }

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
    const {Loading} = this.props

    return (
      <div>
        {Loading.is_open}
        <Head>
        </Head>
        <Nav />
        <AnswerListConatiner />
        <Footer/>
      </div>
    )
  }
}

export default withRouter(AnswerList)

