import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const MenuItem = styled(Link)`
  font-weight: bold;
  margin-right: 20px;
  color: ${(props) => (props.selected ? '#444' : '#999')};
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #ddd;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
    }

    span {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
    }
  }
`;
