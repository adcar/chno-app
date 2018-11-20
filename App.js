import React from "react";
import { View, StyleSheet } from "react-native";
import Scanner from "./Scanner";
import Caffeine from "./Caffeine";

export default class App extends React.Component {
	state = {
		barcode: 0,
		canContinue: true,
		canRun: true
	};
	render() {
		return (
			<View style={styles.container}>
				<Caffeine
					barcode={this.state.barcode}
					canContinue={this.state.canContinue}
					canRun={this.state.canRun}
					setCanContinue={canContinue =>
						this.setState({
							canContinue
						})
					}
					setCanRun={canRun =>
						this.setState({
							canRun
						})
					}
				/>
				<Scanner
					onBarCode={(type, data) => {
						console.log("The barcode: " + data);
						console.log("The type: " + type);
						this.setState({
							barcode: data
						});
					}}
					setCanContinue={canContinue =>
						this.setState({
							canContinue
						})
					}
					setCanRun={canRun =>
						this.setState({
							canRun
						})
					}
					canContinue={this.state.canContinue}
					style={{ height: 100 }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightcoral",
		alignItems: "center",
		justifyContent: "flex-start"
	}
});
