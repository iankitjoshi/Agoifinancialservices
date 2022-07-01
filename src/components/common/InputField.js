import React, { useEffect, useState } from "react";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    TextareaAutosize
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';

const InputField = ({ type, error, fullWidth, width = '100%', ...props }) => {
    const [show, setShow] = useState(false)

    if (type === 'password') {
        return (
            <>
                <FormControl variant="outlined" fullWidth={fullWidth}>
                    <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                    <OutlinedInput
                        type={show ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShow(!show)}
                                    edge="end"
                                >
                                    {show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...props}
                    />
                </FormControl>
                {error && <span className="help-block error text-left">{error}</span>}
            </>
        )
    } else if (type === 'search') {
        return (
            <>
                <FormControl variant="outlined" fullWidth={fullWidth}>
                    <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                    <OutlinedInput
                        // type="search"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        {...props}

                    />
                </FormControl>
                {error && <span className="help-block error text-left">{error}</span>}
            </>
        )
    }
    return (
        <>
            {type !== "textarea" ? (
                <TextField
                    fullWidth={fullWidth}
                    variant="outlined"
                    type={type}
                    {...props}
                />
            ) : (
                <TextareaAutosize
                    maxRows={4}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                        style={{ width: width, height : '60px' }}
                    className="custom-textarea"
                    {...props}
                />
            )}
            {error && <span className="help-block error text-left">{error}</span>}
        </>
    );
};

export default InputField;
