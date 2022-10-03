import { Button } from 'bootstrap';
import { Form } from 'react-bootstrap';

import React from 'react';
import PropTypes from 'prop-types';

FormCheckOffence.propTypes = {};

function FormCheckOffence(props) {
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me!" />
        </Form.Group>
        <button>Login</button>
      </Form>
    </div>
  );
}

export default FormCheckOffence;
