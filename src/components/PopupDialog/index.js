import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
	Button,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog from 'react-native-popup-dialog';

import { images } from '@assets/images'

export default class Popup extends Component {

  constructor(props) {
    super(props);
  }

	showButton() {
		if (this.props.popupAction) {
			return (
				<Button
					title={`${this.props.popupAction}`}
					onPress={ this.props.popupMethod.bind(this, this.props.cardName) }
				/>
			)
		}
	}

  render() {
    return (
      <PopupDialog
        ref={this.props.dialog}
        height={0.60}
        width={0.60}
				containerStyle={styles.popup}
      >
				{ this.showButton() }
        <Image
          source={images[this.props.cardImage]}
					style={styles.image}
					resizeMode='contain'
        >
        </Image>
      </PopupDialog>
    )
  }
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		height: undefined,
		width: undefined,
	}
})
