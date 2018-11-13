import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

class contactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="email" name="email" placeholder="Your email"/>
                    <input type="text" name="street" placeholder="Your street"/>
                    <input type="text" name="postal" placeholder="Your postal code"/>
                    <Button 
                        bntType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default contactData