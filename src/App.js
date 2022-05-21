import React, {useState, useEffect} from "react";
import {MenuItem, FormControl, Select, Card, CardContent} from "@mui/material";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
      const getCountriesData = async()=>{
        await fetch("https://disease.sh/v3/covid-19/countries")
           .then((response)=>response.json())
           .then((data)=>{
             const countries = data.map((country)=>({
               name:country.country,
               value:country.countryInfo.iso2,
             }));
             const sortedData = sortData(data);
             setCountries(countries);
             setTableData(sortedData);
           });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
    :`https://disease.sh/v3/covid-19/countries/${countryCode}` ;
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
    })
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
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>
      <Map />
    </div>


    <Card className="app__right">
        <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={tableData} />
            <h3> WorldWide New Cases</h3>
        </CardContent>
    </Card>
    
    </div>
  );
}

export default App;
