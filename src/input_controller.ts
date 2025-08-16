import { checkUrlExists } from './url_api';
import { isValidUrl } from './url_utils'

export function inputController(element: HTMLInputElement) {

    const message = document.createElement("div");
    element.insertAdjacentElement("afterend", message);


    async function updateUI() {
        const { valid, reason } = isValidUrl(element.value);        
        element.classList.remove("border-valid", "border-invalid");
        message.classList.remove("text-valid", "text-invalid");

        if (!valid)  {
            element.classList.add("border-invalid");
            message.classList.add("text-invalid");
            message.textContent = reason!;
        }
        else {
            element.classList.add("border-valid");
            message.classList.add("text-valid");
            message.textContent = "Verifying the Url on the server side...";
            try {
                const result = await checkUrlExists(element.value);
                console.log(result);
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
            } catch (err) {
                    message.textContent = "Data cannot be fetched from the server at this time";
        }

        } 

       
    }
    element.addEventListener('input', () => updateUI())
}