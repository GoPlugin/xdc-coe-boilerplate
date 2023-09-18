import React from 'react'


const Header = () => {


    return <header className="header" style={{ left: 0 }}>
        <div className="container-xl d-flex align-items-center justify-content-between">
            <div className="header-left d-flex">
                <img src="https://oracles.goplugin.co/assets/media/logos/plugin-logo-white.png" style={{ height: "50px" }} />
            </div>
            <ul className="header-right">

                <li className="dropdown show profile">

                </li>

            </ul>
        </div>
    </header>

}
export default Header;

