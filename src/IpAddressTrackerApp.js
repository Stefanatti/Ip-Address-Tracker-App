import "./IpAddressTrackerApp.scss";
import pattern from "./images/pattern-bg.png";
import { useEffect, useState } from "react";
import LoadMap from "./components/LoadMap";
import ErrorModal from "./components/ErrorModal";

const IpAddressTrackerApp = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [ipItems, setIpItems] = useState("");
  const [coords, setCoords] = useState([51.505, -0.09]);
  const [center, setCenter] = useState([37.9838, 23.7275]);

  useEffect(() => {
    if (ipItems) {
      setCenter(ipItems.loc.split(",").map((c) => +c));
    }
  }, [ipItems]);

  const addIpAddress = (e) => {
    e.preventDefault();
    fetch(`https://ipinfo.io/${ipAddress}?token=10e53a12117078`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 403) {
          setError(data);
        } else {
          setIpItems(data);
          setCenter(data.loc.split(","));
          setCoords(data.loc.split(",").map((c) => +c));
          //setCenter(data.loc.split(",").map((c) => +c));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (error) {
      console.error(error.message);
    } else if (!loaded) {
      console.log("loading...");
    }
  };
  const InfoDiv = (props) => (
    <div className="infoDiv">
      <span>{props.title}</span>
      <h3>{props.info} </h3>
    </div>
  );
  console.log(coords);
  return (
    <div className="container App">
      <div className="main-container">
        <div className="top-div">
          <img src={pattern} className="pattern" alt=""></img>
          <div className="form-div">
            <form onSubmit={addIpAddress}>
              <label htmlFor="ipAddress">Ip Address Tracker</label>
              <div className="input-div">
                <input
                  value={ipAddress}
                  name="ipAddress"
                  placeholder="IP Address"
                  onChange={(e) => {
                    setIpAddress(e.target.value);
                  }}
                />
                <button>GO</button>
              </div>
            </form>
          </div>
        </div>
        {error ? (
          <ErrorModal message={error.messages} />
        ) : (
          <div>
            {ipItems ? (
              <div className="middle-div">
                <InfoDiv title="IP ADDRESS" info={ipItems.ip} />
                <InfoDiv
                  title="LOCATION"
                  info={
                    ipItems.city +
                    " , " +
                    ipItems.region +
                    " , " +
                    ipItems.country
                  }
                />
                <InfoDiv title="TIMEZONE" info={ipItems.timezone} />
                <InfoDiv title="ISP" info={ipItems.org} />
              </div>
            ) : (
              <div className="middle-div">
                <InfoDiv title="IP ADDRESS" />
                <InfoDiv title="LOCATION" />
                <InfoDiv title="TIMEZONE" />
                <InfoDiv title="ISP" />
              </div>
            )}
          </div>
        )}
        <div className="bottom-div">
          <div id="map">
            <LoadMap coords={coords} center={center} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IpAddressTrackerApp;
