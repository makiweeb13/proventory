import PropTypes from 'prop-types';

function StatusMessage({ message, type }) {
  if (!message) return null;

  const className = `status-message ${type}`;

  return (
    <div className={className}>
      {type === 'error' && <span className="icon">⚠️</span>}
      {type === 'success' && <span className="icon">✅</span>}
      <span>{message}</span>
    </div>
  );
}

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default StatusMessage;