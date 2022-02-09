import React from "react";

import RouteComponent from '../Routes/Routes';

import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from "../Styles/themes.global.styles";

const RouteProvider = () => {
    return (
        <ThemeProvider theme={DefaultTheme}  >
            <RouteComponent />
        </ThemeProvider>
    );
};

export default RouteProvider;