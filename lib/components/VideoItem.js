'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iframe;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _aphrodite = require('aphrodite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  src: _propTypes.string.isRequired,
  qs: _propTypes.string,
  maxHeight: _propTypes.string
};

var defaultProps = {
  maxHeight: '100%',
  qs: ''
};

var youtubeRegEx = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
var youtubePartsRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
var isString = function isString(s) {
  return !!s && typeof s === 'string';
};
var isYoutubeVideo = function isYoutubeVideo(url) {
  return isString(url) && youtubeRegEx.test(url);
};
var isYoutubeId = function isYoutubeId(url) {
  return isString(url) && !/^http(s?):\/\//.test(url) && url.length === 11;
};
var makeEmbed = function makeEmbed(id) {
  return 'https://www.youtube.com/embed/' + id;
};

var makeEmbedUrl = function makeEmbedUrl(url) {
  if (isYoutubeId(url) || isYoutubeVideo(url)) {
    // If is url
    if (!isYoutubeId(url)) {
      var parts = url.match(youtubePartsRegEx);
      return makeEmbed(parts[2]);
    }

    // most likely a youtube video id
    return makeEmbed(url);
  }
};

var styles = _aphrodite.StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    maxWidth: '100%',
    width: '80vw',
    height: 0
  },

  iframe: (_iframe = {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  }, _defineProperty(_iframe, 'width', '100%'), _defineProperty(_iframe, 'height', '100%'), _defineProperty(_iframe, 'maxHeight', 'inherit'), _defineProperty(_iframe, 'margin', 'auto'), _iframe)
});

var VideoItem = function VideoItem(_ref) {
  var src = _ref.src,
      maxHeight = _ref.maxHeight,
      qs = _ref.qs;
  return _react2.default.createElement(
    'div',
    { className: (0, _aphrodite.css)(styles.wrapper), style: { maxHeight: maxHeight } },
    _react2.default.createElement('iframe', {
      src: '' + makeEmbedUrl(src) + (qs ? '?' + qs : ''),
      className: (0, _aphrodite.css)(styles.iframe),
      frameBorder: '0',
      rel: '0',
      allow: 'encrypted-media',
      allowFullScreen: true })
  );
};

VideoItem.propTypes = propTypes;
VideoItem.defaultProps = defaultProps;

exports.default = VideoItem;