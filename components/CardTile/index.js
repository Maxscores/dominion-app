import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native';

export default class CardTile extends Component<Props> {
  render() {
    return (
      <ImageBackground
        source={this.props.cardTileImage}
        style={{
          height: 75,
          width: 75,
          margin: 2,
        }}
      >
        <View style={styles.cardCount}>
          <Text >
            {this.props.cardQuantity}
          </Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  cardCount: {
    backgroundColor: 'red',
    width: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
