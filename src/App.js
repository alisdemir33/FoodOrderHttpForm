import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import OrderForm from './components/Order/OrderForm'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
    setOrderFormIsShown(false);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);  
  };

  const showOrderFormHandler = () => {
    ;debugger
    setOrderFormIsShown(true);
    setCartIsShown(false);
  };

  const hideOrderFormHandler = () => {
    setOrderFormIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onShowOrderForm={showOrderFormHandler} />}
      {orderFormIsShown && <OrderForm onClose={hideOrderFormHandler} />}
      <Header onShowCart={showCartHandler} />
    
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
