// ProfileScreen.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  ScBaseContainer,
  ScBaseContainerScroll,
} from "../../components/BaseContainer/BaseContainer.styled";
import Spacer from "../../components/Spacer/Spacer";
import { getAuth } from "firebase/auth";
import {
  fetchAllWorkoutPrograms,
  fetchUserById,
  updateUserPersonalBests,
  fetchFavoriteWorkoutPrograms,
  fetchWorkoutProgramsbyUser,
} from "../../services/API";
import { User, WorkoutProgramList } from "../../types/API";
import UserDescriptor from "../../components/UserDescriptor/UserDescriptor";
import WorkoutListSmall from "../../components/WorkoutListSmall/WorkoutListSmall";
import {
  navigateToEditProfile,
  navigateToWorkoutProgram,
} from "../../services/navigationUtils";
import UserInput from "../../components/UserInput/UserInput";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import PBInput from "../../components/PBInput/PBInput";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../AuthProvider";

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, setUser } = useAuth();
  const [benchPress, setBenchPress] = useState<string | null>(null);
  const [deadlift, setDeadlift] = useState<string | null>(null);
  const [squats, setSquats] = useState<string | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<WorkoutProgramList | null>(
    null
  );
  const [error, setError] = useState(false);
  const auth = getAuth();

  const [favoriteWorkouts, setFavoriteWorkouts] =
    useState<WorkoutProgramList | null>(null);

  function handleNavigation(id: number) {
    navigateToWorkoutProgram(navigation, id);
  }
  async function getWorkoutProgramsByUser(): Promise<void> {
    if (user) {
      const fetchedWorkoutPrograms: WorkoutProgramList | null =
        await fetchWorkoutProgramsbyUser(user.id);

      if (fetchedWorkoutPrograms) {
        setUserWorkouts(fetchedWorkoutPrograms);
      } else {
        setError(true);
      }
    }
  }

  async function getFavoriteWorkoutProgram() {
    const userId = auth.currentUser?.uid;
    const fetchedWorkoutPrograms: WorkoutProgramList | null =
      await fetchFavoriteWorkoutPrograms(String(userId));

    if (fetchedWorkoutPrograms) {
      setFavoriteWorkouts(fetchedWorkoutPrograms);
    } else {
      setError(true);
    }
  }

  async function getUser(): Promise<void> {
    try {
      if (auth.currentUser?.uid) {
        const userId = auth.currentUser?.uid;
        const fetchedUser: User | null = await fetchUserById(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
          setBenchPress(fetchedUser.personal_bests.bench_press);
          setDeadlift(fetchedUser.personal_bests.deadlift);
          setSquats(fetchedUser.personal_bests.squats);
        }
      } else {
        setError(true);
      }
    } catch {
      setError(true);
      console.log("auth/user not found!");
    }
  }

  async function handleSubmit() {
    if (user) {
      await updateUserPersonalBests(user.id, {
        bench_press: benchPress,
        squats: squats,
        deadlift: deadlift,
      });
      getUser();
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getFavoriteWorkoutProgram();
      getWorkoutProgramsByUser();
    }
  }, [user]);

  return (
    <ScBaseContainerScroll>
      {user && (
        <>
          <TouchableOpacity
            onPress={() => navigateToEditProfile(navigation)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Icon name="settings-sharp" color="gray" size={18} />
            <Spacer orientation="horizontal" size={1} />
            <Text style={{ color: "gray" }}>Account settings</Text>
          </TouchableOpacity>
          <Spacer orientation="vertical" size={3} />
          <UserDescriptor
            email={user.email}
            username={user.username}
            profilePic={user.profile_pic}
            onPress={() => alert("Clicked")}
          />
          <Spacer orientation="vertical" size={4} />
          <PBInput
            values={[benchPress, deadlift, squats]}
            setValues={[setBenchPress, setDeadlift, setSquats]}
            onSubmit={handleSubmit}
          />
          <Spacer orientation="vertical" size={4} />

          {userWorkouts && (
            <WorkoutListSmall
              title="My workouts"
              workoutPrograms={userWorkouts}
              onPress={handleNavigation}
              emptyText="Empty! Create some new workouts!"
            />
          )}
          <Spacer orientation="vertical" size={4} />

          {favoriteWorkouts && (
            <WorkoutListSmall
              title="Favorite workouts"
              workoutPrograms={favoriteWorkouts}
              onPress={handleNavigation}
              emptyText="Empty! Go find some favorite workouts!"
            />
          )}
          <Spacer orientation="vertical" size={4} />
          <Spacer orientation="vertical" size={4} />
        </>
      )}
    </ScBaseContainerScroll>
  );
};

export default ProfileScreen;
