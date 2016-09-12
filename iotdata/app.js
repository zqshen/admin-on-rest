import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import data from './data';

import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/mui';

import { DeviceList, DeviceEdit, DeviceCreate, DeviceIcon } from './devices';
import { UserList, UserEdit, UserCreate, UserIcon } from './users';
import { RoleList, RoleEdit, RoleCreate, RoleIcon } from './roles';
import { ItemList, ItemEdit, ItemCreate, ItemIcon } from './items';

const restServer = new FakeRest.FetchServer('http://localhost:3000');
restServer.init(data);
restServer.toggleLogging(); // logging is off by default, enable it
fetchMock.mock('^http://localhost:3000', restServer.getHandler());

const restClient = simpleRestClient('http://localhost:3000');
const delayedRestClient = (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 500));

render(
    <Admin restClient={delayedRestClient} title="IOT Data">
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
        <Resource name="roles" list={RoleList} edit={RoleEdit} create={RoleCreate} remove={Delete} icon={RoleIcon} />
        <Resource name="devices" list={DeviceList} edit={DeviceEdit} create={DeviceCreate} remove={Delete} icon={DeviceIcon} />
        <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} remove={Delete} icon={ItemIcon} />
    </Admin>,
    document.getElementById('root')
);
