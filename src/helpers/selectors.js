
// getAppointmentsForDay 
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(days => days.name === day);
  let appointments = [];
  
  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(d => state.appointments[d]);
  }
  return appointments;
}


