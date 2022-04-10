import { useState } from 'react';
import { Button, Table, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

export default function Author() {
  const [sortOrder, setsortOrder] = useState('ASC');
  let AuthorList = [
    { name: 'Jhon', email: 'jhon@gmail.com' },
    { name: 'ron', email: 'ahon@gmail.com' },
    { name: 'Jhon', email: 'fhon@gmail.com' },
    { name: 'deon', email: 'ghon@gmail.com' },
    { name: 'Jhon', email: 'bon@gmail.com' },
    { name: 'fhon', email: 'jhon@gmail.com' },
    { name: 'aon', email: 'aon@gmail.com' },
    { name: 'bhon', email: 'jhon@gmail.com' },
    { name: 'chon', email: 'jhon@gmail.com' },
  ];

  const renderAuthor = (author, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{author.name}</td>
        <td>{author.email}</td>
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
      const sorted = [...AuthorList].sort((a, b) => {
        // console.log(a);
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      AuthorList = sorted;
      setsortOrder('DSC');
    }
    if (sortOrder === 'DSC') {
      const sorted = [...AuthorList].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      AuthorList = sorted;
      setsortOrder('ASC');
    }
  };

  return (
    <>
      <div className='ActionSearchDiv'>
        <BsSearch style={{ padding: '5px', fontSize: '35px', color: 'gray' }} />
        <InputGroup
          placeholder='Search action name here...'
          className='participantSearch'
          //   onChange={(e) => filterActionName(e)}
        >
          <BsSearch />
        </InputGroup>
      </div>
      <div className='table'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => sorting('name')}>Name</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{AuthorList.map(renderAuthor)}</tbody>
        </Table>
      </div>
    </>
  );
}
