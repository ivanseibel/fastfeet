import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, Image, ActivityIndicator } from 'react-native';

import api from '~/services/api';

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
  CameraObject,
} from './styles';

const ConfirmDelivery = ({ navigation, route }) => {
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  let camera = useRef(null);
  const { id } = route.params;

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.1, base64: false, width: 200 };
      const data = await camera.takePictureAsync(options);
      console.tron.log(data.uri);
      setImage(data.uri);
    }
  };

  const handlePostSignature = async () => {
    setSubmitting(true);
    if (!image) {
      setSubmitting(false);
      Alert.alert(
        'Warning',
        'You must capture the signature to end this delivery!'
      );
      return;
    }

    try {
      const body = new FormData();

      body.append('file', {
        type: 'image/jpg',
        uri: image,
        name: 'signature.jpg',
      });

      const headers = {
        'content-type': 'multipart/form-data',
        accept: 'application/json',
      };

      const { data } = await api.post('signatures', body, { headers });

      await api.put(`deliveries/${id}/end`, {
        end_date: new Date(),
        signature_id: data.id,
      });

      setSubmitting(false);
      Alert.alert('Success', 'Delivered is ended!');
      navigation.navigate('Dashboard');
    } catch (error) {
      setSubmitting(false);
      Alert.alert('Network error', error.message);
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
          <CameraObject>
            {/* empty object only for alignment purpose */}
          </CameraObject>

          <CameraObject>
            <ShotBackground onPress={takePicture}>
              <Icon name="camera" size={30} color="#fff" />
            </ShotBackground>
          </CameraObject>

          <CameraObject background="rgba(0,0,0,0.2)">
            <Image
              source={{ uri: image || 'no content' }}
              style={{ width: 37, height: 50, flex: 0, alignSelf: 'center' }}
            />
          </CameraObject>
        </TakeShotButton>
      </Card>

      <PurpleHeader />

      <RowSeparator height="10px" />

      <SubmitButton onPress={handlePostSignature}>
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <SubmitButtonText>Submit</SubmitButtonText>
        )}
      </SubmitButton>
    </Container>
  );
};

export default ConfirmDelivery;
