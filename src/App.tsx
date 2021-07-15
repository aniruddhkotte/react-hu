import React, { ChangeEvent, useState } from 'react';

import './App.css';
import * as data from './data/mock.json'
import { ICourseCard } from './data/types'
import { INavigationTypes } from './data/types'

import Header from './components/Header/header';
import Banner from './components/Banner/banner';
import CardList from './containers/CardList/card-list';
import SearchBar from './components/SearchBar/search-bar';
import SideCheckout from './containers/SideCheckout/side-checkout';
import ModalForm from './components/ModalForm/modalForm';
import successIcon from './components/ModalForm/success.svg';
import failedIcon from './components/ModalForm/failed.svg';
import { useHistory } from 'react-router-dom';

let courseList: Array<ICourseCard> = [];
data.courses.forEach(element => {
  let course: ICourseCard = {
    id: element.id,
    title: element.title,
    author: element.author,
    tags: element.tags,
    actualPrice: element['actual-price'],
    discountPercentage: element['discount-percentage']
  }
  courseList.push(course);
});
let checkoutList: Array<ICourseCard> = [];

function App() {
  const [cardListData, setCardListData] = useState<ICourseCard[]>(courseList);
  const [sideCheckoutData, setSideCheckoutData] = useState<ICourseCard[]>(checkoutList);
  const [selectedCard, setSelectedCard] = useState<null | ICourseCard>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCartPrice, setTotalCartPrice] = useState<string>("0");
  const [modalOpen, setModalOpen] = useState<string>("close");
  const [modalText, setModalText] = useState<string>("");
  const [modalSuccess, setModalSuccess] = useState<string>(failedIcon);

  const searchQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let query: string = event.target.value.toLowerCase();

    let newList: ICourseCard[] = [];
    let regex = new RegExp(`${query}`);

    courseList.forEach(element => {
      if (regex.test(element.title.toLowerCase())) {
        newList.push(element);
        return;
      }
      if (regex.test(element.author.toLowerCase())) {
        newList.push(element);
        return;
      }
      if (regex.test(element.tags[0].toLowerCase())) {
        newList.push(element);
        return;
      }
      if (regex.test(element.tags[1].toLowerCase())) {
        newList.push(element);
        return;
      }
    });
    setCardListData(newList);
  }

  const modalHandler = () => {
    setModalOpen("close");
  }

  const history = useHistory();
  const HeaderClickHandler = (value: string) => {
    switch (value) {
      case INavigationTypes.CHECKOUT:
        history.push('/checkout', { sideCheckoutData });
        break;
      case INavigationTypes.COURSES:
        history.push('/', { sideCheckoutData });
        break;
      case INavigationTypes.PROFILE:
        history.push('/profile');
        break;
    }
  }

  const addToCart = (selectedCard: ICourseCard) => {
    if (sideCheckoutData.find(e => e.id === selectedCard.id)) {
      setModalSuccess(failedIcon);
      setModalText("Item is already present in the cart");
      setModalOpen("modal-container");
    } else {
      setSideCheckoutData(sideCheckoutData => [...sideCheckoutData, selectedCard]);
      let finalPrice = (Number(totalCartPrice) + (selectedCard.actualPrice * (100 - selectedCard.discountPercentage) * 0.01)).toFixed(2);
      setTotalCartPrice(finalPrice);
      setModalSuccess(successIcon);
      setModalText("Item has been successfully added to the cart");
      setModalOpen("modal-container");
    }
  }
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    if (value === "ltoH") {
      cardListData.sort((a, b) => (a.actualPrice > b.actualPrice) ? 1 : -1);
    }
    setCardListData(cardListData)
  }
  return (
    <div className="App">
      <Header onHeaderClick={HeaderClickHandler} />
      <main>
        <Banner bannerText="Disconver Latest Courses on React" />
        <div className="course-heading">
          <p id="course-head-text">All Courses</p>
          <select id="sort-dropdown" onChange={handleSort}>
            <option value="lToH">Low to High</option>
            <option value="hToL">High to Low</option>
          </select>
        </div>
        <CardList onCardClick={addToCart} data={cardListData} />
        <SearchBar query={searchQuery} onQueryChange={searchQueryHandler} />
        <SideCheckout data={sideCheckoutData} totalPrice={totalCartPrice} />
      </main>
      <ModalForm open={modalOpen} success={modalSuccess} text={modalText} onClose={modalHandler} />
    </div>
  );
}
export default App;
