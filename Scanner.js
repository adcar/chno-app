import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class Scanner extends React.Component {
	state = {
		hasCameraPermission: null,
		barcode: 0
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === "granted" });
	}

	render() {
		const { hasCameraPermission } = this.state;

		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>;
		}
		if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		return (
			<BarCodeScanner
				onBarCodeScanned={this.handleBarCodeScanned}
				style={{ ...StyleSheet.absoluteFill, zIndex: -5 }}
			/>
		);
	}
	handleBarCodeScanned = ({ type, data }) => {
		if (this.props.canContinue) {
			this.props.onBarCode(type, data);
			this.props.setCanContinue(true);
			this.props.setCanRun(true);
		}
	};
}
