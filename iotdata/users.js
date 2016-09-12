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
