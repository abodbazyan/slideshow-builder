import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import SettingsModal from '../settings-modal';
import SlideShow from '../slideshow';

const SlideShowBuilder = () => {
    const [settings, setSettings] = useState({});
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleReset = () => {
        setSettings({});
    };

    const handleSubmit = (modalSettings) => {
        setSettings({
            ...settings,
            ...modalSettings
        });
        toggleShowModal();
    };

    return (
        <Grid container flexDirection="column">
            <Grid item container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button
                        className="text-capitalize"
                        variant="contained"
                        size="large"
                        disabled={Object.keys(settings).length == 3}
                        onClick={toggleShowModal}
                    >
                        Build Your SlideShow
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        className="text-capitalize"
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
            <Grid item marginTop={5}>
                {
                    Object.keys(settings).length == 3 && (
                        <SlideShow settings={settings} />
                    )
                }
            </Grid>
            <SettingsModal
                show={showModal}
                close={toggleShowModal}
                submit={handleSubmit}
            />
        </Grid>
    );
}

export default SlideShowBuilder;
