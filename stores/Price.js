import { observable, action } from "mobx";

class Price {
  @observable upbit_price = 0;
  @observable bithumb_price = 0;
  @observable coinbase_price = 0;
  @observable binance_futures_price = 0;
  @observable upbit_KimChi_Price = 0;
  @observable bithumb_KimChi_Price = 0;
  @observable KRWUSD = 0;
 }

export default new Price();
