import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

const filePath =
  Platform.OS === 'android'
    ? RNFS.ExternalDirectoryPath + '/data.json'
    : RNFS.LibraryDirectoryPath + '/data.json';
export async function SetLocalStorage(command, data) {
  try {
    await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.log(error);
  }
}

export async function GetLocalStorage() {
  try {
    const data = await RNFS.readFile(filePath, 'utf8');
    if (data !== null && data !== undefined) {
      // value previously stored
      let result = {
        status: true,
        data: JSON.parse(data),
      };
      return result;
    } else {
      let result = {
        status: false,
        data: [],
        message: "Can't find the data.",
      };
      return result;
    }
  } catch (error) {
    console.log(error);
    let result = {
      status: false,
      message: 'File not exist!',
      error: error,
    };
    return result;
  }
}
