import { KursTam } from '@/types/kurs';

interface Student {
    ad: string;
    soyad: string;
    ataAdi: string;
    dogumTarihi: string;
    fin: string; // Kimlik No
}

export class PrintManager {

    static generateCTHRegistration(student: Student, course: KursTam): string {
        if (course.tip !== 'CTH' || !course.cth) {
            throw new Error('Bu kurs CTH kursu deyil.');
        }

        return `
      <html>
      <head><title>CTH Registration Form</title></head>
      <body style="font-family: Arial, sans-serif; padding: 40px;">
        <h1 style="text-align: center;">CTH Student Registration Form</h1>
        <hr/>
        <h3>Centre Details</h3>
        <p><strong>Centre Name:</strong> TQTA (Tourism and Hospitality Training Center)</p>
        <p><strong>Qualification:</strong> ${course.ad} (${course.cth.level})</p>
        
        <h3>Student Details</h3>
        <p><strong>First Name:</strong> ${student.ad}</p>
        <p><strong>Last Name:</strong> ${student.soyad}</p>
        <p><strong>Date of Birth:</strong> ${student.dogumTarihi}</p>
        
        <h3>Declaration</h3>
        <p>I confirm that the information provided is correct and I agree to the terms and conditions of CTH.</p>
        <br/><br/>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p>_______________________</p>
            <p>Student Signature</p>
          </div>
          <div>
            <p>_______________________</p>
            <p>Date</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    static generateDMATabel(student: Student, course: KursTam, month: string): string {
        if (course.tip !== 'DMA' || !course.dma) {
            throw new Error('Bu kurs DMA kursu deyil.');
        }

        const hoursPerDay = course.dma.tabelTipi === 'Standart' ? 8 : 4;

        return `
      <html>
      <head><title>DMA Davamiyyət Cədvəli (Tabel)</title></head>
      <body style="font-family: 'Times New Roman', serif; padding: 40px;">
        <h2 style="text-align: center;">Davamiyyət Cədvəli (Tabel)</h2>
        <p style="text-align: center;"><strong>Ay:</strong> ${month}</p>
        
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <th style="padding: 5px;">S.A.A</th>
            <th style="padding: 5px;">İxtisas</th>
            <th style="padding: 5px;">Günlük Saat</th>
            ${Array.from({ length: 31 }, (_, i) => `<th style="padding: 2px; font-size: 10px;">${i + 1}</th>`).join('')}
            <th style="padding: 5px;">Cəmi</th>
          </tr>
          <tr>
            <td style="padding: 5px;">${student.soyad} ${student.ad} ${student.ataAdi}</td>
            <td style="padding: 5px;">${course.ad}</td>
            <td style="padding: 5px; text-align: center;">${hoursPerDay}</td>
            ${Array.from({ length: 31 }, () => `<td style="padding: 2px;">+</td>`).join('')}
            <td style="padding: 5px; text-align: center;">${hoursPerDay * 22}</td>
          </tr>
        </table>

        <div style="margin-top: 50px;">
          <p><strong>Təlimçi:</strong> _______________________</p>
          <p><strong>Direktor:</strong> _______________________</p>
        </div>
      </body>
      </html>
    `;
    }
}
