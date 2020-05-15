import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px auto;

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

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    cursor: pointer;
    overflow: hidden;

    border: 1px dashed #ddd;
    border-radius: 50%;

    > strong {
      color: #ddd;
    }

    svg {
      color: #ddd;
    }

    > input {
      display: none;
    }

    img {
      width: 150px;
      /* height: 150px; */
      /* border-radius: 50%; */
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
