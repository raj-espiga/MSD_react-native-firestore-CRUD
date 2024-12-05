import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { updateDoc, doc } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Updatefirestore({ route }) {
	const navigation = useNavigation();
	const { item } = route.params;
	const id = item.id;

	const [newItem, setNewItem] = useState({
		itemID: item.itemID || "",
		toDo: item.toDo || "",
		description: item.description || "",
		due_date: item.due_date || "",
		status: item.status || "",
		createdAt: item.createdAt || new Date(),
		updatedAt: new Date(),
	});

	const onSubmit = async () => {
		try {
			await updateDoc(doc(database, "cruds", id), newItem);
			alert("Update Successful");
			navigation.navigate("Listfirestore");
		} catch (error) {
			alert("Error Updating Data");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.textHeader}>Update Data</Text>
				<TextInput
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, itemID: text })}
					placeholder="ToDo ID"
					style={styles.textInput}
					defaultValue={newItem.itemID}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, toDo: text })}
					placeholder="ToDO Name"
					style={styles.textInput}
					defaultValue={newItem.toDo}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, description: text })}
					placeholder="Description"
					style={styles.textInput}
					defaultValue={newItem.description}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, due_date: text })}
					placeholder="Due Date (YYYY-MM-DD)"
					style={styles.textInput}
					defaultValue={newItem.due_date}
				></TextInput>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, status: text })}
					placeholder="Status"
					style={styles.textInput}
					defaultValue={newItem.status}
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
