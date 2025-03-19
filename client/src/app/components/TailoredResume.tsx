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

const responseResume = {
    "tailored_resume": {
        "Personal_information": [
            {
                "name": "Ashish Pratap Singh",
                "email": "xxx@gmail.com",
                "phone": "XXX-XXX-XXX",
                "github_link": "github.com/ashishps1",
                "linkedin_link": "linkedin.com/in/ashishps1",
                "twitter_link": null,
                "portfolio_link": null
            }
        ],
        "education": [
            {
                "institution": "BITS Hyderabad",
                "duration": "Aug 2013 - Jun 2017",
                "degree": "B.E. in Computer Science and Engineering",
                "CGPA": "7.96/10",
                "relevant_coursework": [
                    "Object Oriented Programming",
                    "Databases",
                    "Data Structures and Algorithms",
                    "Operating Systems",
                    "Computer Networks",
                    "Machine Learning",
                    "Data Mining",
                    "Information Retrieval",
                    "Image Processing"
                ]
            }
        ],
        "experience": [
            {
                "company": "Adobe, Bangalore",
                "role": "Computer Scientist",
                "duration": "Mar 2021 - Present",
                "responsibilities": [
                    "Spearheaded the migration of data processing jobs to AWS EMR, optimizing performance and reducing costs, aligning with best practices for scalable web applications.",
                    "Implemented a system to automate the identification of unused resources, leading to a significant reduction in operational expenses.",
                    "Collaborated with cross-functional teams to integrate front-end components with back-end services, ensuring seamless data flow and user experience."
                ],
                "skills": [
                    "AWS",
                    "EC2",
                    "S3",
                    "EMR",
                    "Hive",
                    "Presto",
                    "Kubernetes",
                    "Docker"
                ]
            },
            {
                "company": "Amazon, Bangalore",
                "role": "Software Development Engineer",
                "duration": "Sept 2019 - Mar 2021",
                "responsibilities": [
                    "Developed scalable ML workflows on AWS, enhancing automated scalability and improving system logging and troubleshooting capabilities.",
                    "Engineered a batch workflow plugin that significantly reduced manual labeling costs by leveraging auto-labeling techniques, demonstrating strong problem-solving skills and attention to detail."
                ],
                "skills": [
                    "Java",
                    "Python",
                    "TypeScript",
                    "AWS Step Functions",
                    "AWS Batch",
                    "Lambda",
                    "S3",
                    "DynamoDB",
                    "EC2"
                ]
            },
            {
                "company": "Morgan Stanley, Bangalore",
                "role": "Technology Associate",
                "duration": "Aug 2017 - Aug 2019",
                "responsibilities": [
                    "Designed a visualization tool for infrastructure alerts, reducing Mean Time to Resolution by modeling dependencies and applying graph algorithms.",
                    "Developed predictive models to assess deployment risks, enhancing system reliability and performance."
                ],
                "skills": [
                    "Python",
                    "ReactJS",
                    "Redux",
                    "Angular",
                    "Kafka",
                    "scikit-learn"
                ]
            }
        ],
        "technical_skills": {
            "Languages": [
                "C/C++",
                "Java",
                "Python",
                "JavaScript",
                "TypeScript",
                "SQL"
            ],
            "Technologies & Tools": [
                "ReactJS",
                "HTML5",
                "CSS3",
                "AWS",
                "Kubernetes",
                "Docker",
                "Spring",
                "Angular"
            ]
        },
        "projects": [
            {
                "name": "Word Lookup Dictionary",
                "year": 2015,
                "description": "Developed an intuitive desktop application for online English word lookup, utilizing a Trie data structure for efficient search and incorporating spelling correction and auto-suggestion features.",
                "technologies": [
                    "Python",
                    "BeautifulSoup"
                ]
            },
            {
                "name": "Alternative-Routes in Road Networks",
                "year": 2016,
                "description": "Implemented Dijkstra’s algorithm for optimal route finding in road networks with dynamic traffic conditions, showcasing proficiency in algorithmic problem-solving and real-time data processing.",
                "technologies": [
                    "C++",
                    "OpenGL"
                ]
            },
            {
                "name": "Clustering SSH Attacks",
                "year": 2016,
                "description": "Utilized KMeans clustering to categorize SSH session attacks, demonstrating expertise in data analysis and clustering techniques.",
                "technologies": [
                    "Java",
                    "WEKA"
                ]
            }
        ],
        "links": [
            "github.com/ashishps1",
            "linkedin.com/in/ashishps1"
        ],
        "achievements": [
            "Mentor at Scaler Academy: Guided students and professionals in enhancing problem-solving, coding, and system design skills.",
            "Data Engineering Nanodegree on Udacity",
            "Machine Learning and Deep Learning Specialization on Coursera"
        ]
    }
}

const TailoredResume = () => {
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

                        <View style={{ marginTop: '2px', paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
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
                        </View>

                        {/* Projects Section */}
                        <View style={{ marginTop: '2px',  marginLeft: '15px' , paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
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
                        <View style={{ marginTop: '2px',  marginLeft: '15px' , paddingBottom: '5px', paddingTop: '2px', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
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