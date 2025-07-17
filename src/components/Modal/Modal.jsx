import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'

function Example({ goals, updateGoal }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      // insert goals into database
      const response = await fetch("https://passion-project-server.onrender.com/api/set-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(goals),
      });

      if (!response.ok) {
        throw new Error("Failed to save goals");
      }
      // once we successfully insert then we can close the modal too
      console.log("Goals saved successfully");
      handleClose();

    } catch (error) {
      console.error("Error saving goals:", error);
      alert("Could not save goals. Try again.");
    }
  }

  return (
    <>
      <Button className="goals-button" onClick={handleShow}>
        Update goals
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Update your goals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bench press goal</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter bench press goal"
                value={goals.bench}
                onChange={(e) => updateGoal('bench', e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Squat goal</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter squat goal"
                value={goals.squat}
                onChange={(e) => updateGoal('squat', e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Deadlift goal</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter deadlift  goal"
                value={goals.deadlift}
                onChange={(e) => updateGoal('deadlift', e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="close-button" onClick={handleClose}>
            Close
          </Button>
          <Button className="goal-save-button" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
