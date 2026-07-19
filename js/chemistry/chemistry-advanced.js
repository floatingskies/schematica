/* ============================================
   SCHEMATICA, Chemistry: Advanced Calculators
   ============================================ */

const ChemistryGasLaws = {
  init() {
    const calcBtn = document.getElementById('calcGasLawBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearGasLawBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Show/hide temperature fields based on law type
    const lawSelect = document.getElementById('gasLawType');
    if (lawSelect) lawSelect.addEventListener('change', () => this.updateVisibility());
  },

  updateVisibility() {
    const lawType = document.getElementById('gasLawType')?.value;
    const t1Group = document.getElementById('gasT1')?.closest('.form-group');
    const t2Group = document.getElementById('gasT2')?.closest('.form-group');
    const p1Group = document.getElementById('gasP1')?.closest('.form-group');
    const p2Group = document.getElementById('gasP2')?.closest('.form-group');
    const v1Group = document.getElementById('gasV1')?.closest('.form-group');
    const v2Group = document.getElementById('gasV2')?.closest('.form-group');

    // Show all by default
    [t1Group, t2Group, p1Group, p2Group, v1Group, v2Group].forEach(g => {
      if (g) g.style.display = '';
    });

    if (lawType === 'boyle') {
      // Boyle: P1V1 = P2V2 — no temperature
      if (t1Group) t1Group.style.display = 'none';
      if (t2Group) t2Group.style.display = 'none';
    } else if (lawType === 'charles') {
      // Charles: V1/T1 = V2/T2 — no pressure
      if (p1Group) p1Group.style.display = 'none';
      if (p2Group) p2Group.style.display = 'none';
    } else if (lawType === 'gaylussac') {
      // Gay-Lussac: P1/T1 = P2/T2 — no volume
      if (v1Group) v1Group.style.display = 'none';
      if (v2Group) v2Group.style.display = 'none';
    }
    // combined: all visible
  },

  calculate() {
    const lawType = document.getElementById('gasLawType')?.value;

    switch (lawType) {
      case 'boyle':   this.calcBoyle(); break;
      case 'charles': this.calcCharles(); break;
      case 'gaylussac': this.calcGayLussac(); break;
      case 'combined': this.calcCombined(); break;
      default:
        App.showResult('gasLawResult', I18N.get('result'),
          I18N.get('gas_law_select_type') || 'Please select a gas law type.');
    }
  },

  calcBoyle() {
    const P1 = parseFloat(document.getElementById('gasP1')?.value);
    const V1 = parseFloat(document.getElementById('gasV1')?.value);
    const P2 = parseFloat(document.getElementById('gasP2')?.value);
    const V2 = parseFloat(document.getElementById('gasV2')?.value);

    const vals = [P1, V1, P2, V2];
    const filled = vals.filter(v => !isNaN(v) && v > 0).length;

    if (filled < 3) {
      App.showResult('gasLawResult', I18N.get('result'),
        I18N.get('gas_law_fill_3of4') || 'Fill in at least 3 of the 4 fields (P1, V1, P2, V2) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(P1) || P1 <= 0) {
      const calcP1 = (P2 * V2) / V1;
      result = `P1 = ${calcP1.toFixed(4)} atm`;
    } else if (isNaN(V1) || V1 <= 0) {
      const calcV1 = (P2 * V2) / P1;
      result = `V1 = ${calcV1.toFixed(4)} L`;
    } else if (isNaN(P2) || P2 <= 0) {
      const calcP2 = (P1 * V1) / V2;
      result = `P2 = ${calcP2.toFixed(4)} atm`;
    } else if (isNaN(V2) || V2 <= 0) {
      const calcV2 = (P1 * V1) / P2;
      result = `V2 = ${calcV2.toFixed(4)} L`;
    }

    App.showResult('gasLawResult', I18N.get('result'), result);

    App.showFormulaRef('gasLawFormula',
      'P1 * V1 = P2 * V2  (Boyle\'s Law)',
      'Boyle\'s Law states that at constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume. This was published by Robert Boyle in 1662 based on experiments with air. It is a special case of the Ideal Gas Law (PV = nRT) when n and T are held constant. The law applies best to ideal gases; real gases deviate at very high pressures where intermolecular forces become significant.'
    );
  },

  calcCharles() {
    const V1 = parseFloat(document.getElementById('gasV1')?.value);
    const T1 = parseFloat(document.getElementById('gasT1')?.value);
    const V2 = parseFloat(document.getElementById('gasV2')?.value);
    const T2 = parseFloat(document.getElementById('gasT2')?.value);

    const vals = [V1, T1, V2, T2];
    const filled = vals.filter(v => !isNaN(v) && v > 0).length;

    if (filled < 3) {
      App.showResult('gasLawResult', I18N.get('result'),
        I18N.get('gas_law_fill_3of4') || 'Fill in at least 3 of the 4 fields (V1, T1, V2, T2) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(V1) || V1 <= 0) {
      const calcV1 = (V2 * T1) / T2;
      result = `V1 = ${calcV1.toFixed(4)} L`;
    } else if (isNaN(T1) || T1 <= 0) {
      const calcT1 = (V1 * T2) / V2;
      result = `T1 = ${calcT1.toFixed(4)} K`;
    } else if (isNaN(V2) || V2 <= 0) {
      const calcV2 = (V1 * T2) / T1;
      result = `V2 = ${calcV2.toFixed(4)} L`;
    } else if (isNaN(T2) || T2 <= 0) {
      const calcT2 = (V2 * T1) / V1;
      result = `T2 = ${calcT2.toFixed(4)} K`;
    }

    App.showResult('gasLawResult', I18N.get('result'), result);

    App.showFormulaRef('gasLawFormula',
      'V1 / T1 = V2 / T2  (Charles\'s Law)',
      'Charles\'s Law states that at constant pressure, the volume of a fixed amount of gas is directly proportional to its absolute temperature. Discovered by Jacques Charles around 1787 and published by Joseph Louis Gay-Lussac in 1802, this law implies that gas volume approaches zero as temperature approaches absolute zero (0 K). Temperature must be in Kelvin. It follows from the Ideal Gas Law when n and P are constant.'
    );
  },

  calcGayLussac() {
    const P1 = parseFloat(document.getElementById('gasP1')?.value);
    const T1 = parseFloat(document.getElementById('gasT1')?.value);
    const P2 = parseFloat(document.getElementById('gasP2')?.value);
    const T2 = parseFloat(document.getElementById('gasT2')?.value);

    const vals = [P1, T1, P2, T2];
    const filled = vals.filter(v => !isNaN(v) && v > 0).length;

    if (filled < 3) {
      App.showResult('gasLawResult', I18N.get('result'),
        I18N.get('gas_law_fill_3of4') || 'Fill in at least 3 of the 4 fields (P1, T1, P2, T2) to calculate the missing value.');
      return;
    }

    let result = '';
    if (isNaN(P1) || P1 <= 0) {
      const calcP1 = (P2 * T1) / T2;
      result = `P1 = ${calcP1.toFixed(4)} atm`;
    } else if (isNaN(T1) || T1 <= 0) {
      const calcT1 = (P1 * T2) / P2;
      result = `T1 = ${calcT1.toFixed(4)} K`;
    } else if (isNaN(P2) || P2 <= 0) {
      const calcP2 = (P1 * T2) / T1;
      result = `P2 = ${calcP2.toFixed(4)} atm`;
    } else if (isNaN(T2) || T2 <= 0) {
      const calcT2 = (P2 * T1) / P1;
      result = `T2 = ${calcT2.toFixed(4)} K`;
    }

    App.showResult('gasLawResult', I18N.get('result'), result);

    App.showFormulaRef('gasLawFormula',
      'P1 / T1 = P2 / T2  (Gay-Lussac\'s Law)',
      'Gay-Lussac\'s Law states that at constant volume, the pressure of a fixed amount of gas is directly proportional to its absolute temperature. Formulated by Joseph Louis Gay-Lussac around 1809, this law explains why pressurized containers can explode when heated: increasing temperature increases the kinetic energy of gas molecules, which then exert greater force on the container walls. Temperature must be in Kelvin. It follows from the Ideal Gas Law when n and V are constant.'
    );
  },

  calcCombined() {
    const P1 = parseFloat(document.getElementById('gasP1')?.value);
    const V1 = parseFloat(document.getElementById('gasV1')?.value);
    const T1 = parseFloat(document.getElementById('gasT1')?.value);
    const P2 = parseFloat(document.getElementById('gasP2')?.value);
    const V2 = parseFloat(document.getElementById('gasV2')?.value);
    const T2 = parseFloat(document.getElementById('gasT2')?.value);

    const vals = [P1, V1, T1, P2, V2, T2];
    const missing = vals.filter(v => isNaN(v) || v <= 0).length;

    if (missing !== 1) {
      App.showResult('gasLawResult', I18N.get('result'),
        I18N.get('gas_law_fill_5of6') || 'Fill in exactly 5 of the 6 fields (P1, V1, T1, P2, V2, T2) to solve for the missing value.');
      return;
    }

    let result = '';
    if (isNaN(P1) || P1 <= 0) {
      const calcP1 = (P2 * V2 * T1) / (V1 * T2);
      result = `P1 = ${calcP1.toFixed(4)} atm`;
    } else if (isNaN(V1) || V1 <= 0) {
      const calcV1 = (P2 * V2 * T1) / (P1 * T2);
      result = `V1 = ${calcV1.toFixed(4)} L`;
    } else if (isNaN(T1) || T1 <= 0) {
      const calcT1 = (P1 * V1 * T2) / (P2 * V2);
      result = `T1 = ${calcT1.toFixed(4)} K`;
    } else if (isNaN(P2) || P2 <= 0) {
      const calcP2 = (P1 * V1 * T2) / (V2 * T1);
      result = `P2 = ${calcP2.toFixed(4)} atm`;
    } else if (isNaN(V2) || V2 <= 0) {
      const calcV2 = (P1 * V1 * T2) / (P2 * T1);
      result = `V2 = ${calcV2.toFixed(4)} L`;
    } else if (isNaN(T2) || T2 <= 0) {
      const calcT2 = (P2 * V2 * T1) / (P1 * V1);
      result = `T2 = ${calcT2.toFixed(4)} K`;
    }

    App.showResult('gasLawResult', I18N.get('result'), result);

    App.showFormulaRef('gasLawFormula',
      'P1 * V1 / T1 = P2 * V2 / T2  (Combined Gas Law)',
      'The Combined Gas Law integrates Boyle\'s Law (P1V1 = P2V2), Charles\'s Law (V1/T1 = V2/T2), and Gay-Lussac\'s Law (P1/T1 = P2/T2) into a single equation. It describes the relationship between pressure, volume, and temperature for a fixed amount of gas. When any one variable is held constant, it reduces to one of the three individual gas laws. Temperature must always be in Kelvin. This combined form is particularly useful when two or more state variables change simultaneously, such as in engine cycles and atmospheric processes.'
    );
  },

  clear() {
    const container = document.getElementById('gasLawType')?.closest('.calc-card');
    if (container) App.clearInputs('#' + container.id);
    document.getElementById('gasLawResult').innerHTML = '';
    document.getElementById('gasLawFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 2. Colligative Properties Calculator
// ──────────────────────────────────────────────

const ChemistryColligative = {
  // Common reference values for water
  REFERENCE: {
    water: {
      Kf: 1.86,   // degrees C * kg / mol
      Kb: 0.512,  // degrees C * kg / mol
      freezingPoint: 0,
      boilingPoint: 100
    }
  },

  init() {
    const calcBtn = document.getElementById('calcColligBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearColligBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Auto-fill K value when type changes
    const typeSelect = document.getElementById('colligType');
    if (typeSelect) typeSelect.addEventListener('change', () => this.autoFillK());
  },

  autoFillK() {
    const type = document.getElementById('colligType')?.value;
    const kInput = document.getElementById('colligK');
    if (!kInput) return;

    if (type === 'freezing') {
      kInput.value = this.REFERENCE.water.Kf;
    } else if (type === 'boiling') {
      kInput.value = this.REFERENCE.water.Kb;
    }
  },

  calculate() {
    const type = document.getElementById('colligType')?.value;

    if (type === 'freezing') {
      this.calcFreezingDepression();
    } else {
      this.calcBoilingElevation();
    }
  },

  calcFreezingDepression() {
    const Kf = parseFloat(document.getElementById('colligK')?.value);
    const m  = parseFloat(document.getElementById('colligMolality')?.value);
    const i  = parseFloat(document.getElementById('colligI')?.value);

    if (isNaN(Kf) || isNaN(m) || isNaN(i) || Kf <= 0 || m < 0 || i <= 0) {
      App.showResult('colligResult', I18N.get('result'),
        I18N.get('collig_fill_fields') || 'Fill in all fields with valid numbers. Kf > 0, molality >= 0, van\'t Hoff factor > 0.');
      return;
    }

    const deltaTf = Kf * m * i;
    const newFreezingPoint = this.REFERENCE.water.freezingPoint - deltaTf;

    App.showResult('colligResult', I18N.get('result'),
      `DeltaTf = ${deltaTf.toFixed(4)} degrees C | New Freezing Point = ${newFreezingPoint.toFixed(4)} degrees C`);

    App.showFormulaRef('colligFormula',
      'DeltaTf = Kf * m * i',
      'Freezing Point Depression describes how adding a solute lowers the freezing point of a solvent. Kf is the cryoscopic constant (molal freezing-point depression constant) specific to the solvent. For water, Kf = 1.86 degrees C*kg/mol. Molality (m) is moles of solute per kilogram of solvent. The van\'t Hoff factor (i) accounts for solute dissociation: i = 1 for non-electrolytes (e.g., glucose), i = 2 for NaCl (ideally), i = 3 for CaCl2 (ideally). This is why salt is spread on icy roads in winter — it lowers the freezing point of water below the ambient temperature.'
    );
  },

  calcBoilingElevation() {
    const Kb = parseFloat(document.getElementById('colligK')?.value);
    const m  = parseFloat(document.getElementById('colligMolality')?.value);
    const i  = parseFloat(document.getElementById('colligI')?.value);

    if (isNaN(Kb) || isNaN(m) || isNaN(i) || Kb <= 0 || m < 0 || i <= 0) {
      App.showResult('colligResult', I18N.get('result'),
        I18N.get('collig_fill_fields') || 'Fill in all fields with valid numbers. Kb > 0, molality >= 0, van\'t Hoff factor > 0.');
      return;
    }

    const deltaTb = Kb * m * i;
    const newBoilingPoint = this.REFERENCE.water.boilingPoint + deltaTb;

    App.showResult('colligResult', I18N.get('result'),
      `DeltaTb = ${deltaTb.toFixed(4)} degrees C | New Boiling Point = ${newBoilingPoint.toFixed(4)} degrees C`);

    App.showFormulaRef('colligFormula',
      'DeltaTb = Kb * m * i',
      'Boiling Point Elevation describes how adding a solute raises the boiling point of a solvent. Kb is the ebullioscopic constant (molal boiling-point elevation constant) specific to the solvent. For water, Kb = 0.512 degrees C*kg/mol. The principle is the same as freezing point depression: solute particles disrupt the solvent\'s phase change equilibrium. The van\'t Hoff factor (i) accounts for dissociation. This is why adding salt to water increases its boiling point, though the effect is small — a 1 molal NaCl solution raises water\'s boiling point by only about 1.02 degrees C. Antifreeze (ethylene glycol) in car radiators uses both effects: it lowers the freezing point and raises the boiling point of the coolant.'
    );
  },

  clear() {
    const container = document.getElementById('colligType')?.closest('.calc-card');
    if (container) App.clearInputs('#' + container.id);
    document.getElementById('colligResult').innerHTML = '';
    document.getElementById('colligFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 3. Solubility Product (Ksp) Calculator
// ──────────────────────────────────────────────

const ChemistryKsp = {
  init() {
    const calcBtn = document.getElementById('calcKspBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearKspBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Show/hide solubility input based on direction
    const dirSelect = document.getElementById('kspDirection');
    if (dirSelect) dirSelect.addEventListener('change', () => this.updateVisibility());
  },

  updateVisibility() {
    const direction = document.getElementById('kspDirection')?.value;
    const kspInput = document.getElementById('kspValue');
    const solInput = document.getElementById('kspSolubility');

    const kspGroup = kspInput?.closest('.form-group');
    const solGroup = solInput?.closest('.form-group');

    if (direction === 'ksp_to_solubility') {
      if (kspGroup) kspGroup.style.display = '';
      if (solGroup) solGroup.style.display = 'none';
    } else {
      if (kspGroup) kspGroup.style.display = 'none';
      if (solGroup) solGroup.style.display = '';
    }
  },

  calculate() {
    const direction = document.getElementById('kspDirection')?.value;
    const ionType   = document.getElementById('kspType')?.value;

    if (direction === 'ksp_to_solubility') {
      this.kspToSolubility(ionType);
    } else {
      this.solubilityToKsp(ionType);
    }
  },

  kspToSolubility(ionType) {
    const Ksp = parseFloat(document.getElementById('kspValue')?.value);

    if (isNaN(Ksp) || Ksp < 0) {
      App.showResult('kspResult', I18N.get('result'),
        I18N.get('ksp_enter_valid') || 'Enter a valid Ksp value (>= 0).');
      return;
    }

    let s = 0; // molar solubility
    let formulaStr = '';

    if (ionType === 'AB') {
      // AB(s) <-> A+(aq) + B-(aq)  =>  Ksp = s^2  =>  s = sqrt(Ksp)
      s = Math.sqrt(Ksp);
      formulaStr = 'Ksp = s^2 => s = sqrt(Ksp)';
    } else if (ionType === 'AB2') {
      // AB2(s) <-> A2+(aq) + 2B-(aq)  =>  Ksp = s*(2s)^2 = 4s^3  =>  s = cbrt(Ksp/4)
      s = Math.cbrt(Ksp / 4);
      formulaStr = 'Ksp = 4s^3 => s = cbrt(Ksp/4)';
    } else if (ionType === 'A2B') {
      // A2B(s) <-> 2A+(aq) + B2-(aq)  =>  Ksp = (2s)^2 * s = 4s^3  =>  s = cbrt(Ksp/4)
      s = Math.cbrt(Ksp / 4);
      formulaStr = 'Ksp = 4s^3 => s = cbrt(Ksp/4)';
    }

    App.showResult('kspResult', I18N.get('result'),
      `Molar Solubility (s) = ${s.toExponential(6)} mol/L  |  Ksp = ${Ksp.toExponential(4)} | Type: ${ionType}`);

    const explanations = {
      'AB':  'For a salt of type AB (e.g., AgCl, BaSO4), the dissolution produces equal concentrations of cations and anions. The equilibrium is AB(s) <-> A+(aq) + B-(aq), giving Ksp = [A+][B-] = s * s = s^2. Therefore, molar solubility s = sqrt(Ksp). This is the simplest Ksp relationship, applying to all 1:1 ionic compounds.',
      'AB2': 'For a salt of type AB2 (e.g., CaF2, PbCl2), the dissolution produces one cation and two anions per formula unit. The equilibrium is AB2(s) <-> A2+(aq) + 2B-(aq), giving Ksp = [A2+][B-]^2 = s * (2s)^2 = 4s^3. Therefore, molar solubility s = cbrt(Ksp/4). The factor of 2 from the stoichiometric coefficient is squared in the equilibrium expression, which is why the coefficient 4 appears.',
      'A2B': 'For a salt of type A2B (e.g., Ag2CrO4, Na2CO3 as a sparingly soluble salt), the dissolution produces two cations and one anion per formula unit. The equilibrium is A2B(s) <-> 2A+(aq) + B2-(aq), giving Ksp = [A+]^2[B2-] = (2s)^2 * s = 4s^3. Therefore, molar solubility s = cbrt(Ksp/4). Note that mathematically this gives the same expression as AB2, but the ion concentrations differ: [A+] = 2s and [B2-] = s.'
    };

    App.showFormulaRef('kspFormula',
      formulaStr,
      explanations[ionType] || '');
  },

  solubilityToKsp(ionType) {
    const s = parseFloat(document.getElementById('kspSolubility')?.value);

    if (isNaN(s) || s < 0) {
      App.showResult('kspResult', I18N.get('result'),
        I18N.get('ksp_enter_solubility') || 'Enter a valid molar solubility value (>= 0).');
      return;
    }

    let Ksp = 0;
    let formulaStr = '';

    if (ionType === 'AB') {
      Ksp = s * s;
      formulaStr = 'Ksp = s^2';
    } else if (ionType === 'AB2') {
      Ksp = 4 * s * s * s;
      formulaStr = 'Ksp = 4s^3 (AB2 type)';
    } else if (ionType === 'A2B') {
      Ksp = 4 * s * s * s;
      formulaStr = 'Ksp = 4s^3 (A2B type)';
    }

    App.showResult('kspResult', I18N.get('result'),
      `Ksp = ${Ksp.toExponential(6)}  |  Molar Solubility = ${s.toExponential(6)} mol/L | Type: ${ionType}`);

    const explanations = {
      'AB':  'For a salt of type AB (e.g., AgCl, BaSO4), the dissolution produces equal concentrations of cations and anions. The equilibrium is AB(s) <-> A+(aq) + B-(aq), giving Ksp = [A+][B-] = s * s = s^2. The Ksp directly equals the square of the molar solubility. A larger Ksp indicates a more soluble compound. For example, AgCl has Ksp = 1.8e-10 while AgBr has Ksp = 5.4e-13, meaning AgCl is more soluble.',
      'AB2': 'For a salt of type AB2 (e.g., CaF2, PbCl2), the dissolution produces one cation and two anions per formula unit. The equilibrium is AB2(s) <-> A2+(aq) + 2B-(aq), giving Ksp = [A2+][B-]^2 = s * (2s)^2 = 4s^3. The stoichiometric coefficient of B is squared in the equilibrium expression. When comparing solubilities of different salt types, you cannot simply compare Ksp values directly — you must calculate molar solubility from the appropriate expression for each type.',
      'A2B': 'For a salt of type A2B (e.g., Ag2CrO4), the dissolution produces two cations and one anion per formula unit. The equilibrium is A2B(s) <-> 2A+(aq) + B2-(aq), giving Ksp = [A+]^2[B2-] = (2s)^2 * s = 4s^3. Although the mathematical expression is identical to the AB2 case, the resulting ion concentrations are different: for A2B, [A+] = 2s and [B2-] = s, whereas for AB2, [A2+] = s and [B-] = 2s. This difference matters when calculating precipitation conditions or common ion effects.'
    };

    App.showFormulaRef('kspFormula',
      formulaStr,
      explanations[ionType] || '');
  },

  clear() {
    const container = document.getElementById('kspDirection')?.closest('.calc-card');
    if (container) App.clearInputs('#' + container.id);
    document.getElementById('kspResult').innerHTML = '';
    document.getElementById('kspFormula').innerHTML = '';
  }
};


// ──────────────────────────────────────────────
// 4. Empirical Formula Calculator
// ──────────────────────────────────────────────

const ChemistryEmpirical = {
  _rowCounter: 0,

  init() {
    const addBtn = document.getElementById('empirAddBtn');
    if (addBtn) addBtn.addEventListener('click', () => this.addElementRow());

    const calcBtn = document.getElementById('calcEmpirBtn');
    if (calcBtn) calcBtn.addEventListener('click', () => this.calculate());

    const clearBtn = document.getElementById('clearEmpirBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // Add two default rows
    this.addElementRow();
    this.addElementRow();
  },

  addElementRow() {
    const container = document.getElementById('empirElements');
    if (!container) return;

    this._rowCounter++;
    const rowId = `empirRow_${this._rowCounter}`;

    const row = document.createElement('div');
    row.className = 'form-row empir-element-row';
    row.id = rowId;
    row.style.display = 'flex';
    row.style.gap = '0.5rem';
    row.style.alignItems = 'center';
    row.style.marginBottom = '0.5rem';

    row.innerHTML = `
      <input type="text" class="input-field empir-symbol" placeholder="${I18N.get('element') || 'Element'} (e.g. C)"
             style="flex:1; text-transform:capitalize;" maxlength="2" />
      <input type="number" class="input-field empir-percent" placeholder="${I18N.get('percent_composition') || '% Composition'}"
             style="flex:1;" min="0" max="100" step="any" />
      <button class="btn btn--sm" onclick="ChemistryEmpirical.removeElementRow('${rowId}')" title="${I18N.get('remove_row') || 'Remove'}">X</button>
    `;

    container.appendChild(row);
  },

  removeElementRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
  },

  calculate() {
    const rows = document.querySelectorAll('.empir-element-row');
    if (rows.length === 0) {
      App.showResult('empirResult', I18N.get('result'),
        I18N.get('empir_add_elements') || 'Add at least one element with percent composition.');
      return;
    }

    const elements = [];

    for (const row of rows) {
      const symbolInput = row.querySelector('.empir-symbol');
      const percentInput = row.querySelector('.empir-percent');

      const symbol = (symbolInput?.value || '').trim();
      const percent = parseFloat(percentInput?.value);

      if (!symbol || isNaN(percent) || percent <= 0) continue;

      // Look up element from periodic table data
      const capitalSymbol = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
      const elData = ELEMENT_BY_SYMBOL[capitalSymbol];

      if (!elData) {
        App.showResult('empirResult', I18N.get('result'),
          `${I18N.get('empir_unknown_element') || 'Unknown element'}: ${capitalSymbol}`);
        return;
      }

      elements.push({
        symbol: capitalSymbol,
        percent: percent,
        atomicMass: elData.mass
      });
    }

    if (elements.length === 0) {
      App.showResult('empirResult', I18N.get('result'),
        I18N.get('empir_no_valid_data') || 'No valid element data found. Fill in element symbols and percentages.');
      return;
    }

    // Step 1: Convert percentages to moles
    const moles = elements.map(e => ({
      symbol: e.symbol,
      percent: e.percent,
      atomicMass: e.atomicMass,
      moles: e.percent / e.atomicMass
    }));

    // Step 2: Find the smallest mole value
    const smallestMole = Math.min(...moles.map(m => m.moles));

    // Step 3: Divide all by the smallest to get mole ratios
    const ratios = moles.map(m => ({
      symbol: m.symbol,
      moles: m.moles,
      ratio: m.moles / smallestMole
    }));

    // Step 4: Convert ratios to near-integers using iterative multiplication
    // Try multiplying by 1, 2, 3, ... up to 10 until all values are close to integers
    let bestMultiplier = 1;
    let bestFormula = '';

    for (let mult = 1; mult <= 10; mult++) {
      const multiplied = ratios.map(r => r.ratio * mult);
      const rounded = multiplied.map(v => Math.round(v));
      const isNearInteger = multiplied.every((v, idx) => Math.abs(v - rounded[idx]) < 0.05);

      if (isNearInteger) {
        bestMultiplier = mult;
        bestFormula = ratios.map((r, idx) => {
          const count = Math.round(r.ratio * mult);
          return count === 1 ? r.symbol : `${r.symbol}${count}`;
        }).join('');
        break;
      }
    }

    // If no clean integer found, show the raw ratios with 2 decimal places
    if (!bestFormula) {
      bestFormula = ratios.map(r => {
        const rounded = Math.round(r.ratio * 100) / 100;
        return rounded === 1 ? r.symbol : `${r.symbol}${rounded}`;
      }).join('');
    }

    // Build detailed breakdown
    let breakdown = ratios.map(r =>
      `${r.symbol}: ${r.percent}% / ${r.atomicMass} = ${r.moles.toFixed(4)} mol  (ratio: ${r.ratio.toFixed(4)})`
    ).join(' | ');

    App.showResult('empirResult', I18N.get('result'),
      `${I18N.get('empirical_formula') || 'Empirical Formula'}: ${bestFormula}  |  ${breakdown}`);

    App.showFormulaRef('empirFormula',
      'Empirical Formula = simplest whole-number ratio of moles of each element',
      'The empirical formula represents the simplest whole-number ratio of atoms in a compound. To find it: (1) Convert each element\'s mass percentage to moles by dividing by its atomic mass. (2) Divide all mole values by the smallest mole value to get ratios. (3) If ratios are not whole numbers, multiply by the smallest factor that converts all to integers. For example, 40% C, 6.7% H, 53.3% O gives C: 3.33 mol, H: 6.65 mol, O: 3.33 mol, yielding the ratio 1:2:1, so the empirical formula is CH2O (formaldehyde). The molecular formula is always a whole-number multiple of the empirical formula.'
    );
  },

  clear() {
    const container = document.getElementById('empirElements');
    if (container) container.innerHTML = '';
    document.getElementById('empirResult').innerHTML = '';
    document.getElementById('empirFormula').innerHTML = '';
    this._rowCounter = 0;

    // Re-add two default rows
    this.addElementRow();
    this.addElementRow();
  }
};
