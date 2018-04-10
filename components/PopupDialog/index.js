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
        height={0.75}
        width={.95}
      >
				{ this.showButton() }
        <Image
          source={images[this.props.cardImage]}
        >
        </Image>
      </PopupDialog>
    )
  }
}

const styles = StyleSheet.create({
})
