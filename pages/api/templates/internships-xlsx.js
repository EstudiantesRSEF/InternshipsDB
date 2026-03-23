import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  try {
    const headers = [
      'title',
      'description',
      'educationLevel',
      'modality',
      'discipline',
      'location',
      'hasAllowance',
      'allowanceAmount',
      'language',
      'duration',
      'season',
      'startDate',
      'endDate',
      'url',
      'promotionalImage',
    ];

    const example = {
      title: 'Sample Internship',
      description: 'Short description of the internship',
      educationLevel: 'Undergrad',
      modality: 'Remote',
      discipline: 'Physics',
      location: 'Madrid',
      hasAllowance: 'Monthly allowance',
      allowanceAmount: 800,
      language: 'EN',
      duration: '3 months',
      season: 'Summer',
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      url: 'https://example.com',
      promotionalImage: 'https://example.com/image.jpg',
    };

    // Create worksheet from array of arrays: headers + example row
    const aoa = [headers, headers.map((h) => example[h] ?? '')];
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // Autosize basic column widths (optional)
    ws['!cols'] = headers.map((h) => ({ wch: Math.max(12, h.length + 2) }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Internships');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="InternshipsTemplate.xlsx"'
    );

    return res.status(200).send(buffer);
  } catch (e) {
    console.error('Template generation error:', e);
    return res
      .status(500)
      .json({ message: 'Error generating the XLSX template' });
  }
}
