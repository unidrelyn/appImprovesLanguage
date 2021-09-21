import React from "react";
import PropTypes from "prop-types";

const Notes = ({ notesStore }) => {
	return (
		<div className="noteRecordContainer">
			<h2 className="noteText">Notes Store</h2>
			<p className="noteParraf">{notesStore.note}</p>
		</div>
	);
};

Notes.propTypes = {
	notesStore: PropTypes.object.isRequired,
};
export default Notes;
