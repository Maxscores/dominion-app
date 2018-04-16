import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import { images } from '@assets/images'
import dominionCards from '../../game-utilities/dominion'
import SelectMultiple from 'react-native-select-multiple'

const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

export default class CallbackWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCards: [],
    }
  }

  whichMaxSelected(cards, cardType) {
    if (cardType === "chapel") {
      this.props.playChapel(cards)
    } else if (cardType === "harbinger") {
      this.props.playHarbinger(cards)
    }
  }

  checkMaxSelected(maxCount, cardType) {
    if (this.state.selectedCards.length <= maxCount) {
      let cards =  this.state.selectedCards.map((card) => {
        return card.label
      })
      this.whichMaxSelected(cards, cardType)
      this.props.resolveActionQueue()
    } else {
      alert(`Please select ${maxCount} card(s) or fewer`)
    }
  }

  onSelectedCardsChange(selectedCards) {
    this.setState({selectedCards: selectedCards})
  }


  cardCallbacks = {
    "vassal": () => {
      if (dominionCards[this.props.actionQueue[0].revealedCard].type.includes('action')) {
        return(
          <View>
            <Text>Do you want to play {this.props.actionQueue[0].revealedCard}?</Text>
            <Button
              title='Yes'
              onPress={
                () => {
                      this.props.playVassal(this.props.actionQueue[0].revealedCard);
                      this.props.resolveActionQueue();
                      }
              }>
            </Button>
            <Button
              title='No'
              onPress={ () => {this.props.resolveActionQueue()} }>
            </Button>
          </View>
        )
      } else {
        return(
          <View>
            <Text>{this.props.actionQueue[0].revealedCard} was discarded.</Text>
            <Button
              title='Ok'
              onPress={ () => {this.props.resolveActionQueue()} }>
            </Button>
          </View>
        )
      }
    },
    "chapel": () => {
      if (this.props.actionQueue[0].handCards.length > 0) {
        return (
          <View>
            <SelectMultiple
              items={this.props.actionQueue[0].handCards}
              renderLabel={renderLabel}
              selectedItems={this.state.selectedCards}
              onSelectionsChange={this.onSelectedCardsChange.bind(this)}
            />
            <Button
              style={{marginBottom: 2}}
              title="Trash"
              onPress={
                () => {
                  this.checkMaxSelected(4, 'chapel')
                }
              }
            >
            </Button>
          </View>
              )
      } else {
        <View>
          <Text>There are no cards in your hand.</Text>
          <Button
            style={{marginBottom: 2}}
            title="Ok"
            onPress={
              () => {this.props.resolveActionQueue()
              }
            }
          >
          </Button>
        </View>
      }
    },
    'harbinger': () => {
      if (this.props.actionQueue[0].discardCards.length > 0) {
        return (
          <View>
            <SelectMultiple
              items={this.props.actionQueue[0].discardCards}
              renderLabel={renderLabel}
              selectedItems={this.state.selectedCards}
              onSelectionsChange={this.onSelectedCardsChange.bind(this)}
            />
            <Button
              style={{marginBottom: 2}}
              title="Add to Deck"
              onPress={
                () => {
                  this.checkMaxSelected(1, 'harbinger')
                }
              }
            >
            </Button>
          </View>
              )
      } else {
        <View>
          <Text>There are no cards in your discard pile.</Text>
          <Button
            style={{marginBottom: 2}}
            title="Ok"
            onPress={
              () => {this.props.resolveActionQueue()}
            }
          >
          </Button>
        </View>
      }
    }
  }

  render() {
    return (
      <View style={styles.overlay}>
        { this.cardCallbacks[this.props.actionQueue[0].card]() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: responsiveHeight(9),
    bottom: responsiveHeight(18),
    left: 0,
    right: 0,
    borderWidth: 0,
    paddingBottom: responsiveHeight(5),
    backgroundColor: 'orange',
  },
  submit: {
    backgroundColor: '#1d63d3',
    color: 'white',
    padding: 15,
    marginBottom: 2
  }
})
