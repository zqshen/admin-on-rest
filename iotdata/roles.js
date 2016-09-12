import React from 'react';
import { List, Filter, Edit, Create, Datagrid, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, EmailInput, DateInput, ReferenceManyField } from 'admin-on-rest/mui';

export RoleIcon from 'material-ui/svg-icons/social/public';

const RoleFilter = (props) => (

    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="title" />
    </Filter>
);

export const RoleList = (props) => (
    <List {...props} filter={RoleFilter}>
        <Datagrid>
            <TextField label="id" source="id" />
            <TextField label="title" source="title" />
            <TextField label="description" source="desc" />
            <EditButton />
        </Datagrid>
    </List>
);

const RoleRolename = ({ record }) => {
    return <span>Role {record ? `"${record.title}"` : ''}</span>;
};

export const RoleEdit = (props) => (
    <Edit rolename={RoleRolename} {...props}>
        <DisabledInput label="Id" source="id" />
        <TextInput label="Title" source="title" />
        <LongTextInput label="Description" source="desc" />
    </Edit>
);

export const RoleCreate = (props) => (
    <Create {...props}>
        <TextInput label="Title" source="title" />
        <LongTextInput label="Description" source="desc" />
    </Create>
);
