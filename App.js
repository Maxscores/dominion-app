import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
	AsyncStorage,
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
		this.logoutUser = this.logoutUser.bind(this)
  }

	componentDidMount() {
		Expo.Asset.loadAsync(Object.values(images))
		this.loadRememberedUser()
	}

	logoutUser() {
		this.setState({username: '', id: null}, () => {this.deleteRememberedUser()})
	}

	async deleteRememberedUser() {
		try {
			await AsyncStorage.clear()
		} catch (e) {
		}
	}

	async loadRememberedUser() {
		try {
			let username = await AsyncStorage.getItem('username')
			let id = await AsyncStorage.getItem('id')
			if (username && id) {
				this.setState({username: username, id: id})
			}
		} catch (e) {
		}
	}

	async rememberMe(info) {
		try {
			await AsyncStorage.multiSet([
				['username', info.username],
				['id', `${info.id}`]
			])
		} catch (e) {
		}
	}

  loginUser(info, rememberMe) {
		if (rememberMe) {
			this.rememberMe(info)
		}
    this.setState(info)
  }

  signUpUser(info, rememberMe) {
		if (rememberMe) {
			this.rememberMe(info)
		}
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
      return (<Home screenProps={{state: this.state, logoutUser: this.logoutUser}}/>)
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
        contentContainerStyle={{flex: 1}}
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
    marginTop: responsiveHeight(5),
		width: responsiveWidth(100),
  }
});
