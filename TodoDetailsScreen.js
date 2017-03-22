'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;


class TodoDetailsScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>

          <View style={styles.rightPane}>
            <Text style={styles.todoTitle}>{this.props.todo.title}</Text>
            <Text>{this.props.todo.year}</Text>
            <Text>{"Some details about this todo..."}</Text>

          </View>
        </View>
      </ScrollView>
    );
  }
}


var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },

  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
  },
  castActor: {
    marginLeft: 2,
  },
});

module.exports = TodoDetailsScreen;
