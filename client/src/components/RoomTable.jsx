import { Wrapper } from "../assets/Wrappers/RoomTableWrapper";
import { Link, useNavigate } from "react-router-dom";

function RoomTable() {
  const navigate = useNavigate();
  /**@navToRecent function to navigate upon clicking the buttons */
  const navToRecent = () => {
    navigate("/dashboard/roomTable");
  };
  const navToUpcoming = () => {
    navigate("/dashboard/roomMeetings");
  };
  return (
    <Wrapper>
      <div className='table-header'>
        <button className='upcoming-btn' onClick={navToUpcoming}>
          Upcoming meetings
        </button>
        <button className='recent-btn' onClick={navToRecent}>
          Recent room meetings
        </button>
      </div>

      <div className='table-body'>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
        <div className='table-contents'>
          <p>hello sample</p>
        </div>
      </div>
    </Wrapper>
  );
}
export default RoomTable;
