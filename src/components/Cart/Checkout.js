import { useRef , useState} from 'react';
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() ==='';
const isFiveLength = value => value.trim().length === 5;
const Checkout = (props) => {

    const nameRef= useRef();
    const streetRef=useRef();
    const postalRef =useRef();
    const cityRef= useRef();

    const [formInputsValidity,setFormInputsValidity] = useState ({
        name:true,
        street:true,
        postal:true,
        city:true
    })

    const confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredStreet = streetRef.current.value;
        const enteredName= nameRef.current.value;
        const enteredPostal =postalRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameIsValid= !isEmpty(enteredName)
        const streetIsValid =!isEmpty(enteredStreet);
        const  cityIsValid =!isEmpty (enteredCity);
        const postalIsValid =isFiveLength(enteredPostal);

        setFormInputsValidity({
            name:nameIsValid,
            street:streetIsValid,
            postal:postalIsValid,
            city:cityIsValid
        });

        const formIsValid = nameIsValid &&
        streetIsValid &&
        cityIsValid &&
        postalIsValid;

        if(!formIsValid){
            return;
        }

       props.onSubmitOrder({
         name:enteredName,
         street:enteredStreet,
         city:enteredCity,
         postal:enteredPostal

       });

    }
;debugger
    const nameValidity = `${classes.control} ${formInputsValidity.name ? '': classes.invalid}`
    const streetValidity = `${classes.control} ${formInputsValidity.street ? '': classes.invalid}`
    const postalValidity = `${classes.control} ${formInputsValidity.postal ? '': classes.invalid}`
    const cityValidity = `${classes.control} ${formInputsValidity.city ? '': classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameValidity}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref ={nameRef}/>
            {!formInputsValidity.name && <p>Please Enter Valid Name!</p>}
          </div>
          <div className={streetValidity}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetRef} />
            {!formInputsValidity.street && <p>Please Enter Valid street!</p>}
          </div>
          <div className={postalValidity}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalRef}/>
            {!formInputsValidity.postal && <p>Please Enter Valid postal!</p>}
          </div>
          <div className={cityValidity}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityRef} />
            {!formInputsValidity.city && <p>Please Enter Valid city!</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button  className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
}

export default Checkout;