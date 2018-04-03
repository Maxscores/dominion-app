import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableHighlight,
} from 'react-native';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog from 'react-native-popup-dialog';
import { images } from '@assets/images'


export default class CardTile extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {

    let renderQuantity;
    if (this.props.cardQuantity) {
      renderQuantity = (
        <View style={styles.cardCount}>
          <Text style={styles.cardCountNumber}>
            {this.props.cardQuantity}
          </Text>
        </View>
      )
    }

    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.props.openDialog(`${this.props.cardTileImage}Full`)
          }}>
          <ImageBackground
            source={images[`${this.props.cardTileImage}Tile`]}
            style={{
              height: responsiveWidth(this.props.cardHeight),
              width: responsiveWidth(this.props.cardWidth),
              margin: 2,
            }}
          >
            { renderQuantity }
          </ImageBackground>
        </TouchableHighlight>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          containerStyle={{zIndex:10, elevation: 10}}
        >
          <ImageBackground
            source={images[`${this.cardName}Full`]}
            style={{
              height: responsiveWidth(90),
              width: responsiveWidth(90),
              margin: 2,
            }}
          >
          </ImageBackground>
        </PopupDialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardCount: {
    backgroundColor: 'red',
    width: responsiveWidth(5.4),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCountNumber: {
    fontSize: responsiveFontSize(2),
  },
})
