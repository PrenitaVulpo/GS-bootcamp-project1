import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface AppointmentsInterface {
  id: string;
  provider: string;
  date: Date;
}

const appointments: AppointmentsInterface[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const isAppointmentOnSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (isAppointmentOnSameDate) {
    return response.status(400).json({
      message: 'There is already an appointment on this same date and hour',
    });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
