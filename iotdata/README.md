# Common Dev Standard
## Dev Folder
./iotdata
## Branch Management
Everyone can create a dev branch. Eg. yanjun-dev. Then send pull request to master branch. We can do code review later based on this.
## Mock Rest Service
Instead of bringing up all the spring services. We can use Mock Rest Api to speed up the UI dev process.
* code example to use fakerest
```js
// in app.js
const restServer = new FakeRest.FetchServer('http://localhost:3000');
restServer.init(data);
restServer.toggleLogging(); // logging is off by default, enable it
fetchMock.mock('^http://localhost:3000', restServer.getHandler());
```
* code example for fake api (use user api as example)
```js
// in data.js
"users":[{"id":1,"cellphone":"","email":"test@gmail.com","enabled":1,"fullname":"Test","username":"test","role_id":1},{"id":2,"cellphone":"","email":"yanjzhou@gmail.com","enabled":1,"fullname":"Yanjun Zhou","username":"yanjzhou","role_id":1},{"id":3,"cellphone":"","email":"admin@gmail.com","enabled":1,"fullname":"Admin","username":"admin","role_id":2}],
```
## main stack used
* reactjs
* material-ui
* redux-saga
## good practice
When do features, the first thing we should do is to leverage the existing componet. If we need to add componet into the framework itself. Please remember to follow the guide. I have a example to add a PasswordInput into the framework in the following sections.
## side effects lib
We use redux-saga for side effects (AJAX calls, notifications, actions launched as a result of another action, etc).

# How to Run
## make sure you have npm and webpack installed
## install node components
## compile webpack

# Use Admin Component
## Main App
```js
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
	
```
## Define Entity Component (use user as example)
```js
import React from 'react';
import { List, Filter, Edit, Create, Datagrid, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, EmailInput, PasswordInput, DateInput, ReferenceManyField, ReferenceField, ReferenceInput,SelectInput} from 'admin-on-rest/mui';

export UserIcon from 'material-ui/svg-icons/social/person';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Username" source="username" />
    </Filter>
);

export const UserList = (props) => (
    <List {...props} filter={UserFilter}>
        <Datagrid>
        <TextField label="id" source="id" />
            <ReferenceField label="role" source="role_id" reference="roles">
                <TextField source="title" />
            </ReferenceField>
	
            <TextField label="username" source="username" />
            <TextField label="fullname" source="fullname" />
            <TextField label="email" source="email" />
            <EditButton />
        </Datagrid>
    </List>
);

//        <ReferenceManyField label="roles" reference="userroles" target="user_id">
//                <TextField source="role" />
//        </ReferenceManyField>


const UserUsername = ({ record }) => {
    return <span>User {record ? `"${record.username}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit username={UserUsername} {...props}>
        <DisabledInput label="Id" source="id" />
        <TextInput label="Username" source="username" />
        <TextInput label="Full Name" source="fullname" options={{ multiLine: true }} />
        <LongTextInput label="Email" source="email" />
	<ReferenceInput label="Role" source="role_id" reference="roles">
            <SelectInput optionText="title" />
        </ReferenceInput>
        <PasswordInput label="Password" source="password" />
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <TextInput label="Username" source="username" />
        <TextInput label="Full Name" source="fullname" options={{ multiLine: true }} />
        <LongTextInput label="Email" source="email" />
        <ReferenceInput label="Role" source="role_id" reference="roles" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>    
    </Create>
);
```
# Customize the Admin Dashboard
## App main code
```js
import React, { PropTypes } from 'react';

// redux, react-router, and saga form the 'kernel' on which admin-on-rest runs
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

// prebuilt admin-on-rest features
import { adminReducer, crudSaga, CrudRoute, simpleRestClient} from 'admin-on-rest';

// your app components
import Layout from './Layout';
import Dashboard from './Dashboard';
import { PostList, PostEdit, PostCreate } from './Post';
import { CommentList, CommentEdit, CommentCreate } from './Comment';
import { UserList, UserEdit, UserCreate } from './User';
import { Delete } from 'admin-on-rest/lib/mui';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer([{ name: 'posts' }, { name: 'comments' }, { name: 'users' }]),
    routing: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
const restClient = simpleRestClient('http://path.to.my.api/');
sagaMiddleware.run(crudSaga(restClient));

// initialize the router
const history = syncHistoryWithStore(hashHistory, store);

// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard} restClient={restClient} />
                <CrudRoute path="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} />
                <CrudRoute path="comments" list={CommentList} edit={CommentEdit} create={CommentCreate} remove={Delete} />
                <CrudRoute path="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
            </Route>
        </Router>
    </Provider>
);
```
## Custom routes
```js
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard} restClient={restClient} />
                <Route path="checkout" component={Checkout}>
                    <Route path="/:id" component={Cart} />
                </Route>
                <CrudRoute key="posts" path="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} />
                <!-- ... -->
            </Route>
        </Router>
    </Provider>
);	
```
## Custom reducers
```js
import checkoutReducer from './reducers/checkout';
const reducer = combineReducers({
    admin: adminReducer(['posts, comments, users']),
    routing: routerReducer,
    // add your own reducers here
    checkout: checkoutReducer,
});
```
## Custom Layout
```js
const MyMenu = () => (
    <Paper style={{ flex: '0 0 15em', order: -1 }}>
        <List>
            <ListItem containerElement={<Link to={`/posts`} />} primaryText="Posts" leftIcon={<MyPostIcon />} />
            <ListItem containerElement={<Link to={`/comments`} />} primaryText="Comments" leftIcon={<MyPostIcon />} />
            <ListItem containerElement={<Link to={`/users`} />} primaryText="Users" leftIcon={<MyPostIcon />} />
            )}
        </List>
    </Paper>
);

const MyLayout = ({ isLoading, children, route, title }) => {
    const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{title}</Link>;
    const RightElement = isLoading ? <CircularProgress color="#fff" size={0.5} /> : <span />;

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={Title} iconElementRight={RightElement} />
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    <div style={{ flex: 1 }}>{children}</div>
                    <MyMenu />
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

import MyLayout from './MyLayout';
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={MyLayout}>
                <!-- ... -->
            </Route>
        </Router>
    </Provider>
);
```

# Add Component to Template

## Example 1 (add PasswordField to the template)
### Create your react Component
```js
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const EMPTY_STRING = '';

class PasswordInput extends Component {
    handleChange(event) {
        this.props.onChange(this.props.source, event.target.value);
    }

    render() {
        const { source, label, record, options } = this.props;
        return (<TextField
	    type="password"
            name={source}
            floatingLabelText={label}
            value={record[source] || EMPTY_STRING}
            onChange={::this.handleChange}
            {...options}
        />);
    }
}

PasswordInput.propTypes = {
    source: PropTypes.string.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    options: PropTypes.object,
    onChange: PropTypes.func,
    includesLabel: PropTypes.bool.isRequired,
};

PasswordInput.defaultProps = {
    record: {},
    options: {},
    includesLabel: true,
};

export default PasswordInput;
```
### register your component in index.js
```js
// index.js
export PasswordInput from './PasswordInput';
```
