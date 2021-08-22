import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import ccxt from "ccxt"
import axios from "axios";

@inject("Price")
@observer
class NewBanner2Container extends React.Component {
   async componentDidMount () {
    const { Price } = this.props;
      
      // bitmex 
      let bybit = new ccxt.bybit({        
        'enableRateLimit': true,  // required by the Manual
      })
      let bitmex = new ccxt.bitmex()
      let coinone = new ccxt.coinone()
      let ftx = new ccxt.ftx()
      // coinbase 
      let coinbase = new ccxt.coinbase()
      // // bybit
      // let bybit = new ccxt.bybit()
      // binance 현물
      let binance = new ccxt.binance()
      // binance 선물
      let binance_futures = new ccxt.binancecoinm()
      // upbit
      let upbit = new ccxt.upbit()
      // bithumb
      let bithumb = new ccxt.bithumb()


      // 5초 주기로 반복
      setInterval(() => {

          console.log(bitmex.loadMarkets(), coinone.loadMarkets(), ftx.loadMarkets(), bybit.loadMarkets())
          // symbol list
          // console.log(binance.loadMarkets ())
          // console.log(binance_futures.loadMarkets())
          // console.log(upbit.loadMarkets())
          // console.log(coinbase.loadMarkets())
          // console.log(bithumb.loadMarkets())

          // 데이터 가져오기
    //        if (binance.has.fetchOHLCV) {
    //                // 비동기 처리
    //                binance.fetchOHLCV ('BTC/USDT', '1m').then(function(binance_data) {
    //                  // 500번째가 최근 가격
    //                  console.log(binance_data[499])
    //                })
    //           }

            if (binance_futures.has.fetchOHLCV) {
                    // 비동기 처리
                    binance_futures.fetchOHLCV ('BTC/USD', '1m').then(function(binance_futures_data) {
                      // 500번째가 최근 가격
                      Price.binance_futures_price = binance_futures_data[499][4]

                    })

                }
            // upbit data
            if (upbit.has.fetchOHLCV) {
                    // 비동기 처리
                    upbit.fetchOHLCV ('BTC/KRW', '1m').then(function(upbit_data) {
                      // 500번째가 최근 가격
                      Price.upbit_price = upbit_data[199][4]

                    })

                }

            // bittumb data
            if (bithumb.has.fetchOHLCV) {
              // 비동기 처리
              bithumb.fetchOHLCV ('BTC/KRW', '1m').then(function(bithumb_data) {
                // 1500번째가 최근 가격
                Price.bithumb_price = bithumb_data[1499][4]

                })

              }
            
            // coinbase data

              //비동기 처리
            if (bybit.has.fetchOHLCV) {
              console.log(bybit.fetchOHLCV ('BTC/USD', '1m', null, 200))
              bybit.fetchOHLCV ('BTC/USD', '1m', null, 200).then(function(bybit_price) {
                console.log(bybit_price)
                // 500번째가 최근 가격
                Price.coinbase_price = bithumb_data[1499][4]

                })
              }
              
              // coinbase.fetchOHLCV ('BTC/KRW', '1m').then(function(coinbase_price2) {
              //   console.log(coinbase_price2)
              //   // 500번째가 최근 가격
              //   Price.coinbase_price2 = bithumb_data[1499][4]

              //   })

              

          // KRWUSD data
          const KRWUSD = {
            url : 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD',
            method : 'GET',
          }
          axios(KRWUSD).then(res => Price.KRWUSD = res.data[0].basePrice)
          // 데이터가 도착하고 나면
          if(Price.bithumb_price > 0 && Price.upbit_price > 0 && Price.binance_futures_price > 0 ){
             Price.upbit_KimChi_Price = ((Price.upbit_price / (Price.binance_futures_price * Price.KRWUSD)-1) * 100).toFixed(3)
             Price.bithumb_KimChi_Price = ((Price.bithumb_price / (Price.binance_futures_price * Price.KRWUSD)-1) * 100).toFixed(3)

          }
          } ,1000);
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
           <CategoryTitle>
            업비트 가격 : {Price.upbit_price}
           </CategoryTitle>
           <CategoryTitle>
            바이낸스 가격 : {Price.binance_futures_price}
           </CategoryTitle>
           <CategoryTitle>
            환율 : {Price.KRWUSD}
           </CategoryTitle>
           <CategoryTitle>
            업비트 - 바이낸스 김치프리미엄 : {Price.upbit_KimChi_Price}%
           </CategoryTitle>
           <CategoryTitle>
            빗썸 가격 : {Price.bithumb_price}
           </CategoryTitle>
           <CategoryTitle>
            빗썸 - 바이낸스 김치프리미엄 : {Price.bithumb_KimChi_Price}%
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
