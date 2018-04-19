import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
 } from 'react-native'

import {postAddFriend} from '../../../../game-utilities/services'
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
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
			player_id: this.props.localPlayer,
			friend_name: this.state.username
		}
	}

  handleSubmit = () => {
    if (this.state.username.length === 0) {
      alert('Please enter a username')
    } else {
			postAddFriend(this.postConfig())
				.then((response) => {
					let friends = [...this.props.friends, {id: response.id, username: response.username, player_id: response.friend_id}]
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
          style={{width: responsiveWidth(80)}}
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
		alignItems: 'center',
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
    justifyContent: 'center',
    width: responsiveWidth(80)
  }
});
