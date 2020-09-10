import React, { useState } from 'react';
import './App.css';
import Form from './Form'
import TeamMembers from "./TeamMembers";



function App() {
  const [teamMembers, setTeamMembers]=useState([{
    name: "Mark",
    email: "mark-rogowsky@lambdastudents.com",
    role: "Instructor",
    info: "Here is info"
  }]);

  const addTeamMember = (formData) => {
    // 
    const newTeamMember = {
     
      name: formData.name,
      email: formData.email,
      role: formData.role,
      info: formData.info
      };
      // now we have to add it
      setTeamMembers([...teamMembers, newTeamMember]);
    
  };

  return (
    <div className="App">
      <Form addTeamMember={addTeamMember}/>
      <TeamMembers props={teamMembers} />
    </div>
  );
}

export default App;

