import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
	View,
	Button
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SelectMultiple from 'react-native-select-multiple'

import _ from 'lodash'

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

export default class NewGame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFriends: []
		}
	}

	onSelectedFriendsChange(selectedFriends) {
		this.setState({selectedFriends: selectedFriends})
	}

	friends() {
		return this.props.screenProps.friends.map((friend) => {
			return {label: friend.username, value: friend.id}
		})
	}

	render() {
		console.warn(this.friends())
		return (
			<View style={styles.container}>
				<Text style={styles.title}>New Game</Text>
				<Text>Select Up to 3 Friends</Text>
				<ScrollView>
					<SelectMultiple
						items={this.friends()}
						rowStyle={styles.row}
						renderLabel={renderLabel}
						selectedItems={this.state.selectedFriends}
						onSelectionsChange={this.onSelectedFriendsChange.bind(this)}
					/>
				</ScrollView>
				<Button
					title='Start New Game'
					onPress={() => alert(this.props.screenProps.currentPlayer)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
		paddingTop: responsiveHeight(7),
    flex: 1,
    backgroundColor: '#bfa891',
    alignItems: 'center',
  },
	text: {
		fontSize: 24,
	},
	title: {
		fontSize: 36,
		marginBottom: responsiveHeight(7)
	},
	row: {
		width: responsiveWidth(80),
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: 'white',
		backgroundColor: '#bfa891',
	}
});
