import {
    purple900,
    grey600,
    pinkA100, pinkA200, pinkA400,
    fullWhite,
  } from 'material-ui/styles/colors'
  import { fade } from 'material-ui/utils/colorManipulator'
  import spacing from 'material-ui/styles/spacing'
  
  export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
      primary1Color: purple900,
      primary2Color: purple900,
      primary3Color: grey600,
      accent1Color: fullWhite,
      accent2Color: fullWhite,
      accent3Color: fullWhite,
      textColor: fullWhite,
      secondaryTextColor: fade(fullWhite, 0.7),
      alternateTextColor: fullWhite,
      canvasColor: '#303030',
      borderColor: fade(fullWhite, 0.3),
      disabledColor: fade(fullWhite, 0.3),
      pickerHeaderColor: fade(fullWhite, 0.12),
      clockCircleColor: fade(fullWhite, 0.12),
    },
  };