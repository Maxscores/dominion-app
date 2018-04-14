import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  TabNavigator
} from 'react-navigation';

import Home from './src/containers/Home'
import LoginForm from './src/components/LoginForm'
import SignUpForm from './src/components/SignUpForm'
import { images } from '@assets/images'
import {
  responsiveHeight,
} from 'react-native-responsive-dimensions';

// const routeConfig = {
//   Playground: {
//     screen: Playground,
//   },
// }
//
// const navConfig = {
//   tabBarOptions: {
//     labelStyle: {
//       fontSize: 22,
//     }
//   }
// }
//
// const RootNav = TabNavigator(routeConfig, navConfig)

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      username: "",
      id: 0,
      token: "",
      games: [],
      formType: 'login',
    }
  }

  loginUser(info) {
    this.setState(info)
  }

  signUpUser(info) {
    this.setState(info)
  }

  renderForm() {
    if (this.state.formType === 'login') {
      return <LoginForm loginUser={ this.loginUser.bind(this) } updateForm={ this.updateForm.bind(this) } />
    } else {
      return <SignUpForm signUpUser={ this.signUpUser.bind(this) } updateForm={ this.updateForm.bind(this) } />
    }
  }

  updateForm(type) {
    this.setState({formType: type})
  }

  renderView() {
    if (this.state.username !== "") {
      return (<Home />)
    } else {
      return (
        <View style={styles.container}>
          <Image
            source={images['dominionLogo']}
            style={styles.logo}
          >
          </Image>
          <Text style={styles.friends}>with Friends</Text>
          { this.renderForm() }
        </View>
      )
    }
  }

  render() {
    return this.renderView();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bfa891',
    height: responsiveHeight(100)
  },
  logo: {
    marginLeft: -10,
    marginTop: 40,
  },
  friends: {
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    fontSize: 20,
    marginTop: -10,
    marginBottom: -40,
  }
});
