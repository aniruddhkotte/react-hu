import React, { useCallback } from 'react';
import './header.css';
import hashedinLogo from './hashedin-logo.png';
import cartIcon from './cart-icon.svg';
import profileIcon from './profile-icon.svg';
import { INavigationTypes } from '../../data/types';

interface IProps {
    onHeaderClick: (value: string) => void;
}

function Header(props: IProps) {
    
    return (
        <div className="header">
            <img id="hashedin-logo" src={hashedinLogo} alt="logo" />
            <div className="nav-section">
                <p onClick={() => props.onHeaderClick(INavigationTypes.COURSES)}id="courses-text">COURSES</p>
                <p onClick={() => props.onHeaderClick(INavigationTypes.WISHLIST)} id="wishlist-text">MY WISHLIST</p>
                <img onClick={() => props.onHeaderClick(INavigationTypes.CHECKOUT)} id="cart-icon" src={cartIcon} alt="cart" />
                <img onClick={() => props.onHeaderClick(INavigationTypes.PROFILE)} id="profile-icon" src={profileIcon} alt="profile" />
            </div>
        </div>
    );
}

export default Header;