import PropTypes from 'prop-types';

function toObject(arr) {
  var rvs = [];
  for (var i = 0; i < arr.length; ++i) {
    let temp = arr[i];
    let open = temp[1];
    let high = temp[2];
    let low = temp[3];
    let close = temp[4];

    let rv = { open, high, low, close };

    rvs.push(rv);
  }
  return rvs;
}
toObject.propTypes = {
  arr: PropTypes.array,
  rvs: PropTypes.arrayOf(PropTypes.object),
  rv: PropTypes.shape({
    open: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    close: PropTypes.string,
  }),
};
export default toObject;
