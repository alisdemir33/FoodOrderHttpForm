import { useState,useContext } from 'react';

import Section from '../UI/Section'
import OrderForm from './OrderForm';
import useHttp from '../../hooks/httpHook'
import CartContext from '../../store/cart-context';

const NewTask = (props) => {

  const { isLoading, error, sendRequest } = useHttp();
  const cartCtx = useContext(CartContext);


  const createOrder = (OrderText, OrderData) => {
    const generatedId = OrderData.id;
    const cretaedOrder = { id: generatedId, text: OrderText }
    props.onAddOrder(cretaedOrder);
  }

  const enterOrderHandler = async (orderFormData) => {
   ;debugger

 const  fullOrder = {
     ...orderFormData,
     totalCost:cartCtx.totalAmount,
     cartData: cartCtx.items
 }

    sendRequest(
      {
        url: 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/Orders.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: fullOrder,
      }, createOrder.bind(null, fullOrder));
  };

  return (
    <Section>
      <OrderForm onOrderFormClose={props.onClose} onEnterOrder={enterOrderHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
