import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView
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
            <Text
              style={styles.text}
            >
              Do you want to play {this.props.actionQueue[0].revealedCard}?
            </Text>
            <TouchableHighlight
              style={styles.button}
              onPress={
                () => {
                      this.props.playVassal(this.props.actionQueue[0].revealedCard);
                      this.props.resolveActionQueue();
                      }
              }>
                <Text style={styles.buttonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={ () => {
								this.props.discardVassal(1)
								this.props.resolveActionQueue()
							} }>
                <Text style={styles.buttonText}>No</Text>
            </TouchableHighlight>
          </View>
        )
      } else {
        return(
          <View>
            <Text
              style={styles.text}
            >
              {this.props.actionQueue[0].revealedCard} was discarded.
            </Text>
            <TouchableHighlight
              style={styles.button}
              onPress={ () => {
								this.props.discardVassal(1)
								this.props.resolveActionQueue()
							} }>
                <Text style={styles.buttonText}>Ok</Text>
            </TouchableHighlight>
          </View>
        )
      }
    },
    "chapel": () => {
      if (this.props.actionQueue[0].handCards.length > 0) {
        return (
          <ScrollView>
            <Text
              style={styles.text}
            >
              You may select up to 4 cards to trash from your hand.
            </Text>
            <SelectMultiple
              rowStyle={styles.select}
              items={this.props.actionQueue[0].handCards}
              renderLabel={renderLabel}
              selectedItems={this.state.selectedCards}
              onSelectionsChange={this.onSelectedCardsChange.bind(this)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={
                () => {
                  this.checkMaxSelected(4, 'chapel')
                }
              }
            >
              <Text style={styles.buttonText}>Trash</Text>
            </TouchableHighlight>
          </ScrollView>
              )
      } else {
        <View>
          <Text
            style={styles.text}
          >
            There are no cards in your hand.
          </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={
              () => {this.props.resolveActionQueue()
              }
            }
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableHighlight>
        </View>
      }
    },
    'harbinger': () => {
      if (this.props.actionQueue[0].discardCards.length > 0) {
        return (
          <ScrollView>
            <Text
              style={styles.text}
            >
              You may select 1 card to move from your discard onto your deck.
            </Text>
            <SelectMultiple
              rowStyle={styles.select}
              items={this.props.actionQueue[0].discardCards}
              renderLabel={renderLabel}
              selectedItems={this.state.selectedCards}
              onSelectionsChange={this.onSelectedCardsChange.bind(this)}
            />
            <TouchableHighlight
              style={styles.button}
              onPress={
                () => {this.checkMaxSelected(1, 'harbinger')}
              }
            >
              <Text style={styles.buttonText}>Add to Deck</Text>
            </TouchableHighlight>
          </ScrollView>
              )
      } else {
        return (
          <View>
            <Text
              style={styles.text}
            >
              There are no cards in your discard pile.
            </Text>
            <TouchableHighlight
              style={styles.button}
              onPress={
                () => {this.props.resolveActionQueue()}
              }
            >
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableHighlight>
          </View>
        )
      }
    }
  }

  titleCase(string) {
    let newString = string.toLowerCase().split(' ').map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    });
    return newString.join(' ')
  }

  render() {
    return (
      <View style={styles.overlay}>
        <Text
          style={styles.header}
        >{this.titleCase(this.props.actionQueue[0].card)} Action</Text>
        { this.cardCallbacks[this.props.actionQueue[0].card]() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: responsiveHeight(5),
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 0,
    paddingBottom: responsiveHeight(5),
    backgroundColor: 'rgba(244, 161, 66, 0.95)',
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveFontSize(2.5),
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
    marginLeft: responsiveHeight(3),
    marginRight: responsiveHeight(3),
  },
  header: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(2),
  },
  button: {
    height: 26,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#2662bd',
    borderColor: '#2662bd',
    marginTop: responsiveWidth(2),
    marginRight: responsiveWidth(1),
    marginBottom: responsiveHeight(2),
    width: responsiveWidth(33),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    alignSelf: 'center',
    shadowOpacity: 0,
    elevation: 0,
  },
  select: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    left: responsiveWidth(30),
    padding: 10,
  }
})
