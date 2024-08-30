import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  /* margin-top: -180px; */
  /* negative value of footer height */
  height: 180px;
  clear: both;
  margin-top: 10%;
  /* display: flex;
  align-items: flex-end; */

  width: 50%;

  @media only screen and (max-width: 435px) {
    width: 60%;
    /* display: flex;
    align-items: flex-center;
    justify-content: center; */
  }
`;
