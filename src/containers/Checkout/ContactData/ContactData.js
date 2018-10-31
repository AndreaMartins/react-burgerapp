import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
// import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

  state = {
    name:'',
    email:'',
    address: {
      street: '',
      postalCode: ''
    },

  }

  orderHandler = (event) => {
        event.preventDefault();

        alert('You continue!');
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            // orderData: formData,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        this.props.onOrderBurger(order);
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading){
      form = <Spinner/>;
    }
    return(
      <div className={classes.ContactData}>
        <h4> Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price:state.totalPrice,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger:(orderData) => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
