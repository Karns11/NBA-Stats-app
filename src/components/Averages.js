import React, { useState } from 'react'
import axios from 'axios'

function Averages({ isChecked }) {

    const [input, setInput] = useState([]);
    const [averages, setAverages] = useState({});
    const [player, setPlayer] = useState([]);

    // if (isChecked && stats.length > 0) {
    //     axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
    //     .then(response => {
    //         setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
    //         const playerId = response.data.data[0].id;
    //         return axios.get(`https://www.balldontlie.io/api/v1/season_averages/?player_ids[]=${playerId}`);
    //     })
    //     .then(res => {
    //         const resAvgs = res.data.data[0];
    //         console.log(resAvgs);
    //         setAverages(resAvgs); //object
    //     })
    // }

    function handleAvgSearch(evt) {
        evt.preventDefault();
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
        .then(response => {
            setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
            const playerId = response.data.data[0].id;
            return axios.get(`https://www.balldontlie.io/api/v1/season_averages/?player_ids[]=${playerId}`);
        })
        .then(res => {
            const resAvgs = res.data.data[0];
            console.log(resAvgs);
            setAverages(resAvgs); //object
        })
    }

  return (
    <div className='container'>
        <h1 className='text-center pt-3'>Season Averages</h1>
        <div className='row text-center my-5'>
            <div className='column my-2'>
                <div className='input-group px-5 mb-1'>
                    <span className='input-group-text'>Player</span>
                    <input type='text' className='form-control' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Lebron James' />
                    <button onClick={() => setInput("")} className='ml-2 btn btn-danger'>Clear</button>
                </div>
            </div>
            <div className='column'>
                <button className='btn btn-success' onClick={handleAvgSearch}>Search for averages!</button>
            </div>
        </div>

        <div className='text-center'>
            {player.length===2 && <h2>Showing results for <i>{player[0] + " " + player[1]}</i></h2>}
        </div>

        <div className='mx-auto table-div'>
        <table className='table mx-auto'>
            <thead>
            <tr style={{position: 'sticky', top: '0', backgroundColor: '#fff'}}>
                  <th scope='col'>GP</th>
                  <th scope='col'>Min</th>
                  <th scope='col'>FGM</th>
                  <th scope='col'>FG3M</th>
                  <th scope='col'>REB</th>
                  <th scope='col'>AST</th>
                  <th scope='col'>STL</th>
                  <th scope='col'>BLK</th>
                  <th scope='col'>FG%</th>
                  <th scope='col'>3FG%</th>
                  <th scope='col'>PTS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{averages.games_played}</td>
                    <td>{averages.min}</td>
                    <td>{averages.fgm}</td>
                    <td>{averages.fg3m}</td>
                    <td>{averages.reb}</td>
                    <td>{averages.ast}</td>
                    <td>{averages.stl}</td>
                    <td>{averages.blk}</td>
                    <td>{(averages.fg_pct * 100).toFixed(2) + "%"}</td>
                    <td>{(averages.fg3_pct * 100).toFixed(2) + "%"}</td>
                    <td>{averages.pts}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Averages
