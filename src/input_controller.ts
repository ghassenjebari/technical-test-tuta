import { isValidUrl } from './links_utils'

export function inputController(element: HTMLInputElement) {

    const message = document.createElement("div");
    element.insertAdjacentElement("afterend", message);

    function updateUI() {
        const { valid, reason } = isValidUrl(element.value);
        
        element.classList.remove("border-valid", "border-invalid");
        message.classList.remove("text-valid", "text-invalid");
          
        if (valid) {
            element.classList.add("border-valid");
            message.classList.add("text-valid");
            message.textContent = "URL looks valid.";
        } 
        else {
            element.classList.add("border-invalid");
            message.classList.add("text-invalid");
            message.textContent = reason!;
        }
    }
    element.addEventListener('input', () => updateUI())
}