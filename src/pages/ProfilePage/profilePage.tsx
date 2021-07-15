import React, { ChangeEvent, useEffect, useState } from 'react';
import './profilePage.css';
import { useHistory, useLocation } from 'react-router-dom';

import { ICourseCard, INavigationTypes } from '../../data/types'
import Header from '../../components/Header/header';
import Banner from '../../components/Banner/banner';
import ModalForm from '../../components/ModalForm/modalForm';
import successIcon from '../../components/ModalForm/success.svg';
import failedIcon from '../../components/ModalForm/failed.svg';
import profilePicture from './profile-picture.png';

function ProfilePage() {
    const [modalOpen, setModalOpen] = useState<string>("close");
    const [modalText, setModalText] = useState<string>("");
    const [modalSuccess, setModalSuccess] = useState<string>(failedIcon);

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [about, setAbout] = useState<string>("");

    const history = useHistory();
    const HeaderClickHandler = (value: string) => {
        switch (value) {
            case INavigationTypes.CHECKOUT:
                history.push('/checkout');
                break;
            case INavigationTypes.COURSES:
                history.push('/');
                break;
        }
    }

    const modalHandler = () => {
        setModalOpen("close");
    }

    // useEffect(() => {
    //     if (inputValue === value) {
    //         setButtonEnable(false);
    //     } else setButtonEnable(true);
    // }, [inputValue, value]);

    const formChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let nam = event.target.name;
        let val = event.target.value;
        switch (nam) {
            case 'username':
                setUsername(val);
                break;
            case 'firstName':
                setFirstName(val);
                break;
            case 'lastName':
                setLastName(val);
                break;
            case 'about':
                setAbout(val);
                break;
        }
    }

    return (
        <div className="profile-page">
            <Header onHeaderClick={HeaderClickHandler} />
            <div className="main">
                <Banner bannerText="My Profile" />
                <img id="profile-picture" src={profilePicture} alt="" />
                <div className="profile-details">
                    <form className="form">
                        <div className="display-name">
                            <p>Display Name</p>
                            <input type='text' name='username' placeholder="Enter display name" onChange={formChangeHandler} />
                        </div>
                        <div className="first-name">
                            <p>First Name</p>
                            <input type='text' name='firstName' placeholder="Enter first name" onChange={formChangeHandler} />
                        </div>
                        <div className="last-name">
                            <p>Last Name</p>
                            <input type='text' name='lastName' placeholder="Enter last name" onChange={formChangeHandler} />
                        </div>
                        <div className="about">
                            <p>About Yourself</p>
                            <textarea id="about-input" name='about' />
                        </div>
                        <p id="interest-heading">Your Area of Interest</p>
                        
                    </form>
                    
                </div>
            </div>
            <ModalForm open={modalOpen} success={modalSuccess} text={modalText} onClose={modalHandler} />
        </div>
    );
}
export default ProfilePage;