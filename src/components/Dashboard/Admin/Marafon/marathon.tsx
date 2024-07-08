import React from 'react';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';
import { NavLink } from 'react-router-dom';

function MarathonAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div className="right-0 top-0 mx-auto">
        <h2 className="text-2xl mb-5">
          All <span className="underline">Marathons</span>
        </h2>
        <NavLink
          to="/dashboard/admin/add/new/marathon"
          className="text-sm  py-3 px-12 bg-blue-700 text-white rounded-full hover:bg-blue-500 active:bg-blue-400"
        >
          Add new marathon
        </NavLink>
      </div>
    </DefaultLayoutAdmin>
  );
}

export default MarathonAdmin;
