'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator
} = ReactNative;
var TimerMixin = require('react-timer-mixin');

var invariant = require('fbjs/lib/invariant');
var dismissKeyboard = require('dismissKeyboard');

var TodoCell = require('./TodoCell');
var TodoDetailsScreen = require('./TodoDetailsScreen');

var API_URL = 'https://jsonplaceholder.typicode.com/todos/';

var results = [];


var TodoListScreen = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
  },

  componentDidMount: function() {
    this.setState({isLoading: true});

    fetch(API_URL)

      .then((response) => response.json())
      .then((responseData) => {
        
        results = responseData
        
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(responseData),
        });
      })
      .catch((error) => {
        results = []

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .done();
  },

  _urlForQueryAndPage: function(query: string, pageNumber: number): string {
    return API_URL
  },

  getDataSource: function(todos: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(todos);
  },

  selectTodo: function(todo: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: todo.title,
        component: TodoDetailsScreen,
        passProps: {todo},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: todo.title,
        name: 'todo',
        todo: todo,
      });
    }
  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  renderRow: function(
    todo: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <TodoCell
        key={todo.id}
        onSelect={() => this.selectTodo(todo)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        todo={todo}
      />
    );
  },

  render: function() {
    var content = this.state.isLoading ?
      <ActivityIndicator style={styles.activityIndicator} animating={this.state.isLoading} size="large"/> :
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        contentInset={{top: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
        contentOffset={{x: 0, y: -Navigator.NavigationBar.Styles.General.TotalNavHeight}}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />;
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

module.exports = TodoListScreen;