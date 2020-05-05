import styled from 'styled-components';
import { lighten } from 'polished';

const statusColor = {};
statusColor.delivered = '#2ca42b';
statusColor.pendent = '#c1bc35';
statusColor.started = '#4d85ee';
statusColor.canceled = '#de3b3b';

export const Container = styled.div`
  max-width: 1440px;
  height: 80%;
  margin: 34px auto;
`;

export const Grid = styled.ul`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 0.4fr 1.3fr 1.3fr 1.3fr 1.3fr 0.5fr 0.5fr 0.5fr;
  font-size: 16px;

  strong {
    padding: 0 0 10px 18px;
  }

  strong:nth-of-type(7) {
    padding: 0 0 10px 0;
    display: flex;
    justify-content: center;
  }

  > span {
    display: flex;
    position: relative;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 8px 0 8px 18px;
    margin-bottom: 10px;

    img {
      margin-right: 5px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }

    button {
      background: transparent;
      border: 0;
    }
  }

  span.actions {
    padding: 8px 0;
    justify-content: center;
  }
`;

export const Status = styled.em`
  background: ${(props) => lighten(0.4, statusColor[props.status])};
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-style: normal;
  font-size: 14px;
  padding: 6px;
  color: ${(props) => statusColor[props.status]};
  font-weight: bold;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;

    background: ${(props) => statusColor[props.status]};
  }
`;

export const NavBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  background: ${(props) => (props.active ? '#7159c1' : '#ccc')};
  color: #fff;
  border: 0;
  border-radius: 4px;
  margin: 5px;
  padding: 8px 15px;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};

  span {
    font-weight: bold;
  }

  svg {
  }
`;
