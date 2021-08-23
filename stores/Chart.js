import { observable, action } from "mobx";

class Chart {
    // Binance / upbit
    @observable BTC_Binance_Upbit = "(UPBIT:BTCKRW-BINANCE:BTCUSD*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100";
    @observable ETH_Binance_Upbit = "(UPBIT:ETHKRW-BINANCE:ETHUSD*FX_IDC:USDKRW)/(BINANCE:ETHUSD*FX_IDC:USDKRW)*100";
    @observable EOS_Binance_Upbit = "(UPBIT:EOSKRW-BINANCE:EOSUSD*FX_IDC:USDKRW)/(BINANCE:EOSUSD*FX_IDC:USDKRW)*100";
    @observable XRP_Binance_Upbit = "(UPBIT:XRPKRW-BINANCE:XRPUSD*FX_IDC:USDKRW)/(BINANCE:XRPUSD*FX_IDC:USDKRW)*100";

    // Binance / upbit
    @observable BTC_Binance_Bithumb = "(BITHUMB:BTCKRW-BINANCE:BTCUSD*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100";
    @observable ETH_Binance_Bithumb = "(BITHUMB:ETHKRW-BINANCE:ETHUSD*FX_IDC:USDKRW)/(BINANCE:ETHUSD*FX_IDC:USDKRW)*100";
    @observable EOS_Binance_Bithumb = "(BITHUMB:EOSKRW-BINANCE:EOSUSD*FX_IDC:USDKRW)/(BINANCE:EOSUSD*FX_IDC:USDKRW)*100";
    @observable XRP_Binance_Bithumb = "(BITHUMB:XRPKRW-BINANCE:XRPUSD*FX_IDC:USDKRW)/(BINANCE:XRPUSD*FX_IDC:USDKRW)*100";

    // Bybit / upbit
    @observable BTC_Bybit_Upbit = "(UPBIT:BTCKRW-BYBIT:BTCUSD*FX_IDC:USDKRW)/(BYBIT:BTCUSD*FX_IDC:USDKRW)*100";
    @observable ETH_Bybit_Upbit = "(UPBIT:ETHKRW-BYBIT:ETHUSD*FX_IDC:USDKRW)/(BYBIT:ETHUSD*FX_IDC:USDKRW)*100";
    @observable EOS_Bybit_Upbit = "(UPBIT:EOSKRW-BYBIT:EOSUSD*FX_IDC:USDKRW)/(BYBIT:EOSUSD*FX_IDC:USDKRW)*100";
    @observable XRP_Bybit_Upbit = "(UPBIT:XRPKRW-BYBIT:XRPUSD*FX_IDC:USDKRW)/(BYBIT:XRPUSD*FX_IDC:USDKRW)*100";
    
    // BYbit / bithumb
    @observable BTC_Bybit_Bithumb = "(BITHUMB:BTCKRW-BYBIT:BTCUSD*FX_IDC:USDKRW)/(BYBIT:BTCUSD*FX_IDC:USDKRW)*100";
    @observable ETH_Bybit_Bithumb = "(BITHUMB:ETHKRW-BYBIT:ETHUSD*FX_IDC:USDKRW)/(BYBIT:ETHUSD*FX_IDC:USDKRW)*100";
    @observable EOS_Bybit_Bithumb = "(BITHUMB:EOSKRW-BYBIT:EOSUSD*FX_IDC:USDKRW)/(BYBIT:EOSUSD*FX_IDC:USDKRW)*100";
    @observable XRP_Bybit_Bithumb = "(BITHUMB:XRPKRW-BYBIT:XRPUSD*FX_IDC:USDKRW)/(BYBIT:XRPUSD*FX_IDC:USDKRW)*100";

    // 현재 선택된 거래소
    @observable current_exchange = "Binance-Upbit"
    // 현재 선택된 코인
    @observable current_coin = "BTC"
    
    // 현재 symbol
    @observable current_symbol = ""

    // 코인 선택하기
    @action set_current_coin = (coin) => {
        this.current_coin = coin
        console.log(coin)
    }

    // 거래소 선택하기
    @action set_current_exchange = (exchange) => {
        this.current_exchange = exchange
        console.log(exchange)
    }

    // symbol 선택하기
    @action set_current_symbol = () => {
            // BTC
            if(this.current_coin == "BTC" && this.current_exchange == "Binance-Upbit"){
                this.current_symbol = this.BTC_Binance_Upbit   
            }
            if(this.current_coin == "BTC" && this.current_exchange == "Binance-Bithumb"){
                this.current_symbol = this.BTC_Binance_Bithumb
            }
            if(this.current_coin == "BTC" && this.current_exchange == "Bybit-Upbit"){
                this.current_symbol = this.BTC_Bybit_Upbit
            }
            if(this.current_coin == "BTC" && this.current_exchange == "Bybit-Bithumb"){
                this.current_symbol = this.BTC_Bybit_Bithumb
            }

            // ETH
            if(this.current_coin == "ETH" && this.current_exchange == "Binance-Upbit"){
                this.current_symbol = this.ETH_Binance_Upbit
            }
            if(this.current_coin == "ETH" && this.current_exchange == "Binance-Bithumb"){
                this.current_symbol = this.ETH_Binance_Bithumb
            }
            if(this.current_coin == "ETH" && this.current_exchange == "Bybit-Upbit"){
                this.current_symbol = this.ETH_Bybit_Upbit
            }
            if(this.current_coin == "ETH" && this.current_exchange == "Bybit-Bithumb"){
                this.current_symbol = this.ETH_Bybit_Bithumb
            }

            // XRP
            if(this.current_coin == "XRP" && this.current_exchange == "Binance-Upbit"){
                this.current_symbol = this.XRP_Binance_Upbit
            }
            if(this.current_coin == "XRP" && this.current_exchange == "Binance-Bithumb"){
                this.current_symbol = this.XRP_Binance_Bithumb
            }
            if(this.current_coin == "XRP" && this.current_exchange == "Bybit-Upbit"){
                this.current_symbol = this.XRP_Bybit_Upbit
            }
            if(this.current_coin == "XRP" && this.current_exchange == "Bybit-Bithumb"){
                this.current_symbol = this.XRP_Bybit_Bithumb
            }

            // EOS
            if(this.current_coin == "EOS" && this.current_exchange == "Binance-Upbit"){
                this.current_symbol = this.EOS_Binance_Upbit
            }
            if(this.current_coin == "EOS" && this.current_exchange == "Binance-Bithumb"){
                this.current_symbol = this.EOS_Binance_Bithumb
            }
            if(this.current_coin == "EOS" && this.current_exchange == "Bybit-Upbit"){
                this.current_symbol = this.EOS_Bybit_Upbit
            }
            if(this.current_coin == "EOS" && this.current_exchange == "Bybit-Bithumb"){
                this.current_symbol = this.EOS_Bybit_Bithumb
            }

            console.log(this.current_symbol)
    }
 }

export default new Chart();
