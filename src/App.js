import React from 'react';
import './App.css';
import { CssBaseline } from '@mui/material';
import { Grid } from '@mui/material';
import SlideShowBuilder from './components/slideshow-builder';

const App = () => {
    return (
        <Grid padding={4}>
            <SlideShowBuilder />
            <CssBaseline />
        </Grid>
    );
}

export default App;
