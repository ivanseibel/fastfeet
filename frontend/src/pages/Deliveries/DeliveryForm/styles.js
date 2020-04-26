import styled from 'styled-components';

export const Container = styled.div`
  margin: 34px auto;

  max-width: 900px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;

  background: #fff;

  border: 0;
  border-radius: 4px;

  margin-top: 20px;
  padding: 30px;

  #row-1 {
    margin-bottom: 16px;

    label + label {
      margin-left: 30px;
    }
  }
  #row-2 {
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex: 1;

  label {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;

    font-weight: bold;

    .field {
      height: 45px;

      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;

      color: #999;
      font-size: 16px;

      padding: 12px 15px;
      margin-top: 9px;

      ::placeholder {
        color: #999;
      }
    }

    select {
      appearance: none;
      background: transparent;
    }

    svg {
      position: absolute;
      top: 35px;
      right: 10px;
      pointer-events: none;
    }
  }
`;
