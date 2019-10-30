import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/ListOfBooksStyle';
import {getBooksList} from '../APIcalls/Books';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      failMsg: 'Something went wrong!',
      failMsgOpacity: 0,
    };
  }

  /*  fetch data from api */

  componentDidMount() {
    getBooksList(null, this.onSuccess, this.onFailure);
  }

  onSuccess = response => {
    this.setState({
      isLoading: false,
      dataSource: response.items, //assign data to state
    });
  };

  onFailure = response => {
    console.warn('Fail to load', response);
    this.setState({
      isLoading: false,
      failMsgOpacity: 1,
    });
  };
  static navigationOptions = {
    title: 'Books', //Title of Screen
  };

  render() {
    /* Show Activity Indiactor(Loading screen) till data is fetching */
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    /*  List View of all books */
    return (
      <View style={styles.container}>
        <Text style={{opacity: this.state.failMsgOpacity}}>
          {this.state.failMsg}
        </Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                /* Navigate to another screen */
                this.props.navigation.navigate('DetailsOfBooks', {
                  name: item.volumeInfo.title,
                  image: item.volumeInfo.imageLinks.thumbnail,
                  author: item.volumeInfo.authors,
                })
              }>
              <View style={styles.content}>
                <View style={styles.leftView}>
                  <Text style={styles.title}>{item.volumeInfo.title}</Text>
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.author}>{item.volumeInfo.authors}</Text>
                  <Text style={styles.navButton}>></Text>
                </View>
              </View>
              <View style={styles.hr} />
            </TouchableOpacity>
          )}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}
