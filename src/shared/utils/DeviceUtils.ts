import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

const SCREEN_WIDTH: number = width
const SCREEN_HEIGHT: number = height

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT
}