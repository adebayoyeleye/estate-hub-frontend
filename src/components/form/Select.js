export default function Select({ name, label, options }) {
    const optionItems = options.map(optionItem => {
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
    );
    return (
        <div>
            <label for={name}>{label ? label : name}</label>
            <select name={name} id={name}>
                {optionItems}
            </select>
        </div>
    );
}