import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { TEXT } from '../shared/text';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contacts: TEXT
        };
    }
    
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    
    static navigationOptions = {
        title: 'Contact'
    };
    
    render() {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
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
                <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
            </Card>
            </Animatable.View>
        );
    }
}
                   
export default Contact;