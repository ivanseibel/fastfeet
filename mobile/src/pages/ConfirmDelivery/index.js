import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { RNCamera } from 'react-native-camera';

import {
  Container,
  PurpleHeader,
  Card,
  TakeShotButton,
  ShotBackground,
  SubmitButton,
  SubmitButtonText,
  RowSeparator,
  Camera,
  // ShotBackground,
} from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const ConfirmDelivery = () => {
  let camera = useRef(null);

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.tron.log(data.uri);
    }
  };

  return (
    <Container>
      <Card>
        <Camera
          ref={(ref) => {
            camera = ref;
          }}
          captureAudio={false}
          type={Camera.Constants.Type.back}
          // flashMode={Camera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <TakeShotButton>
          {/* <TouchableOpacity onPress={takePicture}> */}
          <ShotBackground onPress={takePicture}>
            <Icon name="camera" size={30} color="#fff" />
          </ShotBackground>
          {/* </TouchableOpacity> */}
        </TakeShotButton>

        {/* <SubmitButton>
          <SubmitButtonText>Submit</SubmitButtonText>
        </SubmitButton> */}
      </Card>

      <PurpleHeader>
        <RowSeparator height="70px" />

        <RowSeparator height="30px" />
      </PurpleHeader>
    </Container>
  );
};

export default ConfirmDelivery;
