import {useEffect, useState} from 'react';
import {Image} from 'react-native';

/**
 * Custom Hook used to get the dimension of an image
 * @param {String} url Image url which you want to get dimesion
 * @returns {Object} Object that contains status,height,width,aspectRatio.
 */
function useImageDimension(url = 'sample,jgp') {
  const [result, setResult] = useState({
    status: false,
    height: null,
    width: null,
    aspectRatio: 1,
  });
  const success = (width, height) => {
    setResult({
      status: true,
      height: height,
      width: width,
      aspectRatio: width / height,
    });
  };
  const failure = () => {
    setResult({
      status: false,
      height: null,
      width: null,
      aspectRatio: 1,
    });
  };

  useEffect(() => {
    const notValid =
      url?.split(',')[1] === null || url?.split(',')[1] === undefined;
    !notValid && Image.getSize(url, success, failure);
  }, [url]);
  return result;
}
export default useImageDimension;
