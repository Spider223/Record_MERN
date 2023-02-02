import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();

  //   const [form, setForm] = useState({
  //     name: "",
  //     position: "",
  //     level: "",
  //   });

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");

  //   const updateForm = (value) => {
  //     setForm((prev) => {
  //       return { ...prev, ...value };
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const newPerson = { ...form };

    const configuration = {
      method: "POST",
      url: "http://localhost:5000/api/v1/records",
      data: {
        name,
        position,
        level,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    setName("");
    setPosition("");
    setLevel("");
    navigate("/");
  };

  return (
    <div>
      <h1>Create New Record</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name of the Person</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Person's position</Form.Label>
          <Form.Control
            type="text"
            id="positon"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Form.Check
            type="radio"
            inline
            label="Intern"
            name="positionOptions"
            id="positionIntern"
            value="Intern"
            checked={level === "Intern"}
            onChange={(e) => setLevel(e.target.value)}
          />

          <Form.Check
            type="radio"
            inline
            label="Junior"
            name="positionOptions"
            id="positionJunior"
            value="Junior"
            checked={level === "Junior"}
            onChange={(e) => setLevel(e.target.value)}
          />

          <Form.Check
            type="radio"
            inline
            label="Senior"
            name="positionOptions"
            id="positionSenior"
            value="Senior"
            checked={level === "Senior"}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>

        <Button variant="primary" type="submit">
          Create Person
        </Button>
      </Form>
    </div>
  );
}
