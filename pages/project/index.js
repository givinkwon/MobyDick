import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Router from "next/router";

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import ProjectContainer from 'containers/Project'

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject('Project', 'Auth', 'Home', 'Answer', 'Loading') // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Project extends React.Component {
  state={
    width:null,
  }

  
  async componentDidMount() {
    const { Project, Auth, Home, Answer, Loading } = this.props

    //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    
    //Project.init()
    


    Home.init()
    Loading.setOpen(true)
    setTimeout(() => Loading.setOpen(false), 500)

    // 중복
    await Auth.checkLogin()

    Project.getToken()

    // if(Auth.logged_in_client) {
    //   console.log('클라이언트 의뢰 목록 로딩 시작')
    //   Answer.loadCategories()
    //   Answer.loadClientRequestList(Auth.logged_in_client.id, () => {
    //     console.log('클라이언트 의뢰 목록 로딩 끝')
    //   })
    // }

    if(Auth.logged_in_client) {
      console.log('프로젝트 목록 로딩 시작')
      
      console.log(Auth.logged_in_client)
      Project.getPage(Auth.logged_in_client.id, () => {
        console.log('프로젝트 목록 로딩 끝')
      })

  //     Project.getPage(918, () => {
  //       console.log('프로젝트 목록 로딩 끝')
  //       console.log(Project.project_count)
  //  })
    }
    else{      
      alert("로그인이 필요합니다");
      Router.push("/login");        
    }
    //Project.getNextPage()
    

    // if(Auth.logged_in_client) {
    //   console.log('프로젝트 목록 로딩 시작')
      
    //   Project.loadProject(Auth.logged_in_client.id, () => {
    //     console.log('프로젝트 목록 로딩 끝')
    //   })

    //   // Project.loadProject(954, () => {
    //   //      console.log('프로젝트 목록 로딩 끝')
    //   // })
    // }
    
    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { Project, Loading } = this.props
    const { width } = this.state;
    const gray = "#f6f6f6"
    return (
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
        { width > 767.98 ? (
          <Nav />
          ) : (         
          <div>
            <MobileNav src={ back_ic } headText={ "프로젝트 관리" } width={width}/>
            <div style={{ height: '65px'}}></div>
          </div> 
          )
        }
        </>
        <ProjectContainer width={width} length = { Project.project_length }/>
        
        <Footer color={gray}/>
      </div>
    )
  }
}

export default Project