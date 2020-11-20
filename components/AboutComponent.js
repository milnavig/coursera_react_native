import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { TEXT } from '../shared/text';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History(props) {
    
        const item = props.history;
        
        if (item != null) {
            return(
                <Card title="Our History">
                    <Text
                            style={{margin: 10}}>
                            {item}</Text>
                </Card>
                );
        }
        else {
            return(<View></View>);
        }
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
          about: TEXT.about,
          leaders: LEADERS
        };
    }
    
    static navigationOptions = {
        title: 'About'
    };
    
    render() {
        var title = "Contact Information";
        
        const renderLeadershipItem = ({item, index}) => {
            return (

                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                      />
                    
                );
        };
        
        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History history={this.state.about} />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <History history={this.state.about}  />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <History history={this.state.about} />
                    <Card title='Corporate Leadership'>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView>
            );
        }
        /*
        return(
            <View>
                <History history={this.state.about} />
                <Card title="Corporate leadership">
                
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeadershipItem}
                        keyExtractor={item => item.id.toString()}
                        />
                </Card>
            </View>
        );*/
    }
}
                   
export default connect(mapStateToProps)(About);