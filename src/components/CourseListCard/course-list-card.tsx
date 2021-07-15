import React from 'react';
import './course-list-card.css';
import { ICourseCard } from '../../data/types';

import starIcon from './star-icon.svg';
import arrowIcon from './right-arrow-black.svg';

function CourseListCard(cardData: ICourseCard) {
    let finalPrice: number = cardData.actualPrice;
    if(cardData.discountPercentage>0) {
        finalPrice = cardData.actualPrice * (100- cardData.discountPercentage) * 0.01;
    }
    return (
        <div className="course-card">
            <div id="course-logo"></div>
            <div className="title-block">
            <b id="course-title">{cardData.title}</b>
            <div id="tag1">{cardData.tags[0]}</div>
            <div id="tag2">{cardData.tags[1]}</div>
            </div>
            <p id="author">{cardData.author}</p>
            <img id="wishlist-icon" src={starIcon} alt=""/>
            <strong id="final-price">Rs {finalPrice.toFixed(2)}/-</strong>
            <p id="original-price">Rs {cardData.actualPrice}/-</p>
            <button id="add-button">ADD TO CART</button>
            <img id="arrow-icon" src={arrowIcon} alt="more"/>
        </div>
    );
}

export default CourseListCard;