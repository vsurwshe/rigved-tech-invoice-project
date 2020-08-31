import React from 'react';
import { shallow } from 'enzyme';
import ClientManagement from '../../views/client/ClientManagement';


it('renders client mangement', () => {
    shallow(<ClientManagement />);
});