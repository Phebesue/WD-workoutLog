import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from "./WorkoutCreate";
import WorkoutTable from "./WorkoutTable";
import WorkoutEdit from "./WorkoutEdit";

const WorkoutIndex = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [workoutToUpdate, setWorkoutToUpdate] = useState({});

  const fetchWorkouts = () => {
    fetch("http://localhost:3005/log", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setWorkouts(logData);
        console.log(logData);
      });
  };
  useEffect(() => {
    fetchWorkouts();
  }, []);
  const editUpdateWorkout = (workouts) => {
    setWorkoutToUpdate(workouts);
    console.log(workouts);
  };
  const updateOn = () => {
    setUpdateActive(true);
  };
  const updateOff = () => {
    setUpdateActive(false);
  };

  return (
    <Container>
      <Row>
        <Col md="3">
          <WorkoutCreate
            fetchWorkouts={fetchWorkouts}
            token={props.token}
          />
        </Col>
        <Col md="9">
          <WorkoutTable
            workouts={workouts}
            editUpdateWorkout={editUpdateWorkout}
            updateOn={updateOn}
            token={props.token}
          />
        </Col>
        {updateActive ? (
          <WorkoutEdit
            workoutToUpdate={workoutToUpdate}
            updateOff={updateOff}
            token={props.token}
            fetchWorkouts={fetchWorkouts}
          />
        ) : (
          <> </>
        )}
      </Row>
    </Container>
  );
};
export default WorkoutIndex;

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import WorkoutCreate from "./WorkoutCreate";
// import WorkoutTable from "./WorkoutTable";
// import WorkoutEdit from "./WorkoutEdit";

// const WorkoutIndex = (props) => {
//   const [workouts, setWorkouts] = useState([]);
//   const [updateActive, setUpdateActive] = useState(false);
//   const [workoutToUpdate, setWorkoutToUpdate] = useState({});

//   // const fetchWorkouts = () => {
//   const fetchWorkouts = () => {
//     fetch("http://localhost:3005/log", {
//       method: "GET",
//       headers: new Headers({
//         "Content-Type": "application/json",
//         // Authorization: props.token,
//         "Authorization": this.props.auth.sessionToken,
//       }),
//     })
//       .then((res) => res.json())
//       .then((logData) => {
//         // setWorkouts(logData);
//         return this.ListeningStateChangedEvent({workouts: logData});
//         console.log(logData);
//       });
//   };
//   const editUpdateWorkout = (workouts) =>{
//       setWorkoutToUpdate(workouts);
//       console.log(workouts);
//   }
//   const updateOn = () =>{
//       setUpdateActive(true);
//   }
//   const updateOff =() => {
//       setUpdateActive(false);
//   }
//   useEffect(() => {
//     fetchWorkouts();
//   }, []);

//   return (
//     <Container>
//       <Row>
//         <Col md="3">
//           <WorkoutCreate fetchWorkouts={fetchWorkouts} token={this.props.auth.sessionToken} />
//         </Col>
//         <Col md="9">
//           <WorkoutTable workouts={workouts} editUpdateWorkout= {editUpdateWorkout} updateOn={updateOn} fetchWorkouts={fetchWorkouts}
//           token={this.props.auth.sessionToken}/>
//         </Col>
//         {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate} updateOff={updateOff} token={this.props.auth.sessionToken} fetchWorkouts={fetchWorkouts}/> : <> </>}
//       </Row>
//     </Container>
//   );
// };
// // export default WorkoutIndex;
// export default (props) => (
//   <AuthContext.Consumer>
//     {(auth) => <WorkoutIndex {...props} auth={auth} />}
//   </AuthContext.Consumer>
// );
