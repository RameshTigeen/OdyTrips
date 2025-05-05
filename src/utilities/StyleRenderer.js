import {StyleSheet} from 'react-native';
import Theme from './Theme';

/*
 *  Add the style configuration for the app here
 *  Always begin with the prefix app-
 */

function SearchAppStyle(value, mode) {
  let selectedStyle;
  const cs = style => {
    return SearchUtilityStyle(style);
  };

  // Primary background color
  if (value === 'app-pbackground-color') {
    selectedStyle = mode === 'light' ? cs(['bgc-white']) : cs(['bgc-white']);
  }

  // Primary text color(Heading)
  else if (value === 'app-ptext-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`c-${Theme.COLOR.ORANGE}`])
        : cs([`c-${Theme.COLOR.ORANGE}`]);
  }

  // Secondary text color(paragraph,..etc)
  else if (value === 'app-stext-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`c-${Theme.COLOR.GREY_2}`])
        : cs([`c-${Theme.COLOR.GREY_2}`]);
  }

  // BackgroundColor for the Header of the App
  else if (value.startsWith('app-header-bg')) {
    selectedStyle =
      mode === 'light'
        ? cs([`bgc-${Theme.COLOR.GREY_2}`])
        : cs([`bgc-${Theme.COLOR.GREY_2}`]);
  }

  // Color and size for the Header Text
  else if (value.startsWith('app-header-text-color')) {
    selectedStyle =
      mode === 'light'
        ? cs([`c-${Theme.COLOR.GREY_1}`])
        : cs([`c-${Theme.COLOR.GREY_1}`]);
  }

  // Primary button color for app
  else if (value === 'app-pbutton-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`bgc-${Theme.COLOR.GREY_1}`])
        : cs([`bgc-${Theme.COLOR.GREY_1}`]);
  }

  // Secondary button color for app
  else if (value === 'app-sbutton-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`bgc-${Theme.COLOR.GREY_4}`])
        : cs([`bgc-${Theme.COLOR.GREY_4}`]);
  }

  // Primary border color for app
  else if (value === 'app-pborder-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`brd-c-${Theme.COLOR.ORANGE}`])
        : cs([`brd-c-${Theme.COLOR.ORANGE}`]);
  }
  // Secondary border color for app
  else if (value === 'app-sborder-color') {
    selectedStyle =
      mode === 'light'
        ? cs([`brd-c-${Theme.COLOR.GREY_4}`])
        : cs([`brd-c-${Theme.COLOR.GREY_4}`]);
  } else {
    selectedStyle = {};
  }
  return selectedStyle;

  /* ******************************************************** | App styles end | ******************************************************************** */
}

/**
 * StyleRenderer class is used to get the styles according to the mode
 * @example
 * const styleRenderer = new StyleRenderer("light"|"dark")
 * styleRenderer.CustomStyle("pb-color")
 */

class StyleRenderer {
  constructor(mode) {
    this.mode = mode;
    this.selectedStyle = [];
  }
  SetSelectedStyle(newStyle) {
    this.selectedStyle.push(newStyle);
  }
  UtilityStyle(style) {
    this.SetSelectedStyle(SearchUtilityStyle(style));
  }

  AppStyle(style, mode) {
    const SearchAppStyleResult = SearchAppStyle(style, mode);
    if (Array.isArray(SearchAppStyleResult)) {
      SearchAppStyleResult.forEach(item => {
        this.SetSelectedStyle(SearchUtilityStyle(item, mode));
      });
    } else {
      this.SetSelectedStyle(SearchAppStyleResult);
    }
  }

  CustomStyle(style) {
    this.selectedStyle = [];
    if (Array.isArray(style)) {
      style.forEach(item => {
        if (item.startsWith('app-')) {
          this.AppStyle(item, this.mode);
        } else {
          this.UtilityStyle(item);
        }
      });
    }
    return this.selectedStyle;
  }
}

