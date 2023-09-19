import React from 'react'


const Header = () => {


    return <header className="header" style={{ left: 0 }}>
        <div className="container-xl d-flex align-items-center justify-content-between">
            <div className="header-left d-flex">
                <img src="https://oracles.goplugin.co/assets/media/logos/plugin-logo.png" style={{ height: "50px" }} />
            </div>
            <div className="header-center d-flex">
                <h1>XDC COE</h1>
            </div>
            <ul className="header-right"></ul>
        </div>
    </header>

}
export default Header;

