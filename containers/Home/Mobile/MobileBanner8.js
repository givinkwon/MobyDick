import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import Router from "next/router";

// const image1 = "/static/images/Home/Banner8/Banner8_img1.png"
const image1 = "/static/images/Home/Mobile/MobileBanner8/MobileBanner8_bg.png"
class MobileBanner8Container extends React.Component {
    render() {
        return (
            <StyledBackground src={image1}>
                <Layer>
                        <Fade bottom>
                            <div>
                                <Header>
                                    내 제품의 제작 비용과 <br/>
                                    전문 제조사를 바로 만나보세요.
                                </Header>
                                <Buttonv1 style={{margin:'0 auto', marginTop: 20,marginBottom:56,fontWeight:'bold'}} onClick={() => Router.push("/request")}>
                                    지금 무료 가견적 받기
                                </Buttonv1>
                            </div>
                        </Fade>
                </Layer>
            </StyledBackground>
        );
    }
}

export default MobileBanner8Container;

const StyledBackground = styled(Background)`
    justify-content:center;
    background-size:100% 100%;
`
const Header = styled(Title.FontSize18)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.45px;
  text-align:center;
  margin-top:56px;
`

const Layer=styled.div`
    background-color: rgba(0, 0, 0, 0.67);
    width: 100%;
    height: 100%;
    // display: inline-flex;
    // justify-content: center;
`