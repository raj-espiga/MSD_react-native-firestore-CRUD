import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../config/firestore";
import { MaterialIcons } from "@expo/vector-icons";

export default function Detailsfirestore({ route, navigation }) {
	const { data } = route.params;

	const onDelete = async () => {
		try {
			await deleteDoc(doc(database, "cruds", data.id));
			alert("Data Deleted Successfully");
			navigation.goBack();
		} catch (error) {
			alert("Failed to delete the data.");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.textHeader}>Details</Text>
				<Text style={styles.textItem}>ToDo ID: {data.itemID}</Text>
				<Text style={styles.textItem}>ToDo Name: {data.toDo}</Text>
				<Text style={styles.textDescription}>
					Description: {data.description}
				</Text>
				<Text style={styles.textDescription}>Due Date: {data.due_date}</Text>
				<Text style={styles.textDescription}>Status: {data.status}</Text>

				<View style={styles.buttonContainer}>
					<Pressable
						style={({ pressed }) => [
							styles.actionButton,
							{ opacity: pressed ? 0.7 : 1 },
						]}
						onPress={() =>
							navigation.navigate("Updatefirestore", {
								item: data,
							})
						}
					>
						<MaterialIcons name="edit" size={20} color="#0000FF" />
						<Text style={styles.buttonText}>Edit</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.actionButton,
							{ opacity: pressed ? 0.7 : 1 },
						]}
						onPress={onDelete}
					>
						<MaterialIcons name="delete" size={20} color="#FF6768" />
						<Text style={styles.buttonText}>Delete</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dfedfa",
	},
	innerContainer: {
		padding: 15,
		margin: 15,
		borderRadius: 15,
		backgroundColor: "#fff",
		alignItems: "center",
		shadowOffset: { width: 2, height: 2 },
		elevation: 20,
		shadowColor: "#333",
		shadowOpacity: 0.3,
	},
	textHeader: {
		fontWeight: "bold",
		fontSize: 20,
		paddingBottom: 20,
		color: "#333",
	},
	textItem: {
		fontWeight: "bold",
		fontSize: 16,
		paddingBottom: 10,
		color: "#333",
	},
	textDescription: {
		fontWeight: "300",
		fontSize: 14,
		paddingBottom: 5,
		color: "#666",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		marginHorizontal: 10,
		borderRadius: 10,
		backgroundColor: "#f0f0f0",
		elevation: 5,
	},
	buttonText: {
		marginLeft: 5,
		fontSize: 14,
		color: "#555",
	},
});