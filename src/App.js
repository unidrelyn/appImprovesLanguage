import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Notes from "./components/Notes";
import RecordNote from "./components/RecordNote";

import { validateEmail } from "./Helpers/Validation";

import { db, firebaseApp } from "./firebase/config";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const microphone = new SpeechRecognition();

microphone.continuous = true;
microphone.interimResults = true;
microphone.lang = "en-US";

function App() {
	const [isRecording, setisRecording] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [email, setEmail] = useState("");
	const [note, setNote] = useState("");
	const [notesStore, setnotesStore] = useState({});

	useEffect(() => {
		startRecordController();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRecording]);

	useEffect(() => {
		const validationEmail = validateEmail(email);

		if (validationEmail) {
			setValidEmail(false);
			const userSave = async () => {
				const auth = await getAuth(firebaseApp);
				await createUserWithEmailAndPassword(auth, email, "123456")
					.then((userCredential) => {
						console.log(userCredential);
					})
					.catch((error) => {
						console.log(error.message);
						console.log(error.code);
					});
			};
			userSave();
			return;
		}
		setValidEmail(true);
	}, [email]);

	const startRecordController = () => {
		if (isRecording) {
			microphone.start();
			microphone.onend = () => {
				console.log("continue..");
				microphone.start();
			};
		} else {
			microphone.stop();
			microphone.onend = () => {
				console.log("Stopped microphone on Click");
			};
		}
		microphone.onstart = () => {
			console.log("microphones on");
		};

		microphone.onresult = (event) => {
			const recordingResult = Array.from(event.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("");
			console.log(recordingResult);
			setNote(recordingResult);
			microphone.onerror = (event) => {
				console.log(event.error);
			};
		};
	};

	const storeNote = (e) => {
		e.preventDefault();
		try {
			const docRef = addDoc(collection(db, "Note"), {
				email,
				note,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}

		setnotesStore({ email, note });
		setNote("");
	};

	return (
		<Fragment>
			<Header />
			<div className="recordContainer">
				<RecordNote
					isRecording={isRecording}
					storeNote={storeNote}
					setEmail={setEmail}
					note={note}
					setisRecording={setisRecording}
					validEmail={validEmail}
				/>
				<Notes notesStore={notesStore} />
			</div>
		</Fragment>
	);
}

export default App;
