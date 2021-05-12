import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
// import Notifications from 'react-notifications-menu';

const NotificationsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <select name='cars' id='cars'>
        <option value='volvo'>Volvo</option>
        <option value='saab'>Saab</option>
        <option value='mercedes'>Mercedes</option>
        <option value='audi'>Audi</option>
      </select>
    </>
  );
};

export default NotificationsMenu;
