import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  h4 {
    font-size: 14px;
    color: #444;
    margin-bottom: 4px;
  }

  p {
    margin-bottom: 4px;
    font-size: 16px;
    color: #666;
    line-height: 20px;
  }

  hr {
    margin: 6px 0 12px;
    border: 1px solid #eee;
  }

  div {
    display: flex;
    align-items: center;
    height: 100%;

    img {
      margin: auto;
      max-height: 70px;
      max-width: 300px;
    }

    svg {
      margin: auto;
      color: #333;
      opacity: 0.2;
    }
  }
`;
