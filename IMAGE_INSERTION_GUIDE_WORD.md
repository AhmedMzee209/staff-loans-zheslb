# Guide: Inserting Images into Word Document

This guide provides step-by-step instructions for inserting all screenshots and diagrams into your Microsoft Word practical training report.

## Before You Start

### Prerequisites
1. **Convert report to Word:**
   ```bash
   pandoc PRACTICAL_TRAINING_REPORT.md -o PRACTICAL_TRAINING_REPORT.docx
   ```
   Or use an online converter like markdowntoword.com

2. **Organize your images:**
   ```
   zheslb_loans/
   ├── report_images/
   │   ├── chapter2/
   │   │   └── fig2-1_organizational_structure.png
   │   ├── chapter3/
   │   │   ├── fig3-1_system_architecture.png
   │   │   ├── fig3-2_loan_workflow.png
   │   │   ├── fig3-3_database_erd.png
   │   │   └── fig3-4_auth_flow.png
   │   └── appendix/
   │       ├── figA-1_login_page.png
   │       ├── figA-2_staff_profile_modal.png
   │       ├── ... (all appendix images)
   ```

3. **Ensure images are ready:**
   - All images captured or created
   - PNG format
   - Properly named according to SCREENSHOT_CAPTURE_GUIDE.md
   - Compressed if needed (using TinyPNG.com)

---

## Step-by-Step Image Insertion

### Method 1: Manual Insertion (Recommended for Control)

#### For Each Image:

1. **Locate the placeholder in Word document:**
   - Search for `[INSERT IMAGE HERE]` using Ctrl+F
   - You'll find placeholders with figure numbers and descriptions

2. **Position cursor:**
   - Click on the line that says `[INSERT IMAGE HERE]`
   - This is where your image will go

3. **Insert the image:**
   - Go to `Insert` tab → `Pictures` → `This Device...`
   - Navigate to your `report_images` folder
   - Select the appropriate image (e.g., `figA-1_login_page.png`)
   - Click `Insert`

4. **Resize the image:**
   - Click on the image to select it
   - Right-click → `Size and Position...`
   - OR: Right-click → `Wrap Text` → `Top and Bottom`
   - Set width:
     - Full width images: **6 inches** (leave height to auto-adjust)
     - Modal images: **4-5 inches**
     - Small diagrams: **5 inches**
   - Ensure "Lock aspect ratio" is checked

5. **Center the image:**
   - With image selected, go to `Home` tab
   - Click `Center` align button
   - Or press Ctrl+E

6. **Add proper caption:**
   - Right-click the image → `Insert Caption...`
   - Label: Select "Figure"
   - Position: "Below selected item"
   - Caption should auto-number (e.g., "Figure A.1")
   - After the number, add description
   - Example: `Figure A.1: Login Page Interface`
   - Click OK

7. **Format caption:**
   - Select the caption text
   - Set font: Times New Roman, 10pt
   - Set alignment: Center
   - Make figure number bold (e.g., **Figure A.1:** Login Page Interface)

8. **Delete placeholder text:**
   - Delete the line `[INSERT IMAGE HERE]`
   - You can keep or remove the "Image specifications" section (those are reference notes)

9. **Add spacing:**
   - Ensure there's proper spacing before and after image
   - One blank line before image
   - One blank line after caption
   - Then the description paragraph (in italics)

---

### Method 2: Using Styles (For Consistency)

#### Create Figure Style Once:

1. **Insert first image manually** as described above

2. **Create a new style:**
   - Right-click in Styles pane → `New Style`
   - Name: "Figure Image"
   - Style type: Paragraph
   - Based on: Normal
   - Formatting:
     - Alignment: Center
     - Spacing: 6pt before, 6pt after
   - Click OK

3. **Create caption style:**
   - Right-click in Styles pane → `New Style`
   - Name: "Figure Caption"
   - Formatting:
     - Font: Times New Roman, 10pt, Bold for number
     - Alignment: Center
     - Spacing: 6pt before, 12pt after

4. **Apply styles to subsequent images:**
   - Select image → Apply "Figure Image" style
   - Select caption → Apply "Figure Caption" style

---

## Image-by-Image Checklist

### Chapter 2 Images

