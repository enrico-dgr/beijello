import './Modal.css';
import PropTypes from 'prop-types'





const Modal = (props) => {
    return (
        <div className={"modal-container"}>
            <div className={props.className} style={props.style}>
                {props.children}
            </div>
        </div>
    );
};

Modal.defaultProps = {
    children: <div></div>,
    className: "",
    style: {},
};

Modal.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
};


export default Modal;
