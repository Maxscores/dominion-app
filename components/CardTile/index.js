import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class CardTile extends Component<Props> {
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
      <ImageBackground
        source={this.props.cardTileImage}
        style={{
          height: responsiveWidth(18),
          width: responsiveWidth(18),
          margin: 2,
        }}
      >
      { renderQuantity }
      </ImageBackground>
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
