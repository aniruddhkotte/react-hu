import React from 'react';
import './banner.css';
import reactLogo from './mask-react-logo.png';

interface IProps {
    bannerText: string;
}
function Banner(props: IProps) {
    return (
        <div className="banner">
            <p id="banner-text">{props.bannerText}</p>
            <img id="react-logo" src={reactLogo} alt="react masked"/>
        </div>
    );
}

export default Banner;