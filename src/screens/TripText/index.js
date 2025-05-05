import {View, ScrollView} from 'react-native';
import {useContext} from 'react';

import AppText from '../../components/AppText';

import {AppContext} from '../../context/AppContextProvider';
import MyTripsHeader from '../../components/MyTripsHeader';
import Theme from '../../utilities/Theme';
import AppView from '../../components/AppView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function TripText({navigation, route}) {
  const {cs} = useContext(AppContext);
  const {tripText, title} = route.params;
  const insets = useSafeAreaInsets();

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
            marginTop: 20,
          }}>
          <View style={cs(['w-10%'])} />
          <View style={cs(['w-90%', 'pad-b-20'])}>
            <AppText size={Theme.FONT.SIZE_16}>
              {tripText.replace(/\r|¶/g, '\n')}
            </AppText>
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
