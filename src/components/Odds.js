import React from 'react';
import axios from 'axios';

function Odds() {

    function handleSearch() {
        axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&oddsFormat=american&apiKey=e9cabd6218d474ccfeb4258f3b5b0b1d`)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    };
    
  return (
    <div>
      <button onClick={handleSearch} className='btn btn-warning'>Look for odds</button>
    </div>
  )
}

export default Odds
