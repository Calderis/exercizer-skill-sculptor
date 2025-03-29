
import PropTypes from 'prop-types';

export const exercizerPropTypes = {
  subject: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
};

export const exercizerDefaultProps = {
  onComplete: () => {},
};
