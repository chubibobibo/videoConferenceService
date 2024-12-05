import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d5e5ff;
  width: 45%;
  height: 80%;
  margin-top: 3%;
  border-radius: 10px;

  .table-header {
    width: 100%;
    height: 5%;
    display: flex;
    flex-direction: row;

    /** Buttons to link to recents meetings and upcoming meetings */
    .upcoming-btn {
      width: 50%;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      align-items: center;
      cursor: pointer;
      background-color: #c7ddff;
    }

    .upcoming-btn:focus {
      background-color: white;
    }

    .recent-btn {
      width: 50%;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      margin-top: 0.5rem;
      margin-right: 0.5rem;
      align-items: center;
      cursor: pointer;
      background-color: #c7ddff;
    }

    .recent-btn:focus {
      background-color: white;
    }
  }

  .table-body {
    width: 100%;
    height: 25rem;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    /* align-items: center; */
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
    overflow-y: scroll;
    overflow-x: auto;

    .table-contents {
      background-color: white;
      width: 95%;
      min-height: 5rem;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .calendar-container {
      opacity: 0.3;
    }
  }

  /** responsive screens */
  @media only screen and (max-width: 1400px) {
    width: 55%;
  }
  @media only screen and (max-width: 1080px) {
    width: 65%;
  }
  @media only screen and (max-width: 800px) {
    width: 75%;
  }
  @media only screen and (max-width: 640px) {
    width: 85%;
  }
  @media only screen and (max-width: 420px) {
    width: 95%;
    .upcoming-btn {
      width: 10%;
      font-size: 14px;
    }

    .recent-btn {
      width: 10%;
      font-size: 14px;
    }
  }
`;
