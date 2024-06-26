import React from "react";
import {
  ExerciseList,
  Exercises,
  WorkoutProgram,
  WorkoutProgramList,
} from "../../types/API";
import { ScCardListContainer, ScCardListScrollView } from "./CardList.styled";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import WorkoutProgramCard from "../WorkoutProgramCard/WorkoutProgramCard";
import Spacer from "../Spacer/Spacer";

interface CardListProps {
  // Add other types of card lists later
  data: WorkoutProgramList | ExerciseList | null;
  action: (id: number) => void;
}

export default function CardList({ data, action }: CardListProps) {
  return (
    <ScCardListScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScCardListContainer>
        {data &&
          data.map((cardData: any) => {
            if (isWorkoutProgram(cardData)) {
              return (
                <WorkoutProgramCard
                  title={cardData.name}
                  owner={cardData.owner.username}
                  description={cardData.description}
                  action={() => action(cardData.id)}
                  bodyParts={cardData.body_parts}
                  key={cardData.id}
                />
              );
            } else if (isExercise(cardData)) {
              return (
                <ExerciseCard
                  title={cardData.name}
                  description={cardData.description}
                  muscleGroups={cardData.muscle_groups}
                  action={action}
                  key={cardData.id}
                />
              );
            }
          })}
      </ScCardListContainer>
      <Spacer orientation="vertical" size={5} />
      <Spacer orientation="vertical" size={5} />
    </ScCardListScrollView>
  );
}

function isExercise(data: any): data is Exercises {
  return (
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.description === "string"
  );
}

function isWorkoutProgram(data: any): data is WorkoutProgram {
  return (
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.description === "string" &&
    Array.isArray(data.exercises)
  );
}
