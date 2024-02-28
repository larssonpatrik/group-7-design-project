import { WorkoutProgram, WorkoutProgramList } from "../types/API";

const baseURL = "http://10.6.34.86:5000";

async function fetchAllWorkoutPrograms(): Promise<WorkoutProgramList | null> {
  try {
    const response = await fetch(`${baseURL}/workout_programs`);
    if (response.ok) {
      const data: WorkoutProgramList = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchWorkoutProgramById(
  programId: number
): Promise<WorkoutProgram | null> {
  try {
    const response = await fetch(`${baseURL}/workout_programs/${programId}`);
    if (response.ok) {
      const data: WorkoutProgram = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchAllWorkoutPrograms, fetchWorkoutProgramById };
