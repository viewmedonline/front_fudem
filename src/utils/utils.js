const filterDuplicate = (diagnostics)=> {
    console.log("diagnostics: ", diagnostics);
    const uniqueDiagnostics = [];
    const seenCodes = new Set();
    const seenDiagnostics = new Set();

    for (const diagnostic of diagnostics) {
      const code = diagnostic.code;
      const diagnosticText = diagnostic.diagnostic;

      if (!seenCodes.has(code) && !seenDiagnostics.has(diagnosticText)) {
        uniqueDiagnostics.push(diagnostic);
        seenCodes.add(code);
        seenDiagnostics.add(diagnosticText);
      }
    }

    return uniqueDiagnostics;
  }

export {
    filterDuplicate
}