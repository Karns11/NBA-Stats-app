import React, {useState} from 'react';
import axios from 'axios';
import './Stats.css';

function Stats() {

  const [stats, setStats] = useState([]);
  const [player, setPlayer] = useState([]);
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState("2023-01-01");

  function handleSearch(event) {
    event.preventDefault();
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
    .then(response => {
      setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
      const playerId = response.data.data[0].id;
      return axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=2022&per_page=99&start_date=${dateInput}`);
    })
    .then(response => {
      const responseStats = response.data.data;
      setStats(responseStats);
      console.log(response.data.data);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleDateReset = () => {
    setDateInput("2023-01-01");
  }

  return (
    <div className='container'>
      <h1 className='text-center pt-3'>2022-2023 Season Stats</h1>
      <div className='row text-center my-5'>
        <div className='column my-2'>
          <div className='input-group px-5 mb-1'>
            <span className='input-group-text'>Player</span>
            <input type='text' className='form-control' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Lebron James' />
            <button onClick={() => setInput("")} className='ml-2 btn btn-danger'>Clear</button>
          </div>
        </div>
        <div className='column'>
          <div className="input-group px-5 mb-0">
            <span className="input-group-text" >Start Date</span>
            <input type="text" className="form-control" value={dateInput} onChange={(e) => setDateInput(e.target.value)} placeholder='YYYY-MM-DD' />
            <button onClick={handleDateReset} className='ml-2 btn btn-danger'>Reset</button>
          </div>
          <div className='column'>
            <p className='text-start ps-5'>* Default is 2023-01-01</p>
          </div>
        </div>
        <div className='column'>
          <button className='btn btn-primary' onClick={handleSearch}>Search for stats!</button>
        </div>
      </div>
      <div className='text-center'>
        {player.length===2 && <h2>Showing results for <i>{player[0] + " " + player[1]}</i></h2>}
      </div>
      <div className='mx-auto table-div'>
        <table className='table mx-auto'>
              <thead>
                <tr style={{position: 'sticky', top: '0', backgroundColor: '#fff'}}>
                  <th scope='col'>Date</th>
                  <th scope='col'>MINS</th>
                  <th scope='col'>FGA</th>
                  <th scope='col'>FG3A</th>
                  <th scope='col'>FG3M</th>
                  <th scope='col'>BLK</th>
                  <th scope='col'>PTS</th>
                  <th scope='col'>AST</th>
                  <th scope='col'>REB</th>
                </tr>
              </thead>
              <tbody>
        {stats.sort((a, b) => (a.game.date > b.game.date) ? -1 : 1).map((stat, ind) => {
          return (
                <tr key={ind}>
                  <th scope='row'>{stat.game.date.substring(0, 10)}</th>
                  <td>{stat.min}</td>
                  <td className={`fw-bold ${stat.fga >= 20 ? "text-success" : stat.fga >= 10 && stat.fga <= 19 ? "text-warning" : "text-danger"}`}>{stat.fga}</td>
                  <td className={`fw-bold ${stat.fg3a >= 5 ? "text-success" : stat.fg3a >= 1 && stat.fg3a <= 4 ? "text-warning" : "text-danger"}`}>{stat.fg3a}</td>
                  <td className={`fw-bold ${stat.fg3m >= 3 ? "text-success" : stat.fg3m >= 1 && stat.fg3m <= 2 ? "text-warning" : "text-danger"}`}>{stat.fg3m}</td>
                  <td className={`fw-bold ${stat.blk >= 3 ? "text-success" : stat.blk >= 1 && stat.blk <= 2 ? "text-warning" : "text-danger"}`}>{stat.blk}</td>
                  <td className={`fw-bold ${stat.pts >= 20 ? "text-success" : stat.pts >= 10 && stat.pts <= 19 ? "text-warning" : "text-danger"}`}>{stat.pts}</td>
                  <td className={`fw-bold ${stat.ast > 6 ? "text-success" : stat.ast >= 5 && stat.ast <= 7 ? "text-warning" : "text-danger"}`}>{stat.ast}</td>
                  <td className={`fw-bold ${stat.reb >= 6 ? "text-success" : stat.reb >= 5 && stat.reb <= 5 ? "text-warning" : "text-danger"}`}>{stat.reb}</td>
                </tr>
            )
          })
        }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Stats