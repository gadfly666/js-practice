import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap';

const Register = (props) => {

    return (
        <div>
            <Modal isOpen='true'>
                <ModalHeader>
                    <Button color='info'>Register</Button>
                </ModalHeader>
                <ModalBody style={{ textAlign: 'center' }}>
                    <Button color='primary'>Login with Facebook</Button>
                    <h3>Or</h3>
                    <FormGroup>
                        <Input style={{ marginBottom: '5px' }} type='email' placeholder='Your email'></Input>
                        <Input style={{ marginBottom: '5px' }} type='password' placeholder='Password'></Input>
                        <Button color='info'>Login</Button>
                    </FormGroup>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    );
}

export default Register;