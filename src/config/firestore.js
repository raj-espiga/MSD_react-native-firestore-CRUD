import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyC0JvdreUdm0HMdyManfIrx_Z-Y0A7-Ioo",
	authDomain: "crud-final-a4a4d.firebaseapp.com",
	projectId: "crud-final-a4a4d",
	storageBucket: "crud-final-a4a4d.firebasestorage.app",
	messagingSenderId: "774960951604",
	appId: "1:774960951604:web:6d030d727ab0ee3945f561",
	measurementId: "G-996B2YS7MZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const database = getFirestore(app);

export const database = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true,
});
