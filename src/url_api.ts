const fileListUrl= new Set([
    "https://tuta.com/assets/hand-illustration-2.Vs-oaHEM_1aOhIf.avif",
    "https://tuta.com/assets/hand-illustration-3.CUrxP5bI_1ker3L.avif",
    "https://tuta.com/assets/hand-illustration-4.CPvHXYFF_ZY6Pf3.avif",
    "https://tuta.com/video/tuta_promo.webm",
    "https://tuta.com/assets/tutanota-collage.NO2I3pda_sGfsU.webp",
    "https://tuta.com/assets/index.ChOEIEuA.css",
    "https://app.tuta.com/images/logo-favicon-192.png"
]); 
const folderListUrl= new Set([
    "https://tuta.com/assets",
    "https://tuta.com/video",
    "https://app.tuta.com/images"
]);
export async function checkUrlExists(url: string): Promise<{ exists: boolean; type: "file" | "folder" | null }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (fileListUrl.has(url)){
        return {exists:true, type:"file"};
    }
    else if (folderListUrl.has(url)){
        return {exists:true, type:"folder"};
    }
    else{
        return {exists:false,type:null};
    }
}