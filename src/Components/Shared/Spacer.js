import React from 'react';
import styled from 'styled-components';

const SpacerStyles = styled.div`
    margin-bottom: ${({ size }) => size};
`;

const Spacer = ({ size }) => {
    return <SpacerStyles size={size} />;
};

export default Spacer;
