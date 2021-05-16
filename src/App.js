import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";
import Form from "react-bootstrap/Form";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountries = results.filter((item) => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <div class="col-md-4 d-inline-block mt-2 card-column">
        <Card
          key={i}
          bg="light"
          text="dark"
          className="text-center countrycard"
        >
          <Card.Img variant="top" src={data.countryInfo.flag} />
          <Card.Body>
            <Card.Title>{data.country}</Card.Title>
            <Card.Text>Cases {data.cases}</Card.Text>
            <Card.Text>Deaths {data.deaths}</Card.Text>
            <Card.Text>Recovered {data.recovered}</Card.Text>
            <Card.Text>Today's cases {data.todayCases}</Card.Text>
            <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
            <Card.Text>Active {data.active}</Card.Text>
            <Card.Text>Critical {data.critical}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return (
    <div>
      <br/>
      <h2 style = {{textAlign:"center"}}>Covid-19 Live Stats</h2>
      <br />
      <CardDeck>
        <div class="container-fluid mt-4">
          <div class="row justify-content-center">
            <div class="col-md-4 mt-2">
              <Card bg="secondary" text="white" className="text-center">
                <Card.Body>
                  <Card.Title>Cases</Card.Title>
                  <Card.Text>{latest.cases}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>Last updated {lastUpdated}</small>
                </Card.Footer>
              </Card>
            </div>
            <div class="col-md-4 mt-2">
              <Card bg="danger" text="white" className="text-center">
                <Card.Body>
                  <Card.Title>Deaths</Card.Title>
                  <Card.Text>{latest.deaths}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>Last updated {lastUpdated}</small>
                </Card.Footer>
              </Card>
            </div>
            <div class="col-md-4 mt-2">
              <Card bg="success" text="white" className="text-center">
                <Card.Body>
                  <Card.Title>Recovered</Card.Title>
                  <Card.Text>{latest.recovered}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>Last updated {lastUpdated}</small>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </CardDeck>
      <br/>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e => setSearchCountries(e.target.value))}
            className="col-md-4 mx-auto"
          />
        </Form.Group>
      </Form>
      <div class="container-fluid mt-4 card-column">
        <div class="row justify-content-center">
          <CardColumns>{countries}</CardColumns>
        </div>
      </div>
    </div>
  );
}

export default App;
