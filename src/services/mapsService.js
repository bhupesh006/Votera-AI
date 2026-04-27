export function fakeBoothLookup(pincode) {
  const data = {
    "638505": "Government Higher Secondary School, Anthiyur",
    "560001": "BBMP Office, Bangalore"
  };

  if (data[pincode]) {
    return { found: true, name: data[pincode] };
  }

  return { found: false };
}
