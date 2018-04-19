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
      <View
        style={styles.cardContainer}
      >
        <TouchableHighlight
          onPress={() => {
            this.props.openDialog(
							this.props.cardName,
							this.props.popupAction,
							this.props.popupMethod
						)
          }}>
          <ImageBackground
            source={images[`${this.props.cardName.replace(" ", "_")}Tile`]}
            style={{
              height: responsiveWidth(this.props.cardHeight),
              width: responsiveWidth(this.props.cardWidth),
              margin: 2,
            }}
          >
            { renderQuantity }
          </ImageBackground>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardCount: {
    backgroundColor: 'red',
    width: responsiveWidth(5.8),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCountNumber: {
    fontSize: responsiveFontSize(2),
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  }
})
