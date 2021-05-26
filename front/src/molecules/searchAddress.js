import React, {useState, useEffect} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function SearchAddress(props) {
  const [value, setValue] = useState(null);
  const [result, setResult] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

    useEffect(() => {
      let active = true
      if (inputValue === '') {
        setOptions(value ? [value] : []);
        return undefined;
      }
      function fetchInput () {
        fetch({ input: inputValue }, (results) => {
          if (active) {
            let newOptions = [];
    
            if (value) {
              newOptions = [value];
            }
    
            if (results) {
              newOptions = [...newOptions, ...results];
            }
    
            setOptions(newOptions);
          }
        });
        return () => {
          active = false;
        }};
        fetchInput()
      }, [value, inputValue, fetch]);

          useEffect(() => {
            async function fetchData() {
              if (inputValue) {
      
                  await fetch('https://api-adresse.data.gouv.fr/search/?q=' + inputValue,
                  {
                      method: "GET",
                      headers: { "Content-type": "application/json" },
                  })
                  .then(response => response.json())
                  .then(res => setResult(res));   
              }
            }
            fetchData()
      },[inputValue])
  return (
<Autocomplete
      id="address"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.properties.label
      }
      filterOptions={(x) => x}
      options={result?.features ?? []}
      getOptionSelected = {(option, value) => option.properties.label === value.properties.label}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue)
      }}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue)
        if (props.onInputChange){
          props.onInputChange(e, newInputValue)
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add an address..." variant='outlined' fullWidth style={{marginBottom:15}} id={props.id} onChange={props.onChange}
        />
      )}
      renderOption={(props, option) => {
        const parts = option?.result?.features ?? []
        return (
          <div {...props} 
          >
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                />
              </Grid>
              <Grid item xs >
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                    
                      >
                    {part.properties.label}
                  </span>
                ))}

                <Typography variant="body2"
                 >
                  {props?.properties?.label}
                </Typography>
              </Grid>
            </Grid>
          </div>
        );
      }}
    />
  );
}