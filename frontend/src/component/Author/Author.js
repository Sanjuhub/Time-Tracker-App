import { useState, useEffect } from 'react';
import { Button, Table, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { getAuthor } from '../../services/authorService';

export default function Author() {
  const [sortOrder, setsortOrder] = useState('ASC');
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    getAuthor()
      .then((res) => {
        setAuthorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      const sorted = [...authorList].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setAuthorList(sorted);
      setsortOrder('DSC');
    }
    if (sortOrder === 'DSC') {
      const sorted = [...authorList].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setAuthorList(sorted);
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
                  sorting('email');
                }}
              >
                Email
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{authorList.map(renderAuthor)}</tbody>
        </Table>
      </div>
    </>
  );
}
