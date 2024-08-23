// ResumePDF.tsx
'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { format, parseISO } from 'date-fns';

// Custom font example (Optional)
Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5Q.ttf',
});

// Styles for PDF
const styles = StyleSheet.create({
  section: {
    textAlign: 'center', // Center all text within the section
    marginBottom: 20,
  },
  heading: {
    fontSize: 24, // Heading font size
    fontWeight: 'bold', // Bold text for the name
  },
  label: {
    fontSize: 10, // Small font size for the label
    marginVertical: 4, // Add vertical spacing
  },
  contactInfo: {
    fontSize: 12, // Medium font size for email and phone
    marginTop: 8, // Add margin at the top
  },
  contactText: {
    marginHorizontal: 4, // Add some space around the separator
  },

  heading2: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Add some space below the heading
  },
  line: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Make sure the line spans the full width
  },

  page: {
    padding: 30,
  },
  text: {
    fontSize: 12,
    color: '#666', // Lighter color for the summary text (dark gray)
    marginTop: 8,
  },
  sectionEdu: {
    marginBottom: 20, // Spacing below the section
  },
  headingEdu: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  educationItem: {
    flexDirection: 'row', // Align institution and other details in a row
    justifyContent: 'space-between', // Space out elements to extreme left and right
    marginBottom: 4, // Space between education items
  },
  institution: {
    fontSize: 14, // Font size for the institution name
    fontWeight: 'bold', // Bold text for the institution name
    width: '50%', // Takes up half of the row's width
  },
  detailsEdu: {
    fontSize: 12, // Smaller font size for other details
    textAlign: 'right', // Align text to the right
    width: '50%', // Takes up half of the row's width
  },
  score: {
    marginTop: 4, // Space between the institution and the score
  },
  dates: {
    marginTop: 2, // Space between the details and the dates
  },
  sectionExp: {
    marginBottom: 20, // Spacing below the section
  },
  headingExp: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  lineExp: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Ensure the line spans the full width
  },
  experienceItemExp: {
    flexDirection: 'row', // Align name and position in a row
    justifyContent: 'space-between', // Space out elements to extreme left and right
    marginBottom: 4, // Space between experience items
  },
  nameExp: {
    fontSize: 14, // Large font size for the experience name
    fontWeight: 'bold', // Bold text for the experience name
    width: '50%', // Takes up half of the row's width
  },
  positionExp: {
    fontSize: 12, // Medium font size for the position
    textAlign: 'right', // Align text to the right
    width: '50%', // Takes up half of the row's width
  },
  datesExp: {
    fontSize: 12, // Medium font size for dates
    textAlign: 'right', // Align text to the right
    marginTop: 2, // Space between the position and the dates
  },
  sectionPro: {
    marginBottom: 20, // Spacing below the section
  },
  headingPro: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  linePro: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Ensure the line spans the full width
  },
  projectItemPro: {
    flexDirection: 'row', // Align project name and details in a row
    justifyContent: 'space-between', // Space out elements to extreme left and right
    marginBottom: 4, // Space between project items
  },
  projectNamePro: {
    fontSize: 14, // Large font size for the project name
    fontWeight: 'bold', // Bold text for the project name
  },
  projectLinksPro: {
    flexDirection: 'row', // Align links next to the project name
    marginLeft: 8, // Small gap between project name and links
  },
  linkIconPro: {
    fontSize: 12, // Font size for the link icon
    marginHorizontal: 4, // Space between the two icons
  },
  descriptionPro: {
    fontSize: 12, // Font size for the project description
    marginTop: 4, // Space between the name and description
  },
  technologiesPro: {
    fontSize: 12, // Font size for the technologies
    textAlign: 'right', // Align text to the right
  },
  datesPro: {
    fontSize: 12, // Font size for dates
    textAlign: 'right', // Align text to the right
    marginTop: 2, // Space between the technologies and the dates
  },
  sectionSki: {
    marginBottom: 20, // Spacing below the section
  },
  headingSki: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  lineSki: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Ensure the line spans the full width
  },
  skillItemSki: {
    flexDirection: 'row', // Align skill name and tech stack in a row
    marginBottom: 4, // Space between skill items
  },
  skillNameSki: {
    fontWeight: 'bold', // Bold text for the skill name
    marginRight: 8, // Space between skill name and tech stack
  },
  techStackSki: {
    fontSize: 12, // Font size for the tech stack
  },
  sectionLang: {
    marginBottom: 20, // Spacing below the section
  },
  headingLang: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  lineLang: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Ensure the line spans the full width
  },
  languageItemLang: {
    flexDirection: 'row', // Align language and fluency in a row
    marginBottom: 4, // Space between language items
  },
  languageTextLang: {
    fontWeight: 'bold', // Bold text for the language name
    fontSize: 12, // Font size for the text
    marginRight: 8, // Space between language and fluency
  },
  fluencyTextLang: {
    fontSize: 12, // Font size for the fluency text
  },
  sectionCer: {
    marginBottom: 20, // Spacing below the section
  },
  headingCer: {
    fontSize: 24, // Large font size for the heading
    fontWeight: 'bold', // Bold text for the heading
    marginBottom: 8, // Space below the heading
  },
  lineCer: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#000', // Color of the line (black)
    marginVertical: 8, // Vertical margin around the line
    width: '100%', // Ensure the line spans the full width
  },
  certificateItemCer: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between the left and right content
    alignItems: 'center', // Vertically center the content
    marginBottom: 4, // Space between certificate items
  },
  certNameWrapperCer: {
    flexDirection: 'row', // Align certificate name and icon in a row
    alignItems: 'center', // Vertically center the content
  },
  certNameCer: {
    fontWeight: 'bold', // Bold text for the certificate name
    fontSize: 12, // Font size for the text
    marginRight: 8, // Space between certificate name and the link icon
  },
  certIssuerDateCer: {
    flexDirection: 'row', // Align issuer and date in a row
    alignItems: 'center', // Vertically center the content
  },
  certIssuerCer: {
    fontSize: 12, // Font size for the issuer text
    marginRight: 8, // Space between issuer and date
  },
  certDateCer: {
    fontSize: 12, // Font size for the date text
  },
  linkIconCer: {
    fontSize: 12, // Size of the link icon
    color: '#1a73e8', // Color of the link icon (blue)
  },
});

