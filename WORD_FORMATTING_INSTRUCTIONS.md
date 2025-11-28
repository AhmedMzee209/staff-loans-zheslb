# Instructions for Converting to Word Document Format

## Converting the Markdown Report to Word

### Method 1: Using Pandoc (Recommended)

1. **Install Pandoc:**
   ```bash
   sudo apt-get install pandoc
   ```

2. **Convert to Word:**
   ```bash
   pandoc PRACTICAL_TRAINING_REPORT.md -o PRACTICAL_TRAINING_REPORT.docx --reference-doc=reference.docx
   ```

3. **Or use basic conversion:**
   ```bash
   pandoc PRACTICAL_TRAINING_REPORT.md -o PRACTICAL_TRAINING_REPORT.docx
   ```

### Method 2: Using Online Converters

1. Visit: https://www.markdowntoword.com/
2. Upload the `PRACTICAL_TRAINING_REPORT.md` file
3. Download the converted `.docx` file

### Method 3: Manual Conversion

1. Open Microsoft Word
2. Open the `.md` file directly in Word (it will convert automatically)
3. Or copy-paste the content and apply formatting manually

---

## Required Formatting in Word

After conversion, apply the following formatting according to SUZA guidelines:

### 1. Font Settings
- **Font Type:** Times New Roman
- **Body Text Size:** 12pt
- **Heading 1:** 16pt, Bold
- **Heading 2:** 14pt, Bold
- **Heading 3:** 12pt, Bold
- **Text Alignment:** Justified

### 2. Spacing
- **Line Spacing:** 1.5 lines
- **Paragraph Spacing:**
  - Before: 0pt
  - After: 6pt

### 3. Margins
- **Top:** 1 inch (2.54 cm)
- **Bottom:** 1 inch (2.54 cm)
- **Left:** 1 inch (2.54 cm)
- **Right:** 1 inch (2.54 cm)

### 4. Page Setup
- **Paper Size:** A4
- **Orientation:** Portrait
- **Page Numbering:** Bottom center, starting from Chapter 1

### 5. Headers
- Every chapter should start on a new page
- Apply `Page Break` before each chapter heading

### 6. Table of Contents
1. In Word, go to `References` → `Table of Contents`
2. Choose `Automatic Table 1` or `Automatic Table 2`
3. This will auto-generate based on heading styles

### 7. Table of Figures
1. Insert captions for all figures (right-click image → Insert Caption)
2. Go to `References` → `Insert Table of Figures`

### 8. Cover Page
Create a proper cover page with:
- SUZA logo (download from official website)
- Title centered
- Student information
- Date
- No page number on cover page

---

## Steps to Format the Document in Word

### Step 1: Apply Styles

1. **Select all body text** (Ctrl+A)
2. Set font to Times New Roman, size 12
3. Set line spacing to 1.5
4. Set alignment to Justified

### Step 2: Format Headings

1. **Chapter Headings (e.g., CHAPTER ONE):**
   - Select heading
   - Apply Heading 1 style
   - Set to 16pt, Bold, centered
   - Ensure page break before

2. **Section Headings (e.g., 1.1, 2.1):**
   - Select heading
   - Apply Heading 2 style
   - Set to 14pt, Bold, left-aligned

3. **Sub-headings (e.g., 1.1.1):**
   - Select heading
   - Apply Heading 3 style
   - Set to 12pt, Bold, left-aligned

### Step 3: Format Tables

1. Select each table
2. Apply table style (e.g., Grid Table 4 - Accent 1)
3. Ensure proper alignment
4. Add borders

### Step 4: Insert Page Breaks

1. Position cursor at the end of each chapter
2. Press `Ctrl + Enter` to insert page break
3. This ensures each chapter starts on a new page

### Step 5: Page Numbering

1. Go to `Insert` → `Page Number` → `Bottom of Page` → `Plain Number 2` (centered)
2. On the cover page, check "Different First Page" to exclude page number
3. Start numbering from page 1 at the Introduction chapter

