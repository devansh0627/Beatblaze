import PropTypes from 'prop-types';

const Icon = ({ src, alt, active }) => {
  return (
    <img className={`icon ${active ? '' : 'invert'}`} src={src} alt={alt} width={24} height={24} style={{ transition: 'filter 0.3s ease' }}/>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Icon;
