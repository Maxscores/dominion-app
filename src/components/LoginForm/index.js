import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
 } from 'react-native'

import t from 'tcomb-form-native'
import { loginPlayer } from '../../game-utilities/services'

const Form = t.form.Form

const Player = t.struct({
  username: t.String,
  password: t.String,
	rememberMe: t.Boolean,
})

const options = {
  fields: {
    username: {
      error: 'Please enter a valid username'
    },
    password: {
      error: 'Pleae enter a valid password',
      secureTextEntry: true
    },
		rememberMe: {
			onTintColor: '#2662bd'
		},
  },
}

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
			rememberMe: false,
    }
  }

	values() {
		return {
			username: this.state.username,
			password: this.state.password,
			rememberMe: this.state.rememberMe
		}
	}

  onChange(value) {
    this.setState(value)
  }

  handleSubmit = () => {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      alert('Please enter both a username and password')
    } else {
      loginPlayer(this.state)
      .then((response) => this.props.loginUser(response, this.state.rememberMe))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Player}
          onChange={this.onChange.bind(this)}
          options={options}
					value={this.values()}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {this.props.updateForm('signup')}}>
          <Text style={styles.buttonText}>Want an account? Sign Up.</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#2662bd',
    borderColor: '#2662bd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
