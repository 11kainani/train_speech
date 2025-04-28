import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const DIMENSIONS = {
  screenWidth: width,
  screenHeight: height,

  // Basic spacing
  paddingSmall: 8,
  padding: 16,
  paddingLarge: 24,

  marginSmall: 8,
  margin: 16,
  marginLarge: 24,

  // Font sizes
  fontSmall: 8,
  font: 12,
  fontLarge: 16,

  // Border radius
  radiusSmall: 4,
  radius: 8,
  radiusLarge: 12,

  // Border Width
  bordersmall: 1,
  border : 2,

  //icon
  iconSize: 16,
  iconSizeLarge: 24,
  iconSizeXLarge: 32,

  // Responsive scaling
  scaleSize: (size: number) => size * PixelRatio.getFontScale(),
  isTablet: width >= 768,

  responsiveHeight: (percent: number) => (height * percent) / 100,
  
  responsiveWidth: (percent: number) => (width * percent) / 100,

  // Platform-specific values
  headerHeight: Platform.OS === "ios" ? 100 : 80,

    smallMargin: 3,
   
    unit: 1,
    opacity: 10,
    maxDescriptionLength: 200,
    minDescriptionLength: 5,

};


