import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = ({ events }) => {
  return (
    <>
      <EventList items={events} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
};
