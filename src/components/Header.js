import React from 'react'

function Header() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark py-4 w-100'>
            <div className="container navbar-container">
                <a href='#Showcase' className='navbar-brand brand'>NBA Stats</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id="navmenu">
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item px-3'>
                            <a href='https://github.com/Karns11' rel="noreferrer" target='_blank' className='nav-link'>Per game</a>
                        </li>
                        <li className='nav-item px-3'>
                            <a href='https://github.com/Karns11' rel="noreferrer" target='_blank' className='nav-link'>Season Averages</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default Header
