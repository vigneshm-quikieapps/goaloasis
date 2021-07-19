import React, {useState} from "react"
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {CommonStyles} from "../../core/styles"

const GoalStep2 = ({route}) => {
	const navigation = useNavigation()
	const {name} = route.params
	const [description, setDescription] = useState()

	const nextScreen = () => {
		navigation.navigate("goal3", {name: name, description: description})
	}
	const goBack = () => {
		navigation.goBack()
	}
	const gotoHome = () => {
		navigation.navigate("mygoals")
	}
	return (
		<View style={styles.introContainer}>
			<LinearGradient colors={["#588C8D", "#7EC8C9"]} style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View style={CommonStyles.progressContainer}>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.progress}></View>
						<View style={CommonStyles.normalProgress}></View>
					</View>

					<View style={CommonStyles.textContainer}>
						<Text style={CommonStyles.title}>Why is it important?</Text>
						<Text style={CommonStyles.subTitle}>
							Write out what this goal means to you and make sure it’s something important.
						</Text>
						<View style={CommonStyles.centerCont}>
							<TextInput
								style={CommonStyles.textInput}
								placeholder="Type Here"
								multiline={true}
								numberOfLines={4}
								onChangeText={(text) => setDescription(text)}
							/>
						</View>
					</View>

					<View style={CommonStyles.homeAndRight}>
						<View style={CommonStyles.rightArrow}>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStyling, CommonStyles.nextBtn]}
									onPress={goBack}
								>
									<MaterialCommunityIcons name="chevron-left" size={50} color="#7EC8C9" />
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									style={[CommonStyles.btnStyling, CommonStyles.nextBtn]}
									onPress={nextScreen}
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

export default GoalStep2

const styles = StyleSheet.create({
	introContainer: {
		flex: 1,
	},
})
