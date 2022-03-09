let cmtColor = "#6d7075", strColor = "#a6e050", chrColor = "#a6e050", numColor = "#3e91d6", funcColor = "#963ed6", varColor = "#43e8c9", keywColor = "#3a86bc", regColor = "#3e91d6"; // 3a86bc 345d82 165287 fcd020 43e8c9 963ed6 3e91d6
let keywords = ["define", "include", "void", "string"], instructions = ["mov", "call", "jmp", "syscall", "ret"], registers = ["rax", "rbx", "rcx", "rdx", "rsi", "rdi", "rsp", "rbp", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "eax", "ebx", "ecx", "edx", "esi", "edi", "esp", "ebp", "r8d", "r9d", "r10d", "r11d", "r12d", "r13d", "r14d", "r15d", "ax", "bx", "cx", "dx", "si", "di", "sp", "bp", "r8w", "r9w", "r10w", "r11w", "r12w", "r13w", "r14w", "r15w", "ah", "bh", "ch", "dh", "al", "bl", "cl", "dl", "sil", "dil", "spl", "bpl", "r8b", "r9b", "r10b", "r11b", "r12b", "r13b", "r14b", "r15b"];

window.onload = function () {
    let preElements = document.getElementsByTagName('pre');

    for (let i = 0; i < preElements.length; i++) {
        let element = preElements[i];
        let result = "";
        let html = element.innerHTML;
        let buffer = "";
        let str = false, chr = false, lc = false, bc = false;
        for (let j = 0; j < html.length; j++) {
            let c = html[j];

            if (lc) {
                result += c;

                if (c === '\n') {
                    result += "</span> ";
                    lc = false;
                }
                continue;
            }

            if (bc) {
                if (c === '*' && html[j + 1] === '/') {
                    result += c + html[++j] + "</span>";
                    bc = false;
                    continue;
                }

                result += c;
                continue;
            }

            if (c === '/' && html[j + 1] === '/') {
                if (buffer.length > 0)
                    parseBuffer(buffer, c);
                buffer = "";
                lc = true;
                result += "<span style='color: " + cmtColor + "'>";
                result += c;
                continue;
            }

            if (c === '/' && html[j + 1] === '*') {
                if (buffer.length > 0)
                    parseBuffer(buffer, c);
                buffer = "";
                bc = true;
                result += "<span style='color: " + cmtColor + "'>";
                result += c;
                continue;
            }

            if (str) {
                if (c === '\\') {
                    j++;
                    buffer += c + html[j];
                    continue;
                }

                if (c === '"') {
                    result += "<span style='color: " + strColor + "'>\"" + buffer + "\"</span>";
                    buffer = "";
                    str = false;
                } else {
                    buffer += c;
                }

                continue;
            }

            if (chr) {
                if (c === '\\') {
                    j++;
                    buffer += c + html[j];
                    continue;
                }

                if (c === '\'') {
                    result += "<span style='color: " + chrColor + "'>'" + buffer + "'</span>";
                    buffer = "";
                    chr = false;
                } else {
                    buffer += c;
                }

                continue;
            }

            if (c === '"') {
                if (buffer.length > 0)
                    result += parseBuffer(buffer, c);
                buffer = "";
                str = true;
                continue;
            }

            if (c === '\'') {
                if (buffer.length > 0)
                    result += parseBuffer(buffer, c);
                buffer = "";
                chr = true;
                continue;
            }

            if (c === ' ' || c === '~' || c === '^' || c === '&' || c === '|' || c === '[' || c === ']' || c === '{' || c === '}' || c === '(' || c === ')' || c === '"' || c === '\'' || c === '\n' || c === '\r' || c === '\t' || c === '<' || c === '>' || c === '!' || c === ';' || c === '-' || c === '+' || c === '/' || c === '*' || c === '%' || c === ',' || c === '.' || c === '=') {
                if (buffer.length > 0)
                    result += parseBuffer(buffer, c);
                result += c;
                if (c === '\n')
                    result += " ";
                buffer = "";
            } else {
                buffer += c;
            }
        }

        element.innerHTML = "\n " + result;
    }
}

function parseBuffer(s, c) {
    if (c === '(')
        return "<span style='color: " + funcColor + "'>" + s + "</span>";

    for (let i = 0; i < keywords.length; i++) {
        if (s === keywords[i])
            return "<span style='color: " + keywColor + "'>" + s + "</span>";
    }

    for (let i = 0; i < registers.length; i++) {
        if (s === registers[i])
            return "<span style='color: " + regColor + "'>" + s + "</span>";
    }

    for (let i = 0; i < instructions.length; i++) {
        if (s === instructions[i])
            return "<span style='color: " + funcColor + "'>" + s + "</span>";
    }

    let st = s[0];
    if (st >= '0' && st <= '9')
        return "<span style='color: " + numColor + "'>" + s + "</span>";

    return "<span style='color: " + varColor + "'>" + s + "</span>";
}
