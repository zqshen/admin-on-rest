import React from 'react';
import { List, Filter, Edit, Create, Datagrid, DateField, ReferenceField, TextField, EditButton, DisabledInput, DateInput, LongTextInput, SelectInput, ReferenceInput } from 'admin-on-rest/mui';

export ItemIcon from 'material-ui/svg-icons/communication/chat-bubble';

const ItemFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Device" source="device_id" reference="devices" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
    </Filter>
);

export const ItemList = (props) => (
    <List title="All items" {...props} filter={ItemFilter}>
        <Datagrid>
            <TextField label="id" source="id" />
            <ReferenceField label="Device" source="device_id" reference="devices">
                <TextField source="title" />
            </ReferenceField>
            <DateField label="date" source="created_at" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ItemEdit = (props) => (
    <Edit {...props}>
        <DisabledInput label="id" source="id" />
        <ReferenceInput label="Device" source="device_id" reference="devices">
            <SelectInput optionText="title" />
        </ReferenceInput>
        <DateInput label="date" source="created_at" />
        <LongTextInput label="body" source="body" />
    </Edit>
);

export const ItemCreate = (props) => (
    <Create {...props}>
        <ReferenceInput label="Device" source="device_id" reference="devices" allowEmpty>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <DateInput label="date" source="created_at" />
        <LongTextInput label="body" source="body" />
    </Create>
);
