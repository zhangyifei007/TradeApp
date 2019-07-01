import { Dimensions } from 'react-native';

const basePixelWidth = 375;
const px2dp = (px: number) => (px * Dimensions.get('window').width) / basePixelWidth;

export default px2dp;
