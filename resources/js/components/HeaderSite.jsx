import React from "react";
import "../../css/HeaderSiteStyle.css";
import logoC from "../media/LogoC.svg";
function HeaderSite(){
    const styleH1 = {
        margin:'0.2vh'
    }
    return(
        <header id="header-primary">
            <div className="header-logo">
                <img src={logoC} alt="logo-p" />
            </div>
            <div className="header-title">
                <h1 style={styleH1}>Sistema de Registro</h1>
            </div>
        </header>
    );
}
export default HeaderSite;