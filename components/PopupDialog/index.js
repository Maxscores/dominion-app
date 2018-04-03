import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog from 'react-native-popup-dialog';

import { images } from '@assets/images'

export default class Popup extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (

      <PopupDialog
        ref={this.props.dialog}
      >
        <ImageBackground
          source={images[this.props.cardImage]}
          style={{
            height: responsiveWidth(90),
            width: responsiveWidth(90),
            margin: 2,
          }}
        >
        </ImageBackground>
      </PopupDialog>
    )
  }
}


const styles = StyleSheet.create({
  playContainer: {
    height: responsiveWidth(60),
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
  supply: {
  }
})
