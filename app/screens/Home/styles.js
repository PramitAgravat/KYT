import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const Header_Maximum_Height = width * 0.7;
const Header_Minimum_Height = 50;
const cardElevation = 120;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const TITLE_TEXT = fontStyle.fonts.TITLE_TEXT;
const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    marginHorizontal: 10,
  },

  input: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    width: '65%',
    left: -10,
  },
  textView: {
    fontFamily: TITLE_TEXT,
    fontSize: 15,
    color: '#47A0AB',
    marginLeft: 20,
    marginTop: 5,
  },
  menuButtonStyle: { width: 25, height: 25, marginTop: 5 },

  videoContainer: {
    // backgroundColor:"#000",
    // flex: 1,
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 5,
    // marginTop: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  videoCoverImage: {
    backgroundColor: '#000',
    width: width * 0.85,
    height: width * 0.3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  videoDetailContainer: {
    backgroundColor: '#fff',
    width: width * 0.85,
    height: width * 0.2,
    flexDirection: 'row',
  },
  videoTextContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    flexDirection: 'column',
    flex: 0.7,
  },
  videoTextTitle: { fontFamily: FONT_BOLD, fontSize: 13, color: '#47A0AB' },
  textContain: {
    fontFamily: FONT_REGULAR,
    fontSize: 14,
  },
  shareButtonView: { justifyContent: 'center', alignItems: 'center', flex: 0.3 },
  shareButtonBG: { width: 80, height: 60, position: 'absolute' },
  shareButtonText: {
    fontFamily: FONT_BOLD,
    fontSize: 16,
    // fontWeight: 'bold',
    // fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    // top: Platform.OS == "ios" ? 3 : 0
  },
  MainContainer: {
    flex: 1,
    textAlignVertical: 'center',
    // paddingTop: (Platform.OS == 'ios') ? 20 : 10
  },

  HeaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlignVertical: 'center',
    // top: (Platform.OS == 'ios') ? 0 : 0,
  },

  HeaderInsideTextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
    backgroundColor: '#ECEFF1',
  },
  blogContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,
    width: width * 0.9,
    borderRadius: 10,
    borderColor: '#d2d2d2',
    borderWidth: 0.5,
    height: cardElevation,
    backgroundColor: '#fff',
    //only android
    elevation: 5,

    //only iOs
    shadowOpacity: 0.6, //only works if backgroundColor defined
    shadowRadius: 5, //shadow fuzzyness
    shadowOffset: { width: 1, height: 5 },
  },
  blogImage: {
    height: cardElevation,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  blogTitleView: {
    marginVertical: 5,
    marginHorizontal: 10,
    flex: 1,
    // width: width * .55,
  },
  blogTitleText: {
    paddingVertical: 2,
    fontFamily: FONT_BOLD,
    fontSize: 13,
    // fontWeight: 'bold'
  },
  blogContainText: {
    top: 5,
    fontFamily: FONT_REGULAR,
    fontSize: 12,
    alignItems: 'center',
  },
  dateAndShareIconView: {
    // backgroundColor: "#f5f5f5",
    flexDirection: 'row',
    position: 'absolute',
    bottom: 1,
    height: 30,
    width: '100%',
  },
  dateText: { fontFamily: FONT_BOLD, fontSize: 14 },
  shareIconView: { position: 'absolute', right: 5, width: 50, height: 30, alignItems: 'center' },
  shareIcon: { height: 20, width: 20 },
  profileImage: { width: 40, height: 40, borderRadius: 50 },
  fellingTodayText: {
    textAlignVertical: 'center',
    // top: Platform.OS == "ios" ? 3 : 0,
    fontFamily: TITLE_TEXT,
    fontSize: 18,
    marginLeft: 0,
    color: '#FFFFFF',
  },
  moreButtonView: { width: 30 },
  // Menu Style
  mainView: { margin: 5, flexDirection: 'row', alignItems: 'center' },
  imageContainer: { justifyContent: 'center', alignItems: 'center' },
  imageBG: { width: width * 0.1, height: width * 0.1 },
  icon: { position: 'absolute', width: width * 0.06, height: width * 0.06 },
  /*
        imageBG: { width: 40, height: 40 },
        icon: { position: 'absolute', width: 25, height: 30 },
         */
  textStyle: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: '#47A0AB',
    marginLeft: 10,
    textAlign: 'center',
  },

  //Profile View
  profileContiner: { alignItems: 'center', margin: 10, flexDirection: 'row' },
  profilePicContiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  profilePic: { position: 'absolute', width: 30, height: 30 },
  profileText: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
    color: '#47A0AB',
    marginLeft: 30,
  },
  profileEditIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'absolute',
    right: 10,
  },
  editIcon: { position: 'absolute', width: 15, height: 15 },
  buttoContainer: { justifyContent: 'center', alignItems: 'center' },
  buttonBG: { width: 150, height: 40 },
  addNewProfileButtonText: {
    position: 'absolute',
    fontSize: 16,
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  // Comment Box Container
  commentContainerView: { margin: 5 },
  personName: {
    fontSize: 12,
    color: '#484848',
    fontFamily: 'Lemonada-Regular',
  },
  titleText: { fontFamily: 'Lemonada-Bold', fontSize: 16, color: '#46C1D0' },
  descriptionText: {
    fontFamily: FONT_REGULAR,
    fontSize: 14,
    textAlign: 'center',
    color: '#484848',
  },
  ratingView: { marginTop: 5 },
  textInputStyle: {
    fontFamily: 'Lemonada-Bold',
    padding: 5,
    textAlignVertical: 'top',
    //  height: 100,
    borderColor: '#A1DCE4',
    borderWidth: 1,
    borderRadius: 5,
  },

  // Submit Button
  submitButtonView: { justifyContent: 'center', alignItems: 'center', margin: 5 },
  submitButtonBGImage: { width: 80, height: 40, position: 'absolute' },
  submitButtonText: {
    // position: 'absolute',
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: width * 0.7,
    borderRadius: 30,
  },
  buttonTextStyle: {
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    color: '#fff',
    width: '100%',
    fontSize: 18,
    textAlignVertical: 'center',
    // paddingTop: Platform.OS == "ios" ? 8 : 0
  },

  navigationButtonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: width * 0.3,
    borderRadius: 30,
  },
  navigationButtonTextStyle: {
    fontFamily: FONT_BOLD,
    textAlign: 'center',
    color: '#fff',
    width: '100%',
    fontSize: 13,
    textAlignVertical: 'center',
    // paddingTop: Platform.OS == "ios" ? 8 : 0
  },
});
export default styles;
