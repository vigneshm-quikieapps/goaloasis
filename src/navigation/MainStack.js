import React from "react"
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack"
import {MyGoals} from "../screens/home"
import {GoalStep2, GoalStep3, NameGoal} from "../screens/Addgoal"
import {ParticularGoal} from "../screens/particulargoal"
import {
	TaskTutorialSlide1,
	TaskTutorialSlide2,
	TaskTutorialSlide3,
} from "./../screens/TaskTutorialFlow"
import TodaysTask from "../screens/TodaysTask/TodaysTask"

import {
	AfterModal,
	FifthMilestone,
	FirstMilestone,
	FourthMilestone,
	SecondAfterModal,
	// SecondIndividualGoal,
	SixthMilestone,
	ThirdAfterModal,
	ThirdMilestone,
} from "../screens/MileStones"
import IndividualGoal from "../screens/MileStones/IndividualGoal"

import AllMineStoneScreen from "../screens/MileStones/AllMileStoneScreen"
// import {, , Helpmenu, , } from "../screens/Helpmenu"
import {
	Helpmenu,
	MarkCompleted,
	Timeline,
	EditGoalhelp,
	Deletegoal,
	MonthTimeline,
} from "../screens/Helpmenu"
import DParticularGoal from "../screens/particulargoal/DParticularGoal"
const Stack = createStackNavigator()
const options = {
	gestureEnabled: true, // If you want to swipe back like iOS on Android
	...TransitionPresets.SlideFromRightIOS,
}

const IntroStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="mygoals" component={MyGoals} options={options} />
			<Stack.Screen name="taskTutorialSlide1" component={TaskTutorialSlide1} />
			<Stack.Screen name="todaysTask" component={TodaysTask} />
			<Stack.Screen name="taskTutorialSlide2" component={TaskTutorialSlide2} />
			<Stack.Screen name="taskTutorialSlide3" component={TaskTutorialSlide3} />
			<Stack.Screen name="addgoal" component={NameGoal} />
			<Stack.Screen name="goal2" component={GoalStep2} options={options} />
			<Stack.Screen name="goal3" component={GoalStep3} options={options} />
			<Stack.Screen name="particulargoal" component={ParticularGoal} />
			<Stack.Screen name="DParticularGoal" component={DParticularGoal} />
			<Stack.Screen name="FirstMilestone" component={FirstMilestone} />
			<Stack.Screen name="ThirdMileStone" component={ThirdMilestone} />
			<Stack.Screen name="FourthMilestone" component={FourthMilestone} />
			<Stack.Screen name="FifthMilestone" component={FifthMilestone} />
			<Stack.Screen name="SixthMilestone" component={SixthMilestone} />
			<Stack.Screen name="IndividualGoal" component={IndividualGoal} />
			{/* <Stack.Screen name="SecondIndividualGoal" component={SecondIndividualGoal} /> */}
			<Stack.Screen name="AfterModal" component={AfterModal} />
			<Stack.Screen name="SecondAfterModal" component={SecondAfterModal} />
			<Stack.Screen name="ThirdAfterModal" component={ThirdAfterModal} />
			<Stack.Screen name="milestones" component={AllMineStoneScreen} options={options} />
			<Stack.Screen name="help" component={Helpmenu} options={options} />
			<Stack.Screen name="markcomplete" component={MarkCompleted} />
			<Stack.Screen name="deletegoal" component={Deletegoal} />
			<Stack.Screen name="timeline" component={Timeline} />
			{/* <Stack.Screen name="monthTimeline" component={MonthTimeline} /> */}
			<Stack.Screen name="editgoal" component={EditGoalhelp} />
		</Stack.Navigator>
	)
}

export default IntroStack
