import AllBlogsList from '../../../../components/Dashboard/Admin/Blogs/blogs';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function AllBlogsPAgeAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <AllBlogsList />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default AllBlogsPAgeAdmin;
