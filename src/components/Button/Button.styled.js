import styled from 'styled-components';

export const ButtonStyled = styled.button`
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 2px;
  background-image: radial-gradient(
    circle,
    transparent 0%,
    #52587c 50%,
    #121212 100%
  );
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #121212;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    background-color: #52587c;
  }
`;
