import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";


const banner0img = "/static/images/icons8-bitcoin.gif";

class Banner0Container extends React.Component {

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
          marginBottom: "110px",
        }}
      >
        <Containerv1 style={{ gap: 130, alignItems: "center" }}>
          <LeftBox>
            <Header>
              전세계 코인 데이터
              <br />
              여기 다 있다.
            </Header>

            <Middle>김치 프리미엄 / 코인 데이터 / HTS</Middle>

          </LeftBox>

          <img src={banner0img} style={{ marginTop: 40 }} />
        </Containerv1>
      </div>
    );
  }
}

export default Banner0Container;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
`;

const Header = styled(Title.FontSize48)`
  width: 420px;
  height: 151px;
  object-fit: contain;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -1.2px;
  color: #1e2222;
`;

const Middle = styled(Text.FontSize20)`
  width: 100%;
  height: 29px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.5px;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 80px;
`;