function convertISOToFormattedDate(isoString: any) {
  if (!isoString) return '';

  try {
    const date = parseISO(isoString);
    return format(date, 'dd-MM-yyyy');
  } catch (error) {
    console.error('Error parsing ISO string:', error);
    return '';
  }
}

// Define the ResumePDF component
const ResumePDF = ({ resumeData }: { resumeData: any }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Basis details */}
        <View style={styles.section}>
          <Text style={styles.heading}>{resumeData?.basics?.name || 'Name'}</Text>
          <Text style={styles.label}>{resumeData?.basics?.label || 'Label'}</Text>
          <View style={styles.contactInfo}>
            <Text>
              {resumeData?.basics?.email || 'email@gmail.com'}
              <Text style={styles.contactText}> | </Text>
              {resumeData?.basics?.phone || '123-456-7890'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading2}>Summary</Text>
          <View style={styles.line} /> {/* Horizontal line */}
          <Text style={styles.text}>
            {resumeData?.basics?.summary || 'A passionate software engineer...'}
          </Text>
        </View>

        {/* EDUCATION */}

        <View style={styles.sectionEdu}>
            <Text style={styles.headingEdu}>Education</Text>
            {resumeData?.education?.map((edu: any, index: number) => (
              <View key={index}>
                <View style={styles.educationItem}>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.detailsEdu}>
                    {edu.area} | {edu.studyType}
                  </Text>
                </View>
                <View style={styles.educationItem}>
                  <Text style={[styles.detailsEdu, styles.score]}>
                    {edu.score} {edu.scoreType}
                  </Text>
                </View>
                <View style={styles.educationItem}>
                  <Text style={[styles.detailsEdu, styles.dates]}>
                    {convertISOToFormattedDate(edu.startDate)} - {convertISOToFormattedDate(edu.endDate)}
                  </Text>
                </View>
              </View>
            ))}
         </View>

            {/* EXPERIENCE */}

            <View style={styles.sectionExp}>
              <Text style={styles.headingExp}>Experience</Text>
              <View style={styles.lineExp} /> {/* Horizontal line */}
              {resumeData?.work?.map((exp: any, index: number) => (
                <View key={index}>
                  <View style={styles.experienceItemExp}>
                    <Text style={styles.nameExp}>{exp.name}</Text>
                    <Text style={styles.positionExp}>{exp.position}</Text>
                  </View>
                  <Text style={styles.datesExp}>
                    {convertISOToFormattedDate(exp.startDate)} - {convertISOToFormattedDate(exp.endDate)}
                  </Text>
                </View>
              ))}
            </View>


        {/* PROJECTS */}

        <View style={styles.sectionPro}>
              <Text style={styles.headingPro}>Projects</Text>
              <View style={styles.linePro} /> {/* Horizontal line */}
              {resumeData?.projects?.map((project: any, index: number) => (
                <View key={index}>
                  <View style={styles.projectItemPro}>
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.projectNamePro}>{project.name}</Text>
                        <View style={styles.projectLinksPro}>
                          {project.deployedUrl && (
                            <Link src={project.deployedUrl} style={styles.linkIconPro}>
                              🔗
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link src={project.githubUrl} style={styles.linkIconPro}>
                              🐙
                            </Link>
                          )}
                        </View>
                      </View>
                      <Text style={styles.descriptionPro}>{project.description}</Text>
                    </View>
                    <View>
                      <Text style={styles.technologiesPro}>{project.technologies}</Text>
                      <Text style={styles.datesPro}>
                        {convertISOToFormattedDate(project.startDate)} - {convertISOToFormattedDate(project.endDate)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
         </View>

        {/* SKILLS */}

        <View style={styles.sectionSki}>
          <Text style={styles.headingSki}>Skills</Text>
          <View style={styles.lineSki} /> {/* Horizontal line */}
          {resumeData?.skills?.map((skill: any, index: number) => (
            <View key={index} style={styles.skillItemSki}>
              <Text style={styles.skillNameSki}>{skill.name}</Text>
              <Text style={styles.techStackSki}>{skill.techStack}</Text>
            </View>
          ))}
        </View>

          {/* LANGUAGES */}

          <View style={styles.sectionLang}>
              <Text style={styles.headingLang}>Languages</Text>
              <View style={styles.lineLang} /> {/* Horizontal line */}
              {resumeData?.languages?.map((lang: any, index: number) => (
                <View key={index} style={styles.languageItemLang}>
                  <Text style={styles.languageTextLang}>{lang.language}</Text>
                  <Text style={styles.fluencyTextLang}>({lang.fluency})</Text>
                </View>
              ))}
          </View>


         {/* CERTIFICATIONS */}

         <View style={styles.sectionCer}>
            <Text style={styles.headingCer}>Certifications</Text>
            <View style={styles.lineCer} /> {/* Horizontal line */}
            {resumeData?.certificates?.map((cert: any, index: number) => (
              <View key={index} style={styles.certificateItemCer}>
                <View style={styles.certNameWrapperCer}>
                  <Text style={styles.certNameCer}>{cert.name}</Text>
                  {cert.url && (
                    <Link src={cert.url} style={styles.linkIconCer}>
                      🔗
                    </Link>
                  )}
                </View>
                <View style={styles.certIssuerDateCer}>
                  <Text style={styles.certIssuerCer}>{cert.issuer}</Text>
                  <Text style={styles.certDateCer}>({cert.date})</Text>
                </View>
              </View>
            ))}
         </View>

        


        {/* Add other sections such as Awards, Publications, etc. */}
      </Page>
    </Document>
  );
};

export default ResumePDF;
