
// getAppointmentsForDay 
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(x => x.name === day);
  let appointments = [];
  
  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(d => state.appointments[d]);
  }
  return appointments;
}


// getInterview

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  
  const interviewObj = {
    student: interview.student,
  }

  interviewObj.interviewer = state.interviewers[interview.interviewer]
  return interviewObj;
}



// getInterviewersForDay

export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.filter(x => x.name === day);
  let interviewers = [];

  if (filteredAppointments.length){
    interviewers = filteredAppointments[0].interviewers.map(i => state.interviewers[i]);
  }
  return interviewers;
}
