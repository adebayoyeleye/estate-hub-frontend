export default function Input({ label, name, type, value, onChange, ...allOtherProps }) {
    return (
        <div>
            <label htmlFor={name}>{label?label:name}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                {...allOtherProps}
            />
        </div>
    );
}