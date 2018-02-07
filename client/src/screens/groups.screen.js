import { _ } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  groupContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  groupName: {
    fontWeight: "bold",
    flex: 0.7
  }
});

const fakeData = () =>
  _.times(100, i => ({
    id: i,
    name: `Group ${i}`
  }));
class Group extends Component {
  constructor(props) {
    super(props);

    this.goToMessages = this.props.goToMessages.bind(this, this.props.group);
  }
  render() {
    const { id, name } = this.props.group;
    return (
      <TouchableHighlight key={id} onPress={this.goToMessages}>
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>{`${name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })


};
class Groups extends Component {
  static navigationOptions = {
    title: "Chats"
  };
  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Group group={item} />;
  render() {
    // render list of groups for user
    return (
      <View style={styles.container}>
        <FlatList
          data={fakeData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
export default Groups;
