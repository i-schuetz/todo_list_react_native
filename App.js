import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';


var SearchScreen = require('./TodoListScreen');


export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Todos',
          component: SearchScreen,
        }}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ff'
  },

});
