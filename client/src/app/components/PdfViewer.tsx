"use client";
import React from "react";
import { PDFViewer, Font } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";
import { GoDotFill } from "react-icons/go";

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
    textHeader: { fontSize: 16, fontWeight: "bold" },
    bulletPoint: { width: 5, height: 5, marginRight: 5 },
    bulletText: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 }
});

// PDF Document Component
const PdfViewer = ({ formData }: { formData: any }) => (

    <PDFViewer width="100%" height="100%" >
        <Document>
            <Page size="A4" style={{ flexDirection: "column", padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
                    <Text style={{ fontSize: '30px', fontWeight: 'bold', }}>{formData.userInfo.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: '5px', paddingVertical: '10px' }}>
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
                <View style={{ marginTop: '5px', paddingBottom: '5px', paddingTop: '5px', flexDirection: 'column', gap: '5px', fontSize: '13px' }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '20px', marginVertical: '5px', marginLeft: '15px' }}>
                        TECHNICAL SKILLS :
                    </Text>
                    <View style={{ marginLeft: '35px', flexDirection: 'column', gap: '6px', }}>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>Frontend -</Text>
                            <Text>{formData?.technicalSkills?.frontend.join(", ")}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>Backend -</Text>
                            <Text>{formData?.technicalSkills?.backend.join(", ")}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>Databases -</Text>
                            <Text>{formData?.technicalSkills?.databases.join(", ")}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>Devops -</Text>
                            <Text>{formData?.technicalSkills?.devops.join(", ")}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>Testing -</Text>
                            <Text>{formData?.technicalSkills?.testing.join(", ")}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '13px' }}>
                                Tools -
                            </Text>
                            <Text>
                                {formData?.technicalSkills?.tools.join(", ")}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '20px', marginTop: '20px', marginLeft: '15px' }}>EXPERIENCE :</Text>
                    {
                        formData?.experience?.map((experience: any, index: number) => (
                            <View key={index} style={{ marginBottom: '10px', marginLeft: '15px' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '13px', marginTop: '15px' }}>
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
                                <View style={{ marginVertical: '15px', fontWeight: 'medium' }}>
                                    {
                                        experience?.description.map((description: string, index: number) =>
                                            <View style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '15px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: '20px' }}>{'\u2022'}</Text>
                                                <Text key={index}>{description}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                                {
                                    experience.skill.length > 0 && experience?.skill.map((skill: string, index: number) => (
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }} key={index}>
                                            <Text key={index}>{skill}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
                <View>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '20px', marginTop: '20px', marginLeft: '15px', marginBottom: '10px' }}>EDUCATION :</Text>
                    {
                        formData?.education?.map((education: any, index: number) => (
                            <View key={index} style={{ marginBottom: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                </View>
                <View>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '20px', marginTop: '20px', marginLeft: '15px', marginBottom: '10px' }}>PROJECTS :</Text>
                    {
                        formData?.projects?.map((project: any, index: number) => (
                            <View key={index} style={styles.section}>
                                <View style={{ marginBottom: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', fontSize: '13px',width:'50%' }}>
                                        <Text>{project?.name || ""}</Text>
                                        <Link src={project?.codeLink || ""}>
                                            <Text>Code</Text>
                                        </Link>
                                        <Link src={project?.demoLink || ""}>
                                            <Text>Demo</Text>
                                        </Link>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px',fontSize: '13px',width:'50%' }}>
                                        {/* <Text>{project?.description || ""}</Text> */}
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', flexWrap: 'wrap' }}>
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
                                        project?.description.map((description: string, index: number) =>
                                            <View style={{ flexDirection: 'row', alignItems: "flex-start", gap: '10px', fontSize: '15px', marginVertical: '1px', paddingHorizontal: '15px' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: '20px' }}>{'\u2022'}</Text>
                                                <Text key={index}>{description}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

export default PdfViewer;
