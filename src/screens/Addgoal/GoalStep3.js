import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import DatePicker from "react-native-date-picker"
import colors from "../../../colors"
import AsyncStorage from "@react-native-community/async-storage"
import {CommonStyles, forGoals} from "../../core/styles"

import firestore from "@react-native-firebase/firestore"

const colorArray = Object.values(forGoals)

const GoalStep3 = ({route}) => {
	const navigation = useNavigation()

	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	const goBack = () => {
		navigation.goBack()
	}
	const [date, setDate] = useState(new Date())
	const {name} = route.params
	const {description} = route.params

	// let asyncData = []
	// asyncData.push(name)
	// asyncData.push(description)
	// asyncData.push(date.toISOString())

	// async Task
	const storeData = async () => {
		try {
			let data = {
				name: name,
				description: description,
				targetDate: date.toISOString(),
				createdAt: firestore.FieldValue.serverTimestamp(),
				goalMilestone: [],
				color: getColorForGoal(),
			}
			addGoalDataToFirestore(data)
		} catch (e) {
			console.log(e)
		}
	}

	const getColorForGoal = () => {
		const len = 0
		firestore()
			.collection("Goals")
			.get()
			.then((snap) => {
				size = snap.size // will return the collection size
				len = snap.size
			})
		const a = len % 6
		return colorArray[a]
	}

	// adding data to firestore
	const addGoalDataToFirestore = (data) => {
		firestore()
			.collection("Goals")
			.add(data)
			.then(() => {
				addGoalDataToAsyncStoage()
			})
	}
	const addGoalDataToAsyncStoage = async () => {
		await AsyncStorage.setItem(name, name)
	}
	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				{/* <View style={styles.headerMargin}></View> */}
				<View style={{flex: 1}}>
					<View style={CommonStyles.progressContainer}>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
					</View>

					<View style={CommonStyles.textContainer}>
						<Text style={CommonStyles.title}>Your target date</Text>
						<Text style={CommonStyles.subTitle}>
							When your goal is time-bound, it become measurable. Don’t stress over it if you are
							unsure about the exact date. You can always adjust later.
						</Text>
						<View style={[CommonStyles.centerCont, {height: 250}]}>
							<DatePicker
								androidVariant="iosClone"
								date={date}
								onDateChange={setDate}
								mode="date"
								textColor="#ffffff"
								locale="en"
								fadeToColor="none"
								dividerHeight={0}
							/>
						</View>
					</View>

					<View style={CommonStyles.homeAndRight}>
						<View style={CommonStyles.rightArrow}>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStylingLeft, CommonStyles.nextBtn]}
									onPress={goBack}
								>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStylingRight, CommonStyles.nextBtn]}
									onPress={() => {
										storeData()
										navigation.navigate("mygoals")
									}}
								>
									<MaterialCommunityIcons name="chevron-right" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
						</View>

						<View style={{alignItems: "center"}}>
							<TouchableOpacity style={CommonStyles.homeBtnStyling} onPress={gotoHome}>
								<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
}

export default GoalStep3

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
