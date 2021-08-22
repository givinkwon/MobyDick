import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";

@inject("Price")
@observer
class NewBanner3Container extends React.Component {
  async componentDidMount() {
  }

  render() {
    // id는 실제 DB의 id로 해야함
    const nameTable = [

      { id: 1, name: "바이낸스-업비트" },
      { id: 2, name: "코인베이스-업비트" },
      { id: 3, name: "바이낸스-빗썸" },
      { id: 4, name: "코인베이스-빗썸" },

    ];

    const coinList = [
      { id: 1, name: "비트코인" },
      { id: 2, name: "이더리움" },
      { id: 3, name: "이더리움클래식" },
      { id: 4, name: "에이다" },
      { id: 5, name: "리플" },
      { id: 6, name: "이오스" },
      { id: 7, name: "비트코인캐시" },
      { id: 8, name: "라이트코인" },
      { id: 9, name: "체인링크" },
      { id: 10, name: "폴카닷" },
      { id: 11, name: "퀀텀" },
      { id: 12, name: "도지코인" },
      { id: 13, name: "스텔라루멘" },
      { id: 14, name: "비체인" },
      { id: 15, name: "트론" },
    ];


    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Containerv1
          style={{ justifyContent: " center", flexDirection: "column" }}
        >
          <Header>
            <b style={{ fontWeight: "bold" }}>트레이딩 차트</b>
          </Header>

          <CategoryBox>
            {nameTable.map((v, idx) => (
              <CategoryTitle
                key={v.id}
              >
                {v.name}
              </CategoryTitle>
            ))}
          </CategoryBox>
          {/*비트코인 카테고리 선택*/}
          <CategoryBox>
            {coinList.map((v, idx) => (
              <CategoryTitle
                key={v.id}
              >
                {v.name}
              </CategoryTitle>
            ))}
          </CategoryBox>


        </Containerv1>
      </div>
    );
  }
}

export default NewBanner3Container;

const Header = styled(Title.FontSize32)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  text-align: center;
  color: #000000;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  border-bottom: solid 1px #c6c7cc;
`;

const CategoryTitle = styled.div`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.89;
  letter-spacing: -0.45px;
  text-align: left;
  cursor: pointer;
  color: ${(props) => (props.active ? "#282c36" : "#b3b3b3")};
  border-bottom: ${(props) => (props.active ? "2px solid #282c36" : "")};
`;
