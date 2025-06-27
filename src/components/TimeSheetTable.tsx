import { useEffect, useState } from 'react';
import { StudentFacade } from '../facades/StudentFacade';
import type { Class } from '../types/Class';

interface Props {
  studentId: string;
}

export function TimeSheetTable({ studentId }: Props) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const facade = new StudentFacade();
    facade.getStudentClasses(studentId).then((data) => {
      setClasses(data);
    });
  }, [studentId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="table-responsive d-flex justify-content-center">
        <table className="table table-bordered table-hover mt-4 rounded shadow-sm text-center align-middle">
          <thead className="table-primary text-uppercase">
            <tr>
              <th>Class</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => {
              const isActive = checkIfClassActive(cls, now);
              const isNext = checkIfNextClass(cls, now);
              return (
                <tr
                  key={index}
                  className={`fade-in-row ${isActive
                      ? 'table-success fw-bold'
                      : isNext
                        ? 'table-warning'
                        : ''
                    }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <td>{cls.name}</td>
                  <td>{cls.day}</td>
                  <td>{cls.startTime}</td>
                  <td>{cls.endTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-muted text-center">
        Current time: {now.toLocaleTimeString()}
      </div>
    </>
  );
}

function checkIfClassActive(cls: Class, now: Date): boolean {
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

  if (currentDay !== cls.day) return false;

  const [startHour, startMin] = cls.startTime.split(':').map(Number);
  const [endHour, endMin] = cls.endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

function checkIfNextClass(cls: Class, now: Date): boolean {
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

  if (currentDay !== cls.day) return false;

  const [startHour, startMin] = cls.startTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return currentMinutes < startMinutes;
}
