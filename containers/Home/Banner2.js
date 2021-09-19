import React, { Component } from 'react';
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import ccxt from "ccxt"
import axios from "axios";

@inject("Price")
@observer
class NewBanner2Container extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

   async componentDidMount () {
    const { Price } = this.props;
    Price.Patch_data()
    // 15초마다 반복 호출
    setInterval(function() {
      Price.Patch_data()
   }, 15000);
  }

  render() {
    // id는 실제 DB의 id로 해야함
    const nameTable = [
      { id: 1, name: "바이낸스-업비트" },
      { id: 2, name: "코인베이스-업비트" },
      { id: 3, name: "바이낸스-빗썸" },
      { id: 4, name: "코인베이스-빗썸" },
    ];

    const { Price } = this.props;

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
            <b style={{ fontWeight: "bold" }}>김치프리미엄</b>
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
            {/* 가격 */}
           <CategoryTitle>
            BTC 바이낸스 : {Price.binance_btc}, BTC 업비트 : {Price.upbit_btc} , BTC 바이비트 : {Price.bybit_btc}, BTC 빗썸 : {Price.bithumb_btc} 
           </CategoryTitle>
           <CategoryTitle>
            ETH 바이낸스 : {Price.binance_eth}, BTC 업비트 : {Price.upbit_eth} , BTC 바이비트 : {Price.bybit_eth}, BTC 빗썸 : {Price.bithumb_eth} 
           </CategoryTitle>
           <CategoryTitle>
            EOS 바이낸스 : {Price.binance_eos}, BTC 업비트 : {Price.upbit_eos} , BTC 바이비트 : {Price.bybit_eos}, BTC 빗썸 : {Price.bithumb_eos} 
           </CategoryTitle>
           <CategoryTitle>
            XRP 바이낸스 : {Price.binance_xrp}, BTC 업비트 : {Price.upbit_xrp} , BTC 바이비트 : {Price.bybit_xrp}, BTC 빗썸 : {Price.bithumb_xrp} 
           </CategoryTitle>
           
            {/* 김프 */}
           <CategoryTitle>
            BTC 바이낸스-업비트 : {Price.binance_upbit_btc}%, BTC 바이낸스-빗썸 : {Price.binance_bithumb_btc}% , BTC 바이비트-업비트 : {Price.bybit_upbit_btc}%, BTC 바이비트-빗썸 : {Price.bybit_bithumb_btc}%
           </CategoryTitle>
           
           <CategoryTitle>
            ETH 바이낸스-업비트 : {Price.binance_upbit_eth}%, ETH 바이낸스-빗썸 : {Price.binance_bithumb_eth}% , ETH 바이비트-업비트 : {Price.bybit_upbit_eth}%, ETH 바이비트-빗썸 : {Price.bybit_bithumb_eth}%
           </CategoryTitle>
           
           <CategoryTitle>
            EOS 바이낸스-업비트 : {Price.binance_upbit_eos}%, EOS 바이낸스-빗썸 : {Price.binance_bithumb_eos}% , EOS 바이비트-업비트 : {Price.bybit_upbit_eos}%, EOS 바이비트-빗썸 : {Price.bybit_bithumb_eos}%  
           </CategoryTitle>
           
           <CategoryTitle>
            XRP 바이낸스-업비트 : {Price.binance_upbit_xrp}%, XRP 바이낸스-빗썸 : {Price.binance_bithumb_xrp}% , XRP 바이비트-업비트 : {Price.bybit_upbit_xrp}%, XRP 바이비트-빗썸 : {Price.bybit_bithumb_xrp}%      
           </CategoryTitle>

           <CategoryTitle>
            환율 : {Price.KRWUSD}
           </CategoryTitle>
           

        </Containerv1>
      </div>
    );
  }
}

export default NewBanner2Container;

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
