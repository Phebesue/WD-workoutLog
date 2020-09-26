import React, { useState } from 'react'
import { ModalHeader, ModalBody, FormGroup, Modal, Form, Label, Input, Button } from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) =>{
        event.preventDefault();
        fetch(`http://localhost:3005/log/${props.workoutToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({log: {description:editDesc, definition: editDef, result: editRes}}),
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization": props.token
            })
        }) .then((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }
    return(

<div>
    <Modal isOpen={true}>
        <ModalHeader>Log a Workout</ModalHeader>
        <ModalBody>
            <Form onSubmit={workoutUpdate}>
            <FormGroup>
              <Label htmlFor="result">Edit Result: </Label>
              <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)} placeholder="Result" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Edit Description</Label>
              <Input
                name="description"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="definition">Edit Definition</Label>
              <Input type="select" name="definition" value={editDef} onChange={(e) =>setEditDef(e.target.value)}placeholder="definition">
                  <option></option>
                <option value="Time">Time</option>
                <option value="Weight">Weight</option>
                <option value="Distance">Distance</option>
              </Input>
            </FormGroup>
       <Button type="submit">Update the Workout!</Button>
            </Form>
        </ModalBody>
    </Modal>
</div>

    )

}
export default WorkoutEdit;
