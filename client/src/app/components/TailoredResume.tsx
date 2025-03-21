import React from 'react'
import { PDFViewer, Font } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link, Svg, Path, } from "@react-pdf/renderer";
import PdfViewer from './PdfViewer';

interface TailoredResumeProps {
    responseResume: any; // Replace 'any' with the appropriate type if known
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        paddingHorizontal: '20px',
        paddingVertical: '8px'
    },
    section: {
        marginBottom: '10px'
    },
    title: {
        fontSize: '13px',
        fontFamily: 'Helvetica-Bold',
        marginBottom: '5px'
    },
    text: {
        fontSize: '11px',
        marginBottom: '5px'
    },
    link: {
        color: 'blue',
        textDecoration: 'none'
    }
});


const TailoredResume: React.FC<TailoredResumeProps> = ({ responseResume }) => {
    return (
        <div className='w-full h-full'>
            <PDFViewer width="80%" height="85%">
                <Document>
                    <Page size="A4" style={{ flexDirection: "column", paddingHorizontal: '20px', paddingVertical: '8px' }}>
                        {/* Personal Information Section */}
                        <View >
                            <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                                <Text style={{ fontSize: '16px', fontWeight: 'bold', }}>{responseResume?.tailored_resume.Personal_information[0].name}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center", gap: '5px', paddingVertical: '3px', fontSize: '8px' }}>
                                <Text>{responseResume?.tailored_resume.Personal_information[0].phone}</Text>
                                <Text>|</Text>
                                <Link src={`mailto:${responseResume?.tailored_resume.Personal_information[0].email}`} style={styles.link}>
                                    <Text>Email</Text>
                                </Link>
                                <Text>|</Text>
                                <Link src={responseResume?.tailored_resume.Personal_information[0].github_link} style={styles.link}>
                                    <Text>GitHub</Text>
                                </Link>
                                <Text>|</Text>
                                <Link src={responseResume?.tailored_resume.Personal_information[0].linkedin_link} style={styles.link}>
                                    <Text>LinkedIn</Text>
                                </Link>
                                {responseResume?.tailored_resume.Personal_information[0].portfolio_link && (
                                    <>
                                        <Text>|</Text>
                                        <Text>{responseResume?.tailored_resume.Personal_information[0].portfolio_link}</Text>
                                    </>
                                )}
                            </View>
                        </View>

                        {/* Education Section */}
                        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '5px', marginLeft: '15px', marginBottom: '6px' }}>EDUCATION :</Text>
                        {responseResume?.tailored_resume.education.map((edu: any, index: number) => (
                            // <View key={index} style={styles.text}>
                            //     <Text>{edu.institution}</Text>
                            //     <Text>{edu.degree}</Text>
                            //     {edu.cgpa && <Text>CGPA: {edu.cgpa}</Text>}
                            //     <Text>{edu.duration}</Text>
                            // </View>
                            <View key={index} style={{ marginBottom: '6px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>
                                    <Text>{edu.institution}</Text>
                                    <Text>|</Text>
                                    <Text>{edu.degree}</Text>
                                    {edu.cgpa > 0 &&
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text>{'('}</Text>
                                            <Text>{edu.cgpa}</Text>
                                            <Text>CGPA</Text>
                                            <Text>{')'}</Text>
                                        </View>
                                    }
                                </View>
                                <Text style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '10px' }}>{edu.duration}</Text>
                            </View>
                        ))}

                        {/* Experience Section */}
                        <View>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginTop: '10px', marginLeft: '15px', marginBottom: '4px' }}>EXPERIENCE :</Text>
                            {responseResume?.tailored_resume.experience.map((exp: any, index: number) => (
                                <View key={index} style={{ marginLeft: '15px', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
                                    <Text>{exp.role} - {exp.company}</Text>
                                    <Text>{exp.duration}</Text>
                                    <Text>Skills: {exp.skills.join(', ')}</Text>
                                    {exp.responsibilities.map((resp: string, i: number) => (
                                        <Text key={i}>{'\u2022'} {resp}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>

                        {/* Technical Skills Section */}
                        {/* <View style={styles.section}>
                            <Text style={styles.title}>TECHNICAL SKILLS</Text>
                            <Text style={styles.text}>Languages: {responseResume?.tailored_resume.technical_skills.Languages.join(', ')}</Text>
                            <Text style={styles.text}>Web Development: {responseResume?.tailored_resume.technical_skills["Web Development"].join(', ')}</Text>
                            <Text style={styles.text}>Technology: {responseResume?.tailored_resume.technical_skills.Technology.join(', ')}</Text>
                        </View> */}

                        {/* <View style={{ marginTop: '2px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginVertical: '5px', marginLeft: '15px', marginBottom: '4px' }}>
                                TECHNICAL SKILLS :
                            </Text>
                            <View style={{ marginLeft: '15px', flexDirection: 'column', gap: '4px', }}>
                                {
                                    Object.entries(responseResume?.tailored_resume.technical_skills).map(([key, value], index) => (
                                        <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>{`${key} - `}</Text>
                                            <Text>{(value as string[]).join(', ')}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View> */}
                        <View style={{ marginTop: '2px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                            <Text  style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px', marginVertical: '5px', marginLeft: '15px', marginBottom: '4px' }}>TECHNICAL SKILLS:</Text>
                            <View >
                                {responseResume?.tailored_resume.technical_skills.map((skillCategory:any, index:number) => (
                                    <View key={index} style={{ marginLeft: '15px', flexDirection: 'column', gap: '4px', }}>
                                        {Object.entries(skillCategory).map(([key, value], idx) => (
                                            <View key={idx} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '11px' }}>{`${key}: `}</Text>
                                                <Text>{(value as string[]).join(', ')}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Projects Section */}
                        <View style={{ marginTop: '2px', marginLeft: '15px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                            <Text style={styles.title}>PROJECTS</Text>
                            {responseResume?.tailored_resume.projects.map((proj: any, index: number) => (
                                <View key={index} style={styles.text}>
                                    <Text>{proj.name}</Text>
                                    <Text>Technologies: {proj.technologies.join(', ')}</Text>
                                    <Text>{proj.description}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Links Section */}
                        <View style={{ marginTop: '2px', marginLeft: '15px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
                            <Text style={styles.title}>LINKS</Text>
                            {responseResume?.tailored_resume.links.map((link: string, index: number) => (
                                <Link key={index} src={link} style={styles.link}>
                                    <Text>{link}</Text>
                                </Link>
                            ))}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default TailoredResume