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
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class App extends Component {

  constructor() {
    super()
    this.state = {
      username: "",
      id: null,
      token: "",
      games: [],
			friends: [],
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
      return (<Home screenProps={this.state}/>)
    } else {
      return (
				<View>
				<Image
					source={images['dominionLogo']}
					style={styles.logo}
				>
				</Image>
				{ this.renderForm() }
				</View>
			)
    }
  }

  render() {
    return (
			<KeyboardAwareScrollView
				style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
			>
        { this.renderView() }
			</KeyboardAwareScrollView>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bfa891',
  },
  logo: {
    marginTop: 40,
		width: responsiveWidth(100),
  }
});
