import React, {useState, useEffect} from "react"
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native"
import {MaterialCommunityIcons, AntDesign, MaterialIcons} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native"
import ProgressCircle from "react-native-progress-circle"
import AppButton from "./AppButton"
import First from "../../modalSlides/first"
import Second from "../../modalSlides/second"
import Third from "../../modalSlides/third"
import StatusBarScreen from "./StatusBarScreen"
import {LinearGradient} from "expo-linear-gradient"
import RBBottomSheet from "./RBBottomSheet"
import Swipeout from "rc-swipeout"
import {setFirstTimeForIndividualGoal} from "./../../redux/actions"
import {getFirstTimeIndividual, setisFirstTimeIndividual} from "./../../utils/asyncStorage"
import {connect} from "react-redux"

const IndividualGoal = (props) => {
	useEffect(() => {
		console.log("individual -> ", props.firstTimeIndividual)
		getFirstTimeData()
	}, [props.firstTimeIndividual])

	const getFirstTimeData = async () => {
		const data = await getFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal(data)
		const isFirst = props.firstTimeIndividual == null ? true : false
		setModalVisible(isFirst)
		// setModalVisible(true) //testing modals
	}

	const closeModal = async () => {
		await setisFirstTimeIndividual()
		props.setFirstTimeForIndividualGoal("visited")
		setModalVisible(false)
	}
	const navigation = useNavigation()
	const dataText = ["Congrats! You're one step closer to your goal.", "", ""]
	const buttonText = [
		"Long Press to mark complete",
		"Swipe right to add task",
		"Swipe left to of edit",
	]
	const [page, setPageNo] = useState(0)

	const goBack = () => {
		navigation.goBack()
	}

	const [modalVisible, setModalVisible] = useState(false)
	const [isLongPressed, setLongPressed] = useState(false)
	return (
		<StatusBarScreen style={styles.introContainer}>
			<View style={styles.titleContainer}>
				{/* CREATING MODAL */}

				<Modal animationType="slide" transparent={true} visible={modalVisible}>
					<View
						style={{
							flex: 1,
							backgroundColor: "#000000aa",
						}}
					>
						<View
							style={{
								backgroundColor: "#BDE2E2",
								marginBottom: 100,
								marginTop: 100,
								marginLeft: 30,
								marginRight: 30,
								borderRadius: 10,
								flex: 1,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignContent: "center",
									justifyContent: "center",
									marginTop: 10,
								}}
							>
								<View
									style={{
										height: 5,
										width: 60,
										marginTop: 10,
										backgroundColor: page >= 0 ? "white" : "gray",
										marginRight: 2,
										marginLeft: 30,
									}}
								/>
								<View
									style={{
										height: 5,
										width: 60,
										marginTop: 10,
										backgroundColor: page >= 1 ? "white" : "gray",
										marginRight: 2,
									}}
								/>
								<View
									style={{
										height: 5,
										width: 60,
										marginTop: 10,
										backgroundColor: page >= 2 ? "white" : "gray",
										marginRight: 2,
									}}
								/>
								<TouchableOpacity onPress={() => closeModal()}>
									<Text
										style={{
											color: "#707070",
											fontSize: 15,
											marginLeft: 30,
										}}
									>
										Skip
									</Text>
								</TouchableOpacity>
							</View>

							<View
								style={{
									justifyContent: "center",
									alignContent: "center",
									alignItems: "center",
									paddingLeft: 20,
									paddingRight: 20,
									marginTop: page === 0 ? 30 : 0,
								}}
							>
								<Text style={{fontSize: 20, marginBottom: 10, color: "#333333"}}>
									{dataText[page]}
								</Text>
								{page == 0 ? (
									<Text style={{fontWeight: "bold", fontSize: 20, color: "#333333"}}>
										Long press
										<Text style={{fontWeight: "100"}}> on the milestone when ready to </Text>
										mark complete
									</Text>
								) : null}
								{page == 1 ? (
									<Text style={{fontWeight: "bold", fontSize: 20, color: "#333333"}}>
										Swipe right
										<Text style={{fontWeight: "100"}}> on the milestone if you want to </Text>
										add a task
										<Text style={{fontWeight: "100"}}> within the milestone.</Text>
									</Text>
								) : null}
								{page == 2 ? (
									<Text style={{fontWeight: "bold", fontSize: 20}}>
										Swipe left
										<Text style={{fontWeight: "100"}}> if you want to </Text>
										delete or edit the milestone
									</Text>
								) : null}
							</View>

							<View
								style={{
									alignItems: "center",
									marginTop: page == 0 ? 20 : 50,
								}}
							>
								{page == 0 ? (
									<AppButton
										title={buttonText[page]}
										style={{
											backgroundColor: "#7EC8C9",
											fontSize: 15,
											paddingTop: 13,
											paddingBottom: 13,
											color: "#333333",
										}}
									/>
								) : page == 1 ? (
									<Swipeout
										left={[
											{
												text: "ADD",
												onPress: () => {},
												style: {backgroundColor: "#fff"},
											},
										]}
										autoClose={true}
										disabled={false}
										style={{
											borderRadius: 30,
										}}
									>
										<View
											style={{
												justifyContent: "center",
												paddingHorizontal: 20,
												backgroundColor: "#7EC8C9",
												width: 290,
												height: 70,
											}}
										>
											<Text style={styles.btnText}>{buttonText[page]}</Text>
										</View>
										{/* <AppButton
											title={buttonText[page]}
											style={{
												backgroundColor: "#7EC8C9",
												fontSize: 15,
												paddingTop: 13,
												paddingBottom: 13,
												color: "#333333",
											}}
										/> */}
									</Swipeout>
								) : (
									// <AppButton
									// 	title={buttonText[page]}
									// 	style={{
									// 		backgroundColor: "#7EC8C9",
									// 		fontSize: 15,
									// 		paddingTop: 13,
									// 		paddingBottom: 13,
									// 		color: "#333333",
									// 	}}
									// />

									<Swipeout
										right={[
											{
												text: (
													<View style={{flexDirection: "row"}}>
														<View
															style={{padding: 5, borderRightWidth: 1, borderRightColor: "#000"}}
														>
															<AntDesign name="delete" size={24} color="black" />
														</View>
														<View style={{padding: 5}}>
															<MaterialIcons name="edit" size={24} color="black" />
														</View>
													</View>
												),
												onPress: () => {},
												style: {backgroundColor: "#fff"},
											},
										]}
										autoClose={true}
										disabled={false}
										style={{
											borderRadius: 30,
										}}
									>
										<View
											style={{
												justifyContent: "center",
												paddingHorizontal: 20,
												backgroundColor: "#7EC8C9",
												width: 290,
												height: 70,
											}}
										>
											<Text style={[styles.btnText, {color: "#000"}]}>{buttonText[page]}</Text>
										</View>
										{/* <AppButton
											title={buttonText[page]}
											style={{
												backgroundColor: "#7EC8C9",
												fontSize: 15,
												paddingTop: 13,
												paddingBottom: 13,
												color: "#333333",
											}}
										/> */}
									</Swipeout>
								)}
								<AppButton
									title="Next"
									style={{backgroundColor: "#FDF9F2", color: "#333333"}}
									onPress={() => (page === 2 ? closeModal() : setPageNo(page + 1))}
								/>
							</View>
						</View>
					</View>
				</Modal>

				{/* MODEL CREATION END */}
				{/* <Text style={styles.mainTitle}>Read 5 books</Text> */}
				<RBBottomSheet />
				<Text style={styles.subTitle}>I want to continue improve myself and my state of mind.</Text>
				<View style={styles.trackingcont}>
					<ProgressCircle
						percent={5}
						radius={86}
						borderWidth={5}
						color="#588C8D"
						shadowColor="#999"
						bgColor="#FBF5E9"
					>
						<View style={styles.percentageCont}>
							<Text>Target Date</Text>
							<Text style={{fontWeight: "bold"}}>01/01/21</Text>
						</View>
					</ProgressCircle>

					<View style={{flexDirection: "row"}}>
						<View style={{marginHorizontal: 10}}>
							<Text style={styles.goalsText}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8 / 2,
										backgroundColor: "#588C8D",
									}}
								></View>
								Goal
							</Text>
							<Text style={styles.goalsText}>
								<View
									style={{
										height: 8,
										width: 8,
										borderRadius: 8 / 2,
										backgroundColor: "#86C7C8",
									}}
								></View>
								Milestone
							</Text>
						</View>
						<View>
							<Text style={styles.goalsText}>• 0%</Text>
							<Text style={styles.goalsText}>• 0/0</Text>
						</View>
					</View>
				</View>
			</View>

			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={styles.goalsContainer}>
				<View style={styles.addMileStone}>
					<View style={styles.viewTap}>
						<MaterialCommunityIcons
							name="plus"
							size={40}
							color="#7EC8C9"
							onPress={() => {
								// navigation.navigate("FirstMilestone")
								navigation.navigate("DParticularGoal")
							}}
						/>
					</View>
					<Text style={{right: 150, position: "absolute", fontSize: 30, fontWeight: "bold"}}>
						My Milestones
					</Text>
				</View>

				{/* <TouchableOpacity
					onPress={() => {
						navigation.navigate("SecondIndividualGoal")
					}}
					style={{
						height: "30%",
						width: "80%",
						borderRadius: 22,
						// backgroundColor: "#7EC8C9",
						backgroundColor: "pink",
						alignSelf: "center",
						marginTop: 10,
					}}
				>
					<Text
						style={{
							top: "35%",
							color: "#333333",
							fontSize: 20,
							marginLeft: 20,
							fontWeight: "bold",
						}}
					>
						Read 1 Book
					</Text>
					<Text
						style={{
							top: "35%",
							color: "#333333",
							fontSize: 20,
							right: 20,
							position: "absolute",
							fontWeight: "bold",
						}}
					>
						Task:0/1
					</Text>
				</TouchableOpacity> */}

				<View style={styles.swipeButton}>
					<Swipeout
						left={[
							{
								text: <MaterialCommunityIcons name="plus" size={40} color="#77777B" />,
								onPress: () => navigation.navigate("AfterModal"),
								style: {backgroundColor: "#FDF9F2"},
							},
						]}
						// onOpen={() => console.log("open")}
						// onClose={() => console.log("close")}
						autoClose={true}
						disabled={false}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								height: 100,
								backgroundColor: "#7EC8C9",
								justifyContent: "center",
							}}
						>
							<Text style={styles.sliderText}>Read 1 Book</Text>
							<Text style={styles.sliderText}>Task:0/1</Text>
						</View>
					</Swipeout>
				</View>

				<View style={styles.bottomBtnContainer}>
					<TouchableOpacity style={styles.bottomBtn} onPress={goBack}>
						<MaterialCommunityIcons name="home" size={44} color="#7EC8C9" />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</StatusBarScreen>
	)
}
const mapStateToProps = (state) => {
	return {
		firstTimeIndividual: state.milestone.firstTimeIndividual,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setFirstTimeForIndividualGoal: (data) => {
			dispatch(setFirstTimeForIndividualGoal(data))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(IndividualGoal)

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
		backgroundColor: "#FDF9F2",
	},

	titleContainer: {
		flex: 0.6,
		justifyContent: "center",
		backgroundColor: "#FDF9F2",
	},
	mainTitle: {
		color: "#333333",
		fontSize: 25,
		marginLeft: 21,
	},
	subTitle: {
		fontSize: 16,
		color: "#333333",
		marginLeft: 21,
	},

	addMileStone: {
		marginLeft: "auto",
		marginRight: 50,
		marginTop: 20,
		flexDirection: "row",
	},
	sliderText: {
		color: "#333333",
		fontSize: 19,
		fontWeight: "bold",
		margin: 30,
	},
	trackingcont: {
		marginHorizontal: 20,
		marginVertical: 20,
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	swipeButton: {
		alignContent: "center",
		borderRadius: 22,
		backgroundColor: "pink",
		overflow: "hidden",
		marginLeft: 21,
		marginRight: 21,
		justifyContent: "center",
		marginTop: 50,
		// shadowColor: "#00000029",
	},
	percentageCont: {
		height: 150,
		width: 150,
		borderRadius: 150 / 2,
		backgroundColor: "#FBF5E9",
		borderWidth: 5,
		borderColor: "#C0E5E4",
		justifyContent: "center",
		alignItems: "center",
	},
	goalsText: {
		fontSize: 16,
	},
	goalsContainer: {
		flex: 0.75,
		borderTopRightRadius: 70,
	},
	viewTap: {
		height: 50,
		width: 50,
		backgroundColor: "white",
		marginVertical: 10,
		borderRadius: 50 / 2,
		justifyContent: "center",
		alignItems: "center",
	},

	bottomBtnContainer: {
		width: "100%",
		position: "absolute",
		bottom: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBtn: {
		height: 75,
		width: 75,
		borderRadius: 75 / 2,
		backgroundColor: "white",
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	swipeBtnStyling: {
		justifyContent: "center",
		paddingHorizontal: 20,
		backgroundColor: "white",
		width: 314,
		height: 50,
	},
	btnText: {
		fontSize: 19,
		color: "#666666",
		letterSpacing: 1.2,
	},
})
