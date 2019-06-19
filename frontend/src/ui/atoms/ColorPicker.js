import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 20px;
  height: 20px;
  border: solid 2px #ddd;
  border-radius: 50%;
`;

const Picker = styled.input`
  position: absolute;
  right: -8px;
  top: -8px;
  width: 50px;
  height: 50px;
  border: none;
`;

export const ColorPicker = React.forwardRef(({defaultValue, ...props}, ref) => (
    <Container>
        <Picker defaultValue={defaultValue} type="color" ref={ref} {...props} />
    </Container>
));
