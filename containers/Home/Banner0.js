import React from "react";
import styled from "styled-components";
import Router from "next/router";

//Components
import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";

//Image
const background = "static/images/Home/main.jpg";

class Banner0Container extends React.Component {
  render () {
    return (
    <Background src={background}>
      <Containerv1 style={{paddingBottom: 336, paddingTop: 279, justifyContent: 'space-between'}}>
        <div>
          <Title.FontSize56 color={WHITE} shadow={"0 3px 6px rgba(0,0,0,0.61);"} fontWeight={"500"} style={{lineHeight: 1.49}}> 
            내 제품 제작 비용과<br/>
            전문 제조사를<br/>
            바로 만나보세요.
          </Title.FontSize56>
          <Buttonv1 style={{marginTop: 71}}>
            지금 무료 가견적 받기
          </Buttonv1>
        </div>
        <Info>
          <InfoCell> 
            <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center'}} color={'#ffffff'}>
              총 프로젝트 금액
            </Content.FontSize24>
             <br/>
            <Content.FontSize32 eng={true} fontWeight={"bold"} color={'#ffffff'}>
              2,000,000,000 
            </Content.FontSize32>  
          </InfoCell>
          <InfoCell>
            <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center'}} color={'#ffffff'}>
              의뢰 프로젝트
            </Content.FontSize24>
             <br/>
            <Content.FontSize32 eng={true} style={{textAlign: 'center'}} fontWeight={"bold"} color={'#ffffff'}>
              300+ 
            </Content.FontSize32>
          </InfoCell>
          <InfoCell> 
            <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center'}} color={'#ffffff'}>
              개발 전문업체
            </Content.FontSize24>
             <br/>
            <Content.FontSize32 eng={true} style={{textAlign: 'center'}} fontWeight={"bold"} color={'#ffffff'}>
              450+ 
            </Content.FontSize32>  
          </InfoCell>
        </Info>
      </Containerv1>
    </Background>
    );
  }
  }

export default Banner0Container;

const Info = styled.div`
 display: table;
 padding-top: 116px;
 div:nth-of-type(1) {
  padding-right: 23.5px;
 }
 div:nth-of-type(2) {
   width: 204px;
   border : 2px;
   border-left: solid white 1px;
   border-right: solid white 1px;
 }
 div:nth-of-type(3) {
  padding-left: 37.5px;
 }
`
const InfoCell = styled.div`
 display: table-cell;
 text-align: center;
 height: 91px;
 font-size: 24px;
 font-weight: normal;
 font-stretch: normal;
 font-style: normal;
 line-height: 1.67;
 letter-spacing: -0.6px;
 `