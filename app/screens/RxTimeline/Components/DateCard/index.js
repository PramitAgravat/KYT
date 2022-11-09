import { View } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
import Moment from 'moment';
const DateCard = ({ fullDate, date, day }) => {
    return (
        <View style={{ flex: 0.2, top: 30, alignItems: 'center' }}>
            <Text style={{ color: "#333333", textAlign: 'center', fontSize: 14, fontFamily: FONT_BOLD }}>
                {Moment(fullDate).format('MMM') + " '" + Moment(fullDate).format('YY')}
            </Text>
            <Text style={{ color: "#48A1AB", textAlign: 'center', fontSize: 16, fontFamily: FONT_BOLD }}>
                {date + " " + day}
            </Text>
            {/* <Text style={{ color: "#48A1AB", textAlign: 'center', fontSize: 16, fontFamily: FONT_BOLD }}>
                {day}
            </Text> */}
        </View>
    )
}

export default DateCard;