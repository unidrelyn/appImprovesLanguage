// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBO1pWM9ws389vAZSyMAP4S0AK0H1RPP3c",
	authDomain: "improvelanguagereact.firebaseapp.com",
	projectId: "improvelanguagereact",
	storageBucket: "improvelanguagereact.appspot.com",
	messagingSenderId: "953905914830",
	appId: "1:953905914830:web:b8e8f153ec255b940d819f",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
