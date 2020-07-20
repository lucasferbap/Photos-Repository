import React from 'react';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.rootFolder.path_name}</p>
      <p>
        alias name:
        {user.rootFolder.alias_name}
      </p>

      <button onClick={signOut} type="button">
        sair
      </button>
    </>
  );
};

export default Dashboard;
