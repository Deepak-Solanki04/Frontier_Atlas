import csv
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 15)
        self.cell(0, 10, 'GraphOne - UI Data Points Mapping', 0, 1, 'C')
        self.set_font('helvetica', 'I', 10)
        self.cell(0, 10, 'Based on PapersWithCode & Hugging Face Architecture', 0, 1, 'C')
        self.ln(5)

def create_pdf(csv_file_path, pdf_file_path):
    pdf = PDF(orientation='L', unit='mm', format='A4')
    pdf.add_page()
    pdf.set_font("helvetica", size=8)

    with open(csv_file_path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        data = list(reader)

    # Column widths
    col_widths = [25, 30, 40, 30, 110, 35]
    line_height = pdf.font_size * 2.5

    # Header
    pdf.set_font("helvetica", 'B', size=9)
    pdf.set_fill_color(200, 220, 255)
    for i, header in enumerate(data[0]):
        if i < len(col_widths):
            pdf.cell(col_widths[i], line_height, header, border=1, fill=True)
    pdf.ln(line_height)

    # Data rows
    pdf.set_font("helvetica", size=8)
    for row in data[1:]:
        max_height = line_height
        x_start = pdf.get_x()
        y_start = pdf.get_y()
        
        for i, item in enumerate(row):
            if i >= len(col_widths): break
            pdf.set_xy(x_start, y_start)
            if i == 4:
                 pdf.multi_cell(col_widths[i], line_height/2, item, border=1)
            else:
                 pdf.cell(col_widths[i], line_height, item[:40], border=1)
            x_start += col_widths[i]
            
        pdf.ln(line_height)

    pdf.output(pdf_file_path)

if __name__ == '__main__':
    csv_path = r"C:\Users\Deepak Solanki\.gemini\antigravity\brain\6a01de37-18dd-42be-9edd-e801e1ce603b\GraphOne_Data_Points.csv"
    pdf_path = r"C:\Users\Deepak Solanki\.gemini\antigravity\brain\6a01de37-18dd-42be-9edd-e801e1ce603b\GraphOne_Data_Points.pdf"
    create_pdf(csv_path, pdf_path)
