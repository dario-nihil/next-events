import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventSearch from "./events-search";

const AllEventsPage = ({ allEvents }) => {
  const router = useRouter();
  const events = allEvents;

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

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      allEvents: events,
    },
    revalidate: 60,
  };
};
