"use client";
import React from "react";
import { PDFViewer, Font } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";

Font.register({
    family: 'Calibri',
    fonts: [
      { src: '/font/calibri-regular.ttf' }, // Regular font
    ],
  });

// Define styles
const styles = StyleSheet.create({
    page: { flexDirection: "column", padding: 20 },
    section: { marginBottom: 10 },
    header: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
    text: { fontSize: 12 },
});

// PDF Document Component
const PdfViewer = ({ formData }: { formData: any }) => (
    
    <PDFViewer width="100%" height="100%">
        <Document>
            <Page size="A4" style={{flexDirection: "column", padding: 20,fontFamily:'Calibri', fontWeight:'bold'}}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                    <Text style={{ fontSize:'30px'}}>{formData.userInfo.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, }}>
                    <Link src={formData?.userInfo?.email || ""}>
                        <Text>Email </Text>
                    </Link>
                    <Text>|</Text>
                    <Text>{formData?.userInfo?.phone || ""}</Text>
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
                <View style={{ marginTop: '5px', paddingBottom: '5px', paddingTop: '5px', flexDirection: 'column', gap: '5px' }}>
                    <Text>
                        Technical Skills
                    </Text>
                    <Text>
                        Frontend - {formData?.technicalSkills?.frontend.join(", ")}
                    </Text>
                    <Text>
                        Backend  - {formData?.technicalSkills?.backend.join(", ")}
                    </Text>
                    <Text>
                        Databases - {formData?.technicalSkills?.databases.join(", ")}
                    </Text>
                    <Text>
                        Testing - {formData?.technicalSkills?.testing.join(", ")}
                    </Text>
                    <Text>
                        Tools - {formData?.technicalSkills?.tools.join(", ")}
                    </Text>
                </View>
                <View>
                    {
                        formData?.education?.map((education: any, index: number) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.header}>Education</Text>
                                <Text>{education?.school || ""}</Text>
                                <Text>{education?.degree || ""}</Text>
                                <Text>{education?.graduation || ""}</Text>
                            </View>
                        ))
                    }
                </View>
                <View>
                    <Text>Experience</Text>
                    {
                        formData?.experience?.map((experience: any, index: number) => (
                            <View key={index} style={styles.section}>
                                <Text>{experience?.company || ""}</Text>
                                <Text>{experience?.role || ""}</Text>
                                {
                                    experience.skill.length > 0 && experience?.skill.map((skill: string, index: number) => (
                                        <Text key={index}>{skill}</Text>
                                    ))
                                }
                                <Text>{experience?.start ? new Date(experience.start).toLocaleDateString() : ""}</Text>
                                <Text>{experience?.end ? new Date(experience.end).toLocaleDateString() : ""}</Text>
                                {
                                    experience?.description.map((description: string, index: number) => 
                                        <Text key={index}>{description}</Text>
                                    )
                                }
                            </View>
                        ))
                    }
                </View>
                <View>
                    <Text>Projects</Text>
                    {
                        formData?.projects?.map((project: any, index: number) => (
                            <View key={index} style={styles.section}>
                                <Text>{project?.name || ""}</Text>
                                <Text>{project?.description || ""}</Text>
                                <Link src={project?.codeLink || ""}>
                                    <Text>Code</Text>
                                </Link>
                                <Link src={project?.demoLink || ""}>
                                    <Text>Demo</Text>
                                </Link>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                    {
                                        project.techStack.length > 0 && project?.techStack?.map((tech: string, index: number) => (
                                            <Text key={index}>{tech}</Text>
                                        ))
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View>
                    {
                        formData?.education?.map((education: any, index: number) => (
                            <View key={index} style={styles.section}>
                                <Text>{education?.college || ""}</Text>
                                <Text>{education?.degree || ""}</Text>
                                <Text>{education?.start || ""}</Text>
                                <Text>{education?.end || ""}</Text>
                                { education?.grade > 0 &&
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                        <Text>{education?.grade || ""}</Text>
                                        <Text>{education?.gradeType || ""}</Text>
                                    </View>
                                }
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

export default PdfViewer;
