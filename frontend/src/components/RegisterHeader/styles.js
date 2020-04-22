import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  h1 {
    margin-bottom: 34px;
  }

  header {
    display: ${(props) => (props.showControls ? 'flex' : 'none')};

    justify-content: space-between;
    align-items: center;

    div {
      position: relative;

      svg {
        position: absolute;
        top: 10px;
        left: 16px;
        cursor: pointer;
      }

      input {
        width: 300px;
        height: 36px;
        padding: 8px 40px;
        color: #999;
        border-radius: 4px;
        border: 1px solid #ddd;

        &::placeholder {
          color: #999;
        }
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      /* height: 36px; */
      width: 142px;

      color: #fff;
      background: #7d40e7;
      border: 0;

      border-radius: 4px;
      padding: 9px 16px;

      transition: background 0.3s;

      &:hover {
        background: ${darken(0.1, '#7d40e7')};
      }
    }
  }
`;
