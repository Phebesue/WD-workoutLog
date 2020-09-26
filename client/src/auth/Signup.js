import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
 
    fetch("http://localhost:3005/user/register", {
      method: "POST",
      body: JSON.stringify({ user: { username: username, password: password } }), 
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken)
             });
  };

    return (
      <div>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>      
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="enter username"
              onChange={(e) => setUsername(e.target.value)}             
              value={username}
              required
            />          
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}         
              value={password}
              required
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  }

export default Signup;




// import React, { Component } from "react";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { AuthContext } from "../auth/AuthContext";

// // const Signup = (props) => {
// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//     };
//   }
//   // const [username, setUsername] = useState("");
//   // const [password, setPassword] = useState("");
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };
//   // const handleSubmit = (event) => {
//   handleSubmit = (event) => {
//     fetch("http://localhost:3005/user/register", {
//       method: "POST",
//       // body: JSON.stringify({ user: { username: username, password: password } }),
//       body: JSON.stringify({
//         user: this.state,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // props.updateToken(data.sessionToken)
//         this.props.auth.setToken(data.sessionToken);
//       });
//     event.preventDefault();
//     // console.log(username, password);
//   };
//   validateSignup = (event) => {
//     this.setState({
//       errorMessage: "Fields MUST not be empty",
//     });
//     event.preventDefault();
//   };
//   render() {
//     const submitHandler = !this.state.username
//       ? this.validateSignup
//       : this.handleSubmit;
//     return (
//       <div>
//         <h1>Sign Up</h1>
//         {/* <Form onSubmit={handleSubmit}> */}
//         <Form onSubmit={submitHandler}>
//           <FormGroup>
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               type="text"
//               name="username"
//               placeholder="enter username"
//               // onChange={(e) => setUsername(e.target.value)}
//               onChange={this.handleChange}
//               // value={username}
//               // required
//             />
//             {this.state.errorMessage && (
//               <span className="error">user name is required</span>
//             )}
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="su_password"
//               type="password"
//               name="password"
//               placeholder="enter password"
//               // onChange={(e) => setPassword(e.target.value)}
//               onChange={this.handleChange}
//               // value={password}
//               // required
//             />
//           </FormGroup>
//           <Button type="submit">Sign Up</Button>
//         </Form>
//       </div>
//     );
//   }
// }

// // export default Signup;
// export default (props) => (
//   <AuthContext.Consumer>
//     {(auth) => <Signup {...props} auth={auth} />}
//   </AuthContext.Consumer>
// );
