import React, { useState, useEffect } from "react";
import Sitebar from "./home/Navbar";
import Auth from "./auth/Auth";
import WorkoutIndex from "./workouts/WorkoutIndex";

// import { Switch, Route, Router } from "reactstrap";
// import './App.css';
// import logo from './logo.svg';

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
    const clearToken = () => {
      localStorage.clear();
      setSessionToken("");
    };

    const protectedViews = () => {
      return sessionToken === localStorage.getItem("token") ? (
        <WorkoutIndex token={sessionToken} />
      ) : (
        <Auth updateToken={updateToken} />
      );
    };
  

  return (
    <div>
      <Sitebar clearToken={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;

// import React, { useState, useEffect, Component } from 'react';
// import Sitebar from "./home/Navbar";
// import Auth from "./auth/Auth";
// import WorkoutIndex from './workouts/WorkoutIndex';
// import { AuthContext } from './auth/AuthContext';
// import { Switch, Route, Router } from "reactstrap";
// // import './App.css';
// // import logo from './logo.svg';

// function App() {

//   const [sessionToken, setSessionToken] = useState("");

//   useEffect(() => {
//     if(localStorage.getItem("token")){
//       setSessionToken(localStorage.getItem("token"));
//     }
//   },[] )

//   // const updateToken = (newToken) => {
//   class updateToken extends Component {
//     constructor() {
//       super();
//       this.setToken = (token) => {
//         localStorage.setItem("token", token);
//         this.setState({sessionToken: token});
//       }
//       this.state = {
//         sessionToken:"",
//         setToken: this.setToken
//       }
//     }
//     // localStorage.setItem("token", newToken);
//     // setSessionToken(newToken);
//     // console.log(sessionToken);
//   }

//   const clearToken = () =>{
//     localStorage.clear();
//     setSessionToken("");
//   }

//   const protectedViews =() => {
//   //  protectedViews =() => {
//      if(this.state.sessionToken === localStorage.getItem("token")){
//     // return (sessionToken === localStorage.getItem("token") ? <WorkoutIndex token={sessionToken}/>
//     return (
//       <Switch>
//         <Route path="/" exact>
//           <WorkoutIndex />
//         </Route>
//       </Switch>
//     )
//   } else {
//     return(
//       <Route path="/auth">
//       <Auth />
//     {/* : <Auth updateToken={updateToken}/>)} */}
//     </Route>
//       )}  };

//   // render(){
//     return (
//       <Router>
//         <AuthContext.Provider value={this.state}>
//     <div>
// <Sitebar clearToken={clearToken}/>
// {this.protectedViews()}
// {/* <Auth updateToken={updateToken} /> */}
//     </div>
//         </AuthContext.Provider>
//   </Router>
//   );
//   // }
// };

// export default App;
