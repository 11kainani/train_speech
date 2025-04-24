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
  fontSmall: 12,
  font: 16,
  fontLarge: 20,

  // Border radius
  radiusSmall: 8,
  radius: 12,
  radiusLarge: 16,

  // Responsive scaling
  scaleSize: (size: number) => size * PixelRatio.getFontScale(),
  isTablet: width >= 768,

  // Platform-specific values
  headerHeight: Platform.OS === "ios" ? 100 : 80,

    borderWidth: 5,
    smallMargin: 3,
    iconSize: 16,
    unit: 1,
    opacity: 10,
    maxDescriptionLength: 200,
    minDescriptionLength: 5,

};



/**
 * Returns the height value as a percentage of screen height
 * @param percent - A number between 0 and 100
 * @returns height in pixels
 */
export const responsiveHeight = (percent: number): number => {
    return (height * percent) / 100;
  };
  
  /**
   * Returns the width value as a percentage of screen width
   * @param percent - A number between 0 and 100
   * @returns width in pixels
   */
  export const responsiveWidth = (percent: number): number => {
    return (width * percent) / 100;
  };