function SearchUtilityStyle(value) {
  if (Array.isArray(value)) {
    if (value.length > 1) {
      console.log('please fix the bug in style renderer');
    }

    value = value[0];
  }
  let selectedStyle;
  /**
   * All the padding related styles are maintained here
   * Classes available:
   *    pad-[1-100]     - Normal padding
   *    pad-x-[1-100]   - Padding Horizontal
   *    pad-y-[1-100]   - Padding Vertical
   *    pad-t-[1-100]   - Padding Top
   *    pad-b-[1-100]   - Padding Bottom
   *    pad-l-[1-100]   - Padding Left
   *    pad-r-[1-100]   - Padding Right
   */

  // Padding
  if (value.match(/^pad-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {padding: parseInt(value.replace('pad-', ''), 10)},
    });
  }

  // Padding Horizontal
  else if (value.match(/^pad-x-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingHorizontal: parseInt(value.replace('pad-x-', ''), 10)},
    });
  }

  // Padding Vertical
  else if (value.match(/^pad-y-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingVertical: parseInt(value.replace('pad-y-', ''), 10)},
    });
  }

  // Padding Top
  else if (value.match(/^pad-t-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingTop: parseInt(value.replace('pad-t-', ''), 10)},
    });
  }

  // Padding Bottom
  else if (value.match(/^pad-b-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingBottom: parseInt(value.replace('pad-b-', ''), 10)},
    });
  }

  // Padding Left
  else if (value.match(/^pad-l-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingLeft: parseInt(value.replace('pad-l-', ''), 10)},
    });
  }

  // Padding Right
  else if (value.match(/^pad-r-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {paddingRight: parseInt(value.replace('pad-r-', ''), 10)},
    });
  }

  /**
   * All the margin realated styles are maintained here
   * Classes available:
   *    mar-[1-100]     - Normal Margin
   *    mar-x-[1-100]   - Margin Horizontal
   *    mar-y-[1-100]   - Margin Vertical
   *    mar-t-[1-100]   - Margin Top
   *    mar-b-[1-100]   - Margin Bottom
   *    mar-l-[1-100]   - Margin Left
   *    mar-r-[1-100]   - Margin Right
   */

  // Margin
  else if (value.match(/^mar-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {margin: parseInt(value.replace('mar-', ''), 10)},
    });
  }

  // Margin Horizontal
  else if (value.match(/^mar-x-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginHorizontal: parseInt(value.replace('mar-x-', ''), 10)},
    });
  }

  // Margin Vertical
  else if (value.match(/^mar-y-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginVertical: parseInt(value.replace('mar-y-', ''), 10)},
    });
  }

  // Margin Top
  else if (value.match(/^mar-t-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginTop: parseInt(value.replace('mar-t-', ''), 10)},
    });
  }

  // Margin Bottom
  else if (value.match(/^mar-b-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginBottom: parseInt(value.replace('mar-b-', ''), 10)},
    });
  }

  // Margin Left
  else if (value.match(/^mar-l-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginLeft: parseInt(value.replace('mar-l-', ''), 10)},
    });
  }

  // Margin Right
  else if (value.match(/^mar-r-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {marginRight: parseInt(value.replace('mar-r-', ''), 10)},
    });
  }

  /**
   * All the flex related styles are maintained here
   * Classes available
   *    flex-[1-100]    -- Flex
   *
   *    flex-row        -- Set the flex direction to row
   *
   *    flex-column     -- Set the flex direction to the column
   *
   *    justify-content-[center | between | evenly | start | end | around]
   *
   *    align-content-[between | start | end | around | center | stretch]
   *
   *    align-items-[center | stretch | start | end | baseline]
   *
   *    align-self-[baseline | auto | start | end | center | stretch]
   */

  // Flex
  else if (value.match(/^flex-(100|[1-9][0-9]|[1-9])$/)) {
    let flex = value.replace('flex-', '');
    selectedStyle = StyleSheet.create({style: {flex: parseInt(flex, 10)}});
  }

  // Flex Row
  else if (value === 'flex-row') {
    selectedStyle = StyleSheet.create({style: {flexDirection: 'row'}});
  }
  // Flex Column
  else if (value === 'flex-col') {
    selectedStyle = StyleSheet.create({style: {flexDirection: 'column'}});
  }

  // Justify content
  else if (value.startsWith('justify-content-')) {
    let content = value.replace('justify-content-', '');
    if (content === 'around' || content === 'between' || content === 'evenly') {
      content = 'space-' + content;
    } else if (content === 'start' || content === 'end') {
      content = 'flex-' + content;
    } else {
      content = content;
    }
    selectedStyle = StyleSheet.create({
      style: {justifyContent: content},
    });
  }

  // Align Content
  else if (value.startsWith('align-content-')) {
    let content = value.replace('align-content-', '');
    if (content === 'around' || content === 'between') {
      content = 'space-' + content;
    } else if (content === 'start' || content === 'end') {
      content = 'flex-' + content;
    } else {
      content = content;
    }
    selectedStyle = StyleSheet.create({
      style: {alignContent: content},
    });
  }

  // Align Items
  else if (value.startsWith('align-items-')) {
    let content = value.replace('align-items-', '');
    if (content === 'start' || content === 'end') {
      content = 'flex-' + content;
    } else {
      content = content;
    }
    selectedStyle = StyleSheet.create({
      style: {alignItems: content},
    });
  }

  // Align self
  else if (value.startsWith('align-self-')) {
    let content = value.replace('align-self-', '');
    if (content === 'start' || content === 'end') {
      content = 'flex-' + content;
    } else {
      content = content;
    }
    selectedStyle = StyleSheet.create({
      style: {alignSelf: content},
    });
  }

  /**
   * All the border related styles are maintained here
   *
   * Classes Available
   *    brd-c-[any color] - Border color
   *    brd-rad-[1,100]   - Border radius
   *    brd-wid-[1,9]     - Border width
   */

  // Border color
  else if (value.startsWith('brd-c-')) {
    selectedStyle = StyleSheet.create({
      style: {borderColor: value.replace('brd-c-', '')},
    });
  }

  // Border Width
  else if (value.match(/^brd-wid-[1-9]$/)) {
    let brdWid = value.replace('brd-wid-', '');
    selectedStyle = StyleSheet.create({
      style: {borderWidth: parseInt(brdWid, 10)},
    });
  }

  // Border Radius
  else if (value.match(/^brd-rad-(100|[1-9][0-9]|[1-9])$/)) {
    let brdRad = value.replace('brd-rad-', '');
    selectedStyle = StyleSheet.create({
      style: {borderRadius: parseInt(brdRad, 10)},
    });
  }

  /**
   * All the height related styles are maintained here
   *
   * Classes Available
   *    h-[1,1000] Height (integer)
   *    h-[1-100]% Height Percentage
   */

  // Height dp or sp
  else if (value.match(/^h-(1000|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])$/)) {
    let height = value.replace('h-', '');
    selectedStyle = StyleSheet.create({style: {height: parseInt(height, 10)}});
  }

  // Height percentage
  else if (value.match(/^h-(100|[1-9][0-9]|[1-9])%$/)) {
    let height = value.replace('h-', '');
    selectedStyle = StyleSheet.create({
      style: {height: height},
    });
  }

  /**
   * All the width related styles are maintained here
   *
   * Classes available
   *    w-[1-1000] - Width in dp or sp
   *    w-[1-100]% - width in percentage
   */

  // Width dp or sp
  else if (value.match(/^w-(1000|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])$/)) {
    let width = value.replace('w-', '');
    selectedStyle = StyleSheet.create({style: {width: parseInt(width, 10)}});
  }

  // Width percentage
  else if (value.match(/^w-(100|[1-9][0-9]|[1-9])%$/)) {
    let width = value.replace('w-', '');
    selectedStyle = StyleSheet.create({
      style: {width: width},
    });
  }

  /**
   * All the font related styles are maintained here
   *
   * Classes available
   *    f-w-[bold | ] -- Font weight
   *    f-f-[custom font family] -- Font Family
   *    f-size-[1,100] -- Font size
   *    f-style-[italics | normal]
   *    f-varient-[fontvarients]
   */

  // Font size
  else if (value.match(/^f-size-(100|[1-9][0-9]|[1-9])$/)) {
    selectedStyle = StyleSheet.create({
      style: {fontSize: parseInt(value.replace('f-size-', ''), 10)},
    });
  }

  // Font weight
  else if (value.startsWith('f-w-')) {
    selectedStyle = StyleSheet.create({
      style: {fontWeight: value.replace('f-w-', '')},
    });
  }

  // Font Family
  else if (value.startsWith('f-f-')) {
    selectedStyle = StyleSheet.create({
      style: {fontFamily: value.replace('f-f-', '')},
    });
  }

  // Font Style
  else if (value.startsWith('f-style-')) {
    selectedStyle = StyleSheet.create({
      style: {fontStyle: value.replace('f-style-', '')},
    });
  }

  // Font Varient
  else if (value.startsWith('f-varient-')) {
    selectedStyle = StyleSheet.create({
      style: {fontVariant: value.replace('f-varient-', '')},
    });
  }

  /**
   * All the text related styles are maintained here
   *
   * Available classes
   *    text-align-[auto | center | justify | left | right]
   */

  // Text Align
  else if (value.startsWith('text-align-')) {
    selectedStyle = StyleSheet.create({
      style: {textAlign: value.replace('text-align-', '')},
    });
  }

  // Text Align Vertical
  else if (value.startsWith('text-vertical-')) {
    selectedStyle = StyleSheet.create({
      style: {textAlignVertical: value.replace('text-vertical-', '')},
    });
  }

  /**
   * Color class
   *    c-[any color] - set the color property
   */

  // Color
  else if (value.startsWith('c-')) {
    let color = value.replace('c-', '');
    selectedStyle = StyleSheet.create({style: {color: color}});
  }

  /**
   * Background color class
   *    bgc-[any color] - set the background color property
   */

  // Background color
  else if (value.startsWith('bgc-')) {
    let bgColor = value.replace('bgc-', '');
    selectedStyle = StyleSheet.create({style: {backgroundColor: bgColor}});
  }

  /**
   * Position classes
   *    pos-[any positions]
   */
  // Position
  else if (value.startsWith('pos-')) {
    let position = value.replace('pos-', '');
    selectedStyle = StyleSheet.create({style: {position: position}});
  }

  // -------------------------- Not match any styles ------------------------------------------
  else {
    selectedStyle = StyleSheet.create({style: {}});
  }
  return selectedStyle.style;
}
export default StyleRenderer;
