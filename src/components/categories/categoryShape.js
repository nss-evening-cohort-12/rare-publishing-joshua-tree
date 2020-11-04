import PropTypes from 'prop-types';

const categoryShape = PropTypes.shape({
  category_name: PropTypes.string.isRequired,
});

export default { categoryShape };
