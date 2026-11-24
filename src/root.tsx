import React from 'react';
import {Composition} from 'remotion';
import {UDOVideo} from './video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="UDO-Angol"
    component={UDOVideo}
    width={1080}
    height={1920}
    fps={60}
    durationInFrames={5100} // 85 segundos; ajustar con la locución definitiva
  />
);
