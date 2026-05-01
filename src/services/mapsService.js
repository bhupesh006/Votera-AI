// Using fallback lookup + Google Maps search integration for real-world usability
export function fakeBoothLookup(pincode) {
  const data = {
    "638505": "Government Higher Secondary School, Anthiyur",
    "560001": "BBMP Office, Bangalore"
  };

  const mapsSearchUrl = `https://www.google.com/maps/search/polling+booth+near+${pincode}`;

  if (data[pincode]) {
    return { 
      found: true, 
      name: data[pincode],
      mapUrl: mapsSearchUrl
    };
  }

  return { 
    found: false,
    mapUrl: mapsSearchUrl
  };
}
