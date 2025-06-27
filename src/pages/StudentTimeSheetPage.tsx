import { useState } from 'react';
import { TimeSheetTable } from '../components/TimeSheetTable';

export default function StudentTimeSheetPage() {
  const [studentId, setStudentId] = useState('');
  const [searchId, setSearchId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchId(studentId);
  };
return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-2">
    <div
      className="p-4 bg-white rounded shadow w-100"
      style={{ maxWidth: '600px' }}
    >
      <h1 className="mb-4 text-primary text-center fs-3 fs-md-2">
        Smart Student TimeSheet
      </h1>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {searchId && <TimeSheetTable studentId={searchId} />}
    </div>
  </div>
);


}
