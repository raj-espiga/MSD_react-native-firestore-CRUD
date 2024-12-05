import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Listfirestore() {
	const navigation = useNavigation();
	const [cruds, setCruds] = useState([]);

	useEffect(() => {
		const dbRef = collection(database, "cruds");

		const q = query(dbRef, orderBy("createdAt", "desc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setCruds(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		return unsubscribe;
	}, []);

	return (
		<View style={styles.container}>
			<View>
				<Button
					title="Add Data"
					onPress={() => navigation.navigate("Addfirestore")}
					color="#0000FF"
				/>
				<Text style={styles.textTitle}>To-Do List</Text>
				<FlatList
					style={{ height: "100%" }}
					data={cruds}
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
								<Text style={styles.textStatus}>Status: {item.status}</Text>
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
		color: "#0000FF",
	},
});
