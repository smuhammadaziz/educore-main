import AllContactFormAdmin from '../../../../components/Dashboard/Admin/Contact/contacts';
import OneContactGetAdmin from '../../../../components/Dashboard/Admin/Contact/oneContact';
import DefaultLayoutAdmin from '../../../../layout/DefaultAdmin';

import React from 'react';

function ONeContactInfoPageAdmin() {
  return (
    <DefaultLayoutAdmin>
      <div>
        <OneContactGetAdmin />
      </div>
    </DefaultLayoutAdmin>
  );
}

export default ONeContactInfoPageAdmin;
