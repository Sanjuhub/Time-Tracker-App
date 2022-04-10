import React from 'react';
import './dashboard.css';
import Author from '../Author/Author';
import { Button, Table } from 'react-bootstrap';

export default function Dashboard() {
  

  return (
    <>
      <div className='container-top'>
        <h1>Time tracker app</h1>
        <div className='container-sec'>
          <div className='box'>
            <div className='box-header'>
              <h1>Author</h1>
              <Button className='btn-char' variant='primary' size='sm'>
                +
              </Button>{' '}
            </div>
            <Author />
          </div>
          <div className='box'>
            <div className='box-header'>
              <h1>Task</h1>
              <Button className='btn-char' variant='primary' size='sm'>
                +
              </Button>{' '}
            </div>
          </div>
        </div>
        <Button variant='primary' size='lg'>
          Timer
        </Button>{' '}
      </div>
    </>
  );
}
