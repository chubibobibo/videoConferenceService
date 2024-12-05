import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "Header Header" "stream1 stream2" "controls controls";
  width: 100%;
  height: 100vh;
  justify-items: center;

  .header {
    grid-area: Header;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    font-size: 24px;
  }

  .video-container1 {
    grid-area: stream1;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .video-container2 {
    grid-area: stream2;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .controls-container {
    grid-area: controls;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
