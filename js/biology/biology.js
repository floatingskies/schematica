/* ============================================
   SCHEMATICA — Biology: Genetics, Ecology, Biochem


const BiologyCalculator = {
  init() {
    // Punnett Square
    const punnettBtn = document.getElementById('calcPunnettBtn');
    if (punnettBtn) punnettBtn.addEventListener('click', () => this.calcPunnett());

    // Hardy-Weinberg
    const hwBtn = document.getElementById('calcHWBtn');
    if (hwBtn) hwBtn.addEventListener('click', () => this.calcHardyWeinberg());

    // Population Growth
    const popBtn = document.getElementById('calcPopGrowthBtn');
    if (popBtn) popBtn.addEventListener('click', () => this.calcPopulationGrowth());

    // Clear
    document.getElementById('clearPunnettBtn')?.addEventListener('click', () => this.clearPunnett());
    document.getElementById('clearHWBtn')?.addEventListener('click', () => this.clearHW());
    document.getElementById('clearPopGrowthBtn')?.addEventListener('click', () => this.clearPopGrowth());
  },

  calcPunnett() {
    const p1 = document.getElementById('punnettP1')?.value.trim().toUpperCase();
    const p2 = document.getElementById('punnettP2')?.value.trim().toUpperCase();

    if (!p1 || !p2 || p1.length !== 2 || p2.length !== 2) {
      App.showResult('punnettResult', I18N.get('result'), 'Enter 2-letter genotypes for both parents (e.g., Aa, AA, aa).');
      return;
    }

    const alleles1 = [p1[0], p1[1]];
    const alleles2 = [p2[0], p2[1]];

    const offspring = [];
    const genotypeCounts = {};

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let genotype = alleles1[i] + alleles2[j];
        // Convention: uppercase first
        if (genotype[0] > genotype[1]) genotype = genotype[1] + genotype[0];
        offspring.push(genotype);
        genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
      }
    }

    // Build Punnett square table
    let tableHtml = '<table style="border-collapse:collapse;margin-top:1rem;">';
    tableHtml += `<tr><td style="border:2px solid var(--clr-ink);padding:8px;"></td>
      <td style="border:2px solid var(--clr-ink);padding:8px;font-weight:700;text-align:center;">${alleles2[0]}</td>
      <td style="border:2px solid var(--clr-ink);padding:8px;font-weight:700;text-align:center;">${alleles2[1]}</td></tr>`;
    
    for (let i = 0; i < 2; i++) {
      tableHtml += `<tr><td style="border:2px solid var(--clr-ink);padding:8px;font-weight:700;text-align:center;">${alleles1[i]}</td>`;
      for (let j = 0; j < 2; j++) {
        let genotype = alleles1[i] + alleles2[j];
        if (genotype[0] > genotype[1]) genotype = genotype[1] + genotype[0];
        const bgColor = genotype === genotype.toUpperCase() ? '#BAFFC9' : genotype === genotype.toLowerCase() ? '#FFB3BA' : '#FFFFBA';
        tableHtml += `<td style="border:2px solid var(--clr-ink);padding:8px;text-align:center;background:${bgColor};font-weight:700;">${genotype}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Phenotype ratios
    const total = 4;
    let ratiosHtml = '<div class="mt-4">';
    for (const [genotype, count] of Object.entries(genotypeCounts)) {
      const pct = (count / total * 100).toFixed(1);
      const isDominant = genotype[0] === genotype[0].toUpperCase();
      ratiosHtml += `<div><strong>${genotype}</strong>: ${count}/${total} (${pct}%) — ${isDominant ? 'Dominant phenotype' : 'Recessive phenotype'}</div>`;
    }
    ratiosHtml += '</div>';

    App.showResult('punnettResult', I18N.get('result'),
      `Parent 1: ${p1} x Parent 2: ${p2}`);

    document.getElementById('punnettResult').innerHTML += tableHtml + ratiosHtml;

    App.showFormulaRef('punnettFormula',
      'Punnett Square: Cross alleles of Parent 1 x Parent 2',
      'The Punnett Square, invented by Reginald Punnett in 1905, is a visual tool to predict the genotypes and phenotypes of offspring from a genetic cross. It follows Mendel\'s laws of segregation (each parent contributes one allele) and independent assortment. The grid shows all possible combinations with equal probability.'
    );
  },

  clearPunnett() {
    App.clearInputs('#punnettCalc');
    document.getElementById('punnettResult').innerHTML = '';
    document.getElementById('punnettFormula').innerHTML = '';
  },

  calcHardyWeinberg() {
    const p = parseFloat(document.getElementById('hwP')?.value);
    const q = parseFloat(document.getElementById('hwQ')?.value);

    if (isNaN(p) && isNaN(q)) {
      App.showResult('hwResult', I18N.get('result'), 'Enter p or q (or both for validation).');
      return;
    }

    let pVal = p, qVal = q;
    if (isNaN(q)) qVal = 1 - pVal;
    if (isNaN(p)) pVal = 1 - qVal;

    if (Math.abs(pVal + qVal - 1) > 0.01) {
      App.showResult('hwResult', I18N.get('result'), `Warning: p + q = ${(pVal + qVal).toFixed(4)}, which should equal 1. Results may be inaccurate.`);
    }

    const p2 = pVal * pVal;
    const q2 = qVal * qVal;
    const pq2 = 2 * pVal * qVal;

    App.showResult('hwResult', I18N.get('result'),
      `p^2 (AA) = ${p2.toFixed(4)} (${(p2*100).toFixed(2)}%) | 2pq (Aa) = ${pq2.toFixed(4)} (${(pq2*100).toFixed(2)}%) | q^2 (aa) = ${q2.toFixed(4)} (${(q2*100).toFixed(2)}%)`);

    App.showFormulaRef('hwFormula',
      'p^2 + 2pq + q^2 = 1 | p + q = 1',
      'The Hardy-Weinberg Equilibrium principle, developed by G.H. Hardy and Wilhelm Weinberg in 1908, states that allele frequencies in a population remain constant from generation to generation if: no mutations, no migration, random mating, no natural selection, and large population size. It provides a null model for detecting evolutionary change.'
    );
  },

  clearHW() {
    App.clearInputs('#hwCalc');
    document.getElementById('hwResult').innerHTML = '';
    document.getElementById('hwFormula').innerHTML = '';
  },

  calcPopulationGrowth() {
    const N0 = parseFloat(document.getElementById('popN0')?.value);
    const r = parseFloat(document.getElementById('popR')?.value);
    const t = parseFloat(document.getElementById('popT')?.value);
    const K = parseFloat(document.getElementById('popK')?.value);

    if (isNaN(N0) || isNaN(r) || isNaN(t)) {
      App.showResult('popGrowthResult', I18N.get('result'), 'Enter N0, r, and t. K is optional (for logistic growth).');
      return;
    }

    // Exponential growth
    const Nt = N0 * Math.exp(r * t);
    let result = `Exponential: N(${t}) = ${Nt.toFixed(2)}`;

    // Logistic growth if K provided
    if (!isNaN(K) && K > 0) {
      const Nlogistic = K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
      result += ` | Logistic: N(${t}) = ${Nlogistic.toFixed(2)} (K=${K})`;
    }

    App.showResult('popGrowthResult', I18N.get('result'), result);

    App.showFormulaRef('popGrowthFormula',
      'Exponential: N(t) = N0 * e^(rt) | Logistic: N(t) = K / (1 + ((K-N0)/N0) * e^(-rt))',
      'Exponential growth assumes unlimited resources and no competition. Logistic growth, modeled by Pierre Francois Verhulst in 1838, adds a carrying capacity (K) that limits growth as the population approaches K. Most real populations follow the logistic model because resources are finite. The r-strategy favors rapid exponential growth, while K-strategy favors stable populations near carrying capacity.'
    );
  },

  clearPopGrowth() {
    App.clearInputs('#popGrowthCalc');
    document.getElementById('popGrowthResult').innerHTML = '';
    document.getElementById('popGrowthFormula').innerHTML = '';
  }
};
