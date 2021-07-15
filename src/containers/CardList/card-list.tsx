import React from 'react'
import './card-list.css';
import { ICourseCard } from '../../data/types';

import starIcon from './star-icon.svg';
import arrowIcon from './right-arrow-black.svg';


interface IProps {
    data: ICourseCard[];
    onCardClick: (card: ICourseCard) => void;
}

function CardList(props: IProps) {
    return (
        <div className="card-list-container">
            {props.data.map((cardData) => (
                <div className="course-card" key={cardData.id}>
                    <div id="course-logo"></div>
                    <div className="title-block">
                        <b id="course-title">{cardData.title}</b>
                        <div id="tag1">{cardData.tags[0]}</div>
                        <div id="tag2">{cardData.tags[1]}</div>
                    </div>
                    <p id="author">{cardData.author}</p>
                    <img id="wishlist-icon" src={starIcon} alt="" />
                    <strong id="final-price">Rs {(cardData.actualPrice * (100 - cardData.discountPercentage) * 0.01).toFixed(2)}/-</strong>
                    <p id="original-price">Rs {cardData.actualPrice}/-</p>
                    <button id="add-button" onClick={() => props.onCardClick(cardData)}>ADD TO CART</button>
                    <img id="arrow-icon" src={arrowIcon} alt="more" />
                </div>
            ))}
        </div>
    );
}
export default CardList;