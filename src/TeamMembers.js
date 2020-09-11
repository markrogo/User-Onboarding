import React from "react";

const TeamMembers = props => {
    console.log('team members ',props.props);
  return (
    <div className="team-member-list">
      <h1>Team Roster</h1>
      {props.props.map(teamMembers => (
        <div className="teamMamber" key={teamMembers.name}>
          <h2>{teamMembers.name}</h2>
          <h3>{teamMembers.role}</h3>
          <p>{teamMembers.email}</p>

        </div>
      ))}
    </div>
  );
};

export default TeamMembers;