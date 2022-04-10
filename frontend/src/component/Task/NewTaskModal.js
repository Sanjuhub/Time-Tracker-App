import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../Dashboard/dashboard.css';
import { createTask } from '../../services/taskService';

export default function NewTaskModal(props) {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = () => {
    setLoading(true);
    createTask(formData)
      .then((res) => {
        setShow(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data) {
          setError(err.response.data);
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <>
      <Button
        className='btn-char'
        variant='primary'
        size='sm'
        onClick={handleShow}
      >
        +
      </Button>

      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <h6 className='error-text'>{error}</h6>}
          <Form>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={formData.name}
                placeholder='Enter Name'
                onChange={onChangeHandler}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='test'
                placeholder='Enter Description'
                name='description'
                value={formData.description}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={!isLoading ? onSubmitHandler : null}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
