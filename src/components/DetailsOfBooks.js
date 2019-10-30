import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

export default class DetailsOfBooks extends Component {
  state = {
    /** Use all of previous screen values */
    name: this.props.navigation.getParam('name'),
    image: this.props.navigation.getParam('image'),
    author: this.props.navigation.getParam('author'),
  };

  static navigationOptions = ({navigation}) => ({
    title: `Books ${navigation.state.params.name}`, //Title of screen as per  to book title
  });
  render() {
    return (
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
          <Image
            style={{width: 150, height: 150}}
            resizeMode="cover"
            source={{uri: this.state.image}}
          />
          <Text style={{fontSize: 24}}>Title:- {this.state.name}</Text>
          <Text style={{fontSize: 18}}>Author:- {this.state.author}</Text>
        </View>
      </ScrollView>
    );
  }
}
