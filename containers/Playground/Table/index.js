import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Supply from './Supply';
import Hand from './Hand';
import PlayArea from './PlayArea';
import Scoreboard from '../../../components/Scoreboard';
import TurnDetail from '../../../components/TurnDetail';
import { images } from '@assets/images'
import PopupDialog from '../../../components/PopupDialog'

export default class Table extends Component {

  constructor() {
    super();
    this.state = {
      cardImage: "copperFull",
    }
  }

  openDialog(image) {
    this.setState({cardImage: image}, () => {
      this.popupDialog.show()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TurnDetail />
        <View style={styles.topContainer}>
          <Supply openDialog={ this.openDialog.bind(this) } style={styles.supply}/>
          <Scoreboard />
        </View>
        <View style={styles.playContainer}>
          <PlayArea openDialog={ this.openDialog.bind(this) } />
        </View>
        <View>
          <Hand openDialog={ this.openDialog.bind(this) } />
        </View>
        <PopupDialog
          cardImage={ this.state.cardImage }
          dialog={(popupDialog) => { this.popupDialog = popupDialog; }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  playContainer: {
    height: responsiveWidth(60),
  },
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row'
  },
})
