import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  /* align-items: center; */
  background-color: #fff;
  padding: 0 36px;
`;

export const Avatar = styled.Image`
  width: 138px;
  height: 138px;

  margin-top: 68px;
  margin-bottom: 40px;

  border-radius: 69px;

  align-self: center;
`;

export const Label = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const Content = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;

  margin-bottom: 15px;
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: #e74040;
  align-self: stretch;
  padding: 10px 0;
  align-items: center;
  margin-top: 15px;
  border-radius: 4px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
