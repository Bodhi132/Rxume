// import axiosInstance from "@/app/lib/axiosInstance";

// export async function optimizeFormData() {

//     const data = JSON.parse(localStorage.getItem('resumeForm') || '{}');

//     const experience = data.experience
//     const education = data.education

//     let workExpData: string[] = [];
//     let eduData: string[] = [];

    
    
//     await Promise.all(experience.map(async(exp:any,ind:number)=>{

//         const expData = {
//             texts: exp.description
//         } 

//         const response = await axiosInstance.post('/work-experience-optimze',expData,{
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })

//         workExpData[ind] = response.data.texts

//     }))

//     await Promise.all(education.map(async(edu:any,ind:number)=>{
//         const eduDesc = {
//             texts: edu.description
//         }

//         const response = await axiosInstance.post('/education-optimze',eduDesc,{
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })

//         eduData[ind] = response.data.texts

//     }))

//     return {
//         workExpData,
//         eduData
//     }


// }