import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default class Supply extends Component {

  constructor(props) {
    super(props);
  }

  renderSupply() {
    let supplyCardRender = [];

    for (var card in this.props.supplyCards) {
      supplyCardRender.push(
        <CardTile
          openDialog={ this.props.openDialog }
          key={card}
          cardHeight={20}
          cardWidth={20}
					cardName={card.toLowerCase()}
					popupAction={ this.props.popupAction }
					popupMethod={ this.props.popupMethod }
          cardQuantity={ this.props.supplyCards[card] }
				/>
      )
    };
    return supplyCardRender;
  }

  render() {

    let firstCards = this.renderSupply().slice(0, 6)
    let secondCards = this.renderSupply().slice(6, 12)
    let thirdCards = this.renderSupply().slice(12)

    return (
      <View>
        <Text
          style={styles.text}
        >
        Kingdom Cards
        </Text>
        <Swiper
          maxHeight={responsiveHeight(27)}
          maxWidth={responsiveWidth(65)}
          paginationStyle={{
            bottom: -responsiveHeight(3),
          }}>
          <View style={styles.container}>
            { firstCards }
          </View>
          <View style={styles.container}>
            { secondCards }
          </View>
          <View style={styles.container}>
            { thirdCards }
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    textAlign: 'center',
    marginTop: responsiveHeight(0.5)
  }
})
