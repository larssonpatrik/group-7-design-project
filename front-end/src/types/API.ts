import { ImageSourcePropType } from "react-native";

type BodyPart = { id: number; name: string };
type BodyPartList = BodyPart[];
type Exercises = {
  id: number;
  name: string;
  description: string;
  muscle_groups: { id: number; name: string }[];
  body_parts: BodyPartList;
};
type ExerciseList = Exercises[];
type WorkoutProgram = {
  id: number;
  name: string;
  description: string;
  body_parts: BodyPartList;
  exercises: ExerciseList;
};
type WorkoutProgramList = WorkoutProgram[];

type WorkoutProgramForPOST = {
  name: string;
  description: string;
  exercises: number[];
};

type FilterButtonProps = {
  label: string;
  onFilterSelect: (filter: string) => void;
};

export type {
  BodyPart,
  BodyPartList,
  WorkoutProgram,
  WorkoutProgramList,
  WorkoutProgramForPOST,
  Exercises,
  ExerciseList,
  FilterButtonProps,
};
