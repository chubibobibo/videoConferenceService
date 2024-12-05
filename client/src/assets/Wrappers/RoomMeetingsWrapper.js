import styled from "styled-components";

export const Wrapper = styled.div`
  /* background-color: red; */
  width: 100%;

  .room-container {
    margin-bottom: 10px;
    border-bottom: 1.5px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  @media only screen and (max-width: 560px) {
    .room-container {
      align-items: start;
    }
  }
`;
