import styled from 'styled-components'
import { keyframes } from 'styled-components'

interface Animation {
  delay?: string
  bgcolor?: string
}

const Foo = keyframes`
from {
  border-width: 200px;
  border-color: rgba(255, 255, 255, 0);
  width: 1500px;
  height: 1500px;
  margin-left: -750px;
  margin-top: -750px;
}
to {
  border-width: 5px;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  border-color: rgba(255, 255, 255, 0.15);
}
`

export const Container = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 766px;
  height: 220px;
  display: flex;
  background-color: ${(props: Animation) => props.bgcolor};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0px -1px 6px 0px rgba(0, 0, 0, 0.15),
    inset 0px 3px 8px 0px rgba(0, 0, 0, 0.15);
`

export const Gradient = styled.div`
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2) 0,
    rgba(137, 137, 137, 0.1) 50%,
    rgba(255, 255, 255, 0.1)
  );
  position: absolute;
  width: 100%;
  height: 100%;
`

export const Circle = styled.div`
  border: 50px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: 5s infinite ${Foo};
  margin-top: -100px;
  margin-left: -100px;
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  animation-delay: ${(props: Animation) => props.delay};
`
