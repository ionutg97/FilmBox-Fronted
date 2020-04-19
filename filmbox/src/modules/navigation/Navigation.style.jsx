import styled from "styled-components";

export const StyledNavigation = styled.nav`
  height: 70px;
  width: 100%;
  padding: 2.56rem 2.1rem 2.56rem;
  box-sizing: border-box;
  background-color: #191970;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
`;

export const StyledNavigationMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  display: flex;
  align-items: center;
  li {
    display: flex;
    align-items: center;
    a {
      padding: 0 20px 10px;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      font-family: "Roboto", sans-serif;
      color: #fff;
      border-bottom: 2px solid var(--light-coral);
      &.active {
        border-color: var(--orange);
      }
    }
  }
`;


