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

  _renderItem ({item, index}) {
        return (
          item
        );
    }

  render() {

    let playCardRender = [];
    for (let i = 0; i < 20; i++ ) {
      playCardRender.push(
        <CardTile
          cardWidth={40}
          cardHeight={40}
          key={i}
          cardTileImage={"copper"}>
        </CardTile>
      )
    };

    return (
      <View style={styles.container}>
        <Carousel
        layout={'stack'}
        layoutCardOffset={25}
        data={playCardRender}
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
