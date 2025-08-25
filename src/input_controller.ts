import { checkUrlExists } from './url_api';
import { throttle } from './utils/throttle_util';
import { isValidUrl } from './utils/url_utils';

export function inputController(element: HTMLInputElement) {

    const message = document.createElement("div");
    element.insertAdjacentElement("afterend", message);
    const throttledCheck = throttle(updateUIAfterServerResponse, 5000);
    function resetClasses() {
        element.classList.remove("border-valid", "border-invalid", "border-pending");
        message.classList.remove("text-valid", "text-invalid", "text-pending");
    }


    function updateUI() {
        const { valid, reason } = isValidUrl(element.value);        
        resetClasses();

        if (!valid)  {
            element.classList.add("border-invalid");
            message.classList.add("text-invalid");
            message.textContent = reason!;
        }
        else {
            element.classList.add("border-pending");
            message.classList.add("text-pending");
            message.textContent = "Verifying the Url on the server side...";
            throttledCheck(element.value);
        }
    }

    async function updateUIAfterServerResponse(urlToCheck:string) {
            try {
                const result = await checkUrlExists(urlToCheck);
                if (urlToCheck===element.value){
                    resetClasses();
                    if (result.exists) {
                        element.classList.add("border-valid");
                        message.classList.add("text-valid");
                        message.textContent = `This URL exists and it is ${result.type}`;
                    } 
                    else {
                        element.classList.add("border-invalid");
                        message.classList.add("text-invalid");
                        message.textContent = "This URL don't exists in the server";
                    }

                }
               
            } catch (err) {
                    message.textContent = "Data cannot be fetched from the server at this time";
        
    }

       
    }
    element.addEventListener('input', () => updateUI())
}