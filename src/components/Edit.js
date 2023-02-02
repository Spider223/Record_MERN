import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Edit() {
  // const [name, setName] = useState("");
  // const [position, setPosition] = useState("");
  // const [level, setLevel] = useState("");

  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecord() {
      await axios
        .get(`http://localhost:5000/api/v1/records/${params.id}`)
        .then((result) => {
          console.log(result.data.record[0]);
          setForm(result.data.record[0]);
        })
        .catch((error) => {
          console.log(error);
        });
      // const response = await fetch(
      //   `http://localhost:5000/api/v1/records/${params.id}`
      // );
      // const result = await response.json();

      // console.log(result);
    }
    fetchRecord();
  }, [params.id, navigate]);

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const updateRecord = {
      name: form.name,
      level: form.level,
      position: form.position,
    };

    await axios
      .patch(`http://localhost:5000/api/v1/records/${params.id}`, updateRecord)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  }

  return (
    <div>
      <h1>Update Record</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name of the Person</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Person's position</Form.Label>
          <Form.Control
            type="text"
            id="positon"
            name="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
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
            checked={form.level === "Intern"}
            onChange={(e) => updateForm({ level: e.target.value })}
          />

          <Form.Check
            type="radio"
            inline
            label="Junior"
            name="positionOptions"
            id="positionJunior"
            value="Junior"
            checked={form.level === "Junior"}
            // onChange={(e) => setLevel(e.target.value)}
            onChange={(e) => updateForm({ level: e.target.value })}
          />

          <Form.Check
            type="radio"
            inline
            label="Senior"
            name="positionOptions"
            id="positionSenior"
            value="Senior"
            checked={form.level === "Senior"}
            // onChange={(e) => setLevel(e.target.value)}
            onChange={(e) => updateForm({ level: e.target.value })}
          />
        </div>

        <Button variant="primary" type="submit">
          Update Person
        </Button>
      </Form>
    </div>
  );
}
