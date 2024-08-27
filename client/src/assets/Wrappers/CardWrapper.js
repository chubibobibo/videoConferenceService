import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media only screen and (max-width: 1280px) {
    padding-top: 30%;
  }
  @media only screen and (max-width: 1024px) {
    padding-top: 50%;
  }
  @media only screen and (max-width: 820px) {
    padding-top: 10%;
  }
  @media only screen and (max-width: 540px) {
    padding-top: 10%;
  }
  @media only screen and (max-width: 430px) {
    padding-top: 50%;
  }
  @media only screen and (max-width: 385px) {
    padding-top: 5%;
  }
`;
