import React from 'react'
import styled from 'styled-components'
import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button, ToggleButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function MyInput(props) {

    function getMuiWrap(el) {
        return <FieldWrap key={props.name}>
        <FormControl fullWidth>
                {el}
            </FormControl>
    </FieldWrap>
    }
    
        switch (props.type) {
            case 'space':
                return <div style={{ height: 30, textAlign: 'center' }} >
                    {props.label}
                </div>
            case 'header':
                return <div style={{fontSize:20,width:'100%',textAlign:'center',marginBottom:16}}>
                    {props.label}
                </div>
            case 'subheader':
                return <div style={{fontSize:18,width:'100%',textAlign:'center',marginBottom:10}}>
                    {props.label}
                </div>
            case 'element':
                return props.element
            case 'text':
                return getMuiWrap(<>
                    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                    <Input
                        controlled="true"
                        placeholder=''
                        value={props.value||''}
                        label={props.label}
                        onChange={(e) => {
                            props.handleChange(e.target.value)
                        }}
                        />
                </>)
            case 'toggleButtons':
                return <>
                    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {props.options?.map((o, i) => {
                            let toggleState = props.value || []
                            const selected = toggleState.includes(o)
                            return <ToggleButton
                            selected={selected}
                            style={{marginRight:10}}
                            key={i+'toggle_'+props.name}
                            variant="text"
                            onClick={() => {
                                if (props.multi) {
                                    if (selected) {
                                        const rmIndex = toggleState.findIndex(f => f === o)
                                        toggleState.splice(rmIndex,1)
                                    } else {
                                        toggleState.push(o)
                                    }    
                                } else {
                                    toggleState = [o]
                                }
                                
                                props.setFieldValue(props.name,toggleState)
                            }}>
                            {o}
                          </ToggleButton>
                        })}
                    </div>
                    <div style={{ height: 16 }} /> 
                    </>
            case 'date':
                return getMuiWrap(<LocalizationProvider
                    dateAdapter={AdapterDayjs}>
                    <DatePicker
                label="Pickup Date"
                value={props.value}
                onChange={props.handleChange}
                        renderInput={(params) => <TextField
                            helperText=''
                            {...params} />}
              /></LocalizationProvider>)
            case 'select':
                return getMuiWrap(<>
                    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                    <Select
                    value={props.value}
                    label={props.label}
                    onChange={(e) => {
                        props.handleChange(e.target.value)
                    }}
                >
                    {props.options.map((o, i) => {
                        return <MenuItem key={i+'options'}  value={o}>{o}</MenuItem>      
                    })}
                    </Select>
                    </>)
                
            default:
                return <></>
        }

}

const FieldWrap = styled.div`
margin-bottom:15px;
`

