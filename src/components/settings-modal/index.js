import React, { useState, useEffect } from 'react';
import { Grid, Box, Modal, Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SettingsModal = ({ show, close, submit }) => {
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [settings, setSettings] = useState({});

    useEffect(() => {
        setSettings({});
        setImg("");
        setText("");
    }, [show]);

    const handleSelectFile = async (file) => {
        let data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

        setImg(data);
    };

    const handleText = (event) => {
        setText(event.target.value);
    };

    const handleSelect = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        });
    };

    const handleAddSlide = () => {
        if (!img) return;

        const newSlides = settings?.slides || [];

        newSlides.push({
            src: img,
            text: text || undefined
        });

        setSettings({ ...settings, slides: newSlides });
        setImg('');
        setText('');
    };

    const handleSubmitSettings = () => {
        console.log(settings);
        submit(settings);
    };

    return (
        <Modal
            open={show}
            onClose={close}
            className="modal-custom"
        >
            <Box className="box-custom text-center">
                <Grid container flexDirection="column" justifyContent="space-between" height="100%">
                    <Grid item>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <h2>Add your Slideshow settings</h2>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item textAlign="left">
                                <h3>1. Add Your Slides</h3>
                            </Grid>
                        </Grid>
                        <Grid className="submissions_scroll_bar">
                            {
                                settings?.slides?.map((elm, index) => (
                                    <Grid key={index} item container alignItems="center" spacing={1}>
                                        <Grid item xs={2}>
                                            <img
                                                src={elm.src}
                                                width="80%"
                                                height="100%"
                                            />
                                        </Grid>
                                        <Grid item xs={10} className="slider-text" textAlign="left">
                                            <p>{elm.text}</p>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Stack direction="row">
                                    <label htmlFor="text-capitalize">
                                        <Button
                                            variant="outlined"
                                            className="fs-14 text-capitalize"
                                            component="label"
                                            style={{
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Choose Image
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => {
                                                    handleSelectFile(e.target.files[0]), (e.target.value = null);
                                                }}
                                            />
                                        </Button>
                                    </label>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="Slider Text (Optional)"
                                    size="small"
                                    name="text"
                                    value={text}
                                    onChange={handleText}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className="text-capitalize"
                                    onClick={handleAddSlide}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container flexDirection="column" alignItems="flex-start">
                            <Grid item>
                                <h3>2. Select The Slideshow Duration</h3>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <Select
                                        value={settings?.duration}
                                        onChange={handleSelect}
                                        name="duration"
                                    >
                                        <MenuItem value="1s">1s</MenuItem>
                                        <MenuItem value="2s">2s</MenuItem>
                                        <MenuItem value="3s">3s</MenuItem>
                                        <MenuItem value="4s">4s</MenuItem>
                                        <MenuItem value="5s">5s</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container flexDirection="column" alignItems="flex-start">
                            <Grid item>
                                <h3>2. Select The Slideshow Timing Function</h3>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <Select
                                        value={settings?.timingFunction}
                                        onChange={handleSelect}
                                        name="timingFunction"
                                    >
                                        <MenuItem value="ease">ease</MenuItem>
                                        <MenuItem value="ease-in">ease-in</MenuItem>
                                        <MenuItem value="ease-out">ease-out</MenuItem>
                                        <MenuItem value="ease-in-out">ease-in-out</MenuItem>
                                        <MenuItem value="linear">linear</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center" spacing={1}>
                        <Grid item>
                            <Button
                                variant="contained"
                                className="text-capitalize"
                                disabled={Object.keys(settings).length != 3}
                                onClick={handleSubmitSettings}
                            >
                                Create Slideshow
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                className="text-capitalize"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal >
    );
}

export default SettingsModal;
