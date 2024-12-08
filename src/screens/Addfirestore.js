import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Addfirestore() {
	const navigation = useNavigation();
	const [newItem, setNewItem] = useState({
		itemID: "",
		toDo: "",
		description: "",
		due_date: new Date(),
		status: "PENDING",
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	const [showCalendar, setShowCalendar] = useState(false);

	const onSubmit = async () => {
		try {
			await addDoc(collection(database, "cruds"), {
				...newItem,
				due_date: newItem.due_date.toISOString().split("T")[0],
			});
			alert("Added Successfully");
			navigation.navigate("Listfirestore");
		} catch (error) {
			alert("Error Adding Data");
		}
	};

	const handleDateChange = (selectedDate) => {
		setNewItem({ ...newItem, due_date: selectedDate });
		setShowCalendar(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.textHeader}>Add Data</Text>
				<Text style={styles.textLabel}>ToDo ID:</Text>
				<TextInput
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, itemID: text })}
					placeholder=""
					style={styles.textInput}
				/>
				<Text style={styles.textLabel}>ToDo Name:</Text>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, toDo: text })}
					placeholder=""
					style={styles.textInput}
				/>
				<Text style={styles.textLabel}>Description:</Text>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, description: text })}
					placeholder=""
					style={styles.textInput}
				/>
				<View style={styles.pickerContainer}>
					<Text style={styles.pickerLabel}>Due Date:</Text>
					<TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} style={styles.dropdownButton}>
						<Text style={styles.dropdownButtonText}>{newItem.due_date.toDateString()}</Text>
					</TouchableOpacity>
					{showCalendar && (
						<CalendarPicker
							onDateChange={handleDateChange}
							selectedStartDate={newItem.due_date}
						/>
					)}
				</View>
				<View style={styles.pickerContainer}>
					<Text style={styles.pickerLabel}>Status:</Text>
					<Picker
						selectedValue={newItem.status}
						onValueChange={(itemValue) => setNewItem({ ...newItem, status: itemValue })}
						style={styles.picker}
					>
						<Picker.Item label="PENDING" value="PENDING" />
						<Picker.Item label="COMPLETED" value="COMPLETED" />
					</Picker>
				</View>
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
	pickerContainer: {
		width: "90%",
		marginVertical: 6,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
		overflow: "hidden",
	},
	pickerLabel: {
		padding: 5,
		fontWeight: "bold",
	},
	textLabel: {
		width: "90%",
		marginTop: 10,
		fontWeight: "bold",
		color: "#333",
	},
	dropdownButton: {
		backgroundColor: "#f0f0f0",
		padding: 10,
		borderRadius: 5,
	},
	dropdownButtonText: {
		color: "#333",
		fontSize: 16,
	},
	picker: {
		width: "100%",
	},
});
