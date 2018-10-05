import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const Checkout = props => {
  // info needed
  const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
  const PAYMENT_URL = `/api/campaigns/${props.id}/donate`;
  const CURRENCY = 'USD';
  const fromUSDtoCent = amount => amount * 100;

  const successPayment = res => {
    props.updateState(res.data)
  }

  const errorPayment = data => {
    console.log('error payment', data)
  }

  const onToken = amount => token => {
    axios.post(PAYMENT_URL,{
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDtoCent(amount)
    }).then(successPayment).catch(errorPayment);
  }
  
  const Checkout = ({name, description, amount}) =>
    <StripeCheckout 
      name={name}
      description={description}
      amount={fromUSDtoCent(amount)}
      token={onToken(amount)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
    return (
      <div>
        <Checkout 
          name="The Real Kickstarter"
          amount={props.amount}
          description={props.description}
        />
      </div>
    )
}

export default Checkout