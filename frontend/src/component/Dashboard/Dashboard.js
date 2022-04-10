import React from 'react';
import './dashboard.css';
import Author from '../Author/Author';
import Task from '../Task/Task';
import { Button, Table } from 'react-bootstrap';
import AuthorModal from '../Author/AuthorModal';
import NewTaskModal from '../Task/NewTaskModal';
import { Link } from 'react-router-dom';
import Timer from '../Timer/Timer';

export default function Dashboard() {
  return (
    <>
      <div className='container-top'>
        <h1>Time tracker app</h1>
        <div className='container-sec'>
          <div className='box'>
            <div className='box-header'>
              <h1>Author</h1>
              <AuthorModal />
              {/* <Button className='btn-char' variant='primary' size='sm'>
                +
              </Button>{' '} */}
            </div>
            <Author />
          </div>
          <div className='box'>
            <div className='box-header'>
              <h1>Task</h1>
              <NewTaskModal />
              {/* <Button className='btn-char' variant='primary' size='sm'>
                +
              </Button>{' '} */}
            </div>
            <Task />
          </div>
        </div>
        <Timer />
      </div>
    </>
  );
}
