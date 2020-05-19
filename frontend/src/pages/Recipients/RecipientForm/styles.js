import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px auto;
  max-width: 900px;
  width: 100%;

  form {
    background-color: #fff;
    border-radius: 4px;
    margin-top: 20px;
    padding: 30px;
  }
`;

export const Row = styled.div`
  display: grid;
  column-gap: 14px;
  border-radius: 4px;
  /* width: 100%; */

  &.row1 {
    grid-template-columns: 1fr;
  }

  &.row2 {
    margin-top: 10px;
    grid-template-columns: 8fr 1fr 1fr;
  }

  &.row3 {
    margin-top: 10px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #444;
  }

  input {
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 11px 15px;
    border-radius: 4px;
    color: #999;
  }
`;
