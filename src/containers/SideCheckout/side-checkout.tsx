import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './side-checkout.css';
import { ICourseCard } from '../../data/types';

interface IProps {
    data: ICourseCard[];
    totalPrice: string;
}

function SideCheckout(props: IProps) {
    const history = useHistory();
    //const goToCheckout = useCallback(() => history.push('/checkout'), [history]);
    let sideCheckoutData = props.data;
    const goToCheckout = () => {
        history.push('/checkout', {sideCheckoutData});
    }

    return (
        <div className="side-checkout">
            <p id="side-checkout-heading">YOUR CART DETAILS</p>
            <hr />
            <div className="side-checkout-list">
                {props.data.map((cardData) => (
                    <div className="side-checkout-card" key={cardData.id}>
                        <div id="side-checkout-icon"></div>
                        <p id="side-checkout-title">{cardData.title}</p>
                        <b id="side-checkout-price">{(cardData.actualPrice * (100 - cardData.discountPercentage) * 0.01).toFixed(2)}/-</b>
                        <hr />
                    </div>
                ))}
            </div>
            <hr />
            <div className="side-checkout-bottom">
                <p id="total-price-text">Total Cart Value</p>
                <b id="total-price">Rs {props.totalPrice}/-</b>
                <p id="go-to-checkout" onClick={goToCheckout}>GO TO CHECKOUT</p>
            </div>
        </div>
    );
}
export default SideCheckout;