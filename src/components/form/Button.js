export default function Button({buttonText, ...allOtherProps}){
    return (
    	<button {...allOtherProps} >
           {buttonText}
        </button>
    )
}