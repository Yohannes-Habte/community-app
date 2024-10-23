import UpdateEvent from "../../../components/forms/updateEvent/UpdateEvent";

import "./UpdateEventPage.scss";

const UpdateEventPage = () => {
  return (
    <main className="update-event-page">
      <section className="update-event-page-container">
        <h1 className="update-event-page-title"> Update an Event </h1>

        <UpdateEvent />
      </section>
    </main>
  );
};

export default UpdateEventPage;
