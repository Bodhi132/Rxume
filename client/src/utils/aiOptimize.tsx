export async function optimizeFormData() {

    const data = JSON.parse(localStorage.getItem('resumeForm') || '{}');

    const experience = data.experience?.description;
    
    let experienceData = {
        texts:[]
    }

    
}