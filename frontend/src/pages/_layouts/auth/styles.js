import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    width: 259px;
    margin-top: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    padding: 0 30px;

    strong {
      align-self: flex-start;
      font-weight: bold;
      font-size: 14px;
    }

    /* Warnings from unform component + yup schema */
    span {
        color: #fb6f91;
        align-self: flex-start;
        margin: 0 0 15px;
        font-weight: bold;
      }

    input {
      background: #fff;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      height: 44px;
      width: 100%;
      padding: 0 15px;
      color: #999;
      margin: 9px 0 15px;
      font-size: 16px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }

    button {
      margin: 5px 0 60px;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }

  }
`;
