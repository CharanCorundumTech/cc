import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// Generate random data for the table
const generateRandomData = () => {
  const data = [];
  const platforms = ['Facebook', 'Instagram', 'Twitter'];
  const reasons = ['Violation of hate speech', 'Fake news', 'Spam', 'Harassment', 'Graphic content', 'Misinformation'];
  const categories = ['Hate speech', 'Harassment', 'Spam', 'Fake news'];
  for (let i = 0; i < 10; i++) {
    data.push({
      post: `Post ${i + 1}`,
      flagged: Math.random() < 0.5 ? 'Yes' : 'No',
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      riskScore: Math.floor(Math.random() * 100),
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }
  return data;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginVertical: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  signature: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

// Create PDF component
const MyDocument = () => {
  const data = generateRandomData();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ marginBottom: 10 }}>Social Media Flagging Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text>Post</Text></View>
              <View style={styles.tableCol}><Text>Flagged</Text></View>
              <View style={styles.tableCol}><Text>Platform</Text></View>
              <View style={styles.tableCol}><Text>Risk Score</Text></View>
              <View style={styles.tableCol}><Text>Reason</Text></View>
              <View style={styles.tableCol}><Text>Category</Text></View>
            </View>
            {data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}><Text>{row.post}</Text></View>
                <View style={styles.tableCol}><Text>{row.flagged}</Text></View>
                <View style={styles.tableCol}><Text>{row.platform}</Text></View>
                <View style={styles.tableCol}><Text>{row.riskScore}</Text></View>
                <View style={styles.tableCol}><Text>{row.reason}</Text></View>
                <View style={styles.tableCol}><Text>{row.category}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.signature}>
          <Text>Approval Manager Signature:</Text>
          {/* You can add space for the signature here */}
        </View>
      </Page>
    </Document>
  );
};

// Render PDF with download link
const PDF = () => (
  <>
    <PDFDownloadLink document={<MyDocument />} fileName="social_media_flagging_report.pdf">
    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
  </PDFDownloadLink>
  </>
);

export default PDF;
