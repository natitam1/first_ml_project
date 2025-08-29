function getBathValue() {
  const bath = document.querySelector('input[name="uiBathrooms"]:checked');
  return bath ? parseInt(bath.value) : -1;
}

function getBHKValue() {
  const bhk = document.querySelector('input[name="uiBHK"]:checked');
  return bhk ? parseInt(bhk.value) : -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  const sqft = parseFloat(document.getElementById("uiSqft").value);
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations").value;
  const estPrice = document.getElementById("uiEstimatedPrice");

  console.log({ sqft, bhk, bathrooms, location });

  const url = "/api/predict_home_price"; // change if using direct Flask URL

  $.post(
    url,
    {
      total_sqft: sqft,
      bhk: bhk,
      bath: bathrooms,
      location: location,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
    }
  );
}

// Load locations dynamically
function onPageLoad() {
  console.log("document loaded");
  const url = "/api/get_location_names"; // change if using direct Flask URL

  $.get(url, function (data, status) {
    console.log("Got response for get_location_names request");
    if (data) {
      const locations = data.locations;
      const uiLocations = $("#uiLocations");
      uiLocations.empty();
      uiLocations.append(new Option("Choose a Location", "", true, true));
      locations.forEach((loc) => uiLocations.append(new Option(loc)));
    }
  });
}

window.onload = onPageLoad;
