import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { VideoViewer } from '../components/VideoViewer';
import {
  getConfig,
  getCurrentCanvas,
  getCurrentCanvasWorld,
  getWindowMutedStatus,
  getWindowPausedStatus,
  getWindowCurrentTime,
  getWindowTextTrackDisabledStatus,
  getPresentAnnotationsOnSelectedCanvases,
} from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getPresentAnnotationsOnSelectedCanvases(state, { windowId }),
  canvas: (getCurrentCanvas(state, { windowId }) || {}),
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  currentTime: getWindowCurrentTime(state, { windowId }),
  muted: getWindowMutedStatus(state, { windowId }),
  paused: getWindowPausedStatus(state, { windowId }),
  textTrackDisabled: getWindowTextTrackDisabledStatus(state, { windowId }),
  videoOptions: getConfig(state).videoOptions,
});

/** */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCurrentTime: (...args) => dispatch(actions.setWindowCurrentTime(windowId, ...args)),
  setHasTextTrack: (...args) => dispatch(actions.setWindowHasTextTrack(windowId, ...args)),
  setPaused: (...args) => dispatch(actions.setWindowPaused(windowId, ...args)),
});

/** */
const styles = () => ({
  flexContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  flexFill: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative', // required for ResizeObserver for AnnotationsOverlayVideo canvas
    width: '100%',
  },
  video: {
    flexGrow: 1,
    height: '100px', // must be specified (any fixed value will do)
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    objectPosition: 'left top',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('VideoViewer'),
);

export default enhance(VideoViewer);
