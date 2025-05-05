import React from 'react';
import {
  View,
  Text,
  Platform,
  Pressable,
  TextInput,
  SectionList,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import {TMessage} from './component';

import LocalSvgIcon from '../../utilities/SvgManager';

import useTChat from './useTChat';

import {style} from './style';
import Theme from '../../utilities/Theme';
import {ModerateScale} from '../../utilities/Fonts';
import {GenerateRandomId, isSameUser} from './util';

import type {SectionListData} from 'react-native';
import type {MessageProps, TChatProps} from './type';

export default function TChat({
  user,
  data = [],
  alwaysShowSend,
  loading = false,
  inverted = true,
  loadingMore = false,
  showAvatarForEveryMessage,
  HandleRefresh,
  HandleLoadMore,
  HandleSendMessage,
  ...props
}: TChatProps) {
  /** Hooks Implementations */

  const {
    message,
    audioMessage,
    messageSectionList,
    isAudioPlaying,
    isAudioRecording,
    inputRef,
    sectionListRef,
    OnChangeState,
    HandleRecording,
    HandlePlayRecording,
    HanldeRemoveRecording,
  } = useTChat({
    data: data,
  });

  /** Utility Methods */

  function HandleListReachEnd(info: {distanceFromEnd: number}): void {
    if (loadingMore || loading) return;
    if (info?.distanceFromEnd > 0) {
      HandleLoadMore();
    }
  }

  /** Render Components  */

  const RenderRow = React.useCallback(
    ({item}: {item: MessageProps}) => {
      const isReceived = isSameUser({message: item, user});

      return (
        <TMessage
          item={item}
          isSentMessage={isReceived}
          isAudioPlaying={false}
        />
      );
    },
    [message.length],
  );

  const RenderTitle = ({section: {title}}: {section: SectionListData<any>}) => {
    return <Text style={style.Header}>{title}</Text>;
  };

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <SectionList
        ref={sectionListRef}
        sections={messageSectionList}
        keyExtractor={(item, index) => GenerateRandomId(item._id.toString())}
        renderItem={RenderRow}
        initialNumToRender={30}
        renderSectionFooter={RenderTitle}
        inverted={inverted}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          marginTop: ModerateScale(40),
        }}
        style={{flex: 1}}
        scrollEventThrottle={50}
        onEndReachedThreshold={0.5}
        onEndReached={HandleListReachEnd}
        onRefresh={HandleRefresh}
        refreshing={false}
        scrollEnabled
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size={'small'}
              style={{padding: ModerateScale(20)}}
              color={Theme.COLOR.GREY_1}
            />
          ) : undefined
        }
      />

      <View
        style={{
          flexDirection: 'row',
          gap: ModerateScale(5),
          padding: ModerateScale(5),
        }}>
        <Pressable
          onPress={HandleRecording}
          style={{
            alignItems: 'center',
            width: ModerateScale(80),
            gap: ModerateScale(5),
          }}>
          <View
            style={{
              backgroundColor: 'rgb(255,249,247)',
              borderWidth: ModerateScale(1),
              borderColor: 'rgb(238,239,238)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: ModerateScale(20),
              padding: ModerateScale(5),
              height: ModerateScale(80),
              width: ModerateScale(70),
            }}>
            <LocalSvgIcon
              name={isAudioRecording ? 'StopRecord' : 'Speech'}
              size={ModerateScale(isAudioRecording ? 40 : 55)}
              color={isAudioRecording ? '#C00' : '#757573'}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
            }}>
            click to 'Speak'
          </Text>
        </Pressable>

        <View
          style={[
            {
              flex: 1,
              gap: ModerateScale(15),
              borderWidth: ModerateScale(1),
              borderColor: '#ECECEC',
              borderRadius: ModerateScale(15),
              padding: ModerateScale(8),
              backgroundColor: 'rgb(255,249,247)',
            },
            !message && {
              justifyContent: 'center',
              paddingHorizontal: ModerateScale(30),
            },
          ]}>
          <Pressable
            style={{
              padding: ModerateScale(10),
              paddingVertical: ModerateScale(10),
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ECECEC',
              flexDirection: 'row',
              position: 'absolute',
              top: -45,
              right: 0,
              gap: ModerateScale(15),
              borderRadius: ModerateScale(10),
              display: !isAudioRecording && audioMessage ? 'flex' : 'none',
            }}
            onPress={HandlePlayRecording}>
            <View
              style={{
                flexDirection: 'row',
                gap: ModerateScale(5),
                alignItems: 'center',
              }}>
              <Pressable onPress={HanldeRemoveRecording}>
                <LocalSvgIcon
                  name={'CloseIcon'}
                  size={ModerateScale(15)}
                  color={'#222'}
                />
              </Pressable>
              <Text>Audio Chat</Text>
            </View>
            <LocalSvgIcon
              name={isAudioPlaying ? 'AudioPause' : 'AudioPlay'}
              size={ModerateScale(22)}
              color={'#555'}
            />
          </Pressable>

          <TextInput
            {...props}
            multiline
            ref={inputRef}
            style={[!message ? style.TextInputPlaceHolder : style.TextInput]}
            placeholder={props.placeholder ?? 'Ask Ai anything ...'}
            placeholderTextColor={'#757573'}
            value={message}
            onSubmitEditing={event => {
              const text = event.nativeEvent.text;
              OnChangeState([{key: 'message', value: ''}]);
              HandleSendMessage({text, audio: audioMessage});
            }}
            returnKeyType={'send'}
            onChangeText={(text: string) =>
              OnChangeState([{key: 'message', value: text}])
            }
          />
          {message ||
            (audioMessage && (
              <Pressable
                onPress={() => {
                  console.log('Is it Clickabled');
                  HandleSendMessage({text: message, audio: audioMessage});
                  OnChangeState([{key: 'message', value: ''}]);
                }}
                style={{
                  width: ModerateScale(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  borderRadius: ModerateScale(5),
                  padding: ModerateScale(5),
                  backgroundColor: 'rgb(70,91,98)',
                }}>
                <LocalSvgIcon
                  name={'PaperPlane'}
                  size={ModerateScale(22)}
                  color={'#FFF'}
                />
              </Pressable>
            ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
