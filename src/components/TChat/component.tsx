import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {style} from './style';
import {ModerateScale} from '../../utilities/Fonts';
import LocalSvgIcon from '../../utilities/SvgManager';

import type {MessageProps} from './type';

export const TMessage = ({
  item,
  isAudioPlaying,
  isSentMessage,
}: {
  item: MessageProps;
  isSentMessage: boolean;
  isAudioPlaying: boolean;
}) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        position: 'relative',
      }}>
      {isSentMessage ? (
        <View style={{width: '100%'}}>
          {item.text && (
            <View style={[style.MessageContainer, style.Sent]}>
              <View style={[style.Message, style.SentMessage]}>
                <Text
                  style={[
                    style.MessageText,
                    {
                      fontStyle: 'italic',
                    },
                  ]}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          {item.audio && (
            <View style={[style.MessageContainer, style.Sent]}>
              <Pressable
                style={[
                  {
                    padding: ModerateScale(10),
                    paddingVertical: ModerateScale(10),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: ModerateScale(15),
                    borderRadius: ModerateScale(10),
                  },
                  style.SentMessage,
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: ModerateScale(5),
                    alignItems: 'center',
                  }}>
                  <Text>Audio Chat</Text>
                </View>
                <LocalSvgIcon
                  name={isAudioPlaying ? 'AudioPause' : 'AudioPlay'}
                  size={ModerateScale(22)}
                  color={'#555'}
                />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <View style={[style.MessageContainer]}>
          <View style={[style.Message, style.ReceivedMessage]}>
            <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
              Ai:
            </Text>
            <Text style={style.MessageText}>{item.text}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
