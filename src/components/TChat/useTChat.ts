import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import type {ConversationListType} from './type';
import type {SectionList, TextInput} from 'react-native';

export interface TChatState {
  message: string;
  messageSectionList: any;
  audioMessage: string;
  isAudioRecording: boolean;
  isAudioPlaying: boolean;
}

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function useTChat({data}: {data: ConversationListType[]}) {
  const [state, setState] = React.useState<TChatState>({
    message: '',
    messageSectionList: [],
    audioMessage: '',
    isAudioRecording: false,
    isAudioPlaying: false,
  });
  const inputRef = React.useRef<TextInput>(null);
  const sectionListRef = React.useRef<SectionList>(null);

  /**
   * Utility Methods
   */

  const OnChangeState = (
    list: {
      key: keyof TChatState;
      value: TChatState[keyof TChatState];
    }[],
  ) => {
    const updates = Object.fromEntries(
      list.map(item => [item.key, item.value]),
    );

    setState(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const CreateGroupMessageBasedTime = (messages: any) => {
    const groupedMessages: any = {};

    messages.forEach((message: any) => {
      const date = new Date(message.createdAt);
      let header: string = '';

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        header = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        header = 'Yesterday';
      } else {
        header = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      if (!groupedMessages[header]) {
        groupedMessages[header] = [];
      }
      groupedMessages[header].push(message);
    });

    return Object.entries(groupedMessages).map(([header, data]) => ({
      title: header,
      data: data,
    }));
  };

  /**
   *  Audio Recording Handling
   * ----------
   *  For CRUD Operations
   *
   */

  const RequestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      return (
        granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    }

    return true;
  };

  const HandleRecording = () => {
    if (!state.isAudioRecording) {
      setState(prev => ({...prev, isAudioRecording: true}));
      HandleStartRecording();
    } else {
      HandleStopRecording();
    }
  };

  const HandleStartRecording = async () => {
    console.log('Audio Recording Started');

    try {
      const hasPermission = await RequestPermissions();
      if (!hasPermission) {
        console.warn('Permission denied');
        return;
      }

      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording path:', result);

      setState(prev => ({
        ...prev,
        isAudioRecording: true,
        audioMessage: result,
      }));
    } catch (error) {
      console.error('Recording failed:', error);
      setState(prev => ({...prev, isAudioRecording: false}));
    }
  };

  const HandleStopRecording = async () => {
    try {
      console.log('Audio Recording Stopped');

      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();

      console.log('Recording stopped at:', result);
      setState(prev => ({...prev, isAudioRecording: false}));
    } catch (error) {
      console.error('Stop recording failed:', error);
    }
  };

  const HandlePlayRecording = async () => {
    if (!state.audioMessage) return;

    if (state.isAudioPlaying) {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setState(prev => ({...prev, isAudioPlaying: false}));
      return;
    }

    try {
      setState(prev => ({...prev, isAudioPlaying: true}));

      await audioRecorderPlayer.startPlayer(state.audioMessage);
      audioRecorderPlayer.addPlayBackListener(async (e: any) => {
        console.log(e);
        if (e.isFinished) {
          await audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
          setState(prev => ({...prev, isAudioPlaying: false}));
        }
      });
    } catch {
      setState(prev => ({...prev, isAudioPlaying: false}));
    }
  };

  const HanldeRemoveRecording = async () => {
    if (state.isAudioPlaying) {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      return;
    }

    setState(prev => ({...prev, isAudioPlaying: false, audioMessage: ''}));
  };

  /**
   * Effect Implementations
   */

  React.useEffect(() => {
    const sectionListData = CreateGroupMessageBasedTime(data);
    setState(prev => ({
      ...prev,
      messageSectionList: sectionListData,
    }));
  }, [data]);

  return {
    ...state,
    inputRef,
    sectionListRef,
    setState,
    OnChangeState,
    HandleRecording,
    HandlePlayRecording,
    HanldeRemoveRecording,
  };
}
