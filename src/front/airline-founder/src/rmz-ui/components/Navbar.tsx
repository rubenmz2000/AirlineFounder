import './Navbar.css'
import {Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

function Navbar() {
    return <>
        <div className={'navbar'}>
            <h1 className={'navbar-logo'}>
                RMZ <span>SOFTWARES</span>
            </h1>
            
            <div className={'navbar-links'}>
                <NavLink to={"/"}>Aerolinea</NavLink>
                <NavLink to={"/projects"}>tontolquelolea</NavLink>
            </div>
        </div>
    </>;
}

export default Navbar;