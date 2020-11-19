import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { TEXT } from '../shared/text';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contacts: TEXT
        };
    }
    
    static navigationOptions = {
        title: 'Contact'
    };
    
    render() {
        return(
            <Card
                title="Contact Information"
            >
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.street}</Text>
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.district}</Text>
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.city}</Text>
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.tel}</Text>
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.fax}</Text>
                <Text
                        style={{margin: 10}}>
                        {this.state.contacts.email}</Text>
            </Card>
        );
    }
}
                   
export default Contact;