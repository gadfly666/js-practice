import React from 'react';
import {Navbar, Container, Input, NavbarBrand, Button} from 'reactstrap'

const Header = (props) => {
    return (
        <div>
            <Navbar>
                <Container className="header-container">
                    <Input style={{ display: 'inline-block', width: '30%' }} className='search' type='text' placeholder='Search...'></Input>
                    <NavbarBrand href="/">Techkids Hotgirls</NavbarBrand>

                    <div className='buttons'>
                        <Button style={{marginRight: 10}} color='primary'>Login</Button>
                        <Button color='danger'>Register</Button>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;