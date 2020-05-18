import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  height: 80%;
  margin: 20px auto;
`;

export const Grid = styled.ul`
  margin-top: 22px;
  display: grid;
  grid-template-columns: 0.3fr 0.7fr 1fr 0.3fr;
  font-size: 16px;

  strong {
    padding: 0 0 10px 18px;
  }

  strong:last-of-type {
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

    span.avatarSpan {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 30px;
      }
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
