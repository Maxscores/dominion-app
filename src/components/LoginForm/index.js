import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
 } from 'react-native'

import t from 'tcomb-form-native'
import { getPlayer } from '../../game-utilities/services'

const Form = t.form.Form

const Player = t.struct({
  username: t.String,
  password: t.String,
})

const options = {
  fields: {
    username: {
      error: 'Please enter a valid username'
    },
    password: {
      error: 'Pleae enter a valid password'
    },
  },
}

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  onChange(value) {
    this.setState(value)
  }

  handleSubmit = () => {
    getPlayer(this.state)
      .then((response) => this.props.loginUser(response))
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Player}
          onChange={this.onChange.bind(this)}
          options={options}
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
