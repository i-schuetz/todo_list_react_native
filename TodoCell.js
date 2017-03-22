'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = ReactNative;

class TodoCell extends React.Component {
  render() {

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (

     <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>

          <View style={styles.row}>

            <View style={styles.textContainer}>


              <Text style={styles.todoId} numberOfLines={1}>
                {"Task id:" + this.props.todo.id}
              </Text>

              <Text style={styles.todoTitle} numberOfLines={2}>
                {this.props.todo.title}
              </Text>
              <Text style={styles.todoYear} numberOfLines={1}>
                {this.props.todo.completed ? "Completed" : "Todo"}
              </Text>


              <Text style={styles.todoUser} numberOfLines={1}>
                {"User id:" + this.props.todo.userId}
              </Text>

            </View>

          </View>
        </TouchableElement>
      </View>


     
    );
  }
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  todoYear: {
    color: '#999999',
    fontSize: 12,
  },
  todoId: { 
    color: '#ff0000',
    fontSize: 12,
  },
  todoUser: { 
    color: '#0000ff',
    fontSize: 12,
  },
  row: {
    backgroundColor: '#ffffcc',
    flexDirection: 'row',
    padding: 5
  },

  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

module.exports = TodoCell;