#### ✓ Figure 2.1: ZHESLB Organizational Structure
- [ ] Create organizational chart (PowerPoint/Draw.io)
- [ ] Export as PNG (1200x800px minimum)
- [ ] Insert after paragraph ending "...implementing departmental strategies..."
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure 2.1: ZHESLB Organizational Structure"
- [ ] Center aligned

---

### Chapter 3 Images

#### ✓ Figure 3.1: System Architecture Diagram
- [ ] Create architecture diagram (Draw.io)
- [ ] Export as PNG (1200x600px minimum)
- [ ] Insert in section 3.1.2 after "System Architecture Design" bullets
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure 3.1: System Architecture Diagram"

#### ✓ Figure 3.2: Loan Application Workflow
- [ ] Create workflow flowchart (Draw.io/Lucidchart)
- [ ] Export as PNG (1200x1000px minimum)
- [ ] Insert in section 3.1.2 after "Workflow Design" bullets
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure 3.2: Loan Application Workflow"

#### ✓ Figure 3.3: Database Entity Relationship Diagram
- [ ] Create ERD (Draw.io/dbdiagram.io)
- [ ] Export as PNG (1400x1000px minimum)
- [ ] Insert in section 3.1.2 after "Database Design" bullets
- [ ] Size: 6-7 inches wide (may need full page)
- [ ] Caption: "Figure 3.3: Database Entity Relationship Diagram"

#### ✓ Figure 3.4: Authentication Flow Diagram
- [ ] Create sequence diagram (Draw.io/PlantUML)
- [ ] Export as PNG (1200x800px minimum)
- [ ] Insert in section 3.1.3 after "Security Implementation" bullets
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure 3.4: Authentication Flow Diagram"

---

### Appendix A: Screenshots (20 images)

#### ✓ Figure A.1: Login Page Interface
- [ ] Capture screenshot from http://localhost:5173/login
- [ ] Insert in Appendix A.1
- [ ] Size: 5-6 inches wide
- [ ] Caption: "Figure A.1: Login Page Interface"

#### ✓ Figure A.2: Staff Profile Completion Modal
- [ ] Capture screenshot (staff dashboard with modal)
- [ ] Insert in Appendix A.2
- [ ] Size: 5 inches wide
- [ ] Caption: "Figure A.2: Staff Profile Completion Modal"

#### ✓ Figure A.3: Staff Dashboard - New Loan Application
- [ ] Capture full staff dashboard
- [ ] Insert in Appendix A.3
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.3: Staff Dashboard - New Loan Application"

#### ✓ Figure A.4: New Loan Application Form
- [ ] Capture application form modal with sample data
- [ ] Insert in Appendix A.4
- [ ] Size: 5 inches wide
- [ ] Caption: "Figure A.4: New Loan Application Form"

#### ✓ Figure A.5: Admin Dashboard Overview
- [ ] Capture admin dashboard overview tab
- [ ] Insert in Appendix A.5
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.5: Admin Dashboard Overview"

#### ✓ Figure A.6: Admin User Management Interface
- [ ] Capture admin users tab with data
- [ ] Insert in Appendix A.6
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.6: Admin User Management Interface"

#### ✓ Figure A.7: Multi-Role Assignment Modal
- [ ] Capture role assignment modal with selections
- [ ] Insert in Appendix A.7
- [ ] Size: 4-5 inches wide
- [ ] Caption: "Figure A.7: Multi-Role Assignment Modal"

#### ✓ Figure A.8: Add/Edit User Modal
- [ ] Capture add user modal with sample data
- [ ] Insert in Appendix A.8
- [ ] Size: 4 inches wide
- [ ] Caption: "Figure A.8: Add/Edit User Modal"

#### ✓ Figure A.9: Role Management Interface
- [ ] Capture roles tab showing all roles
- [ ] Insert in Appendix A.9
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.9: Role Management Interface"

#### ✓ Figure A.10: CEO Dashboard with Statistics
- [ ] Capture CEO dashboard with metrics
- [ ] Insert in Appendix A.10
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.10: CEO Dashboard with Statistics"

#### ✓ Figure A.11: CEO Pending Applications Review
- [ ] Capture CEO pending review tab
- [ ] Insert in Appendix A.11
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.11: CEO Pending Applications Review"

