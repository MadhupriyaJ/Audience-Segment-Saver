import React, { useState } from 'react';
import axios from 'axios';
import SaveSegmentPopup from './SaveSegmentPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.reduce((acc, curr) => {
        acc[curr.schema] = curr.label;
        return acc;
      }, {}),
    };

    axios.post('http://localhost:5000/save-segment', data)
      .then(response => {
        alert('Segment saved successfully!');
        setShowPopup(false);
      })
      .catch(error => {
        alert('Error saving segment!');
        console.error(error);
      });
  };

  return (
    <>
     <div className='bg-sky-400 h-16 flex items-center text-white gap-2'>
       <FontAwesomeIcon icon={faChevronLeft} />
        <text className='text-white'>View Audience</text>
      </div>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
        onClick={() => setShowPopup(true)}
      >
        Save segment
      </button>

      {showPopup && (
        <SaveSegmentPopup
          segmentName={segmentName}
          setSegmentName={setSegmentName}
          selectedSchemas={selectedSchemas}
          setSelectedSchemas={setSelectedSchemas}
          schemaOptions={schemaOptions}
          handleSaveSegment={handleSaveSegment}
          handleClose={() => setShowPopup(false)}
        />
      )}
    </div></>
   
  );
}

export default App;
