import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
	ScrollView
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

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      username: "",
      id: null,
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
			<ScrollView
				style={styles.container}
				contentContainerStyle={{flex: 1}}
			>
				{ this.renderView() }
			</ScrollView>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bfa891',
    height: responsiveHeight(100),
  },
  logo: {
    marginTop: 40,
		width: responsiveWidth(100),
  }
});
