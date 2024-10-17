window.addEventListener('load', () => {

  //STEP 6. Fetch all the messages from the server
  fetch('/messages')
    .then(response => {
      return response.json()
    })
    .then(data => {
      //Step 7. Add messages to the page
      console.log(data);
      let feed = document.querySelector("#feed");

      for(let d of data.data){
        renderMsg(d);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

let msg = document.querySelector("#msg-input");
let button = document.querySelector('#msg-submit');
button.addEventListener('click', () => {
  //Access a message
  let data = {message: msg.value};
  data = JSON.stringify(data);
  // data.time = Date.getTime();

  fetch('/new-message', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data, 
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      //Do something with the data that comes back from the server
      // debugger;
      renderMsg(data);
    })
    .catch(error => {
      console.log(error);
    });

});


function renderMsg(d){
  let msg = document.createElement("p")
  msg.innerHTML = d.message;
  let timestamp = document.createElement("p")
  timestamp.innerHTML = d.time;

  feed.append(msg);
  feed.append(timestamp);
}
