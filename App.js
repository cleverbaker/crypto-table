import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

var userGroup = {
  uid_01: {
    full_name: 'Bob Saget',
    data: {
      cryptocurrency_name: 'Monero',
      cryptocurrency_icon_URL: '../images/xmr.png',
      cryptocurrency_trading_symbol: 'XMR',
      cryptocurrency_token_balance: '0.0159952'
    }
  },
  uid_02: {
    full_name: 'Whoopi Goldberg',
    data: {
      cryptocurrency_name: 'Basic Attention Token',
      cryptocurrency_icon_URL: '../images/bat.png',
      cryptocurrency_trading_symbol: 'BAT',
      cryptocurrency_token_balance: '12.9961'
    }
  },
  uid_03: {
    full_name: 'Ellen Degeneres',
    data: {
      cryptocurrency_name: 'EOS',
      cryptocurrency_icon_URL: '../images/eos.png',
      cryptocurrency_trading_symbol: 'EOS',
      cryptocurrency_token_balance: '0.049985'
    }
  }
};
  
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coinPrices: [],
      coinHistory: [],
    }
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XMR,BAT,EOS&tsyms=USD')
      .then(res => {
        const coinPrices = Object.keys(res.data).map(key => res.data[key].USD)
        this.setState({ coinPrices });
        console.log(this.state.coinPrices)
      });

    // Feb 18, 2018 Monero Price
    axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=XMR&tsyms=USD&ts=1518566400')
      .then(res => {
        this.setState({ coinHistory: [...this.state.coinHistory, res.data.XMR.USD] })
      })

    // Feb 18, 2018 BAT Price
    axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BAT&tsyms=USD&ts=1518566400')
      .then(res => {
        this.setState({ coinHistory: [...this.state.coinHistory, res.data.BAT.USD] })
      })

    // Feb 18, 2018 EOS Price
    axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=EOS&tsyms=USD&ts=1518566400')
      .then(res => {
        this.setState({ coinHistory: [...this.state.coinHistory, res.data.EOS.USD] })
        console.log(this.state.coinHistory)
      })
  }

  render() {
    const users = Object.keys(userGroup).map((key, index) => {
      return (
        <tr>
          <td>{key}</td>
          <td>{userGroup[key].full_name}</td>
          <td>{userGroup[key].data.cryptocurrency_trading_symbol}</td>
          <td><img src={`images/${userGroup[key].data.cryptocurrency_trading_symbol}.png`}></img></td>
          <td>{userGroup[key].data.cryptocurrency_name}</td>
          <td>{userGroup[key].data.cryptocurrency_token_balance}</td>
          <td>{"$" + this.state.coinPrices[index]}</td>
          <td>{"$" + this.state.coinHistory[index]}</td>
          <td>{((this.state.coinPrices[index] - this.state.coinHistory[index]) / this.state.coinHistory[index] * 100).toFixed(2) + "%"}</td>
          <td>{(this.state.coinPrices[index] - this.state.coinHistory[index]).toFixed(2)}</td>
        </tr>
      )
    });
    
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Coin Symbol</th>
                  <th scope="col">Coin Logo</th>
                  <th scope="col">Coin Name</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Current Value</th>
                  <th scope="col">Past Value</th>
                  <th scope="col">Percent Difference</th>
                  <th scope="col">Value of Change</th>
                </tr>
              </thead>
              <tbody>
                {users}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
