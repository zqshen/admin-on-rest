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
