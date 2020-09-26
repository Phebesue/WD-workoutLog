import React, { useState } from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
      ;
  
  let handleSubmit = (event) => {
     event.preventDefault();
     console.log(username, password);
    fetch("http://localhost:3005/user/login", {
      method: "POST",
      body: JSON.stringify({ user: { username: username, password: password } }),
                 headers: new Headers({
        "Content-Type": "application/json",
            }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
          });
  };

  return (
    <div>
      <h1>Login</h1>
         <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}            
            name="username"
            value={username}
            type="text"
            placeholder="Username"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );}

export default Login;




// import React, { Component } from "react";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { AuthContext } from "./AuthContext";

// // const Login = (props) => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
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
//     fetch("http://localhost:3005/user/login", {
//       method: "POST",
//       // body: JSON.stringify({ user: { username: username, password: password } }),
//       body: JSON.stringify({
//         user: this.state}),
//             headers: new Headers({
//         "Content-Type": "application/json",
//             }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // props.updateToken(data.sessionToken);
//         this.props.auth.setToken(data.sessionToken)
//       });
//       event.preventDefault()
//       // console.log(username, password);
//   };
//   render(){  
//   return (
//     <div>
//       <h1>Login</h1>
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label htmlFor="username">Username</Label>
//           <Input
//             // onChange={(e) => setUsername(e.target.value)}            
//               onChange={this.handleChange}
//             name="username"
//             // value={username}
//             placeholder="Username"
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             // onChange={(e) => setPassword(e.target.value)}
//             onChange={this.handleChange}
//             name="password"
//             // value={password}
//             type="password"
//             placeholder="Password"
//           />
//         </FormGroup>
//         <Button type="submit">Login</Button>
//       </Form>
//     </div>
//   );
// };
// }
// // export default Login;
// export default (props) => (
//   <AuthContext.Consumer>
//     {(auth) => <Login {...props} auth={auth} />}
//   </AuthContext.Consumer>
// );
