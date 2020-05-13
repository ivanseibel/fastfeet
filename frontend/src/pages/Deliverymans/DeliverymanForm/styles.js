import styled from 'styled-components';

export const Container = styled.div`
  margin: 34px auto;

  max-width: 900px;
  width: 100%;

  form {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 20px;
    padding: 30px;
  }
`;

export const AvatarRow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;

    border: 1px dashed #ddd;
    border-radius: 50%;

    strong {
      color: #ddd;
    }

    svg {
      color: #ddd;
    }
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 18px;
    color: #444;
    font-weight: bold;

    input {
      margin-top: 7px;
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #999;
      font-size: 16px;
      padding: 0 15px;
    }
  }
`;
