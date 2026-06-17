const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } = require('docx');
const markdownIt = require('markdown-it')({ html: true, breaks: true });

const md = fs.readFileSync('GUIA_JUGADOR.md', 'utf8');
const tokens = markdownIt.parse(md, {});

const children = [];

function parseTokens(tokens, parent = children) {
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];
        
        if (token.type === 'heading_open') {
            const level = parseInt(token.tag[1]);
            const content = tokens[i + 1].content;
            parent.push(new Paragraph({
                text: content,
                heading: HeadingLevel[`HEADING_${level}`] || HeadingLevel.HEADING_1,
                spacing: { before: 200, after: 100 }
            }));
            i += 3; // skip heading_open, inline, heading_close
        }
        else if (token.type === 'paragraph_open') {
            // Find the inline content
            let content = '';
            let j = i + 1;
            while (j < tokens.length && tokens[j].type !== 'paragraph_close') {
                if (tokens[j].type === 'inline') {
                    content = tokens[j].content;
                }
                j++;
            }
            if (content.trim()) {
                parent.push(new Paragraph({
                    children: parseInline(content),
                    spacing: { after: 120 }
                }));
            }
            i = j + 1;
        }
        else if (token.type === 'bullet_list_open') {
            // Handle list items
            let j = i + 1;
            while (j < tokens.length && tokens[j].type !== 'bullet_list_close') {
                if (tokens[j].type === 'list_item_open') {
                    let itemContent = '';
                    let k = j + 1;
                    while (k < tokens.length && tokens[k].type !== 'list_item_close') {
                        if (tokens[k].type === 'inline') {
                            itemContent = tokens[k].content;
                        }
                        k++;
                    }
                    if (itemContent.trim()) {
                        parent.push(new Paragraph({
                            children: [
                                new TextRun({ text: '• ', bold: false }),
                                ...parseInline(itemContent)
                            ],
                            spacing: { after: 60, left: 360 },
                            bullet: { level: 0 }
                        }));
                    }
                    j = k + 1;
                } else {
                    j++;
                }
            }
            i = j + 1;
        }
        else if (token.type === 'hr') {
            parent.push(new Paragraph({
                children: [new TextRun({ text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: '999999' })],
                spacing: { before: 200, after: 200 }
            }));
            i++;
        }
        else if (token.type === 'table_open') {
            // Parse table
            const rows = [];
            let j = i + 1;
            while (j < tokens.length && tokens[j].type !== 'table_close') {
                if (tokens[j].type === 'tr_open') {
                    const cells = [];
                    let k = j + 1;
                    while (k < tokens.length && tokens[k].type !== 'tr_close') {
                        if (tokens[k].type === 'th_open' || tokens[k].type === 'td_open') {
                            let cellContent = '';
                            let l = k + 1;
                            while (l < tokens.length && tokens[l].type !== 'th_close' && tokens[l].type !== 'td_close') {
                                if (tokens[l].type === 'inline') {
                                    cellContent = tokens[l].content;
                                }
                                l++;
                            }
                            cells.push(new TableCell({
                                children: [new Paragraph({ children: parseInline(cellContent), spacing: { after: 0 } })],
                                shading: tokens[k].type === 'th_open' ? { fill: '1E293B' } : {},
                                margins: { top: 60, bottom: 60, left: 80, right: 80 }
                            }));
                            k = l + 1;
                        } else {
                            k++;
                        }
                    }
                    rows.push(new TableRow({ children: cells }));
                    j = k + 1;
                } else {
                    j++;
                }
            }
            if (rows.length > 0) {
                parent.push(new Table({
                    rows: rows,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.SINGLE, size: 1, color: '444444' },
                        bottom: { style: BorderStyle.SINGLE, size: 1, color: '444444' },
                        left: { style: BorderStyle.SINGLE, size: 1, color: '444444' },
                        right: { style: BorderStyle.SINGLE, size: 1, color: '444444' },
                        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: '444444' },
                        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '444444' }
                    }
                }));
            }
            i = j + 1;
        }
        else {
            i++;
        }
    }
}

function parseInline(text) {
    const runs = [];
    // Simple bold/italic parsing
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
    for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
            runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
        } else if (part.startsWith('*') && part.endsWith('*')) {
            runs.push(new TextRun({ text: part.slice(1, -1), italics: true }));
        } else if (part.startsWith('`') && part.endsWith('`')) {
            runs.push(new TextRun({ text: part.slice(1, -1), font: 'Courier New', color: '007ACC' }));
        } else if (part) {
            runs.push(new TextRun({ text: part }));
        }
    }
    return runs.length > 0 ? runs : [new TextRun({ text: text || ' ' })];
}

parseTokens(tokens);

const doc = new Document({
    sections: [{
        properties: {},
        children: children
    }],
    styles: {
        default: {
            document: {
                run: { font: 'Calibri', size: 22, color: '0F172A' },
                paragraph: { spacing: { line: 276 } }
            }
        }
    }
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('GUIA_JUGADOR.docx', buffer);
    console.log('✅ GUIA_JUGADOR.docx creado exitosamente');
}).catch(err => {
    console.error('Error:', err);
});