import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import HelperDataService from "../services/HelperService";
import "./CheckoutForm.css"
import "../btn.css"


const CheckoutForm = (props) => {
        const state = props
        const history = useHistory()
        const stripe = useStripe();
        const elements = useElements();

       

        // Handle real-time validation errors from the card Element.
        const handleChange = (event) => {
            if (event.error) {
                props.setError(event.error.message);
                
            } else {
                props.setError(null);
            }
        }

        // Handle form submission.
        const handleSubmit = async (event) => {
                event.preventDefault();
                const card = elements.getElement(CardElement);

                const {paymentMethod, error} = await stripe.createPaymentMethod({
                    type: 'card',
                    card: card,
                });
               
                
                if (error) {
                    //setError(error.response.data)
                    alert('please try again')
                window.location.reload(false);
                }
                else {
                    HelperDataService.saveStripeInfo({email: props.email, payment_method_id: paymentMethod.id}).then(response => {
                        console.log(response.data);
                        if(response.data.message == "Success"){
                            history.push({
                                pathname: '/meeting-code',
                                state: state.value
                            })
                    }
                }
                    ).catch(error => {
                        console.log(error)
                    })
                }
            }
        ;

        return (
            <form onSubmit={handleSubmit} className="stripe-form">
                <div className="form-row">
                    <label htmlFor="email">
                        Adresse e-mail
                    </label>
                    <input
                        className="form-input "
                        id="email"
                        name="name"
                        type="email"
                        placeholder="christine@exemple.fr"
                        required
                        value={props.email}
                        onChange={(event) => {
                            props.setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="card-element">
                        Carte de crédit ou de débit
                    </label>

                    <CardElement
                        id="card-element"
                        onChange={handleChange}
                    />
                    <div className="card-errors" role="alert">{props.error}</div>
                </div>
                <h6>Nos paiements sont 100% sécurisés par la plateforme <a href="https://stripe.com/">Stripe</a>.</h6>
                <button type="submit" className="btn btn-clickeasy">Finaliser</button>
            </form>
        );
    }
;

export default CheckoutForm;