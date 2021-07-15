import React, { useState } from 'react';
import './checkoutPage.css';
import { useHistory, useLocation } from 'react-router-dom';

import { ICourseCard, INavigationTypes } from '../../data/types'
import Header from '../../components/Header/header';
import Banner from '../../components/Banner/banner';
import CartCard from './cartCard';
import ModalForm from '../../components/ModalForm/modalForm';
import successIcon from '../../components/ModalForm/success.svg';
import failedIcon from '../../components/ModalForm/failed.svg';

function CheckoutPage() {
    const [modalOpen, setModalOpen] = useState<string>("close");
    const [modalText, setModalText] = useState<string>("");
    const [modalSuccess, setModalSuccess] = useState<string>(failedIcon);



    let location = useLocation();
    const state = location.state;
    const temp = state as ICourseCard[] | any;

    let listData: ICourseCard[] = [];
    let newPrice = 0;
    let newDiscount = 0;
    if (temp) {
        listData = temp.sideCheckoutData;
        listData.forEach((element: ICourseCard) => {
            newPrice += (element.actualPrice * (100 - element.discountPercentage) * 0.01);
            newDiscount += element.actualPrice * element.discountPercentage * 0.01;
        });
    }
    const [totalPrice, setTotalPrice] = useState<number>(newPrice);
    const [discountPrice, setDiscountPrice] = useState<number>(newDiscount);
    const [courseList, setCourseList] = useState<ICourseCard[]>(listData);

    const deleteHandler = (cardData: ICourseCard) => {
        let newPrice = totalPrice;
        let newDiscount = discountPrice;
        let newList: ICourseCard[] = courseList.filter(function (data) {
            if (data.id !== cardData.id) {
                return true;
            } else {
                newPrice -= (data.actualPrice * (100 - data.discountPercentage) * 0.01);
                newDiscount -= data.actualPrice * data.discountPercentage * 0.01;
                return false;
            }
        })
        setCourseList(newList);
        setTotalPrice(newPrice);
        setDiscountPrice(newDiscount);
    }
    const modalHandler = () => {
        setModalOpen("close");
        setCourseList([]);
        setTotalPrice(0);
        setDiscountPrice(0);
    }
    const history = useHistory();
    const HeaderClickHandler = (value: string) => {
        switch (value) {
            case INavigationTypes.COURSES:
                history.push('/', { courseList });
                break;
            case INavigationTypes.PROFILE:
                history.push('/profile');
                break;
        }
    }

    return (
        <div className="checkout-page">
            <Header onHeaderClick={HeaderClickHandler} />
            <main>
                <Banner bannerText="Shopping Cart" />
                <div className="course-heading">
                    <p id="course-head-text">Courses in Cart</p>
                </div>
                <CartCard data={courseList} onCardClick={deleteHandler} />
                <div className="checkout-summary">
                    <p>Total Amount</p>
                    <strong id="final-checkout-price">Rs {totalPrice.toFixed(2)}/-</strong>
                    <p id="saved">You have saved Rs {discountPrice.toFixed(2)}/-</p>
                    <div onClick={() => {
                        if (courseList.length > 0) {
                            setModalSuccess(successIcon);
                            setModalText("You have successfully placed the order!");
                            setModalOpen("modal-container");
                        } else {
                            setModalSuccess(failedIcon);
                            setModalText("There are no items in the cart!");
                            setModalOpen("modal-container");
                        }
                    }} id="checkout-button">CHECKOUT</div>
                </div>
            </main>
            <ModalForm open={modalOpen} success={modalSuccess} text={modalText} onClose={modalHandler} />
        </div>
    );
}
export default CheckoutPage;