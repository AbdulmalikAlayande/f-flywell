

function fetchCartoonImageOfLocation(term: string) {
    const requestHeaders = new Headers();
    requestHeaders.append("Accept-Language", "en-US");
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("X-Freepik-API-Key", process.env.REACT_APP_PEXELS_API as string);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };

    let url = "";
    fetch(`https://api.freepik.com/v1/resources?locale=en-US&page=1&limit=1&order=priority&term=${term}&vector=cartoon`, requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (result.data[0].image.source.url)
                url =  result.data[0].image.source.url;
            else url = "URL DOES NOT EXIST"
            console.log("url ==> ", url)
        })
        .catch((error) => {
            url = error.message;
            console.log("error message ==> ", url);
            console.log("error ==> ", error)
        });

    return url;
}
export default fetchCartoonImageOfLocation;