import React, {useContext, useState} from 'react';
import {Linking, Pressable, View} from 'react-native';

import TripStopKeyText from './TripStopKeyText';
import TripStopValueText from './TripStopValueText';

import AppText from '../../components/AppText';
import TripIcon from '../../components/TripIcon';

import AppData from '../../Config';
import Theme from '../../utilities/Theme';
import LocalSvgIcon from '../../utilities/SvgManager';
import {isValidData} from '../../utilities/Validator';
import {TimeFormatter} from '../../utilities/Formatter';

import {AppContext} from '../../context/AppContextProvider';

export default function TripStopHeader(props) {
  const {timeline} = props;
  const {cs, deviceInfo} = useContext(AppContext);
  const Row = ({children}) => {
    const childrenLength = children?.length;
    const hasThreeChild = isValidData(childrenLength) && childrenLength === 3;
    return (
      <View style={cs(['flex-row', 'align-items-center', 'mar-b-5'])}>
        <View style={cs(['w-18%'])}>{children[0]}</View>
        <View
          style={cs([
            `w-${
              hasThreeChild ? (deviceInfo.largeDevice ? '62' : '57') : '82'
            }%`,
          ])}>
          {children[1]}
        </View>
        {hasThreeChild && (
          <View
            style={cs([
              'align-items-center',
              `w-${deviceInfo.largeDevice ? '20' : '25'}%`,
            ])}>
            {children[2]}
          </View>
        )}
      </View>
    );
  };

  const Row1 = () => {
    const time = timeline.time_check_in;
    const title = timeline.provider_name;
    return (
      <Row>
        <>
          <TripIcon
            type={timeline.type}
            base64={timeline.base64}
            fileName={timeline.file_name}
          />
        </>
        <>
          {isValidData(title) && (
            <AppText size={Theme.FONT.SIZE_16} family={Theme.FONT._HEAVY}>
              {title}
            </AppText>
          )}
        </>
        <>
          {isValidData(time) && (
            <AppText varient={'primary'}>{TimeFormatter(time)}</AppText>
          )}
        </>
      </Row>
    );
  };
  const Row2 = () => {
    const [pressed, setPressed] = useState(false);
    const address = timeline.address;
    const city = timeline.city;
    const location = {lat: timeline.latitude, lng: timeline.longitude};
    const locationEnabled =
      location !== undefined &&
      location.lng !== '' &&
      location.lng !== undefined &&
      location.lng !== null &&
      location.lat !== '' &&
      location.lat !== undefined &&
      location.lat !== null;
    return (
      <Row>
        <></>
        <>
          {isValidData(address) && (
            <AppText customStyle={['mar-b-3']}>
              {address.replace(/\r|¶/g, '\n')}
            </AppText>
          )}
          {isValidData(city) && (
            <AppText customStyle={['mar-b-3']}>{city}</AppText>
          )}
        </>
        <>
          {locationEnabled && (
            <Pressable
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              onPress={() => {
                const link = `${AppData.MAP_URL}${location.lat},${location.lng}`;
                Linking.canOpenURL(link)
                  .then(supported => {
                    Linking.openURL(link);
                  })
                  .catch(err => console.log(err));
              }}>
              <LocalSvgIcon
                name="LocationDot"
                size={Theme.FONT.SIZE_24}
                color={pressed ? Theme.COLOR.ORANGE : Theme.COLOR.GREY_4}
              />
            </Pressable>
          )}
        </>
      </Row>
    );
  };
  const Row3 = () => {
    const phone = timeline.phone;
    const checkout = timeline.time_check_out;
    return (
      <Row>
        <>{isValidData(phone) && <TripStopKeyText>Phone</TripStopKeyText>}</>
        <>
          {isValidData(phone) && <TripStopValueText>{phone}</TripStopValueText>}
        </>
        <>
          {isValidData(checkout) && (
            <TripStopKeyText>Check Out</TripStopKeyText>
          )}
        </>
      </Row>
    );
  };
  const Row4 = () => {
    const hosts = timeline.hosts;
    const checkout = timeline.time_check_out;
    return (
      <Row>
        <>{isValidData(hosts) && <TripStopKeyText>Hosts</TripStopKeyText>}</>
        <>
          {isValidData(hosts) && <TripStopValueText>{hosts}</TripStopValueText>}
        </>
        <>
          {isValidData(checkout) && (
            <TripStopValueText varient={'primary'}>
              {TimeFormatter(checkout)}
            </TripStopValueText>
          )}
        </>
      </Row>
    );
  };

  const Row5 = () => {
    const meals = timeline.meals;
    return (
      <Row>
        <>{isValidData(meals) && <TripStopKeyText>Meal/s</TripStopKeyText>}</>
        <>
          {isValidData(meals) && <TripStopValueText>{meals}</TripStopValueText>}
        </>
      </Row>
    );
  };

  const Row6 = () => {
    const facilities = timeline.facilities;
    return (
      <Row>
        <>
          {isValidData(facilities) && (
            <TripStopKeyText>Facilities</TripStopKeyText>
          )}
        </>
        <>
          {isValidData(facilities) && (
            <TripStopValueText>{facilities}</TripStopValueText>
          )}
        </>
      </Row>
    );
  };

  return (
    <View
      style={[
        cs(['app-sborder-color', 'pad-5', 'pad-x-15', 'pad-t-10']),
        {borderBottomWidth: 1},
      ]}>
      <Row1 />
      <Row2 />
      <View style={cs(['mar-y-10'])} />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
    </View>
  );
}
