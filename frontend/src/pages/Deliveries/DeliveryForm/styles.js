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

export const Row1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`;

export const Row2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  input {
    margin-top: 9px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    color: #999;
    font-size: 16px;
    padding: 0 15px;

    ::placeholder {
      color: #999;
      font-size: 16px;
    }
  }
`;

export const SelectContainer = styled.pre`
  margin-top: 9px;

  [class^='react-select__'] {
    font: 16px 'Roboto', sans-serif;
    color: #999;
  }

  .react-select__control {
    padding: 0 5px;
    height: 45px;
  }
`;
