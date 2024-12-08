import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Button,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Listfirestore() {
	const navigation = useNavigation();
	const [cruds, setCruds] = useState([]); // All tasks from Firestore
	const [filteredCruds, setFilteredCruds] = useState([]); // Tasks after filtering
	const [searchQuery, setSearchQuery] = useState(""); // Search input value

	useEffect(() => {
		const dbRef = collection(database, "cruds");

		const q = query(dbRef, orderBy("itemID", "asc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const tasks = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setCruds(tasks);
			setFilteredCruds(tasks); // Initialize filteredCruds with all tasks
		});

		return unsubscribe;
	}, []);

	// Filter tasks based on the search query
	const handleSearch = (text) => {
		setSearchQuery(text);
		if (text.trim() === "") {
			setFilteredCruds(cruds); // Reset to all tasks if search query is empty
		} else {
			const filtered = cruds.filter((item) =>
				item.toDo.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredCruds(filtered);
		}
	};

	return (
		<View style={styles.container}>
			<View>
				<TextInput
					style={styles.searchInput}
					placeholder="Search tasks..."
					value={searchQuery}
					onChangeText={handleSearch}
				/>
				<Button
					title="Add Task"
					onPress={() => navigation.navigate("Addfirestore")}
					color="#0000FF"
				/>
				<Text style={styles.textTitle}>To-Do List</Text>
				<FlatList
					style={{ height: "100%" }}
					data={filteredCruds}
					numColumns={1}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								navigation.navigate("Detailsfirestore", {
									data: item,
								})
							}
							style={({ pressed }) => [
								styles.itemContainer,
								{
									backgroundColor: pressed ? "#dfedfa" : "#fff",
									opacity: pressed ? 0.7 : 1,
								},
							]}
						>
							<View style={styles.innerContainer}>
								<Text style={styles.textHeader}>To-Do: {item.toDo}</Text>
								<Text style={styles.textDescription}>
									Description: {item.description}
								</Text>
								<Text style={styles.textDate}>
									Due Date: {item.due_date}
								</Text>
								<Text
									style={[
										styles.textStatus,
										{ color: item.status === "PENDING" ? "red" : "green" },
									]}
								>
									Status: {item.status}
								</Text>
							</View>
						</Pressable>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dfedfa",
		padding: 10,
	},
	searchInput: {
		width: "100%",
		padding: 10,
		marginVertical: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "gray",
		backgroundColor: "#fff",
	},
	textTitle: {
		marginTop: 20,
		marginBottom: 10,
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		color: "#333",
	},
	itemContainer: {
		margin: 10,
		padding: 15,
		borderRadius: 12,
		alignItems: "flex-start",
		elevation: 5,
	},
	innerContainer: {
		flexDirection: "column",
	},
	textHeader: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#333",
		marginBottom: 5,
	},
	textDescription: {
		fontWeight: "300",
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	textDate: {
		fontWeight: "300",
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	textStatus: {
		fontWeight: "bold",
		fontSize: 14,
	},
});
