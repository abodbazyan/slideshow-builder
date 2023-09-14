import React, { useState } from 'react';
import { Grid } from '@mui/material';

const SlideShow = ({ settings }) => {
    return (
        <div class="slideshow">
            {
                [1, 2].map(elm => (
                    <Grid
                        key={elm}
                        className="slideshow-slider"
                        style={{
                            animationTimingFunction: settings?.timingFunction,
                            animationDuration: settings?.duration
                        }}
                    >
                        {
                            settings?.slides.map(slide => (
                                <Grid container flexDirection="column">
                                    <Grid item>
                                        <img
                                            src={slide?.src}
                                            width="375"
                                            height="530"
                                        />
                                    </Grid>
                                    <Grid item className="slider-text">
                                        <p>{slide?.text}</p>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                ))
            }
        </div>
    );
};

export default SlideShow;