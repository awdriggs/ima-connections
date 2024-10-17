window.onload = (event) => {
  console.log("yo");

  fetchData();
}

async function fetchData() {
  try {
    // Making an API call using fetch
    //
    const response = await fetch("/api/");

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Log the data to the console
    console.log(data);

    // Display the result in the <pre> element
    // document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    renderData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('result').innerText = 'Error fetching data: ' + error.message;
  }
}


function renderData(data){
  let wrapper = document.querySelector("#data-wrapper");
  console.log(wrapper);
  for(let category in data){
    let title = document.createElement("h1");
    title.innerHTML = category.toUpperCase();
    wrapper.append(title);

    for(let char of data[category]){
      for(let key in char){
        let el;
        if(key == "name"){
          el = document.createElement("h2");
          el.innerHTML = char[key];
        } else {
          el = document.createElement("p");
          el.innerHTML = `${key} : ${char[key]}`;
        }

        wrapper.append(el);


      }
    }

  }

}

