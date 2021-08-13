import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const[showCheckout,setShowCheckout] = useState(false);
  const[submitting, setIsSubmitting] =useState(false);
  const [didSubmit,setDidSubmit] =useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const setShowCheckoutForm = () =>{

    setShowCheckout(true);
  }

  const submitOrderHandler =  async (orderData) =>{

    setIsSubmitting(true);

  const responseData = await fetch('https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/MyOrders.json',
    {method:'POST',
  body:JSON.stringify({
    user:orderData,
    items:cartCtx.items
  })})

  setIsSubmitting(false)
  setDidSubmit(true);

  cartCtx.clearCart();

  }



  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={setShowCheckoutForm}>Order</button>}
</div>



const modalContent= <React.Fragment>{cartItems}
<div className={classes.total}>
  <span>Total Amount</span>
  <span>{totalAmount}</span>
</div>
{showCheckout && <Checkout onSubmitOrder={submitOrderHandler} onCancel={props.onClose}></Checkout>}
{!showCheckout && modalActions}</React.Fragment>

const submittingModalContent = <p>Submitting!</p>
const submittedModalContent =  <React.Fragment>
  <p>Order Has been received!</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onClose}>
    Close
  </button>  
</div>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
   {!submitting && !didSubmit && modalContent}
     {submitting && submittingModalContent}
    {!submitting && didSubmit &&  submittedModalContent}
     
     
    </Modal>
  );
};

export default Cart;
