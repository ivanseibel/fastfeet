import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  height: 80%;
  margin: 34px auto;
`;

export const Grid = styled.ul`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 0.4fr 0.8fr 1.3fr 1.3fr 0.5fr;
  font-size: 16px;
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
