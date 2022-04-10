import React, { useEffect, useState } from 'react';
import './timer.css';
import { Table, Button } from 'react-bootstrap';
import { getTimer, updateTimer } from '../../services/timerService';
import { useStopwatch } from 'react-timer-hook';

export default function Timer() {
  const [timerList, setTimerList] = useState([]);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [timeValue, setTimeValue] = useState({ time: '' });

  useEffect(() => {
    getTimer().then((res) => {
      setTimerList(res.data);
    });
  }, []);

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const handleStopwatch = () => {
    if (!isActive) {
      toggle();
    } else {
      let time = minute + second;
      console.log(time);
      toggle();
    }
  };

  const renderTimer = (timer, index) => {
    return (
      <tr key={index} className='pd-3'>
        <td>{index + 1}</td>
        <td>{timer.name}</td>
        <td>{timer.authorId.name}</td>
        <td>{timer.taskId.name}</td>
        <td>
          {console.log(timer.time.slice(0, 2))}
          <span>{timer.time.slice(0, 2)}</span>:
          <span>{timer.time.slice(2, 4)}</span>
        </td>
        <td>
          <Button variant='primary' size='sm' onClick={handleStopwatch}>
            {!isActive ? 'Start' : 'Stop'}
          </Button>{' '}
        </td>
        <td>
          <Button
            variant='primary'
            size='sm'
            // onClick={() => {
            //   <AuthorModal />;
            // }}
          >
            Edit
          </Button>{' '}
        </td>
        <td>
          <Button variant='primary' size='sm'>
            Delete
          </Button>{' '}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className='header-text'>
        <h1>Timer</h1>
      </div>
      <div className='table-timer'>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>#</th>
              <th
              // onClick={() => {
              //   sorting('name');
              // }}
              >
                Name
              </th>
              <th
              // onClick={() => {
              //   sorting('email');
              // }}
              >
                Author Name
              </th>
              <th>Task Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{timerList.map(renderTimer)}</tbody>
        </Table>
      </div>
    </>
  );
}
