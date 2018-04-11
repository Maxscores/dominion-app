import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { images } from '@assets/images'
import dominionCards from '../../game-utilities/dominion'


export default class CallbackWindow extends Component {

  constructor(props) {
    super(props);
  }

  cardCallbacks = {
    "vassal": () => {
      if (dominionCards[this.props.actionStack[0].revealedCard].type.includes('action')) {
        return(
          <View>
            <Text>Do you want to play {this.props.actionStack[0].revealedCard}?</Text>
            <Button
              title='Yes'
              onPress={
                () => {
                      this.props.playVassal(this.props.actionStack[0].revealedCard);
                      this.props.resolveActionStack();
                      }
              }>
            </Button>
            <Button
              title='No'
              onPress={ () => {this.props.resolveActionStack()} }>
            </Button>
          </View>
        )
      } else {
        return(
          <View>
            <Text>{this.props.actionStack[0].revealedCard} was discarded.</Text>
            <Button
              title='Ok'
              onPress={ () => {this.props.resolveActionStack()} }>
            </Button>
          </View>
        )
      }
    }
  }

  render() {
    return (
      <View style={styles.overlay}>
        { this.cardCallbacks[this.props.actionStack[0].card]() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: responsiveHeight(9),
    bottom: 200,
    left: 0,
    right: 0,
    borderWidth: 0,
    backgroundColor: 'orange',
  },
})
