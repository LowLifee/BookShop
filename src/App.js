import { createContext, useState } from 'react';

import Header from './components/header/Header';
import FeedBack from './components/feedBack/FeedBack';
import Form from './components/form/Form';
import Items from './components/items/Items';
import Modal from './components/modal/Modal';

import './App.css';

export const Orders = createContext('');

function App() {
  const [data, setData] = useState({ cart: [], phoneNumber: '' });
  const [popupActive, setPopup] = useState(false);
  const [product, setProduct] = useState({});

  const popupToggle = () => {
    setPopup(status => !status);
  }

  return (
    <Orders.Provider value={{
      data,
      setData,
      popupActive,
      popupToggle,
      product,
      setProduct
    }}>
      <div className="App">
        <Header />
        <FeedBack />
        <Form />
        <Items />
        <Modal />
      </div>

    </Orders.Provider>
  );
}

export default App;