### Step 6: Generate Table of Contents

1. Place cursor where TOC should be (after Abstract)
2. Go to `References` → `Table of Contents` → `Automatic Table 1`
3. To update: Right-click TOC → `Update Field` → `Update entire table`

### Step 7: Add SUZA Logo and Branding

1. Download SUZA logo
2. Insert at top of cover page
3. Resize appropriately (approximately 2-3 inches wide)
4. Center align

---

## Cover Page Format

```
[SUZA LOGO - Centered]

THE STATE UNIVERSITY OF ZANZIBAR
Department of Computer Science and Information Technology

[Space]

DEVELOPMENT OF STAFF LOAN MANAGEMENT SYSTEM

[Space]

A Report Submitted in Partial Fulfillment of the Requirements for
Practical Training

[Space]

Prepared by:
[Your Full Name]
Registration Number: [Your Reg. No.]
Program: Bachelor of Science in Computer Science
Year of Study: Third Year

[Space]

Supervised by:
SUZA Supervisor: [Supervisor Name]
Organization Supervisor: [Supervisor Name]

[Space]

Training Organization:
Zanzibar Higher Education Students' Loan Board (ZHESLB)

[Space]

Training Period:
[Start Date] to [End Date]

[Space]

Submission Date: January 2025
```

---

## Things to Update Before Submission

Replace the following placeholders with actual information:

1. **[Student Name]** - Your full name
2. **[Reg. No.]** - Your registration number
3. **[Supervisor Name]** - Both SUZA and organization supervisors
4. **[Start Date] to [End Date]** - Actual training dates
5. **[Year]** - When ZHESLB was established
6. **[Address]** - ZHESLB's actual address
7. **[X weeks/months]** - Actual training duration

---

## Final Checklist

Before submitting, verify:

- [ ] Cover page is properly formatted with SUZA logo
- [ ] All placeholders are replaced with actual information
- [ ] Font is Times New Roman, size 12 for body text
- [ ] Line spacing is 1.5
- [ ] Text is justified
- [ ] Margins are 1 inch on all sides
- [ ] Page numbering starts from Chapter 1
- [ ] Table of Contents is auto-generated and up-to-date
- [ ] Table of Figures is included (if applicable)
- [ ] All chapters start on new pages
- [ ] Headings are properly styled (Heading 1, 2, 3)
- [ ] Tables are properly formatted
- [ ] References are properly cited
- [ ] Document is saved as .docx format
- [ ] Spelling and grammar checked
- [ ] Total page count is appropriate (approximately 25-30 pages)

---

## Printing Guidelines

When printing for submission:

1. **Print on one side only** (unless double-sided is specified)
2. **Use white A4 paper** (80gsm or higher)
3. **Print in black and white** (unless color is required)
4. **Bind appropriately:**
   - Spiral binding or
   - Perfect binding (as specified by department)
5. **Include clear plastic cover** (if required)
6. **Print 2-3 copies** (check department requirements)

---

## Submission

1. **Save final version** with filename: `[YourName]_PT_Report_2025.docx`
2. **Create PDF version** for electronic submission: `File` → `Save As` → `PDF`
3. **Submit both printed and electronic copies** as per department requirements
4. **Keep a copy for yourself** for future reference

---

## Additional Tips

1. **Proofread carefully** - Have someone else review for errors
2. **Check figure quality** - Ensure all screenshots are clear and readable
3. **Verify all links** - If including URLs, ensure they're correct
4. **Consistency** - Maintain consistent formatting throughout
5. **Professional appearance** - The document should look polished and professional

---

## Contact for Help

If you encounter any issues with formatting:
- Contact your SUZA supervisor
- Visit the Department of Computer Science office
- Consult the SUZA library for formatting assistance

---

**Good luck with your submission!**
