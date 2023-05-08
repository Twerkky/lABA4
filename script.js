function getRate() {
      
    let CodeInput = document.getElementById("Code");
    let dateInput = document.getElementById("date");
    
    let Code = CodeInput.value;
    let date = dateInput.value;

    let url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=" + Code + "&date=" + date;

   
    $.ajax(url,{
      success: ((el => {
        let rate = $(el).find("rate").text();
        let result = document.getElementById("exRate");
        result.innerHTML = "Курс: " + rate +'₴ =  1 '+ Code ;
      }))
    });
  }

// function getRate() {
//   let CodeInput = document.getElementById("Code");
//   let dateInput = document.getElementById("date");

//   let Code = CodeInput.value;
//   let date = dateInput.value;

//   let url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=" + Code + "&date=" + date;

//   fetch(url)
//     .then(response => response.text())
//     .then(data => {
//       let parser = new DOMParser();
//       let xml = parser.parseFromString(data, "application/xml");
//       let rate = xml.querySelector("rate").textContent;
//       let result = document.getElementById("exRate");
//       result.innerHTML = "Курс: " + rate + "₴ = 1 " + Code;
//     })
    
// }

    
  