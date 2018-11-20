import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

export default class Caffeine extends React.Component {
	state = {
		hasCameraPermission: null,
		title: "okie dokie"
	};
	componentDidUpdate() {
		if (this.props.canContinue && this.props.canRun) {
			// if (prevProps.barcode !== this.props.barcode) {

			this.props.setCanContinue(false);
			// TODO: FIx this
			this.setTitleFromBarcode(this.props.barcode);
			// }
		}
	}

	setTitleFromBarcode(barcode) {
		fetch(`https://chno-api.herokuapp.com/${barcode}`)
			.then(res => res.json())
			.catch(() => this.errorAlert("Couldn't access the server"))
			.then(json => {
				this.caffeineAlert(json.name, json.caffeine);
			})
			.catch(e => {
				this.errorAlert("Item not found");
			});
	}
	errorAlert(errorMsg) {
		Alert.alert(
			"Error",
			`Error: ${errorMsg}`,
			[
				{
					text: "Darn!",
					onPress: () => {
						console.log("Darn Pressed");
						this.props.setCanRun(false);
						this.props.setCanContinue(true);
					}
				}
			],
			{ cancelable: false }
		);
	}
	caffeineAlert(name, content) {
		Alert.alert(
			"Caffeine Content",
			`${name} contains ${content}mg of caffeine`,
			[
				{
					text: "Okie dokie",
					onPress: () => {
						console.log("OK Pressed");
						this.props.setCanRun(false);
						this.props.setCanContinue(true);
					}
				}
			],
			{ cancelable: false }
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Hold the camera up to a Barcode!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingTop: 80,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	text: {
		fontSize: 20,
		color: "white",
		paddingBottom: 50
	}
});
