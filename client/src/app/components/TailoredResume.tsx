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
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* Personal Information Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>{responseResume.tailored_resume.Personal_information.name}</Text>
                            <View style={{ flexDirection: 'row', gap: '5px', fontSize: '11px' }}>
                                <Text>{responseResume.tailored_resume.Personal_information.phone}</Text>
                                <Text>|</Text>
                                <Link src={`mailto:${responseResume.tailored_resume.Personal_information.email}`} style={styles.link}>
                                    <Text>Email</Text>
                                </Link>
                                <Text>|</Text>
                                <Link src={responseResume.tailored_resume.Personal_information.github_link} style={styles.link}>
                                    <Text>GitHub</Text>
                                </Link>
                                <Text>|</Text>
                                <Link src={responseResume.tailored_resume.Personal_information.linkedin_link} style={styles.link}>
                                    <Text>LinkedIn</Text>
                                </Link>
                                {responseResume.tailored_resume.Personal_information.portfolio_link && (
                                    <>
                                        <Text>|</Text>
                                        <Text>{responseResume.tailored_resume.Personal_information.portfolio_link}</Text>
                                    </>
                                )}
                            </View>
                        </View>

                        {/* Education Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>EDUCATION</Text>
                            {responseResume.tailored_resume.education.map((edu:any, index:number) => (
                                <View key={index} style={styles.text}>
                                    <Text>{edu.institution}</Text>
                                    <Text>{edu.degree}</Text>
                                    {edu.cgpa && <Text>CGPA: {edu.cgpa}</Text>}
                                    <Text>{edu.duration}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Experience Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>EXPERIENCE</Text>
                            {responseResume.tailored_resume.experience.map((exp:any, index:number) => (
                                <View key={index} style={styles.text}>
                                    <Text>{exp.role} - {exp.company}</Text>
                                    <Text>{exp.duration}</Text>
                                    {exp.responsibilities.map((resp:string, i:number) => (
                                        <Text key={i}>{'\u2022'} {resp}</Text>
                                    ))}
                                    <Text>Skills: {exp.skills.join(', ')}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Technical Skills Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>TECHNICAL SKILLS</Text>
                            <Text style={styles.text}>Languages: {responseResume.tailored_resume.technical_skills.Languages.join(', ')}</Text>
                            <Text style={styles.text}>Web Development: {responseResume.tailored_resume.technical_skills["Web Development"].join(', ')}</Text>
                            <Text style={styles.text}>Technology: {responseResume.tailored_resume.technical_skills.Technology.join(', ')}</Text>
                        </View>

                        {/* Projects Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>PROJECTS</Text>
                            {responseResume.tailored_resume.projects.map((proj:any, index:number) => (
                                <View key={index} style={styles.text}>
                                    <Text>{proj.name}</Text>
                                    <Text>Technologies: {proj.technologies.join(', ')}</Text>
                                    <Text>{proj.description}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Links Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>LINKS</Text>
                            <Link src={responseResume.tailored_resume.links.LeetCode} style={styles.link}>
                                <Text>LeetCode</Text>
                            </Link>
                            <Link src={responseResume.tailored_resume.links.GitHub} style={styles.link}>
                                <Text>GitHub</Text>
                            </Link>
                            <Link src={responseResume.tailored_resume.links.LinkedIn} style={styles.link}>
                                <Text>LinkedIn</Text>
                            </Link>
                            <Link src={responseResume.tailored_resume.links.Blog} style={styles.link}>
                                <Text>Blog</Text>
                            </Link>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default TailoredResume