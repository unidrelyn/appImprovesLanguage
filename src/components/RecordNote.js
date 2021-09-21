import React from "react";
import PropTypes from "prop-types";

function RecordNote({
	isRecording,
	storeNote,
	note,
	setisRecording,
	setEmail,
	validEmail,
}) {
	return (
		<div className="noteContainer">
			<form onSubmit={storeNote}>
				<div className="emailRecord">
					<label className="labelRecord">Email</label>
					<input
						className="inputRecord"
						type="email"
						placeholder="e-mail"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<h2 className="recordtext">Record Note Here</h2>
				<div className="activeRecord">
					{validEmail ? (
						<p className="warningEmail">Active the button with valid Email</p>
					) : null}
					<button
						className="button"
						disabled={validEmail}
						onClick={() => setisRecording((prevState) => !prevState)}
					>
						Start/Stop
					</button>
				</div>
				<div className="saveRecord">
					{isRecording ? <span>Recording... </span> : <span>Stopped </span>}
					<button type="submit" className="button saveButton" disabled={!note}>
						Save
					</button>
				</div>

				<p className="noteRecord">{note}</p>
			</form>
		</div>
	);
}

RecordNote.propTypes = {
	isRecording: PropTypes.bool.isRequired,
	storeNote: PropTypes.func.isRequired,
	note: PropTypes.string.isRequired,
	setisRecording: PropTypes.func.isRequired,
};

export default RecordNote;
