import PropTypes from "prop-types";
import React from "react";
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Groups from "./screens/groups.screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  tabText: {
    color: "#777",
    fontSize: 10,
    justifyContent: "center"
  },
  selected: {
    color: "blue"
  }
});

const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);

const MainScreenNavigator = TabNavigator({
  Chats: { screen: Groups },
  Settings: { screen: Messages }
});

const AppNavigator = StackNavigator({
  Main: { screen: MainScreenNavigator }
});

const firstAction = AppNavigator.router.getActionForPathAndParams("Main");
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(tempNavState);

export const navigationReducer = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);
AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  nav: state.nav
});
// Connect AppWithNavitationState to Redux!
export default connect(mapStateToProps)(AppWithNavigationState);
