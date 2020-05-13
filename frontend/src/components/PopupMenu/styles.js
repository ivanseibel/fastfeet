import styled from 'styled-components';
import { darken } from 'polished';

export const MenuContainer = styled.ul`
  z-index: 9;
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  width: 150px;
  top: calc(100% - 5px);
  margin-left: auto;
  margin-right: auto;

  background: #fff;

  border-radius: 4px;
  border: 1px solid #eee;

  list-style: none;

  li ~ li {
    border-top: 1px solid #eee;
  }

  li {
    grid-auto-columns: 0.3fr 0.7fr;
    padding: 10px 15px;

    display: flex;
    align-items: center;

    transition {
      background: 0.6s;
    }

    cursor: pointer;

    :hover {
      background: ${darken(0.022, '#fff')};
    }
  }

  ::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid #eee;
    right: calc(50% - 10px);
    top: -21px;
  }

  ::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-bottom: 10px solid #fff;
    right: calc(50% - 10px);
    top: -20px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background: transparent;
  border: 0;

  svg {
    margin-right: 10px;
  }

  span {
    color: #999;
    font-size: 16px;
  }
`;
