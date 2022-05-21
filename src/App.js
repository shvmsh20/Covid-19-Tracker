import React, {useState, useEffect} from "react";
import {
  MenuItem, 
  FormControl,
  Select,
} from "@mui/material";
import './App.css';

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
      const getCountriesData = async()=>{
        await fetch("https://disease.sh/v3/covid-19/countries")
           .then((response)=>response.json())
           .then((data)=>{
             const countries = data.map((country)=>({
               name:country.country,
               value:country.countryInfo.iso2,
             }));
             setCountries(countries);
           });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="app">
    <div className="app_header">
    <h1>Covid 19 Tracker app</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">WorldWide</MenuItem>
          {countries.map((country)=>{
            return <MenuItem value={country.value}>{country.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
    </div>
  );
}

export default App;
