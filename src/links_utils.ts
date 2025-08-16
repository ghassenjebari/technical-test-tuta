// Here I added some custom controls over the input to display a detailed error message
// It could be verified automatically when trying to cast it to the URL object, but will have just one generic error message
// Initilly i was trying to cast the string to an URL object in a try catch block ,but the constructor calls 4 functions and canParse is the one cheking if the url is valid
// https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static
// I also put this function in a util file to be reused across the project, and potentially new link utils functions can be added here

export function isValidUrl (url: string) :{ valid: boolean; reason?: string } {
    url=url.trim()
    if (url===""){
        return { valid: false, reason: "URL can not be empty" };
    }
    if (!url.startsWith("http://")  && !url.startsWith("https://")){
        return { valid: false, reason: "URL should start with http or https" };
    }

    const trimmedUrl = url.startsWith("http://") ? url.replace("http://","") : url.replace("https://","");
    const loopbacks = ["localhost", "127.", "::1"];
    if (loopbacks.some(addr => trimmedUrl.startsWith(addr))) {
        return { valid: false   , reason: "This is a loopback address and cannot be checked on the server" };
    }
    if ( url.includes(" ")){
        return { valid: false, reason: "URL should not contain spaces, if this not a mistake, replace them with %20" };
    }

    if (!URL.canParse(url)) {
        return { valid: false,  reason: "URL format is invalid" };
    }
    
    return { valid: true, reason: "URL format is valid" };
}
