import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
 } from 'react-native'

import {postAddFriend} from '../../../../game-utilities/services'
import t from 'tcomb-form-native'

const Form = t.form.Form

const Player = t.struct({
  username: t.String,
})

const options = {
  fields: {
    username: {
      error: 'Please enter a valid username'
    },
  },
}

export default class AddFriendForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  onChange(value) {
    this.setState(value)
  }

	postConfig() {
		return {
			player_id: this.props.currentPlayer,
			friend_name: this.state.username
		}
	}

  handleSubmit = () => {
    if (this.state.username.length === 0) {
      alert('Please enter a username')
    } else {
			postAddFriend(this.postConfig())
				.then((response) => {
					let friends = [...this.props.friends, {id: response.id, username: response.username}]
					this.props.addFriend({friends: friends})
				})
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
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Add Friend</Text>
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
  }
});
