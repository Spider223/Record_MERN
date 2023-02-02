import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Record = ({ item: { name, level, position, _id }, deleteRecord }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{position}</td>
      <td>{level}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${_id}`}>
          Edit
        </Link>{" "}
        |
        <button
          className="btn btn-link"
          onClick={() => {
            deleteRecord(_id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:5000/api/v1/records",
    };

    axios(configuration)
      .then((result) => {
        console.log(result.data);
        setList(result.data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [list.length]);

  //   const recordList = () => {
  //     return list.map((item) => {
  //       return <Record item={item} key={item._id} />;
  //     });
  //   };

  async function deleteRecord(id) {
    await axios.delete(`http://localhost:5000/api/v1/records/${id}`);

    const newRecords = list.filter((el) => el._id !== id);

    setList(newRecords);
  }

  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <Record
              item={item}
              key={item._id}
              deleteRecord={() => deleteRecord(item._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
