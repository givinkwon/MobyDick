import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import { Router } from "react-router-dom";

@inject("Price", "Chart")
@observer
class NewBanner3Container extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const {Chart, Price } = this.props;
    // chart init => iframe은 window가 로딩되고 나서 해야하므로 setTimeout 사용
    window.setTimeout(function () { 
      const scriptSrc = document.createElement('script');
      const script = document.createElement('script');
      scriptSrc.src = 'https://s3.tradingview.com/tv.js';
      scriptSrc.async = true;
  
      scriptSrc.innerHTML = new window.TradingView.widget(
        {
  
        "container_id": "tradingview_7bf97",
        "autosize": true,
        "symbol": Chart.BTC_Binance_Upbit,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "kr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true
      }
        );
      this.myRef && this.myRef.current.appendChild(scriptSrc);
      }, 1000);
  }

  change_chart = (coin, exchange) => {
    const { Chart } = this.props;
    // 코인 설정
    Chart.set_current_coin(coin)
    // 거래소 설정
    Chart.set_current_exchange(exchange)

    // symbol 설정
    Chart.set_current_symbol()

    this.myRef = React.createRef();

    window.setTimeout(function () { 
      const scriptSrc = document.createElement('script');
      const script = document.createElement('script');
      scriptSrc.src = 'https://s3.tradingview.com/tv.js';
      scriptSrc.async = true;
  
      scriptSrc.innerHTML = new window.TradingView.widget(
        {
  
        "container_id": "tradingview_7bf97",
        "autosize": true,
        "symbol": Chart.current_symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "kr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true
      }
        );
      this.myRef && this.myRef.current.appendChild(scriptSrc);
      }, 1000);
  }

  render() {
    const {Chart, Price } = this.props;
    // id는 실제 DB의 id로 해야함
    const nameTable = [

      { id: 1, name: "바이낸스-업비트", value: "Binance-Upbit" },
      { id: 2, name: "바이낸스-빗썸",  value: "Binance-Bithumb" },
      { id: 3, name: "바이비트-업비트",  value: "Bybit-Upbit" },
      { id: 4, name: "바이비트-빗썸",  value: "Bybit-Bithumb"},

    ];

    const coinList = [
      { id: 1, name: "비트코인", value: "BTC" },
      { id: 2, name: "이더리움", value: "ETH" },
      // { id: 3, name: "이더리움클래식" },
      // { id: 4, name: "에이다" },
      { id: 5, name: "리플", value: "XRP" },
      { id: 6, name: "이오스", value: "EOS" },
      // { id: 7, name: "비트코인캐시" },
      // { id: 8, name: "라이트코인" },
      // { id: 9, name: "체인링크" },
      // { id: 10, name: "폴카닷" },
      // { id: 11, name: "퀀텀" },
      // { id: 12, name: "도지코인" },
      // { id: 13, name: "스텔라루멘" },
      // { id: 14, name: "비체인" },
      // { id: 15, name: "트론" },
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
                onClick={() => 
                  this.change_chart(Chart.current_coin, v.value)
                }
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
                onClick={() => 
                  this.change_chart(v.value, Chart.current_exchange)
                }
              >
                {v.name}
              </CategoryTitle>
            ))}
          </CategoryBox>
          <div className="tradingview-widget-container" ref={this.myRef}>
            <div style={{height: "900px"}} id="tradingview_7bf97"></div>
          </div>


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
