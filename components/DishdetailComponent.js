import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (Comment) => dispatch(postComment(Comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            style={styles.formItem}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil-alt'
                            type='font-awesome'
                            color='#b14bb8'
                            onPress={() => props.open()}
                            style={styles.formItem}
                        />
                    </View>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}
                   
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            rating: 3,
            author: '',
            comment: ''
        };
    }
    
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    submitForm(dishId) {
        let today = new Date();
        
        var comment = {
            id: Math.random() * 100,
            dishId: dishId,
            rating: this.state.rating,
            comment: this.state.comment,
            author: this.state.author,
            date: today
        }
        
        this.props.postComment(comment);
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    
    resetForm() {
        this.setState({
            showModal: false,
            rating: 3,
            author: '',
            comment: ''
        });
    }
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    open={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Rating showRating fractions="{1}" startingValue="{3}"
                            onFinishRating={(rating) => this.setState({rating: rating})} />
                        <Input
                          placeholder='Author'
                          leftIcon={{ type: 'font-awesome', name: 'user' }}
                          onChangeText={(author) => this.setState({author: author})}
                          style = {styles.modalText}
                        />
                        <Input
                          placeholder='Comment'
                          leftIcon={{ type: 'font-awesome', name: 'comment' }}
                          onChangeText={(comment) => this.setState({comment: comment})}
                          style = {styles.modalText}
                        />
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.submitForm(dishId);}}
                            color="#512DA8"
                            title="Submit" 
                            style = {styles.modalText}
                            />
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#6c6970"
                            title="Cancel" 
                            style = {styles.modalText}
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);