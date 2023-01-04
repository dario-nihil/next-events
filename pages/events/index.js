import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "./events-search";

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventSearch />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
