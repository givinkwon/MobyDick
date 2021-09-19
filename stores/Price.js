import { observable, action } from "mobx";
import * as DataAPI from "../axios/data";

class Price {
  //binance
  @observable binance_btc = 0;
  @observable binance_eth = 0;
  @observable binance_eos = 0;
  @observable binance_xrp = 0;
  
  //bybit
  @observable bybit_btc = 0;
  @observable bybit_eth = 0;
  @observable bybit_eos = 0;
  @observable bybit_xrp = 0;

  //upbit
  @observable upbit_btc = 0;
  @observable upbit_eth = 0;
  @observable upbit_eos = 0;
  @observable upbit_xrp = 0;

  //bithumb
  @observable bithumb_btc = 0;
  @observable bithumb_eth = 0;
  @observable bithumb_eos = 0;
  @observable bithumb_xrp = 0;

  // 환율
  @observable KRWUSD = 0;

  // 김치프리미엄 : BTC
  @observable binance_upbit_btc = 0;
  @observable binance_bithumb_btc = 0;
  @observable bybit_upbit_btc = 0;
  @observable bybit_bithumb_btc = 0;

  // 김치프리미엄 : ETH
  @observable binance_upbit_eth = 0;
  @observable binance_bithumb_eth = 0;
  @observable bybit_upbit_eth = 0;
  @observable bybit_bithumb_eth = 0;

  // 김치프리미엄 : EOS
  @observable binance_upbit_eos = 0;
  @observable binance_bithumb_eos = 0;
  @observable bybit_upbit_eos = 0;
  @observable bybit_bithumb_eos = 0;

  // 김치프리미엄 : XRP
  @observable binance_upbit_xrp = 0;
  @observable binance_bithumb_xrp = 0;
  @observable bybit_upbit_xrp = 0;
  @observable bybit_bithumb_xrp = 0;
 
  @action Patch_data = async () => {
    await DataAPI.data()
      .then((res) => {
        //binance
        this.binance_btc = res.data.data.binance.btc;
        this.binance_eth = res.data.data.binance.eth;
        this.binance_eos = res.data.data.binance.eos;
        this.binance_xrp = res.data.data.binance.xrp;
        
        //bybit
        this.bybit_btc = res.data.data.bybit.btc;
        this.bybit_eth = res.data.data.bybit.eth;
        this.bybit_eos = res.data.data.bybit.eos;
        this.bybit_xrp = res.data.data.bybit.xrp;

        //upbit
        this.upbit_btc = res.data.data.upbit.btc;
        this.upbit_eth = res.data.data.upbit.eth;
        this.upbit_eos = res.data.data.upbit.eos;
        this.upbit_xrp = res.data.data.upbit.xrp;

        //bithumb
        this.bithumb_btc = res.data.data.bithumb.btc;
        this.bithumb_eth = res.data.data.bithumb.eth;
        this.bithumb_eos = res.data.data.bithumb.eos;
        this.bithumb_xrp = res.data.data.bithumb.xrp;

        // 환율
        this.KRWUSD = res.data.data.dollar;

        // 김치프리미엄 : BTC
        this.binance_upbit_btc = res.data.data.kimchi.binance_upbit_btc;
        this.binance_bithumb_btc = res.data.data.kimchi.binance_bithumb_btc;
        this.bybit_upbit_btc = res.data.data.kimchi.bybit_upbit_btc;
        this.bybit_bithumb_btc = res.data.data.kimchi.bybit_bithumb_btc;

        // 김치프리미엄 : ETH
        this.binance_upbit_eth = res.data.data.kimchi.binance_upbit_eth;
        this.binance_bithumb_eth = res.data.data.kimchi.binance_bithumb_eth;
        this.bybit_upbit_eth = res.data.data.kimchi.bybit_upbit_eth;
        this.bybit_bithumb_eth = res.data.data.kimchi.bybit_bithumb_eth;

        // 김치프리미엄 : EOS
        this.binance_upbit_eos = res.data.data.kimchi.binance_upbit_eos;
        this.binance_bithumb_eos = res.data.data.kimchi.binance_bithumb_eos;
        this.bybit_upbit_eos = res.data.data.kimchi.bybit_upbit_eos;
        this.bybit_bithumb_eos = res.data.data.kimchi.bybit_bithumb_eos;

        // 김치프리미엄 : XRP
        this.binance_upbit_xrp = res.data.data.kimchi.binance_upbit_xrp;
        this.binance_bithumb_xrp = res.data.data.kimchi.binance_bithumb_xrp;
        this.bybit_upbit_xrp = res.data.data.kimchi.bybit_upbit_xrp;
        this.bybit_bithumb_xrp = res.data.data.kimchi.bybit_bithumb_xrp;

      })
      .catch((e) => {
        console.log(e.response);
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
      });
  }
}



export default new Price();
