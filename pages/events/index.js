import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
