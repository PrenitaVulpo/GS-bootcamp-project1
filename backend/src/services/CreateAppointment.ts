import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface requestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const isAppointmentOnSameDate = appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (isAppointmentOnSameDate) {
      throw Error('There is already an appointment on this same date and hour');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return Appointment;
  }
}

export default CreateAppointmentService;
