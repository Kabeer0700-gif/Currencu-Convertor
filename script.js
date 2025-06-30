const countryList = {
             AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AWG: "AW", AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF", CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT", TVD: "TV", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"

};

let From = document.getElementById("From")
let To = document.getElementById("To")

let clutter = ""
for (let codes in countryList) {
  clutter += ` <option  value="${codes}">${codes}</option>`


}

From.innerHTML = clutter
To.innerHTML = clutter

From.value = "USD";
To.value = "PKR";


const images = document.querySelectorAll(".image");

From.addEventListener("change", (delts) => {
  const countryCode = countryList[delts.target.value]
  images[0].innerHTML = `<img src="https://flagsapi.com/${countryCode}/flat/64.png" alt="">`
})

To.addEventListener("change", (delts) => {
  const countryCode = countryList[delts.target.value]
  images[1].innerHTML = `<img src="https://flagsapi.com/${countryCode}/flat/64.png" alt="">`
})

 document.querySelector(".ri-arrow-left-right-fill").addEventListener("click", () => {
            const fromValue = From.value;
            const toValue = To.value;
            
            From.value = toValue;
            To.value = fromValue;
            
            // Update flags
            const fromCountryCode = countryList[toValue];
            const toCountryCode = countryList[fromValue];
            images[0].innerHTML = `<img src="https://flagsapi.com/${fromCountryCode}/flat/64.png" alt="${toValue} Flag">`;
            images[1].innerHTML = `<img src="https://flagsapi.com/${toCountryCode}/flat/64.png" alt="${fromValue} Flag">`;
        });


let btn = document.querySelector("button");
let result = document.querySelector(".result");
let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.6.22/v1/currencies";

 btn.addEventListener("click", async () => {
            let amount = document.querySelector(".amount input");
            let newAmount = amount.value;
            
            // Add loading state
            btn.classList.add("loading");
            btn.textContent = "";
            result.classList.remove("updated");

            let FromValue = From.value.toLowerCase();
            let ToValue = To.value.toLowerCase();

            if (FromValue === ToValue) {
                result.innerHTML = "⚠️ Conversion Not Possible For Same Currencies!";
                result.style.background = "linear-gradient(135deg, #fed7d7, #feb2b2)";
                result.style.color = "#c53030";
            } else if (newAmount < 1 || newAmount == "") {
                amount.value = "1";
                newAmount = 1;
                amount.classList.add("error");
                setTimeout(() => amount.classList.remove("error"), 500);
            }

            try {
                if (FromValue !== ToValue && newAmount >= 1) {
                    let URL = `${BASE_URL}/${FromValue}.json`;
                    let response = await fetch(URL);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch exchange rate');
                    }
                    
                    let data = await response.json();
                    let changeRate = data[FromValue][ToValue] * newAmount;
                    
                  
                    setTimeout(() => {
                        result.innerHTML = `💰 ${amount.value} ${FromValue.toUpperCase()} = ${changeRate.toFixed(3)} ${ToValue.toUpperCase()}`;
                        result.classList.add("updated");
                    }, 500);
                }
            } catch (error) {
                result.innerHTML = "❌ Error fetching exchange rate. Please try again.";
                result.style.background = "linear-gradient(135deg, #fed7d7, #feb2b2)";
                result.style.color = "#c53030";
                console.error('Error:', error);
            } finally {
               
                setTimeout(() => {
                    btn.classList.remove("loading");
                    btn.textContent = "Get Exchange Rate";
                }, 1000);
            }
        });

        document.querySelector(".amount input").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                btn.click();
            }
        });

        
        [From, To, document.querySelector(".amount input")].forEach(element => {
            element.addEventListener("input", () => {
                result.classList.remove("updated");
                result.style.background = "";
                result.style.color = "";
                result.innerHTML = "Click exchange rate to see the result";
            });
        });



