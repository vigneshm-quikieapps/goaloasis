import React, {useState, useRef} from "react"
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native"
import {Feather} from "@expo/vector-icons"

const AllMilestones = () => {
	const [upDown, setUpDown] = useState(false)

	const [upDownTwo, setUpDownTwo] = useState(false)

	const [upDown3, setUpDown3] = useState(false)
	const [upDown4, setUpDown4] = useState(false)
	const panelRef = useRef(null)

	return (
		<>
			<ScrollView>
				<View style={styles.mileStones}>
					<TouchableOpacity
						onLongPress={() => panelRef.current.togglePanel()}
						style={styles.TouchContainer}
						onPress={() => setUpDown(!upDown)}
					>
						<View>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Text style={styles.subtitle}>Sat, Nov 14</Text>
						</View>
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 16}}>Task: 0/1</Text>
							<Feather name={upDown ? "chevron-up" : "chevron-down"} size={25} color="black" />
						</View>
					</TouchableOpacity>

					{upDown && (
						<TouchableOpacity style={styles.accordian}>
							<View>
								<Text style={styles.mainTitle}>Read 5 books</Text>
								<Text style={styles.subtitle}>Sat, Nov 14</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.mileStones}>
					<TouchableOpacity style={styles.TouchContainer} onPress={() => setUpDownTwo(!upDownTwo)}>
						<View>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Text style={styles.subtitle}>Sat, Nov 14</Text>
						</View>
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 16}}>Task: 0/1</Text>
							<Feather name={upDownTwo ? "chevron-up" : "chevron-down"} size={25} color="black" />
						</View>
					</TouchableOpacity>

					{upDownTwo && (
						<>
							<TouchableOpacity style={styles.accordian}>
								<View>
									<Text style={styles.mainTitle}>Read 5 books</Text>
									<Text style={styles.subtitle}>Sat, Nov 14</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.accordian}>
								<View>
									<Text style={styles.mainTitle}>Read 5 books</Text>
									<Text style={styles.subtitle}>Sat, Nov 14</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.accordian}>
								<View>
									<Text style={styles.mainTitle}>Read 5 books</Text>
									<Text style={styles.subtitle}>Sat, Nov 14</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.accordian}>
								<View>
									<Text style={styles.mainTitle}>Read 5 books</Text>
									<Text style={styles.subtitle}>Sat, Nov 14</Text>
								</View>
							</TouchableOpacity>
						</>
					)}
				</View>

				<View style={styles.mileStones}>
					<TouchableOpacity style={styles.TouchContainer} onPress={() => setUpDown3(!upDown3)}>
						<View>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Text style={styles.subtitle}>Sat, Nov 14</Text>
						</View>
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 16}}>Task: 0/1</Text>
							<Feather name={upDown3 ? "chevron-up" : "chevron-down"} size={25} color="black" />
						</View>
					</TouchableOpacity>

					{upDown3 && (
						<TouchableOpacity style={styles.accordian}>
							<View>
								<Text style={styles.mainTitle}>Read 5 books</Text>
								<Text style={styles.subtitle}>Sat, Nov 14</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.mileStones}>
					<TouchableOpacity style={styles.TouchContainer} onPress={() => setUpDown4(!upDown4)}>
						<View>
							<Text style={styles.mainTitle}>Read 5 books</Text>
							<Text style={styles.subtitle}>Sat, Nov 14</Text>
						</View>
						<View style={{alignItems: "center"}}>
							<Text style={{fontSize: 16}}>Task: 0/1</Text>
							<Feather name={upDown4 ? "chevron-up" : "chevron-down"} size={25} color="black" />
						</View>
					</TouchableOpacity>

					{upDown4 && (
						<TouchableOpacity style={styles.accordian}>
							<View>
								<Text style={styles.mainTitle}>Read 5 books</Text>
								<Text style={styles.subtitle}>Sat, Nov 14</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</>
	)
}

export default AllMilestones

const styles = StyleSheet.create({
	mileStones: {
		alignItems: "center",
		marginVertical: 10,
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
		marginVertical: 10,
	},
})
