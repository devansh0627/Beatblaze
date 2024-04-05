import { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            visibility: 'visible',
            border: "solid #2C3E50",
            backgroundColor: "#364c61",
            color: '#ECF0F1',
            textAlign: 'center',
            padding: '5px',
            borderRadius: '6px',
            position: 'absolute',
            zIndex: '1',
            bottom: '125%',
            left: '50%',
            marginLeft: '-60px',
            opacity: '1',
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap', // Prevent text from wrapping
            width:'auto'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
