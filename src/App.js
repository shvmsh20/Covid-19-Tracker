import React, {useState, useEffect} from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from "@mui/material";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";

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

    <div className="app__left">
      <div className="app__header">
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
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={100} total={200} />
        <InfoBox title="Recovered" cases={100} total={200}/>
        <InfoBox title="Deaths" cases={100} total={200} />
      </div>
      <Map />
    </div>


    <Card className="app__right">
        <CardContent>
            <h3>Live Cases By Country</h3>
            <h3> WorldWide New Cases</h3>
        </CardContent>
    </Card>
    
    </div>
  );
}

export default App;
