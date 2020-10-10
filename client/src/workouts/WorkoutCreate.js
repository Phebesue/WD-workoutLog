import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const WorkoutCreate = (props) => {
  const [description, setDescription] = useState("");
  const [definition, setDefinition] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3005/log", {
      method: "POST",
      body: JSON.stringify({
        log: {
          description: description,
          definition: definition,
          result: result,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setDescription("");
        setDefinition("");
        setResult("");
        props.fetchWorkouts();
      });
  };

  return (
    <div>
      <h3>Log a Workout</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="description" />
          <Input
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="enter description"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="definition" />
          <Input
            id="definition"
            type="select"
            name="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Type"
          >
            <option></option>
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="result" />
          <Input
            id="result"
            type="text"
            name="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="enter result"
          />
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
    </div>
  );
};
export default WorkoutCreate;

// import React, { Component } from "react";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { AuthContext } from "../auth/AuthContext";

// // const WorkoutCreate = (props) => {
// class WorkoutCreate extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // const [description, setDescription] = useState("");
//       // const [definition, setDefinition] = useState("");
//       // const [result, setResult] = useState("");
//       result: "",
//       description: "",
//       definition: "",
//     };
//   }
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   // const handleSubmit = (event) => {
//   handleSubmit = (event) => {
//     event.preventDefault();
//     fetch("http://localhost:3005/log", {
//       method: "POST",
//       body: JSON.stringify({
//         log: this.state }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         // Authorization: props.token,
//         Authorization: this.props.auth.sessionToken,
//       }),
//     })
//       .then((res) => res.json())
//       .then((logData) => {
//         console.log(logData);
//         this.props.updateWorkoutsArray();
//         this.setState({
//           //  setDescription("");
//           //  setDefinition("");
//           //  setResult("");
//           //  props.fetchWorkouts();
//           result: "",
//           description: "",
//           definition: "",
//         });
//       });
//   };
//   render() {
//     return (
//       <div>
//         <h3>Log a Workout</h3>
//         <Form onSubmit={this.handleSubmit}>
//           <FormGroup>
//             <Label htmlFor="description" />
//             <Input
//               id="description"
//               type="text"
//               name="description"
//               // value={description}
//               value={this.state.description}
//               // onChange={(e) => setDescription(e.target.value)}
//               onChange={this.handleChange}
//               placeholder="enter description"
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="definition" />
//             <Input
//             id="definition"
//               type="select"
//               name="definition"
//               // value={definition}
//               value={this.state.definition}
//               // onChange={(e) => setDefinition(e.target.value)}
//               onChange={this.handleChange}
//               placeholder="Type">
//               <option></option>
//               <option value="Time">Time</option>
//               <option value="Weight">Weight</option>
//               <option value="Distance">Distance</option>
//             </Input>
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="result" />
//             <Input
//              id="result"
//              type="text"
//               name="result"
//               // value={result}
//               value={this.state.result}
//               // onChange={(e) => setResult(e.target.value)}
//               onChange={this.handleChange}
//               placeholder="enter result"
//             />
//           </FormGroup>
//           <Button type="submit">Click to Submit</Button>
//         </Form>
//       </div>
//     );
//   }
// }
// // export default WorkoutCreate;
// export default (props) => (
//   <AuthContext.Consumer>
//     {(auth) => <WorkoutCreate {...props} auth={auth} />}
//   </AuthContext.Consumer>
// );
