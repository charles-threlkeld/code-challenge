// TODO: We'll want to change this url in production, obviously
const url = "http://localhost:8000/api/parse";
const submitButton = document.getElementById("submit");

// We'll save the blank results html for use later
let blankTable = document.getElementById("address-table").innerHTML;

submitButton.onclick = async function(event) {
  event.preventDefault();
  
  let results = document.getElementById("address-results");

  // We'll blank this out in case we get an error
  // So that we don't show old responses as if to new queries
  results.style.display = "none";
  
  let addressString = document.getElementById("address").value;
  let queryTerms = new URLSearchParams({ address: addressString });
  try {
    const response = await fetch(`${url}?${queryTerms}`);
    console.log(response)
  } catch (error) {
    console.error(`${error} in response to query at ${url}?{queryTerms}`);
  }
};
