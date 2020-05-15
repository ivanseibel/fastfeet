import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const Title = styled.h1`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin-bottom: 20px;
`;

export const Subtitle = styled.h1`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export const Header = styled.header`
  display: ${(props) => (props.show ? 'flex' : 'none')};

  justify-content: space-between;
  align-items: center;
`;

export const LeftBox = styled.div`
  position: relative;
  display: flex;

  div.search {
    display: ${(props) => (props.show.includes('search') ? 'flex' : 'none')};

    svg {
      position: absolute;
      top: 10px;
      left: 16px;
      cursor: pointer;
    }

    > input {
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

  div.check {
    display: ${(props) =>
      props.show.includes('onlyWithProblems') ? 'flex' : 'none'};
    align-items: center;

    label {
      color: #999;
      margin-left: 25px;

      input {
        margin-right: 5px;
        align-self: vertical;
      }
    }
  }
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;

  button {
    justify-content: center;
    align-items: center;

    margin-left: 16px;

    width: 142px;
    max-height: 36px;
    height: 100%;

    color: #fff;
    background: #7d40e7;
    border: 0;

    border-radius: 4px;
    padding: 9px 16px;

    transition: background 0.3s;

    &:hover {
      background: ${darken(0.1, '#7d40e7')};
    }

    svg {
      margin-right: 5px;
    }
  }

  #new {
    display: ${(props) => (props.controls.includes('new') ? 'flex' : 'none')};
  }
  #back {
    display: ${(props) => (props.controls.includes('back') ? 'flex' : 'none')};
    background: #ccc;
  }
  #save {
    display: ${(props) => (props.controls.includes('save') ? 'flex' : 'none')};
  }
`;
