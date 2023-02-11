import React, {useCallback, useState} from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "./CheckoutForm";
import './StripeApp.css';
import ProgressBar from "./ProgressBar"
import acceptedPayments from '../img/accepted-payments.png';


const stripePromise = loadStripe('pk_test_51IfNmREhqYCIwKuUp5BGMWjSwn1mcXS9cCxQZynoMjTuJRrwb4atJELA8o2EC1HRRBpBBnkLcQKxkgo0R5CCY0s800Usufoeua');
const StripeApp = (props) => {
    const state = props.history.location.state
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    
    console.log('Printing state')
    console.log(state)


    const passState = useCallback(
        () => {
            return {
                ...state,
                email: email,
                error: error,
            }
        },
        [],
    );

  let progressBar = (
      <ProgressBar
          active="checkout"
          passState={passState}
          previous='/calendar'
          next='/meeting-code'
      />
  )

  return (
    <div className="pale-blue-background fullscreen checkout-form">
      <div className="container">
          {progressBar}
      </div>
      <div className="container checkout-form-card">
          <div className="checkout-form-element">
              <div className="pale-green-card">
                  <h2>Informations de paiement</h2>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      value={props.location.state}
                      error={error}
                      setError={setError}
                      email={email}
                      setEmail={setEmail} />
                  </Elements>
                  </div>
            </div>
            <div className="checkout-form-element">
                <div className="pale-green-card">
                    <h2>Facturation</h2>
                    <h3>Le prélèvement sera effectué <span style={{fontWeight: "500"}}>après le rendez-vous</span>, une fois le problème résolu avec succès !</h3>
                    <h3>Tarification estimée:  <span style={{fontWeight: "500"}}>€40</span></h3>
                    <h3>Ce type de réparation prend généralement <span style={{fontWeight: "500"}}>30-45 minutes.</span></h3>
                </div>
                <p>Moyens de paiement acceptés</p>
                <img src={acceptedPayments} className="accepted-payments" />                        
            </div>
        </div>
    </div>
  )
};
export default StripeApp;
