import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ source1, source2, name, desc,playlistId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate=useNavigate();
  return (
    <>
      <div className='card bg-gray-800 cursor-pointer' style={{
        width: isHovered ? '180px' : '170px',
        height:'auto',
        padding: '8px',
        borderRadius: '5%',
        position: 'relative',
        transition: isHovered ? 'transform 0.6s cubic-bezier(0.52, -0.03, 0.94, 0.73)' : ''
      }} onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if(playlistId)
          navigate('/playlist/'+playlistId);
        }
        }>
        <div className="play absolute" style={{ top: '32%', right: '10%', opacity: isHovered ? '1' : '0', transition: 'transform 0.6s ease, opacity 0.6s ease' }}>
          <img className='w-full object-contain rounded-2xl' src={source1} alt="" />
        </div>
        <img className='w-full object-contain rounded-2xl' src={source2.length && source2!=='404'?source2:'/images/customPlaylist.svg'} alt={name} style={{ marginBottom: '10px',maxHeight:'150px' }} />
        <h2 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>{name}</h2>
        {desc && <p className="description" style={{ color: "#c0c2c2", fontSize: '1rem' }}>{desc}</p>}
      </div>
    </>
  )
}
Card.propTypes = {
  source1: PropTypes.string.isRequired,
  source2: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  playlistId: PropTypes.string
};

export default Card