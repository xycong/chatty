import { _ } from "lodash";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import React, { Component } from "react";
import randomColor from "randomcolor";
import Message from "../components/message.component";
import { graphql, compose } from 'react-apollo';
import GROUP_QUERY from '../graphql/group.query';

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#e5ddd5",
    flex: 1,
    loading: {
      justifyContent: 'center',
    },
    flexDirection: "column"
  }
});
const fakeData = () =>
  _.times(100, i => ({
    // every message will have a different color
    color: randomColor(),
    // every 5th message will look like it's from the current user
    isCurrentUser: i % 5 === 0,
    message: {
      id: i,
      createdAt: new Date().toISOString(),
      from: {
        username: `Username ${i}`
      },
      text: `Message ${i}`
    }
  }));


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameColors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    const usernameColors = {};
    // check for new messages
    if (nextProps.group) {
      if (nextProps.group.users) {
        // apply a color to each user
        nextProps.group.users.forEach((user) => {
          usernameColors[user.username] = this.state.usernameColors[user.username] || randomColor();
        });
      }
      this.setState({
        usernameColors,
      });
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.title
    };
  };
  keyExtractor = item => item.id;
  renderItem = ({ item: message }) => (
    <Message
      color={this.state.usernameColors[message.from.username]}
      isCurrentUser={message.from.id === 1}
      message={message}
    />
  )
  render() {
    const { loading, group } = this.props;

    if (loading && !group) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={group.messages.slice().reverse() }
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

Messages.propTypes = {
  group: PropTypes.shape({
    messages: PropTypes.array,
    users: PropTypes.array,
  }),
  loading: PropTypes.bool,
};
const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
    },
  }),
  props: ({ data: { loading, group } }) => ({
    loading, group,
  }),
});
export default compose(
  groupQuery,
)(Messages);