#### ✓ Figure A.12: CEO Priority Assignment Modal
- [ ] Capture CEO decision modal
- [ ] Insert in Appendix A.12
- [ ] Size: 5-6 inches wide (large modal)
- [ ] Caption: "Figure A.12: CEO Priority Assignment Modal"

#### ✓ Figure A.13: HOD Dashboard - Department Applications
- [ ] Capture HOD dashboard
- [ ] Insert in Appendix A.13
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.13: HOD Dashboard - Department Applications"

#### ✓ Figure A.14: Accountant Dashboard - Financial Review
- [ ] Capture accountant dashboard
- [ ] Insert in Appendix A.14
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.14: Accountant Dashboard - Financial Review"

#### ✓ Figure A.15: Application Status Flow
- [ ] Capture status flow/stepper component
- [ ] Insert in Appendix A.15
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.15: Application Status Flow"

#### ✓ Figure A.16: Document Upload Interface
- [ ] Capture document upload section
- [ ] Insert in Appendix A.16
- [ ] Size: 5 inches wide
- [ ] Caption: "Figure A.16: Document Upload Interface"

#### ✓ Figure A.17: Audit Log Viewer
- [ ] Capture audit logs tab with data
- [ ] Insert in Appendix A.17
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.17: Audit Log Viewer"

#### ✓ Figure A.18: Applications Table with Status Badges
- [ ] Capture applications table with various statuses
- [ ] Insert in Appendix A.18
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.18: Applications Table with Status Badges"

#### ✓ Figure A.19: System Architecture Deployment View
- [ ] Create deployment diagram (Draw.io)
- [ ] Export as PNG (1200x700px minimum)
- [ ] Insert in Appendix A.19
- [ ] Size: 6 inches wide
- [ ] Caption: "Figure A.19: System Architecture Deployment View"

#### ✓ Figure A.20: Mobile Responsive View
- [ ] Capture mobile view (375px width in DevTools)
- [ ] Insert in Appendix A.20
- [ ] Size: 3-4 inches wide (mobile dimensions)
- [ ] Caption: "Figure A.20: Mobile Responsive View"

---

## Advanced Techniques

### Auto-Update Table of Figures

After inserting all images with captions:

1. **Navigate to Table of Figures section** (after Table of Contents)

2. **Delete existing table** (if any placeholder exists)

3. **Generate new table:**
   - Position cursor where table should go
   - Go to `References` tab → `Insert Table of Figures`
   - Options:
     - Caption label: Figure
     - Show page numbers: Yes
     - Right align page numbers: Yes
     - Tab leader: Dots (.......)
     - Format: From template or Formal
   - Click OK

4. **Update table after changes:**
   - Right-click table → `Update Field`
   - Select "Update entire table"
   - Click OK

### Cross-Reference Figures in Text

To reference figures in your text:

1. **Position cursor** where you want reference (e.g., "See Figure A.1")

2. **Insert cross-reference:**
   - Go to `References` tab → `Cross-reference`
   - Reference type: Figure
   - Insert reference to: "Only label and number" or "Label and number"
   - Select the figure from list
   - Click Insert

3. **Example text:**
   ```
   The login interface (Figure A.1) provides secure authentication...
   ```

### Wrapping Text Around Images

For smaller images that don't need full width:

1. **Select image**
2. **Right-click** → `Wrap Text` → Choose:
   - `Square`: Text wraps around image
   - `Tight`: Text follows image contours
   - `Top and Bottom`: Image on its own line
   - `In Line with Text`: Image treated as character
3. **Recommended**: Use "Top and Bottom" for report figures

---

## Image Quality Tips

### Ensuring Professional Appearance

1. **Resolution:**
   - Minimum 1024 pixels wide for full-width screenshots
   - 150-300 DPI for print quality
   - PNG format (lossless, best for screenshots)

2. **Compression:**
   - Use TinyPNG.com to reduce file size without quality loss
   - Target: Under 500KB per image
   - Keeps document size manageable

3. **Clarity:**
   - Capture at 100% zoom (not zoomed in browser)
   - No pixelation or blurriness
   - Text in screenshots should be readable
   - Use high contrast (avoid light gray text on white)

4. **Consistency:**
   - Same browser width for all full-viewport screenshots (1280px)
   - Same zoom level for all diagrams
   - Consistent color scheme

