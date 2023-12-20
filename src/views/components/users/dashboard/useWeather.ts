import axios from "axios";

type Props = {
    cityName: string;

};

type LongAndLat = {
    longitude: string,
    latitude: string
}
const UseWeather = (props: Props) => {

    function fetchLongitudeAndLatitude(): LongAndLat{
        const llData: LongAndLat = {
            longitude: "",
            latitude: ""
        }
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${props.cityName}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`)
            .then((response) => {
                return response.data
            })
            .then((responseData => {
                llData.latitude = responseData[0].lat as string
                llData.longitude = responseData[0].lon as string
                return responseData;
            }))
            .catch((error) => {
                console.log(error)
                throw Error(error.message)
            });
        return llData;
    }

    const result = fetchLongitudeAndLatitude();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${result.latitude}&lon=${result.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`)
        .then((response)=>{

        }).catch((error)=>{

        });
};

export default UseWeather;