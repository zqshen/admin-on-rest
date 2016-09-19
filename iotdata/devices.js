import React from 'react';
import { List, Filter, Edit, Create, Datagrid, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput, ReferenceManyField } from 'admin-on-rest/mui';

export DeviceIcon from 'material-ui/svg-icons/action/book';

const DeviceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Title" source="title" />
    </Filter>
);

export const DeviceList = (props) => (
    <List {...props} filter={DeviceFilter}>
        <Datagrid>
            <TextField label="id" source="id" />
            <TextField label="title" source="title" />
            <DateField label="published_at" source="published_at" />
            <TextField label="average_note" source="average_note" />
            <TextField label="views" source="views" />
            <EditButton />
        </Datagrid>
    </List>
);

const DeviceTitle = ({ record }) => {
    return <span>Device {record ? `"${record.title}"` : ''}</span>;
};

export const DeviceEdit = (props) => (
    <Edit title={DeviceTitle} {...props}>
        <DisabledInput label="Id" source="id" />
        <TextInput label="Title" source="title" />
        <TextInput label="Teaser" source="teaser" options={{ multiLine: true }} />
        <LongTextInput label="Body" source="body" />
        <DateInput label="Publication date" source="published_at" />
        <TextInput label="Average note" source="average_note" />
        <ReferenceManyField label="Items" reference="items" target="device_id">
            <Datagrid selectable={false}>
                <TextField source="body" />
                <DateField source="created_at" />
                <EditButton />
            </Datagrid>
        </ReferenceManyField>
        <DisabledInput label="Nb views" source="views" />
    </Edit>
);

export const DeviceCreate = (props) => (
    <Create {...props}>
        <TextInput label="Title" source="title" />
        <TextInput label="Teaser" source="teaser" options={{ multiLine: true }} />
        <LongTextInput label="Body" source="body" />
        <DateInput label="Publication date" source="published_at" />
        <TextInput label="Average note" source="average_note" />
    </Create>
);
