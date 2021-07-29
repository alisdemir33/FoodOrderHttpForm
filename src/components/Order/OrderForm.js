import useInput from '../../hooks/use-input'
import Modal from '../UI/Modal'
import classes from './OrderForm.module.css'

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const OrderForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onEnterOrder(
      {
        firstName:firstNameValue,
        lastName:lastNameValue,
        email:emailValue,
        orderData:{
          
        }
      }
    );
    console.log('Submitted!');

    console.log(firstNameValue, lastNameValue, emailValue);

    

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameHasError ? `${classes['form-control']} ${classes['invalid']}` : `${classes['form-control']}`;
  const lastNameClasses = lastNameHasError ? `${classes['form-control']} ${classes['invalid']}` : `${classes['form-control']}`;
  const emailClasses = emailHasError ? `${classes['form-control']} ${classes['invalid']}` : `${classes['form-control']}`;

  //const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  //const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  //const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <Modal onClose={props.onOrderFormClose}>
    <form onSubmit={submitHandler}>
      <div className={classes['control-group']}>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p className={classes['error-text']}>Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p  className={classes['error-text']}>Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p  className={classes['error-text']}>Please enter a valid email address.</p>}
      </div>
      <div className={classes['form-actions']}>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
    </Modal>
  );
};

export default OrderForm;
