import { Wrapper } from "../assets/Wrappers/RoomTableWrapper";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

function RoomUpcomingMeeting() {
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
        <div className='calendar-container'>
          <FaRegCalendarAlt size={"6rem"} />
        </div>
      </div>
    </Wrapper>
  );
}
export default RoomUpcomingMeeting;
