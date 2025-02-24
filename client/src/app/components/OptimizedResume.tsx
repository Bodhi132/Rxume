import React from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useState, useEffect } from 'react'
import { PDFViewer, Font } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link, Svg, Path, } from "@react-pdf/renderer";

const OptimizedResume = () => {


    const localData = JSON.parse(localStorage.getItem('resumeForm') || '{}');

    interface FormData {
        experience?: any[];
        projects?: any[];
        userInfo?: {
            name?: string;
            phone?: string;
            email?: string;
            linkedin?: string;
            github?: string;
            twitter?: string;
            portfolio?: string;
        };
        technicalSkills?: {
            frontend?: string[];
            backend?: string[];
            databases?: string[];
            devops?: string[];
            testing?: string[];
            tools?: string[];
        };
        education?: {
            college?: string;
            degree?: string;
            grade?: number;
            gradeType?: string;
            start?: string;
            end?: string;
        }[];
    }

    const [formData, setFormData] = useState<FormData>({})

    useEffect(() => {
        setFormData(localData)
    }, [])

    // useEffect(() => {
    //     setFormData(localData)
    // }, [localData])


    const experience = formData.experience
    const projects = formData.projects

    const [expDesc, setExpDesc] = useState<any[]>([])
    const [projectDesc, setProjectDesc] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function optimizeFormData() {

        if (!experience || !projects) {
            setIsLoading(false)
            return
        }
        try {
            const expResponses = await Promise.all(experience.map(async (exp: any) => {
                const expData = { texts: exp.description };
                const response = await axiosInstance.post('/work-experience-optimze', expData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                return response.data.optimized_texts;
            }));

            setExpDesc(expResponses);

            const projResponses = await Promise.all(projects.map(async (project: any) => {
                const projDesc = { texts: project.description };
                const response = await axiosInstance.post('/project-desc-optimze', projDesc, {
                    headers: { 'Content-Type': 'application/json' },
                });
                return response.data.optimized_texts;
            }));

            setProjectDesc(projResponses);
        } catch (error) {
            console.error('Error optimizing data:', error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        optimizeFormData()
    }, [formData])

    useEffect(() => {
        if (expDesc.length !== 0 && projectDesc.length !== 0)
            console.log('Optimized Data:', expDesc, projectDesc)
    }, [expDesc, projectDesc])


    return (
        <div className=' w-full h-full'>
            {isLoading ? <p className='w-[90vw] h-[90vh] text-2xl'>'loading...'</p> :
                <PDFViewer width="100%" height="100%">
                    <Document>
                        <Page size="A4" style={{ flexDirection: "column", paddingHorizontal: '20px', paddingVertical: '8px' }}>
                            {formData?.userInfo?.name &&
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                                        <Text style={{ fontSize: '20px', fontWeight: 'bold', }}>{formData.userInfo.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", gap: '5px', paddingVertical: '3px', fontSize: '11px' }}>
                                        <Text>{formData?.userInfo?.phone || ""}</Text>
                                        <Text>|</Text>
                                        <Link src={formData?.userInfo?.email || ""}>
                                            <Text>Email </Text>
                                        </Link>
                                        <Text>|</Text>
                                        <Link src={formData?.userInfo?.linkedin || ""}>
                                            <Text>Linkedin </Text>
                                        </Link>
                                        <Text>|</Text>
                                        <Link src={formData?.userInfo?.github || ""}>
                                            <Text>Github </Text>
                                        </Link>
                                        <Text>|</Text>
                                        <Link src={formData?.userInfo?.twitter || ""}>
                                            <Text>Twitter</Text>
                                        </Link>
                                        <Text>|</Text>
                                        <Link src={formData?.userInfo?.portfolio || ""}>
                                            <Text>Portfolio </Text>
                                        </Link>
                                    </View>
                                </View>
                            }

                            {formData?.technicalSkills &&
                                <View style={{ marginTop: '2px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginVertical: '5px', marginLeft: '15px', marginBottom: '4px' }}>
                                        TECHNICAL SKILLS :
                                    </Text>
                                    <View style={{ marginLeft: '35px', flexDirection: 'column', gap: '4px', }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Frontend -</Text>
                                            <Text>{formData?.technicalSkills?.frontend?.join(", ") || ""}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Backend -</Text>
                                            <Text>{formData?.technicalSkills?.backend?.join(", ") || ""}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Databases -</Text>
                                            <Text>{formData?.technicalSkills?.databases?.join(", ") || ""}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Devops -</Text>
                                            <Text>{formData?.technicalSkills?.devops?.join(", ") || ""}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Testing -</Text>
                                            <Text>{formData?.technicalSkills?.testing?.join(", ") || ""}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>
                                                Tools -
                                            </Text>
                                            <Text>
                                                {formData?.technicalSkills?.tools?.join(", ") || ""}
                                            </Text>
                                        </View>
                                    </View>
                                </View>}
                            {
                                experience &&
                                <View >
                                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '10px', marginLeft: '15px', marginBottom: '4px' }}>EXPERIENCE :</Text>
                                    {
                                        experience && experience.map((experience: any, index: number) => (
                                            <View key={index} style={{ marginBottom: '4px', marginLeft: '15px', fontWeight: 'semibold' }}>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '11px' }}>
                                                    <Text>{experience?.role || ""}</Text>
                                                    <Text>-</Text>
                                                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                            <Text>{experience?.company || ""}</Text>
                                                            <Text> | </Text>
                                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
                                                                <Text>{experience?.start ? new Date(experience.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ""} </Text>
                                                                <Text> - </Text>
                                                                <Text>{experience?.end ? new Date(experience.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ""}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: '1px', flexWrap: 'wrap', marginTop: '4px' }}>
                                                    <Text style={{ fontSize: '10px' }}>{'('}</Text>
                                                    {
                                                        experience?.skill?.length > 0 && experience?.skill?.map((tech: string, index: number) => (
                                                            <View key={index}>
                                                                <Text key={index} style={{ fontSize: '10px' }}>{tech}</Text>
                                                                <Text style={{ fontSize: '10px' }}>{index === experience.skill?.length - 1 ? "" : ","}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                    <Text style={{ fontSize: '11px' }}>{')'}</Text>
                                                </View>
                                                <View style={{ marginVertical: '7px', fontWeight: 'medium' }}>
                                                    {
                                                        expDesc[index]?.length > 0 && expDesc[index]?.map((description: string, index: number) => {
                                                            if (description !== "") {
                                                                return description.charAt(0) === '-' ? (
                                                                    description.split('-').filter((item: string) => item.trim() !== "").map((item: string, index: number) =>
                                                                    (
                                                                        <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '11px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>{'\u2022'}</Text>
                                                                            <Text key={index}>{item.trim()}</Text>
                                                                        </View>
                                                                    )
                                                                    )
                                                                ) : (
                                                                    <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '11px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>{'\u2022'}</Text>
                                                                        <Text key={index}>{description}</Text>
                                                                    </View>
                                                                );
                                                            }
                                                            return null;
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            }
                            {formData.education && <View>
                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '5px', marginLeft: '15px', marginBottom: '6px' }}>EDUCATION :</Text>
                                {
                                    formData?.education?.map((education: any, index: number) => (
                                        <View key={index} style={{ marginBottom: '6px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>
                                                <Text>{education?.college || ""}</Text>
                                                <Text>|</Text>
                                                <Text>{education?.degree || ""}</Text>
                                                {education?.grade > 0 &&
                                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                        <Text>{'('}</Text>
                                                        <Text>{education?.grade || ""}</Text>
                                                        <Text>{education?.gradeType || ""}</Text>
                                                        <Text>{')'}</Text>
                                                    </View>
                                                }
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>
                                                <Text>{education?.start ? new Date(education.start).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ""}</Text>
                                                <Text>{education?.end ? new Date(education.end).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ""}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>}
                            {
                                projects &&
                                <View>
                                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '10px', marginLeft: '15px', marginBottom: '10px' }}>PROJECTS :</Text>
                                    {
                                        projects?.map((project: any, index: number) => (
                                            <View key={index} style={{ marginBottom: '7px' }}>
                                                <View style={{ marginBottom: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '12px', width: '50%' }}>
                                                        <Text style={{ fontWeight: 'semibold', fontSize: '12px' }}>{project?.name || ""}</Text>
                                                        {project.codeLink && <Link src={project?.codeLink || ""}>
                                                            <Text>Code</Text>
                                                        </Link>}
                                                        {project.demoLink && <Link src={project?.demoLink || ""}>
                                                            <Text>Demo</Text>
                                                        </Link>}
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>
                                                        {/* <Text>{project?.description || ""}</Text> */}
                                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', flexWrap: 'wrap' }}>
                                                            {
                                                                project?.techStack?.length > 0 && project?.techStack?.map((tech: string, index: number) => (
                                                                    <View key={index}>
                                                                        <Text key={index}>{tech}</Text>
                                                                        <Text>{index === project.techStack.length - 1 ? "" : ","}</Text>
                                                                    </View>
                                                                ))
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ marginVertical: '7px', fontWeight: 'medium' }}>
                                                    {
                                                        projectDesc[index]?.length > 0 && projectDesc[index]?.map((projDesc: string, index: number) => {
                                                            if (projDesc !== "") {
                                                                return projDesc.charAt(0) === '-' ? (
                                                                    projDesc.split('-').filter((item: string) => item.trim() !== "").map((item: string, index: number) =>
                                                                    (
                                                                        <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '11px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                                            <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>{'\u2022'}</Text>
                                                                            <Text key={index}>{item.trim()}</Text>
                                                                        </View>
                                                                    )
                                                                    )
                                                                ) : (
                                                                    <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '11px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>{'\u2022'}</Text>
                                                                        <Text key={index}>{projDesc}</Text>
                                                                    </View>
                                                                );
                                                            }
                                                            return null;
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            }
                        </Page>
                    </Document>
                </PDFViewer>}
        </div>
    )
}

export default OptimizedResume