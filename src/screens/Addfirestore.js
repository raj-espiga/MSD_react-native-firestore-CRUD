import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { collection, addDoc } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Addfirestore() {
	const navigation = useNavigation();
	const [newItem, setNewItem] = useState({
		itemID: "",
		toDo: "",
		description: "",
		due_date: "",
		status: "",
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const onSubmit = async () => {
		try {
			await addDoc(collection(database, "cruds"), newItem);
			navigation.navigate("Listfirestore");
		} catch (error) {
			alert("Error Adding Data");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.textHeader}>Add Data</Text>
				<TextInput
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, itemID: text })}
					placeholder="ToDo ID"
					style={styles.textInput}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, toDo: text })}
					placeholder="ToDO Name"
					style={styles.textInput}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, description: text })}
					placeholder="Description"
					style={styles.textInput}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, due_date: text })}
					placeholder="Due Date (YYYY-MM-DD)"
					style={styles.textInput}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, status: text })}
					placeholder="Status"
					style={styles.textInput}
				></TextInput>
				<Button title="Submit" onPress={onSubmit} />
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
		alignItems: "center",
		backgroundColor: "#fff",
		shadowOffset: { width: 2, height: 2 },
		elevation: 20,
		shadowColor: "#333",
		shadowOpacity: 0.3,
	},
	textHeader: {
		fontWeight: "bold",
		padding: 20,
	},
	textInput: {
		width: "90%",
		padding: 5,
		marginVertical: 6,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
	},
});