5. **Annotations (Optional):**
   - Use tools like Greenshot, Snagit, or Annotate
   - Add red arrows or boxes to highlight important areas
   - Add numbered callouts for complex diagrams
   - Keep annotations minimal and professional

---

## Troubleshooting

### Problem: Image too large, pushes to next page

**Solution:**
- Reduce image width (try 5.5 inches instead of 6)
- Check if there's extra spacing before/after
- Use "Wrap Text" → "Top and Bottom"
- Adjust paragraph spacing

### Problem: Image appears pixelated/blurry

**Solution:**
- Re-capture screenshot at higher resolution
- Ensure original image is PNG, not JPG
- Don't enlarge small images beyond original size
- Capture at 1280px minimum width

### Problem: Images not appearing in Table of Figures

**Solution:**
- Ensure you used "Insert Caption" not manual text
- Caption must be labeled as "Figure"
- Update table: Right-click → Update Field
- Rebuild table: Delete and re-insert

### Problem: Captions not auto-numbering correctly

**Solution:**
- Select caption → Right-click → "Update Field"
- Ensure "Insert Caption" was used (not manual typing)
- Check that caption style is consistent
- Use References → Insert Caption for all figures

### Problem: Document file size too large

**Solution:**
- Compress images before inserting (TinyPNG.com)
- Use PNG not BMP format
- Reduce unnecessary high-resolution images
- Target: Final document under 20MB

---

## Final Checks

Before submitting your report:

- [ ] All 24 images inserted (4 diagrams + 20 screenshots)
- [ ] All captions properly formatted and numbered
- [ ] Table of Figures auto-generated and updated
- [ ] Images centered and properly sized
- [ ] No pixelation or blurriness
- [ ] Placeholder text `[INSERT IMAGE HERE]` all removed
- [ ] Page breaks correct (chapters start on new pages)
- [ ] Image descriptions in italics below each figure
- [ ] Cross-references working (if used)
- [ ] Document saved as .docx
- [ ] File size reasonable (< 20MB)
- [ ] Printed test page to check quality

---

## Quick Reference: Image Sizes

| Image Type | Recommended Width | Notes |
|------------|------------------|-------|
| Full dashboard screenshots | 6 inches | Maximum readable size |
| Modal dialogs | 4-5 inches | Depends on modal size |
| Small forms | 3-4 inches | Keeps proportions |
| Mobile views | 3 inches | Matches phone dimensions |
| Wide tables | 6-6.5 inches | May extend to margins |
| Flowcharts/diagrams | 6 inches | Full width for clarity |
| Architecture diagrams | 6-7 inches | Complex, needs space |
| ERD diagrams | 6.5-7 inches | Many entities, needs width |

---

## Time-Saving Tips

1. **Batch process images:**
   - Compress all images at once (TinyPNG.com allows bulk upload)
   - Name them all before starting insertion
   - Capture all screenshots in one session

2. **Use keyboard shortcuts:**
   - `Ctrl + E`: Center align
   - `Alt + Shift + P`: Insert picture
   - `F9`: Update field
   - `Ctrl + F`: Find text

3. **Create caption style:**
   - Set up once, apply to all
   - Saves formatting time

4. **Work in sections:**
   - Complete Chapter 2 images first
   - Then Chapter 3
   - Finally Appendix A
   - Update Table of Figures once at end

---

## Professional Presentation

### Do's:
✓ Use consistent image sizes
✓ Center all images
✓ Add descriptive captions
✓ Maintain high quality
✓ Use PNG format
✓ Include page numbers in Table of Figures
✓ Test print one page before printing all

### Don'ts:
✗ Don't use low-resolution images
✗ Don't stretch images disproportionally
✗ Don't use JPG for screenshots (artifacts)
✗ Don't forget to compress images
✗ Don't manually type figure numbers
✗ Don't use images wider than page margins
✗ Don't include sensitive/real user data

---

## Getting Help

If you encounter issues:

1. **Microsoft Word Help:**
   - Press F1 in Word
   - Search for "insert pictures" or "captions"

2. **Online Resources:**
   - Microsoft Office Support: support.microsoft.com
   - YouTube tutorials on inserting images and captions

3. **University Resources:**
   - SUZA Library IT help desk
   - Your supervisor
   - Department of Computer Science office

---

**Good luck with your report! With proper images, your report will be professional, visually appealing, and clearly demonstrate your practical training achievements.**
