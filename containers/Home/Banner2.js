import React, { Component } from 'react';
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import ccxt from "ccxt"
import axios from "axios";
import Price from '../../stores/Price';

// image
const upbit = "/static/images/upbit.svg";
const bybit = "/static/images/bybit.svg";
const binance = "/static/images/binance.svg";
const bithumb = "/static/images/bithumb.png";

// symbol
const btc = "/static/images/btc.svg";
const eth = "/static/images/eth.svg";
const eos = "/static/images/eos.svg";
const xrp = "/static/images/xrp.svg";

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

  SelectExchange = (idx) => {
    const { Price } = this.props;
    Price.SelectExchange = idx;
  }

  render() {
    // id는 실제 DB의 id로 해야함
    const nameTable = [
      { id: 1, name: "바이낸스-업비트", image1: binance, image2: upbit, exchange1: "바이낸스", exchange2: "업비트" },
      { id: 2, name: "바이낸스-빗썸", image1: binance, image2: bithumb, exchange1: "바이낸스", exchange2: "빗썸" },
      { id: 3, name: "바이비트-업비트", image1: bybit, image2: upbit, exchange1: "바이비트", exchange2: "업비트" },
      { id: 4, name: "바이비트-빗썸", image1: bybit, image2: bithumb, exchange1: "바이비트", exchange2: "빗썸" },
    ];

    const { Price } = this.props;
    console.log(Price.SelectExchange)
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
                  onClick={() => this.SelectExchange(idx)}
                >
                  <img style={{height:25, marginRight: 10}} src={v.image1}/>
                  <img style={{height:25, marginRight: 10}} src={v.image2}/>
                  {v.name}
                </CategoryTitle>
                ))}   
            </CategoryBox>    

          {nameTable.map((v, idx) => (
            <>
              {Price.SelectExchange == idx && 
              
                (
                <CategoryTitle style={{display : 'flex'}}>
                  <div>{"코인"}</div>
                  <div>{v.exchange1}</div>
                  <div>{v.exchange2}</div>
                  <div>{"환율"}</div>
                  <div>{"김프"}</div>
                
                </CategoryTitle>
                )
              }
            </>
          ))}

          {/* 가격 */}
          {nameTable.map((v, idx) => (
            <>
              {Price.SelectExchange == idx && 
                (
                  <>
                  <CategoryTitle style={{display: 'flex'}}>

                        {/* 바이낸스-업비트*/}
                        {Price.SelectExchange == 0 && 
                        <>
                        <div><img style={{height:25, marginRight: 10}} src={btc}/>BTC</div>
                        <div>                     
                          {Price.binance_btc} 
                        </div>
                        <div> {Price.upbit_btc}</div>
                        <div>{Price.KRWUSD}</div>
                        <div>{Price.binance_upbit_btc} %</div>
                        </>
                        }

                        {/* 바이낸스-빗썸*/}
                        {Price.SelectExchange == 1 && 
                        <>
                        <div><img style={{height:25, marginRight: 10}} src={btc}/>BTC</div>
                        <div>                     
                          {Price.binance_btc} 
                        </div>
                        <div> {Price.bithumb_btc}</div>
                        <div>{Price.KRWUSD}</div>
                        <div>{Price.binance_bithumb_btc} %</div>
                        </>
                        }

                        {/* 바이비트-업비트*/}
                        {Price.SelectExchange == 2 && 
                        <>
                        <div><img style={{height:25, marginRight: 10}} src={btc}/>BTC</div>
                        <div>                     
                          {Price.bybit_btc} 
                        </div>
                        <div> {Price.upbit_btc}</div>
                        <div>{Price.KRWUSD}</div>
                        <div>{Price.bybit_upbit_btc} %</div>
                        </>
                        }

                        {/* 바이비트-빗썸*/}
                        {Price.SelectExchange == 3 && 
                        <>
                        <div><img style={{height:25, marginRight: 10}} src={btc}/>BTC</div>
                        <div>                     
                          {Price.bybit_btc} 
                        </div>
                        <div> {Price.bithumb_btc}</div>
                        <div>{Price.KRWUSD}</div>
                        <div>{Price.bybit_bithumb_btc} %</div>
                        </>
                        }
                        
                  </CategoryTitle>

                  {/* ETH */}
                  <CategoryTitle style={{display: 'flex'}}>
                                      
                  {/* 바이낸스-업비트*/}
                  {Price.SelectExchange == 0 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eth}/>ETH</div>
                  <div>                     
                    {Price.binance_eth} 
                  </div>
                  <div> {Price.upbit_eth}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.binance_upbit_eth} %</div>
                  </>
                  }

                  {/* 바이낸스-빗썸*/}
                  {Price.SelectExchange == 1 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eth}/>ETH</div>
                  <div>                     
                    {Price.binance_eth} 
                  </div>
                  <div> {Price.bithumb_eth}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.binance_bithumb_eth} %</div>
                  </>
                  }

                  {/* 바이비트-업비트*/}
                  {Price.SelectExchange == 2 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eth}/>ETH</div>
                  <div>                     
                    {Price.bybit_eth} 
                  </div>
                  <div> {Price.upbit_eth}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.bybit_upbit_eth} %</div>
                  </>
                  }

                  {/* 바이비트-빗썸*/}
                  {Price.SelectExchange == 3 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eth}/>ETH</div>
                  <div>                     
                    {Price.bybit_eth} 
                  </div>
                  <div> {Price.bithumb_eth}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.bybit_bithumb_eth} %</div>
                  </>
                  }

                  </CategoryTitle>

                   {/* EOS */}
                  <CategoryTitle style={{display: 'flex'}}>
                                    
                  {/* 바이낸스-업비트*/}
                  {Price.SelectExchange == 0 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eos}/>EOS</div>
                  <div>                     
                    {Price.binance_eos} 
                  </div>
                  <div> {Price.upbit_eos}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.binance_upbit_eos} %</div>
                  </>
                  }

                  {/* 바이낸스-빗썸*/}
                  {Price.SelectExchange == 1 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eos}/>EOS</div>
                  <div>                     
                    
                    {Price.binance_eos} 
                  </div>
                  <div> {Price.bithumb_eos}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.binance_bithumb_eos} %</div>
                  </>
                  }

                  {/* 바이비트-업비트*/}
                  {Price.SelectExchange == 2 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eos}/>EOS</div>
                  <div>                     
                    
                    {Price.bybit_eos} 
                  </div>
                  <div> {Price.upbit_eos}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.bybit_upbit_eos} %</div>
                  </>
                  }

                  {/* 바이비트-빗썸*/}
                  {Price.SelectExchange == 3 && 
                  <>
                  <div><img style={{height:25, marginRight: 10}} src={eos}/>EOS</div>
                  <div>                     
                    
                    {Price.bybit_eos} 
                  </div>
                  <div> {Price.bithumb_eos}</div>
                  <div>{Price.KRWUSD}</div>
                  <div>{Price.bybit_bithumb_eos} %</div>
                  </>
                  }
      
                  </CategoryTitle>

                   {/* XRP */}
                   <CategoryTitle style={{display: 'flex'}}>
                    
                    {/* 바이낸스-업비트*/}
                    {Price.SelectExchange == 0 && 
                    <>
                    <div><img style={{height:25, marginRight: 10}} src={xrp}/>XRP</div>
                    <div>                     
                      
                      {Price.binance_xrp} 
                    </div>
                    <div> {Price.upbit_xrp}</div>
                    <div>{Price.KRWUSD}</div>
                    <div>{Price.binance_upbit_xrp} %</div>
                    </>
                    }

                    {/* 바이낸스-빗썸*/}
                    {Price.SelectExchange == 1 && 
                    <>
                    <div><img style={{height:25, marginRight: 10}} src={xrp}/>XRP</div>
                    <div>                     
                      
                      {Price.binance_xrp} 
                    </div>
                    <div> {Price.bithumb_xrp}</div>
                    <div>{Price.KRWUSD}</div>
                    <div>{Price.binance_bithumb_xrp} %</div>
                    </>
                    }

                    {/* 바이비트-업비트*/}
                    {Price.SelectExchange == 2 && 
                    <>
                    <div><img style={{height:25, marginRight: 10}} src={xrp}/>XRP</div>
                    <div>                     
                      
                      {Price.bybit_xrp} 
                    </div>
                    <div> {Price.upbit_xrp}</div>
                    <div>{Price.KRWUSD}</div>
                    <div>{Price.bybit_upbit_xrp} %</div>
                    </>
                    }

                    {/* 바이비트-빗썸*/}
                    {Price.SelectExchange == 3 && 
                    <>
                    <div><img style={{height:25, marginRight: 10}} src={xrp}/>XRP</div>
                    <div>                     
                      
                      {Price.bybit_xrp} 
                    </div>
                    <div> {Price.bithumb_xrp}</div>
                    <div>{Price.KRWUSD}</div>
                    <div>{Price.bybit_bithumb_xrp} %</div>
                    </>
                    }
        
                    </CategoryTitle>
                  </>
                )
              }
            </>
          ))}

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
  
  > div {
    text-align: center;
    width : 20%;
    border: 1px solid #b3b3b3;
    > img {
      text-align: left;
    }
  }
`;
