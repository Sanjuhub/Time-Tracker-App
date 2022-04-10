import { useState, useEffect } from 'react';
import { Button, Table, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { getTask } from '../../services/taskService';

export default function Task() {
  const [sortOrder, setsortOrder] = useState('ASC');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTask()
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderAuthor = (task, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>
          <Button variant='primary' size='sm'>
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

  //Sorting - String
  const sorting = (col) => {
    console.log(col);
    if (sortOrder === 'ASC') {
      const sorted = [...taskList].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTaskList(sorted);
      setsortOrder('DSC');
    }
    if (sortOrder === 'DSC') {
      const sorted = [...taskList].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTaskList(sorted);
      setsortOrder('ASC');
    }
  };

  return (
    <>
      <div className='ActionSearchDiv'>
        <BsSearch style={{ padding: '5px', fontSize: '35px', color: 'gray' }} />
        <InputGroup></InputGroup>
      </div>
      <div className='table'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => {
                  sorting('name');
                }}
              >
                Name
              </th>
              <th
                onClick={() => {
                  sorting('description');
                }}
              >
                Description
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{taskList.map(renderAuthor)}</tbody>
        </Table>
      </div>
    </>
  );
}
