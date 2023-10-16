import PropTypes from 'prop-types';

export default function Button({buttonText, ...allOtherProps}){
    return (
    	<button {...allOtherProps} >
           {buttonText}
        </button>
    )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  // any other prop type you expect
};