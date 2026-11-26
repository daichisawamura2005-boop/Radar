const cities = {
  'san francisco': {name:'San Francisco',temp:18,condition:'Partly cloudy',icon:'☀',feels:17,wind:12,humidity:64,rain:10,sunset:'7:42 PM'},
  'new york': {name:'New York',temp:22,condition:'Light rain',icon:'☂',feels:20,wind:18,humidity:78,rain:65,sunset:'8:16 PM'},
  'london': {name:'London',temp:15,condition:'Cloudy',icon:'☁',feels:14,wind:14,humidity:71,rain:25,sunset:'8:51 PM'},
  'tokyo': {name:'Tokyo',temp:26,condition:'Sunny',icon:'☀',feels:28,wind:9,humidity:57,rain:5,sunset:'6:34 PM'},
  'manila': {name:'Manila',temp:30,condition:'Scattered showers',icon:'☂',feels:34,wind:11,humidity:82,rain:45,sunset:'6:02 PM'},
  'los angeles': {name:'Los Angeles',temp:24,condition:'Clear skies',icon:'☀',feels:25,wind:8,humidity:48,rain:0,sunset:'7:58 PM'},
  'singapore': {name:'Singapore',temp:29,condition:'Partly cloudy',icon:'☀',feels:33,wind:10,humidity:76,rain:20,sunset:'7:11 PM'},
  'paris': {name:'Paris',temp:17,condition:'Mostly cloudy',icon:'☁',feels:16,wind:13,humidity:68,rain:15,sunset:'9:24 PM'}
};
let celsius = true;
const $ = (id) => document.getElementById(id);
const hourlyData = [
  {t:'NOW',i:'☀',n:18,r:'10%'},{t:'2 PM',i:'☀',n:19,r:'8%'},{t:'3 PM',i:'⛅',n:19,r:'12%'},{t:'4 PM',i:'⛅',n:18,r:'18%'},
  {t:'5 PM',i:'☁',n:17,r:'24%'},{t:'6 PM',i:'☁',n:16,r:'20%'},{t:'7 PM',i:'☾',n:15,r:'10%'},{t:'8 PM',i:'☾',n:14,r:'5%'}
];
function showToast(message){const toast=$('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2800)}
function toDisplay(temp){return celsius?temp:Math.round(temp*9/5+32)}
function renderHours(offset=0){const box=$('hourly-forecast');box.innerHTML='';hourlyData.forEach((item,index)=>{const hour=document.createElement('div');hour.className='hour-item';const h=index===0?'NOW':`${(14+index+offset)%12||12} ${((14+index+offset)%24)<12?'AM':'PM'}`;hour.innerHTML=`<span class="hour-time">${h}</span><span class="hour-icon" aria-hidden="true">${item.i}</span><span class="hour-temp">${toDisplay(item.n)}°</span><span class="hour-rain">${item.r}</span>`;box.appendChild(hour)})}
function setCity(city){const data=cities[city.toLowerCase().trim()];if(!data){showToast('Try San Francisco, New York, London, Tokyo, Manila, Los Angeles, Singapore, or Paris.');return} $('city-name').textContent=data.name;$('map-city').textContent=data.name.toUpperCase();$('temperature').textContent=toDisplay(data.temp);$('condition-text').textContent=data.condition;$('weather-icon').textContent=data.icon;$('feels-like').textContent=`${toDisplay(data.feels)}°`;$('wind-value').textContent=`${data.wind} km/h`;$('humidity-value').textContent=`${data.humidity}%`;$('rain-value').textContent=`${data.rain}%`;$('sunset-value').textContent=data.sunset;$('location-input').value='';renderHours();showToast(`Showing demo forecast for ${data.name}`)}
$('search-form').addEventListener('submit',event=>{event.preventDefault();const query=$('location-input').value;if(query.trim())setCity(query)});
$('units-toggle').addEventListener('click',()=>{celsius=!celsius;$('unit-label').textContent=celsius?'°C':'°F';const key=$('city-name').textContent.toLowerCase();const data=cities[key];if(data){$('temperature').textContent=toDisplay(data.temp);$('feels-like').textContent=`${toDisplay(data.feels)}°`}renderHours();showToast(`Temperature units: ${celsius?'Celsius':'Fahrenheit'}`)});
let paused=false;$('map-toggle').addEventListener('click',()=>{paused=!paused;$('radar-map').classList.toggle('paused',paused);$('map-toggle').textContent=paused?'▶':'Ⅱ';$('map-toggle').setAttribute('aria-label',paused?'Resume radar animation':'Pause radar animation')});
let zoom=1;$('zoom-in').addEventListener('click',()=>{zoom=Math.min(1.25,zoom+.08);$('radar-map').style.backgroundSize=`${100*zoom}% ${100*zoom}%`});$('zoom-out').addEventListener('click',()=>{zoom=Math.max(.85,zoom-.08);$('radar-map').style.backgroundSize=`${100*zoom}% ${100*zoom}%`});
$('locate-button').addEventListener('click',()=>{if(!navigator.geolocation){showToast('Location services are not available in this browser.');return}showToast('Requesting your location…');navigator.geolocation.getCurrentPosition(()=>showToast('Location access works. Live weather requires a weather data provider.'),error=>showToast(error.code===1?'Location permission was denied.':'Could not get your location.'),{timeout:8000})});
renderHours();setInterval(()=>{$('updated-label').textContent='UPDATED JUST NOW'},60000);
