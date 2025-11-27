import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'export.xlsx') => {
    try {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert data to worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Auto-size columns (simple approximation)
        const colWidths = Object.keys(data[0] || {}).map(key => ({
            wch: Math.max(key.length, 15) // Minimum width 15
        }));
        ws['!cols'] = colWidths;

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Write file and trigger download
        XLSX.writeFile(wb, fileName);

        return true;
    } catch (error) {
        console.error("Excel Export Error:", error);
        return false;
    }
};
