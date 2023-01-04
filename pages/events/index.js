import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "./events-search";

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
