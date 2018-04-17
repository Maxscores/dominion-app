import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
 } from 'react-native'
 import {
   responsiveHeight,
   responsiveWidth,
 } from 'react-native-responsive-dimensions';
import t from 'tcomb-form-native'
import u from 'tcomb-validation'
import { postPlayer, registerForPushNotifications } from '../../game-utilities/services'

const Form = t.form.Form

const Player = t.struct({
  username: t.String,
  phoneNumber: t.Number,
  password: t.String,
	rememberMe: t.Boolean,
})

const options = {
  fields: {
    username: {
      error: 'Please enter a valid username',
			placeholder: 'Max Length: 11',
			maxLength: 11,
    },
    phoneNumber: {
      error: 'Please enter a valid phone number',
      label: 'Phone Number',
      placeholder: 'Format: 5558675309',
      maxLength: 10
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

export default class SignUpForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      phoneNumber: 0,
			token: registerForPushNotifications(),
			rememberMe: false,
    }
  }

	values() {
		return {
			rememberMe: this.state.rememberMe
		}
	}

  onChange(value) {
    this.setState(value)
  }

  handleSubmit = () => {
    if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.phoneNumber.length < 10) {
      alert('Please enter username, 10 digit phone number, and password')
    } else {
      postPlayer(this.state)
      	.then((response) => this.props.signUpUser(response, this.state.rememberMe))
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
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.updateForm('login')}>
          <Text style={styles.text}>Already have an account? Login.</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  },
	text: {
		fontSize: 16,
    color: 'white',
    alignSelf: 'center'
	}
});
