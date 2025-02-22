import React from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useState, useEffect } from 'react'
import { PDFViewer, Font } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link, Svg, Path, } from "@react-pdf/renderer";

const OptimizedResume = () => {

    const formData = JSON.parse(localStorage.getItem('resumeForm') || '{}');

    const experience = formData.experience
    const projects = formData.projects

    const [expDesc, setExpDesc] = useState({})
    const [projectDesc, setProjectDesc] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    async function optimizeFormData() {

        await Promise.all(experience.map(async (exp: any, ind: number) => {
            const expData = {
                texts: exp.description
            }
            const response = await axiosInstance.post('/work-experience-optimze', expData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setExpDesc(prevState => ({ ...prevState, [ind]: response.data.texts }))
        }))

        await Promise.all(projects.map(async (project: any, ind: number) => {
            const projDesc = {
                texts: project.description
            }
            const response = await axiosInstance.post('/project-desc-optimze', projDesc, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setProjectDesc(prevState => ({ ...prevState, [ind]: response.data.texts }))
        }))

        setIsLoading(false)
    }

    useEffect(() => {
        optimizeFormData()
    }, [])


    return (
        <div>
            {
                isLoading ? (<p>Loading...</p>) : (
                    <PDFViewer width="100%" height="100%">
                        <Document>
                            <Page size="A4" style={{ flexDirection: "column", paddingHorizontal: '20px', paddingVertical: '8px' }}>
                                {formData?.userInfo.name &&
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
                                                <Text>{formData?.technicalSkills?.frontend.join(", ")}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Backend -</Text>
                                                <Text>{formData?.technicalSkills?.backend.join(", ")}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Databases -</Text>
                                                <Text>{formData?.technicalSkills?.databases.join(", ")}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Devops -</Text>
                                                <Text>{formData?.technicalSkills?.devops.join(", ")}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>Testing -</Text>
                                                <Text>{formData?.technicalSkills?.testing.join(", ")}</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>
                                                    Tools -
                                                </Text>
                                                <Text>
                                                    {formData?.technicalSkills?.tools.join(", ")}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>}
                                {formData.experience &&
                                    <View >
                                        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '10px', marginLeft: '15px', marginBottom: '4px' }}>EXPERIENCE :</Text>
                                        {
                                            formData?.experience?.map((experience: any, index: number) => (
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
                                                                <>
                                                                    <Text key={index} style={{ fontSize: '10px' }}>{tech}</Text>
                                                                    <Text style={{ fontSize: '10px' }}>{index === experience.skill?.length - 1 ? "" : ","}</Text>
                                                                </>
                                                            ))
                                                        }
                                                        <Text style={{ fontSize: '11px' }}>{')'}</Text>
                                                    </View>
                                                    <View style={{ marginVertical: '7px', fontWeight: 'medium' }}>
                                                        {
                                                            Object.keys(expDesc).filter(key => parseInt(key) === index).map((description: string, index: number) =>
                                                                <View key={index} style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '11px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>{'\u2022'}</Text>
                                                                    <Text key={index}>{description}</Text>
                                                                </View>
                                                            )
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
                                {formData.projects && <View>
                                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '10px', marginLeft: '15px', marginBottom: '10px' }}>PROJECTS :</Text>
                                    {
                                        formData?.projects?.map((project: any, index: number) => (
                                            <View key={index} style={{ marginBottom: '7px' }}>
                                                <View style={{ marginBottom: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '12px', width: '50%' }}>
                                                        <Text style={{ fontWeight: 'semibold', fontSize: '12px' }}>{project?.name || ""}</Text>
                                                        <Link src={project?.codeLink || ""}>
                                                            <Text>Code</Text>
                                                        </Link>
                                                        <Link src={project?.demoLink || ""}>
                                                            <Text>Demo</Text>
                                                        </Link>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>
                                                        {/* <Text>{project?.description || ""}</Text> */}
                                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '2px', flexWrap: 'wrap' }}>
                                                            {
                                                                project?.techStack?.length > 0 && project?.techStack?.map((tech: string, index: number) => (
                                                                    <>
                                                                        <Text key={index}>{tech}</Text>
                                                                        <Text>{index === project.techStack.length - 1 ? "" : ","}</Text>
                                                                    </>
                                                                ))
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    {
                                                        Object.keys(projectDesc).filter((key)=> index === parseInt(key)).map((description: string, index: number) =>
                                                            <View style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '10px', marginVertical: '1px', paddingHorizontal: '15px' }} key={index}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: '12px' }}>{'\u2022'}</Text>
                                                                <Text key={index}>{description}</Text>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>}
                            </Page>
                        </Document>
                    </PDFViewer>
                )
            }
        </div>
    )
}

export default OptimizedResume