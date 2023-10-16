import PropTypes from 'prop-types';

export default function Select({ name, label, options }) {
    const optionItems = options ? (options.map(optionItem => {
        const option_item = optionItem.replace(/\s+/g, '-').toLowerCase();
        return (
            <option
                key={option_item}
                value={option_item}
            >
                {optionItem}
            </option>
        );
    }
    )) : null;
    return (
        <div>
            <label htmlFor={name}>{label ? label : name}</label>
            <select name={name} id={name}>
                {optionItems}
            </select>
        </div>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultValue: PropTypes.string,
  };
  