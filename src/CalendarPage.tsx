import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { fetchTrainings, fetchCustomerByUrl } from './api';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());

  const fetchEvents = async () => {
    try {
      const data = await fetchTrainings();
      if (data._embedded && data._embedded.trainings) {
        const trainings = data._embedded.trainings;
        const formattedEvents = await Promise.all(
          trainings.map(async (training: any) => {
            let customerName = 'Unknown';
            if (training._links && training._links.customer) {
              const customer = await fetchCustomerByUrl(training._links.customer.href);
              if (customer) {
                customerName = `${customer.firstname} ${customer.lastname}`;
              }
            }
            return {
              id: training._links.self.href,
              title: `${training.activity} / ${customerName}`,
              start: new Date(training.date),
              end: moment(training.date).add(training.duration, 'minutes').toDate(),
            };
          })
        );
        setEvents(formattedEvents);
      } else {
        console.error('Unexpected API response structure:', data);
      }
    } catch (err) {
      console.error('Error fetching trainings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Training Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        defaultView={Views.MONTH}
      />
    </div>
  );
}