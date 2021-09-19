import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react'

const AddToDo = ({ addTodo }) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = e => {
      
        e.preventDefault();
        if (!name) {
            alert('Please enter text');
            return
        }

        addTodo({ name, status});

        setName("");
        setStatus(false);
    };
  
    return (
		
	<Form onSubmit={handleSubmit}>
		<br/>
	<Row className="align-items-center">
		<Col sm={10} className="my-1">

			<Form.Control 
				type="text"
				className="input"
				value={name}
				onChange={e => { setName(e.target.value); setStatus(false) } } 
				placeholder="Add new todo" />
		
		</Col>
		<Col xs="auto" className="my-1">
		<Button type="submit">Add Todo</Button>
		</Col>
	</Row>
	<br/>
</Form>
    );
}

export default AddToDo

