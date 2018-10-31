import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

  state = {
    orderForm: {
          name: {
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Your Name'
            },
            value:'',
            validation: {
              required: true,
            },
            valid: false,
          },
          street: {
            elementType:'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Street'
            },
            value:'',
            validation: {
              required: true,
            },
            valid: false,
          },
          zipCode: {
            elementType:'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP CODE'
            },
            value:'',
            validation: {
              required: true,
              minLength: 5,
              maxLength:5
            },
            valid: false,
          },
          country: {
            elementType:'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Country'
            },
            value:'',
            validation: {
              required: true,
            },
            valid: false,
          },
          email: {
            elementType:'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your E-Mail'
            },
            value:'',
            validation: {
              required: true,
            },
            valid: false,
          },
          deliveryMethod: {
            elementType:'select',
            elementConfig: {
              options:[
                {value:'fastest', displayValue:'Fastes'},
                {value:'cheapest', displayValue:'Cheapest'}
              ]
            },
            value:'',
          },
    }
  }

  orderHandler = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData ={};
        for (let formElementIdentifier in this.state.orderForm){
          formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }
        this.props.onOrderBurger(order);
  }

  checkValidity(value, rules){
    let isValid = true;

    if (rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return  isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier]=updatedFormElement;
    console.log(updatedFormElement);
    this.setState({orderForm:updatedOrderForm})
  }

  render() {
    const formElementsArray =[];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit ={this.orderHandler}>

        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value = {formElement.config.value}
            changed ={(event)=> this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success">ORDER</Button>
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
