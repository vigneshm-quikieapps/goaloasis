import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {Feather} from "@expo/vector-icons"
import Swipeout from "rc-swipeout"
import {MaterialCommunityIcons, AntDesign, MaterialIcons} from "@expo/vector-icons"
import {ColorConstants, sizeConstants} from "./../core/styles"
import {useNavigation} from "@react-navigation/native"

const MilestoneCards = () => {
	const navigation = useNavigation()

	const [upDown, setUpDown] = useState(false)
	return (
		<View style={styles.swipeButton}>
			<Swipeout
				left={[
					{
						text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
						onPress: () => navigation.navigate("AfterModal"),
						style: {backgroundColor: ColorConstants.faintWhite},
					},
				]}
				right={[
					{
						text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
						onPress: () => navigation.navigate("AfterModal"),
						style: {backgroundColor: ColorConstants.faintWhite},
					},
				]}
				// onOpen={() => console.log("open")}
				// onClose={() => console.log("close")}
				autoClose={true}
				disabled={false}
			>
				<View style={styles.swipableBtnContainer}>
					<TouchableOpacity style={styles.TouchContainer} onPress={() => setUpDown(!upDown)}>
						<View>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Text style={styles.subtitle}>Sat, Nov 14</Text>
						</View>
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 16}}>Task: 0/1</Text>
							<Feather name={upDown ? "chevron-up" : "chevron-down"} size={25} color="black" />
						</View>
					</TouchableOpacity>
				</View>
			</Swipeout>
			{upDown && (
				<TouchableOpacity
					style={styles.accordian}
					onPress={() => navigation.navigate("firsttaskflow")}
				>
					<View>
						<Text style={styles.mainTitle}>Read 5 books</Text>
						<Text style={styles.subtitle}>Sat, Nov 14</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default MilestoneCards

const styles = StyleSheet.create({
	mileStones: {
		alignItems: "center",
	},
	swipableBtnContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: sizeConstants.hundredMX,
		// backgroundColor: ColorConstants.lighterBlue,
		justifyContent: "center",
	},
	TouchContainer: {
		width: "90%",
		backgroundColor: "#FDF9F2",
		height: 83,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	mainTitle: {
		fontSize: 19,
		fontWeight: "bold",
		color: "black",
	},
	subtitle: {
		fontSize: 16,
	},
	accordian: {
		backgroundColor: "#CDE8E6",
		height: 70,
		width: "75%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		borderRadius: 20,
		marginTop: 10,
		marginLeft: 50,
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: sizeConstants.twentyTwo,
		overflow: "hidden",
		marginHorizontal: sizeConstants.twentyOne,
		justifyContent: "center",
		marginTop: sizeConstants.fifty,
	},
})
