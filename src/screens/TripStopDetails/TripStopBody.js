import React, {useContext} from 'react';
import {parse} from '@babel/parser';
import {Text, View, Image, Linking} from 'react-native';

import Theme from '../../utilities/Theme';
import {isValidData} from '../../utilities/Validator';
import {AppContext} from '../../context/AppContextProvider';
import GenerateBase64 from '../../utilities/GenerateBase64';
import useImageDimension from '../../hooks/useImageDimension';
import AppText from '../../components/AppText';

/*
  Last page of the trip
  Body section
  Contains if given: 
    Trip Product Details,
    Direction To that place,
*/
export default function TripStopBody(props) {
  // Details represent the response of the tripStopDetails
  const {details} = props;
  const {cs} = useContext(AppContext);
  return (
    <View>
      <TripBodyHeader title={details.product} cs={cs} />
      <TripBodyFooter
        cs={cs}
        details={details?.notes}
        notesLinks={details?.notes_links}
        directions={details?.directions}
        image={details?.product_base64}
      />
    </View>
  );
}
function TripBodyHeader(props) {
  const {title, cs} = props;
  const isTitleRequired = isValidData(title);
  return (
    <>
      {isTitleRequired && (
        <View
          style={[
            cs([
              'pad-x-10',
              'pad-y-5',
              'flex-row',
              'app-sborder-color',
              `bgc-${Theme.COLOR.GREY_7}`,
              'justify-content-center',
              'align-items-center',
            ]),
            {borderBottomWidth: 0.5},
          ]}>
          {isTitleRequired && (
            <AppText
              size={Theme.FONT.SIZE_18}
              family={Theme.FONT._HEAVY}
              varient="primary">
              {title}
            </AppText>
          )}
        </View>
      )}
    </>
  );
}

function TripBodyFooter(props) {
  const {details, directions, image, cs, notesLinks} = props;
  const isDetailsRequired = isValidData(details);
  const isDirectionsRequired = isValidData(directions);
  const isImageRequired = isValidData(image);
  const {base64String: base64} = GenerateBase64(image);
  const imageDimension = useImageDimension(base64);

  const dummyContent =
    "Odyssey is a comprehensive Multi-day Operating System designed for operators Odyssey  Odyssey  who need to manage their customers, operations and administration. If you're looking to transform your business productivity, increase efficiencies and save costs, and want happy staff that provide your customers with enjoyable and memorable experiences ... then Odyssey Tourism Management Software is for you.";
  const dummyJsonString = [
    {
      find: 'Odyssey',
      link: 'https://www.myodyssey.app/',
      replace: 'Odyssey',
    },
  ];

  /**
   * content that contains find string enclosed with curly brace.
   * As per the customer requirement, They no longer going to send the content with Curly braces which is not giving a good user experience.
   */
  let modifiedContent = details.replace(/\r|¶/g, '\n');

  /**
   * Notelinks find property may contains {{ }} braces
   * The content no longer contains curly braces, so we should find the string without braces
   */
  for (let j = 0, jlen = notesLinks?.length; j < jlen; j++) {
    /**
     * Curly brace removed find string
     */
    const findElement =
      notesLinks[j]?.find?.startsWith('{{') &&
      notesLinks[j]?.find?.endsWith('}}')
        ? notesLinks[j]?.find.replace(/{{|}}/g, '')
        : notesLinks[j]?.find;

    /**
     * Changing to content that contains find string enclosed with curly brace
     */
    modifiedContent = modifiedContent.replaceAll(
      findElement,
      `{{${findElement}}}`,
    );
  }

  return (
    <>
      {(isDetailsRequired || isDirectionsRequired || isImageRequired) && (
        <View style={cs(['mar-x-15', 'pad-b-20'])}>
          {isDetailsRequired && (
            <GenerateNotesWithNotesLink
              title={'Details'}
              content={modifiedContent}
              notesLinks={notesLinks}
              // content={modifiedContent}
              // notesLinks={dummyJsonString}
            />
          )}
          {isDirectionsRequired && (
            <View style={cs(['mar-y-10'])}>
              <AppText
                size={Theme.FONT.SIZE_18}
                family={Theme.FONT._HEAVY}
                varient="primary"
                customStyle={['mar-b-5']}>
                Directions
              </AppText>
              <AppText
                size={Theme.FONT.SIZE_16}
                family={Theme.FONT._ROMAN}
                varient="secondary">
                {directions.replace(/\r|¶/g, '\n')}
              </AppText>
            </View>
          )}
          {isImageRequired && (
            <Image
              source={{uri: base64}}
              resizeMode={'contain'}
              style={[
                imageDimension.status
                  ? {aspectRatio: imageDimension.aspectRatio}
                  : [cs(['w-100%']), {aspectRatio: 1}],
              ]}
            />
          )}
        </View>
      )}
    </>
  );
}

/**
 * Function used to create Linked text for product notes
 */
function GenerateNotesWithNotesLink({content, title, notesLinks}) {
  const {cs} = useContext(AppContext);
  const isNotesLinksAvailable = isValidData(notesLinks);

  const OpenNotesLink = link => {
    isValidData(link) && Linking.openURL(link);
  };

  /*
    Splitting the words start with '{{' and end with '}}'
   */
  const originalWords = isValidData(content) && content.split(/{{|}}/g);
  /* 
      If the link is in first place then the split function create a empty string as first index
      the following operation is performed to remove those empty space that cause alignment issues
    */
  const words = originalWords.filter(item => item !== '');

  /**
   * constant that holds string with link.
   */
  const RenderContent = isNotesLinksAvailable ? (
    words.map((word, index) => {
      let newWord = word;
      for (let i = 0, ilen = notesLinks?.length; i < ilen; i++) {
        const item = notesLinks[i];
        /**
         * We just splited the content with {{ }} thus,
         * if the find contains curly braces,
         * we should remove that to compare each other.
         */
        const findString =
          item?.find?.startsWith('{{') && item?.find?.endsWith('}}')
            ? item?.find?.replace(/{{|}}/g, '')
            : item?.find;

        if (findString === word) {
          newWord = (
            <AppText
              key={index}
              onPress={() => {
                OpenNotesLink(item?.link);
              }}
              size={Theme.FONT.SIZE_16}
              family={Theme.FONT._ROMAN}
              varient="primary"
              style={{textDecorationLine: 'underline'}}>
              {item?.replace?.replace(/ /g, ' ')}
            </AppText>
          );
          break;
        } else {
          newWord = (
            <AppText
              key={index}
              size={Theme.FONT.SIZE_16}
              family={Theme.FONT._ROMAN}
              varient="secondary">
              {word}
            </AppText>
          );
        }
      }
      return newWord;
    })
  ) : (
    <AppText
      size={Theme.FONT.SIZE_16}
      family={Theme.FONT._ROMAN}
      varient="secondary">
      {content}
    </AppText>
  );

  return (
    <View style={cs(['mar-y-10'])}>
      <AppText
        size={Theme.FONT.SIZE_18}
        family={Theme.FONT._HEAVY}
        varient="primary"
        customStyle={['mar-b-5']}>
        {title}
      </AppText>
      <Text>{RenderContent}</Text>
    </View>
  );
}
