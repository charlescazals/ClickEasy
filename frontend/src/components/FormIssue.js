import React from "react";
import { Form } from 'react-bootstrap';
import "./FormIssue.css";

export default function FormIssue(props) {
    return (
        <Form className="register-form" >
            <Form.Group controlId="user_problem">
            <Form.Control
                className="form-control-clickeasy"
                as="textarea"
                placeholder="Dites-nous tout ..."
                value={props.value}
                name="user_problem"
                style={{minHeight: props.minHeight}}
                onChange={props.onChange}
            />
            </Form.Group>
        </Form>
    )
}