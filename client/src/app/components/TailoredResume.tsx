import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";

interface TailoredResumeProps {
    responseResume: any;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 20,
        fontFamily: 'Helvetica'
    },
    header: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
        borderBottom: '1 solid #e0e0e0',
        paddingBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    contactInfo: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        fontSize: 10,
        flexWrap: 'wrap'
    },
    section: {
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        borderBottom: '1 solid #e0e0e0',
        paddingBottom: 3
    },
    item: {
        marginBottom: 8
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3
    },
    company: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    duration: {
        fontSize: 10,
        color: '#555'
    },
    role: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 3
    },
    skills: {
        fontSize: 9,
        color: '#555',
        marginBottom: 3
    },
    bulletPoint: {
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 2
    },
    educationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    institution: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    degree: {
        fontSize: 10
    },
    grade: {
        fontSize: 10
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 2
    },
    projectTech: {
        fontSize: 9,
        color: '#555',
        marginBottom: 3
    },
    projectDesc: {
        fontSize: 10,
        marginBottom: 5
    },
    projectFeatures: {
        fontSize: 9,
        marginLeft: 10,
        marginBottom: 2
    },
    skillCategory: {
        flexDirection: 'row',
        marginBottom: 3
    },
    skillCategoryName: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 80
    },
    skillList: {
        fontSize: 10,
        flex: 1
    },
    linkItem: {
        fontSize: 10,
        color: 'blue',
        textDecoration: 'none',
        marginBottom: 2
    }
});

const TailoredResume: React.FC<TailoredResumeProps> = ({ responseResume }) => {
    const data = responseResume?.tailored_resume || {};
    const personalInfo = data.Personal_information?.[0] || {};
    const technicalSkills = data.technical_skills || {};
    
    return (
        <div className='w-full h-full'>
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.name}>{personalInfo.name || 'Your Name'}</Text>
                            <View style={styles.contactInfo}>
                                <Text>{personalInfo.phone || ''}</Text>
                                {personalInfo.phone && <Text>|</Text>}
                                <Link src={`mailto:${personalInfo.email || ''}`} style={styles.linkItem}>
                                    <Text>{personalInfo.email || ''}</Text>
                                </Link>
                                {personalInfo.email && <Text>|</Text>}
                                <Link src={personalInfo.github_link || ''} style={styles.linkItem}>
                                    <Text>GitHub</Text>
                                </Link>
                                <Text>|</Text>
                                <Link src={personalInfo.linkedin_link || ''} style={styles.linkItem}>
                                    <Text>LinkedIn</Text>
                                </Link>
                                {personalInfo.portfolio_link && (
                                    <>
                                        <Text>|</Text>
                                        <Text>{personalInfo.portfolio_link}</Text>
                                    </>
                                )}
                            </View>
                        </View>

                        {/* Education */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>EDUCATION</Text>
                            {data.education?.map((edu: any, index: number) => (
                                <View key={index} style={styles.educationItem}>
                                    <View>
                                        <Text style={styles.institution}>{edu.institution}</Text>
                                        <Text style={styles.degree}>{edu.degree}</Text>
                                    </View>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={styles.duration}>{edu.duration}</Text>
                                        {edu.cgpa && <Text style={styles.grade}>CGPA: {edu.cgpa}</Text>}
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Experience */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                            {data.experience?.map((exp: any, index: number) => (
                                <View key={index} style={styles.item}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.company}>{exp.company}</Text>
                                        <Text style={styles.duration}>{exp.duration}</Text>
                                    </View>
                                    <Text style={styles.role}>{exp.role}</Text>
                                    <Text style={styles.skills}>Skills: {exp.skills?.join(', ')}</Text>
                                    {exp.responsibilities?.map((resp: string, i: number) => (
                                        <Text key={i} style={styles.bulletPoint}>• {resp}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>

                        {/* Technical Skills */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
                            {technicalSkills && Object.entries(technicalSkills).map(([category, skills]: [string, any], index) => (
                                <View key={index} style={styles.skillCategory}>
                                    <Text style={styles.skillCategoryName}>{category}:</Text>
                                    <Text style={styles.skillList}>
                                        {Array.isArray(skills) ? skills.join(', ') : ''}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Projects */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>PROJECTS</Text>
                            {data.projects?.map((proj: any, index: number) => (
                                <View key={index} style={styles.item}>
                                    <Text style={styles.projectTitle}>{proj.name}</Text>
                                    <Text style={styles.projectTech}>Technologies: {proj.technologies?.join(', ')}</Text>
                                    <Text style={styles.projectDesc}>{proj.description}</Text>
                                    {proj.features?.map((feature: string, i: number) => (
                                        <Text key={i} style={styles.projectFeatures}>• {feature}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>

                        {/* Links */}
                        {data.links && data.links.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>LINKS</Text>
                                {Object.entries(data.links[0]).map(([name, url]: [string, any], index: number) => (
                                    <Link key={index} src={url} style={styles.linkItem}>
                                        <Text>{name}: {url}</Text>
                                    </Link>
                                ))}
                            </View>
                        )}
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

export default TailoredResume;