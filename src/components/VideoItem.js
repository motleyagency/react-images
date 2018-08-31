import React from 'react';
import { string } from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

const propTypes = {
  src: string.isRequired,
  qs: string,
  maxHeight: string
}

const defaultProps = {
  maxHeight: '100%',
  qs: ''
}

const youtubeRegEx = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const youtubePartsRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
const isString = s => !!s && typeof s === 'string';
const isYoutubeVideo = url => isString(url) && youtubeRegEx.test(url);
const isYoutubeId = url =>
  isString(url) && !/^http(s?):\/\//.test(url) && url.length === 11;
const makeEmbed = id => `https://www.youtube.com/embed/${id}`;

const makeEmbedUrl = url => {
  if (isYoutubeId(url) || isYoutubeVideo(url)) {
    // If is url
    if (!isYoutubeId(url)) {
      const parts = url.match(youtubePartsRegEx);
      return makeEmbed(parts[2]);
    }

    // most likely a youtube video id
    return makeEmbed(url);
  }
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    maxWidth: '100%',
    width: '80vw',
    height: 0,
  },

  iframe: {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxHeight: 'inherit',
    margin: 'auto'
  },
});

const VideoItem = ({ src, maxHeight, qs }) => (
  <div className={css(styles.wrapper)} style={{ maxHeight }}>
    <iframe
      src={`${makeEmbedUrl(src)}${qs ? `?${qs}` : ''}`}
      className={css(styles.iframe)}
      frameBorder="0"
      rel="0"
      allow="encrypted-media"
      allowFullScreen />
  </div>
)

VideoItem.propTypes = propTypes
VideoItem.defaultProps = defaultProps

export default VideoItem
