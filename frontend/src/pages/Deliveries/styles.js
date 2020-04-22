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
    padding: 0 0 18px 18px;
  }

  strong:nth-of-type(7) {
    padding: 0 0 18px 0;
    display: flex;
    justify-content: center;
  }

  > span {
    display: flex;
    position: relative;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 10px 0 10px 18px;
    margin-bottom: 20px;

    img {
      margin-right: 5px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    button {
      background: transparent;
      border: 0;
    }
  }

  span.actions {
    padding: 18px 0;
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

// export const Menu = styled.ul`
//   display: ${(props) => (props.showMenu ? 'block' : 'none')};
//   position: absolute;
//   z-index: 1;

//   left: calc(50% - 75px); /* to positionate at center of witdth */
//   top: calc(100% - 3px); /* header height + 30px */

//   width: 150px;
//   list-style: none;
//   background: #fff;
//   border: 1px solid #ddd;
//   border-radius: 4px;

//   li {
//     display: flex;
//     align-items: center;
//     grid-template-columns: 0.3fr 0.7fr;
//     border-bottom: 1px solid #ddd;
//     padding: 10px 10px;
//     cursor: pointer;

//     :hover {
//       background: ${darken(0.05, '#fff')};
//     }

//     &::before {
//       content: '';
//       z-index: 2;
//       position: absolute;
//       left: calc(50% - 8px);
//       top: -17px;
//       width: 0;
//       height: 0;
//       border-left: 8px solid transparent;
//       border-right: 8px solid transparent;
//       border-bottom: 8px solid #eee;
//       border-top: 8px solid transparent;
//     }

//     svg {
//       margin-right: 8px;
//     }

//     b {
//       font-weight: normal;
//     }
//   }
// `;
