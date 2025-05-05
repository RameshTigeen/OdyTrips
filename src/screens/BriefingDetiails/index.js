import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';

import AppText from '../../components/AppText';
import MyTripsHeader from '../../components/MyTripsHeader';

import Theme from '../../utilities/Theme';
import {isValidData} from '../../utilities/Validator';
import {DateFormatter, TimeFormatter} from '../../utilities/Formatter';

import {AppContext} from '../../context/AppContextProvider';
import AppView from '../../components/AppView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function BriefingDetails({navigation, route}) {
  const {cs} = useContext(AppContext);
  const {briefingDetails, title} = route.params;
  const insets = useSafeAreaInsets();
  const {date, time, phone, address, email} = briefingDetails;
  return (
    <AppView>
      <View style={cs(['flex-1', 'app-pbackground-color'])}>
        <MyTripsHeader
          title={title}
          page="tripText"
          goBack
          onGoBack={() => {
            navigation.goBack();
          }}
        />

        <ScrollView
          style={cs(['w-100%', 'pad-x-15'])}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'row',
          }}>
          <View style={cs(['w-10%'])} />
          <View style={cs(['w-90%'])}>
            {(isValidData(date) ||
              isValidData(time) ||
              isValidData(phone) ||
              isValidData(email)) && (
              <View style={cs(['mar-t-20', 'mar-b-40'])}>
                <BriefingTitle title={'Details'} />
                {isValidData(date) && (
                  <Row>
                    <BriefingKey value={'Date'} />
                    <BriefingValue
                      value={DateFormatter(date)}
                      varient={'primary'}
                    />
                  </Row>
                )}
                {isValidData(time) && (
                  <Row>
                    <BriefingKey value={'Time'} varient={'primary'} />
                    <BriefingValue
                      value={TimeFormatter(time).toUpperCase()}
                      varient={'primary'}
                    />
                  </Row>
                )}
                {isValidData(phone) && (
                  <Row>
                    <BriefingKey value={'Phone'} />
                    <BriefingValue value={phone} family={Theme.FONT._ROMAN} />
                  </Row>
                )}
                {isValidData(email) && (
                  <Row>
                    <BriefingKey value={'Email'} />
                    <BriefingValue value={email} family={Theme.FONT._ROMAN} />
                  </Row>
                )}
              </View>
            )}
            {isValidData(address) && (
              <View>
                <BriefingTitle title={'Address'} />
                <BriefingValue
                  family={Theme.FONT._ROMAN}
                  value={address.replace(/\r|¶/g, '\n')}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </AppView>
  );
}

function BriefingTitle({title}) {
  return (
    <AppText
      size={Theme.FONT.SIZE_24}
      family={Theme.FONT._HEAVY}
      customStyle={['pad-y-10']}>
      {title}
    </AppText>
  );
}
function BriefingKey({value}) {
  return <AppText size={Theme.FONT.SIZE_16}>{value}</AppText>;
}
function BriefingValue({
  value,
  varient = 'secondary',
  family = Theme.FONT._HEAVY,
}) {
  return (
    <AppText size={Theme.FONT.SIZE_18} varient={varient} family={family}>
      {value}
    </AppText>
  );
}
function Row({children}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{minWidth: 100}}>{children[0]}</View>
      <View>{children[1]}</View>
    </View>
  );
}
