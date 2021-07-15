import React from 'react'
import './cartCard.css';
import { ICourseCard } from '../../data/types';
import deleteIcon from './delete-icon.svg'


interface IProps {
    data: ICourseCard[] | any;
    onCardClick: (card: ICourseCard) => void;
}

function CartCard(props: IProps) {
    return (
        <div className="card-list-container">
            {props.data.map((cardData: ICourseCard) => (
                <div className="checkout-card" key={cardData.id}>
                    <div id="checkout-course-logo"></div>
                    <div className="checkout-title-block">
                        <b id="checkout-course-title">{cardData.title}</b>
                        <p id="checkout-author">{cardData.author}</p>
                    </div>
                    <p id="move-to-wishlist">Move to Wishlist</p>
                    <strong id="checkout-course-price">Rs {(cardData.actualPrice * (100 - cardData.discountPercentage) * 0.01).toFixed(2)}/-</strong>
                    <img id="delete-button" onClick={() => props.onCardClick(cardData)} src={deleteIcon} alt="delete" />
                </div>
            ))}
        </div>
    );
}
export default CartCard;