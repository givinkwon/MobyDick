import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Banner5/Banner5_img1.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class Banner11Container extends React.Component {
  render() {
    return (
      <Background backgroundColor="#f6f6f6">
        <Containerv1
          style={{
            paddingBottom: 306,
            paddingTop: 308,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div>
              <Header>민감 정보 선택 공개 서비스</Header>
              <Middle>
                <p>
                  원하는 업체만 <br />
                  정보 공개 및 소통
                </p>
              </Middle>
              <Body>
                제조사별 견적 도출 데이터를 학습한 AI 시스템이
                <br />
                제작 가능 전문 업체와 견적을 바로 안내드립니다.
              </Body>
            </div>
            <div>
              <img src={image1} style={{ transform: "scaleX(-1)" }} />
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner11Container;

const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
`;
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;

  > p {
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize24)`
  // white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
`;