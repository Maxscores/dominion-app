import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import CardTile from '../../../../components/CardTile'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';

export default class PlayArea extends Component {

  constructor(props) {
    super(props);
  }

  _renderItem ({item, index}) {
        return (
          item
        );
    }

  renderPlayarea() {
    return this.props.playareaCards.map((card, index) => {
      return (
        <CardTile
          openDialog={ this.props.openDialog }
          cardWidth={40}
          cardHeight={40}
          key={index}
					cardName={card}
					>
        </CardTile>
      )
    })
  }

  render() {



    return (
      <View style={styles.container}>
        <Carousel
        layout={'stack'}
        layoutCardOffset={25}
        data={this.renderPlayarea()}
        renderItem={this._renderItem}
        sliderWidth={responsiveWidth(100)}
        itemWidth={responsiveWidth(40)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3c0563',
  }
})
