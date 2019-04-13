import React from 'react';
import styled, {keyframes} from 'styled-components';

const keyFrameScaleIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`
const keyFrameScaleOut = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const keyFrameTranslate = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`
const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  //height: 64px;
div {
  position: absolute;
  top: 20px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
div:nth-child(1) {
  left: 6px;
  animation: ${keyFrameScaleIn} 0.6s infinite;
}
div:nth-child(2) {
  left: 6px;
  animation: ${keyFrameTranslate} 0.6s infinite;
}
div:nth-child(3) {
  left: 26px;
  animation: ${keyFrameTranslate} 0.6s infinite;
}
div:nth-child(4) {
  left: 45px;
  animation: ${keyFrameScaleOut} 0.6s infinite;
}
`
export default () => {
    return <Loader>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </Loader>
}
