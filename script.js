var key = "ZAlcWDDVuDsXfykfMTvLf3Frq51cHKHNn8DNf7pj";
const pro = new Promise((resolve, reject) => {
  async function api() {
    const res = await fetch(
      `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=100&api_key=${key}`
    );
    if (res.status == 200) {
      const data = await res.json();
      resolve(data);
    } else {
      reject("Failed to fetch data: " + res.status);
    }
  }
  api();
});

pro
  .then((data) => {
    const container = document.getElementById("data-container");
    data.fuel_stations.forEach((station) => {
      const stationDiv = document.createElement("div");
      stationDiv.classList.add("col-md-4", "mb-3");
      stationDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
        <h4 class="card-text">Fuel Station</h4>
          <p class="card-text">${station.station_name}</p>
          <p class="card-text">Fuel Type: ${station.fuel_type_code}</p>
          <p class="card-text temp">Address:</p>
          <p class="card-text">${station.street_address}, ${station.city}, ${station.state}, ${station.country} - ${station.zip}</p>
          <p class="card-text">Intersection Direction: </p>
          <p class="card-text">${station.intersection_directions}</p>
          <p class="card-text">Latitude: ${station.latitude}</p>
          <p class="card-text">Longitude${station.longitude}</p>
        </div>
      </div>
    `;
      container.appendChild(stationDiv);
    });
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
    const container = document.getElementById("data-container");
    container.innerHTML = `<p class="text-danger">${err}</p>`;
  });
