import React, {useState, useRef} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import RBSheet from "react-native-raw-bottom-sheet"
import SwitchSelector from "react-native-switch-selector"
import StatusBarScreen from "../MileStones/StatusBarScreen"
import {CommonStyles} from "../../core/styles"

const First = () => {
	const navigation = useNavigation()
	const refRBSheet = useRef()
	const [toggle, setToggle] = useState()

	const [value, onChange] = useState(new Date())
	const [date, setDate] = useState(new Date())
	const options = [
		{label: "Day", value: "Day"},
		{label: "Weekly", value: "Weekly"},
	]

	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={{flexDirection: "row"}}>
				<Text style={CommonStyles.mainTitle}>Read 5 books</Text>
				<TouchableOpacity onPress={() => refRBSheet.current.open()} style={CommonStyles.threeDots}>
					<View style={CommonStyles.dots}></View>
					<View style={CommonStyles.dots}></View>
					<View style={CommonStyles.dots}></View>
				</TouchableOpacity>
			</View>
			<RBSheet
				height={500}
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
					},
					draggableIcon: {
						backgroundColor: "#000",
					},
				}}
			>
				<View style={CommonStyles.bottomSheet}>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("markcomplete")}
					>
						<Text style={CommonStyles.bottomText}>Mark Goal Complete</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("editgoal")}
					>
						<Text style={CommonStyles.bottomText}>Edit Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("deletegoal")}
					>
						<Text style={CommonStyles.bottomText}>Delete Goal</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={CommonStyles.BottomTouch}
						onPress={() => navigation.navigate("help")}
					>
						<Text style={CommonStyles.bottomText}>Tutorial</Text>
					</TouchableOpacity>
				</View>
			</RBSheet>
			<Text style={CommonStyles.enterTask}>Enter Task</Text>
			<TouchableOpacity style={CommonStyles.container2}>
				<Text style={CommonStyles.button}>Read One Chapter</Text>
			</TouchableOpacity>
			<Text style={CommonStyles.firstSubTitle}>Edit reoccuring</Text>

			<SwitchSelector
				style={{marginTop: 35, paddingLeft: 20, paddingRight: 20}}
				options={options}
				initial={0}
				onPress={(value) => setToggle(value)}
				textColor="#333333"
				selectedColor="#333333"
				buttonColor="#FDF9F2"
				borderColor="#76BBBC"
				hasPadding
				testID="gender-switch-selector"
				accessibilityLabel="gender-switch-selector"
				backgroundColor="#76BBBC"
				height={60}
				fontSize={27}
			/>
			{toggle == "Weekly" && (
				<View style={CommonStyles.toggle}>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>S</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>M</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>T</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>W</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>T</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>F</Text>
					</View>
					<View style={CommonStyles.days}>
						<Text style={CommonStyles.daysText}>S</Text>
					</View>
				</View>
			)}

			<View style={{bottom: -250}}>
				<TouchableOpacity
					style={CommonStyles.cancelReoccuring}
					onPress={() => navigation.navigate("second")}
				>
					<Text style={CommonStyles.cancelReoccuringText}>Cancel reoccuring</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={CommonStyles.bottomBtn}
					onPress={() => navigation.navigate("mygoals")}
				>
					<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
				</TouchableOpacity>
			</View>
		</StatusBarScreen>
	)
}

export default First

const styles = StyleSheet.create({
	introContainer: {
		backgroundColor: "#588C8D",
	},
})
