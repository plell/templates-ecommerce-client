import {
  Input,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FloatLabel,
  ToggleButton,
  FieldWrap,
} from "../../ui";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function MyInput(props: any) {
  function getMuiWrap(el: any) {
    return (
      <FieldWrap key={props.name}>
        <FormControl fullWidth>{el}</FormControl>
      </FieldWrap>
    );
  }

  let label = props.label;
  if (props.price) label += ` (+$${props.price})`;

  switch (props.type) {
    case "space":
      return <div style={{ height: 30, textAlign: "center" }}>{label}</div>;
    case "header":
      return (
        <div
          style={{
            fontSize: 20,
            width: "100%",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {label}
        </div>
      );
    case "subheader":
      return (
        <div
          style={{
            fontSize: 18,
            width: "100%",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {label}
        </div>
      );
    case "element":
      return props.element;
    case "text":
      return getMuiWrap(
        <>
          <FloatLabel>{label}</FloatLabel>
          <Input
            placeholder=''
            value={props.value || ""}
            // label={props.label}
            onChange={(e: any) => {
              props.handleChange(e.target.value);
            }}
          />
        </>
      );
    case "toggleButtons":
      return (
        <>
          <InputLabel>{label}</InputLabel>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.options?.map((o: any, i: number) => {
              let toggleState = props.value || [];
              const selected = toggleState.includes(o);
              return (
                //   @ts-ignore
                <ToggleButton
                  selected={selected}
                  style={{ marginRight: 10 }}
                  key={i + "toggle_" + props.name}
                  variant='text'
                  onClick={() => {
                    if (props.multi) {
                      if (selected) {
                        const rmIndex = toggleState.findIndex(
                          (f: any) => f === o
                        );
                        toggleState.splice(rmIndex, 1);
                      } else {
                        toggleState.push(o);
                      }
                    } else {
                      if (selected) toggleState = null;
                      else toggleState = [o];
                    }
                    props.setFieldValue(props.name, toggleState);
                  }}
                >
                  {o}
                </ToggleButton>
              );
            })}
          </div>
          <div style={{ height: 16 }} />
        </>
      );
    case "date":
      return getMuiWrap(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Pickup Date'
            value={props.value}
            onChange={props.handleChange}
            renderInput={(params: any) => (
              <TextField helperText='' {...params} />
            )}
          />
        </LocalizationProvider>
      );
    case "select":
      const price = props.prices;
      return getMuiWrap(
        <>
          <InputLabel>{label}</InputLabel>
          <Select
            value={props.value}
            label={label}
            onChange={(e: any) => {
              props.handleChange(e.target.value);
            }}
          >
            {props.options.map((o: any, i: number) => {
              return (
                <MenuItem key={i + "options"} value={o}>
                  {o} {props.prices && `($${props.prices[i]})`}
                </MenuItem>
              );
            })}
          </Select>
        </>
      );

    default:
      return <></>;
  }
}
