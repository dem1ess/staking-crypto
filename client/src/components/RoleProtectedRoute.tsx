import React from 'react';
import {useAdmin} from '../hooks/useAdmin';

const UserRoleBasedComponent: React.FC<{
    adminComponent: JSX.Element;
    userComponent: JSX.Element
}> = ({
          adminComponent,
          userComponent
      }) => {
    const isAdmin = useAdmin();

    return isAdmin ? adminComponent : userComponent;
};

export default UserRoleBasedComponent;