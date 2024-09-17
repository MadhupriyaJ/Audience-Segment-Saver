import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';




const SaveSegmentPopup = ({
    segmentName,
    setSegmentName,
    selectedSchemas,
    setSelectedSchemas,
    schemaOptions,
    handleSaveSegment,
    handleClose
}) => {
    const [availableOptions, setAvailableOptions] = useState(
        schemaOptions.filter((option) => !selectedSchemas.some((schema) => schema.schema === option.value))
    );

    const handleAddSchema = () => {
        setSelectedSchemas([...selectedSchemas, { schema: '', label: '', value: '' }]);
    };

    const handleSchemaChange = (index, value) => {
        const updatedSchemas = [...selectedSchemas];
        const selectedOption = schemaOptions.find((option) => option.value === value);
        updatedSchemas[index] = { schema: value, label: selectedOption.label, value: '' };
        setSelectedSchemas(updatedSchemas);
        setAvailableOptions(schemaOptions.filter((option) => !updatedSchemas.some((schema) => schema.schema === option.value)));
    };

    const handleValueChange = (index, newValue) => {
        const updatedSchemas = [...selectedSchemas];
        updatedSchemas[index].value = newValue;
        setSelectedSchemas(updatedSchemas);
    };

    const handleRemoveSchema = (index) => {
        const filteredSchemas = selectedSchemas.filter((_, idx) => idx !== index);
        setSelectedSchemas(filteredSchemas);
        setAvailableOptions([...schemaOptions.filter(opt => !filteredSchemas.some(sch => sch.schema === opt.value))]);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-end items-center h-full">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-lg h-full  ">
                <div className="flex items-center justify-between mb-4 mt-0 bg-sky-400 h-16">
                    <button
                        className="text-white hover:underline hover:uppercase hover:text-opacity-80 hover:text-orange-600 flex items-center gap-2"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Saving Segment
                    </button>
                </div>

                <div className='p-6'>

                    <p className='mb-4'>Enter the name of the segment</p>
                    <input
                        type="text"
                        placeholder="Name of the segment"
                        className="w-full border border-black border-opacity-50 rounded px-3 py-2 mb-4"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                    />
                    <div className='m-5 '>
                        <p >To save your segment, you need to add schemas to build the query</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4 overflow-y-auto h-72">
                        {selectedSchemas.map((schema, index) => (
                            <div key={index} className="flex items-center mb-3">
                                {schema.schema ? (
                                    <>
                                        {/* <span className="mr-2 font-semibold">{schema.label}:</span> */}
                                        <input
                                            type="text"
                                            placeholder={`Enter ${schema.label}`}
                                            className="w-full border rounded px-3 py-2"
                                            value={schema.value}
                                            onChange={(e) => handleValueChange(index, e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleRemoveSchema(index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </>
                                ) : (
                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        value={schema.schema}
                                        onChange={(e) => handleSchemaChange(index, e.target.value)}
                                    >
                                        <option value="">Add schema to segment</option>
                                        {availableOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={handleAddSchema}
                            className="text-blue-500 hover:underline"
                        >
                            +Add new schema
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className='px-10 py-36'> <div className="bg-slate-100 bg-opacity-75 flex items-center justify-start w-full h-20">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={handleSaveSegment}
                    >
                        Save the Segment
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600 transition"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div></div>
               


            </div>
        </div>
    );
};

export default SaveSegmentPopup;
