/* ============================================
   SCHEMATICA's Physics: Mechanics, Thermo, Electricity
   ============================================ */

const PhysicsCalculator = {
  init() {
    // Newton's Second Law
    const newtonBtn = document.getElementById('calcNewtonBtn');
    if (newtonBtn) newtonBtn.addEventListener('click', () => this.calcNewton());

    // Kinematics
    const kinBtn = document.getElementById('calcKinematicsBtn');
    if (kinBtn) kinBtn.addEventListener('click', () => this.calcKinematics());

    // Work & Energy
    const workBtn = document.getElementById('calcWorkBtn');
    if (workBtn) workBtn.addEventListener('click', () => this.calcWorkEnergy());

    // Ohm's Law
    const ohmBtn = document.getElementById('calcOhmBtn');
    if (ohmBtn) ohmBtn.addEventListener('click', () => this.calcOhm());

    // Wave equation
    const waveBtn = document.getElementById('calcWaveBtn');
    if (waveBtn) waveBtn.addEventListener('click', () => this.calcWave());

    // Clear buttons
    document.getElementById('clearNewtonBtn')?.addEventListener('click', () => this.clearNewton());
    document.getElementById('clearKinematicsBtn')?.addEventListener('click', () => this.clearKinematics());
    document.getElementById('clearWorkBtn')?.addEventListener('click', () => this.clearWork());
    document.getElementById('clearOhmBtn')?.addEventListener('click', () => this.clearOhm());
    document.getElementById('clearWaveBtn')?.addEventListener('click', () => this.clearWave());
  },

  calcNewton() {
    const F = parseFloat(document.getElementById('newtonF')?.value);
    const m = parseFloat(document.getElementById('newtonM')?.value);
    const a = parseFloat(document.getElementById('newtonA')?.value);

    const vals = [F, m, a];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 2) {
      App.showResult('newtonResult', I18N.get('result'), 'Fill in at least 2 of the 3 fields.');
      return;
    }

    let result = '';
    if (isNaN(F)) {
      result = `F = ${(m * a).toFixed(4)} N`;
    } else if (isNaN(m)) {
      result = `m = ${(F / a).toFixed(4)} kg`;
    } else {
      result = `a = ${(F / m).toFixed(4)} m/s^2`;
    }

    App.showResult('newtonResult', I18N.get('result'), result);

    App.showFormulaRef('newtonFormula',
      'F = m * a',
      'Newton\'s Second Law states that the net force on an object equals its mass times its acceleration. This is the foundation of classical mechanics, published by Isaac Newton in 1687 in Principia Mathematica. The law shows that force and acceleration are proportional, and mass is the resistance to acceleration (inertia).'
    );
  },

  clearNewton() {
    App.clearInputs('#newtonCalc');
    document.getElementById('newtonResult').innerHTML = '';
    document.getElementById('newtonFormula').innerHTML = '';
  },

  calcKinematics() {
    const v0 = parseFloat(document.getElementById('kinV0')?.value);
    const v = parseFloat(document.getElementById('kinV')?.value);
    const a = parseFloat(document.getElementById('kinA')?.value);
    const d = parseFloat(document.getElementById('kinD')?.value);
    const t = parseFloat(document.getElementById('kinT')?.value);

    // We need at least 3 of 5 values
    const vals = { v0, v, a, d, t };
    const known = Object.keys(vals).filter(k => !isNaN(vals[k]));

    if (known.length < 3) {
      App.showResult('kinematicsResult', I18N.get('result'), 'Fill in at least 3 of the 5 fields.');
      return;
    }

    let results = [];
    // v = v0 + at
    if (!isNaN(v0) && !isNaN(a) && !isNaN(t)) {
      const calcV = v0 + a * t;
      results.push(`v = ${calcV.toFixed(4)} m/s`);
    }
    // d = v0*t + 0.5*a*t^2
    if (!isNaN(v0) && !isNaN(a) && !isNaN(t)) {
      const calcD = v0 * t + 0.5 * a * t * t;
      results.push(`d = ${calcD.toFixed(4)} m`);
    }
    // v^2 = v0^2 + 2*a*d
    if (!isNaN(v0) && !isNaN(a) && !isNaN(d)) {
      const vSquared = v0 * v0 + 2 * a * d;
      results.push(`v = ${Math.sqrt(Math.abs(vSquared)).toFixed(4)} m/s`);
    }
    // d = (v + v0)/2 * t
    if (!isNaN(v) && !isNaN(v0) && !isNaN(t)) {
      const calcD = ((v + v0) / 2) * t;
      results.push(`d = ${calcD.toFixed(4)} m`);
    }

    if (results.length === 0) {
      results.push('Cannot solve with the given combination. Try: v0, a, t or v0, v, a.');
    }

    App.showResult('kinematicsResult', I18N.get('result'), results.join(' | '));

    App.showFormulaRef('kinematicsFormula',
      'v = v0 + at | d = v0*t + (1/2)*a*t^2 | v^2 = v0^2 + 2*a*d',
      'These are the kinematic equations (equations of motion) for constant acceleration. They relate the five variables: initial velocity (v0), final velocity (v), acceleration (a), displacement (d), and time (t). Derived from the definitions of velocity and acceleration through calculus, they are the core of classical mechanics for uniformly accelerated motion.'
    );
  },

  clearKinematics() {
    App.clearInputs('#kinematicsCalc');
    document.getElementById('kinematicsResult').innerHTML = '';
    document.getElementById('kinematicsFormula').innerHTML = '';
  },

  calcWorkEnergy() {
    const m = parseFloat(document.getElementById('weMass')?.value);
    const v = parseFloat(document.getElementById('weVelocity')?.value);
    const h = parseFloat(document.getElementById('weHeight')?.value);
    const g = 9.81;

    if (isNaN(m)) {
      App.showResult('workResult', I18N.get('result'), 'Enter mass value.');
      return;
    }

    const results = [];
    if (!isNaN(v)) {
      const KE = 0.5 * m * v * v;
      results.push(`KE = ${KE.toFixed(4)} J`);
    }
    if (!isNaN(h)) {
      const PE = m * g * h;
      results.push(`PE = ${PE.toFixed(4)} J`);
    }

    if (results.length === 0) {
      results.push('Enter velocity and/or height to calculate energy.');
    }

    App.showResult('workResult', I18N.get('result'), results.join(' | '));

    App.showFormulaRef('workFormula',
      'KE = (1/2)*m*v^2 | PE = m*g*h | W = F*d*cos(theta)',
      'Kinetic energy is the energy of motion, proportional to mass and the square of velocity. Potential energy is stored energy due to position in a gravitational field. The work-energy theorem states that net work equals the change in kinetic energy. These principles are consequences of the conservation of energy, one of the most fundamental laws in physics.'
    );
  },

  clearWork() {
    App.clearInputs('#workCalc');
    document.getElementById('workResult').innerHTML = '';
    document.getElementById('workFormula').innerHTML = '';
  },

  calcOhm() {
    const V = parseFloat(document.getElementById('ohmV')?.value);
    const I = parseFloat(document.getElementById('ohmI')?.value);
    const R = parseFloat(document.getElementById('ohmR')?.value);

    const vals = [V, I, R];
    const filled = vals.filter(v => !isNaN(v)).length;

    if (filled < 2) {
      App.showResult('ohmResult', I18N.get('result'), 'Fill in at least 2 of the 3 fields (V, I, R).');
      return;
    }

    let result = '';
    if (isNaN(V)) {
      result = `V = ${(I * R).toFixed(4)} V`;
    } else if (isNaN(I)) {
      result = `I = ${(V / R).toFixed(4)} A`;
    } else {
      result = `R = ${(V / I).toFixed(4)} ohm`;
    }

    const power = V * I;
    result += ` | P = ${power.toFixed(4)} W`;

    App.showResult('ohmResult', I18N.get('result'), result);

    App.showFormulaRef('ohmFormula',
      'V = I * R | P = V * I = I^2 * R = V^2 / R',
      'Ohm\'s Law, published by Georg Simon Ohm in 1827, states that the current through a conductor is proportional to the voltage and inversely proportional to the resistance. Power in electrical circuits is the rate of energy transfer. These equations are fundamental to circuit analysis and electrical engineering.'
    );
  },

  clearOhm() {
    App.clearInputs('#ohmCalc');
    document.getElementById('ohmResult').innerHTML = '';
    document.getElementById('ohmFormula').innerHTML = '';
  },

  calcWave() {
    const f = parseFloat(document.getElementById('waveFreq')?.value);
    const lambda = parseFloat(document.getElementById('waveLambda')?.value);
    const c = 3e8; // speed of light

    if (isNaN(f) && isNaN(lambda)) {
      App.showResult('waveResult', I18N.get('result'), 'Enter frequency or wavelength.');
      return;
    }

    let result = '';
    if (!isNaN(f) && isNaN(lambda)) {
      const calcLambda = c / f;
      result = `Wavelength = ${calcLambda.toExponential(4)} m`;
    } else if (isNaN(f) && !isNaN(lambda)) {
      const calcF = c / lambda;
      result = `Frequency = ${calcF.toExponential(4)} Hz`;
    } else {
      result = `v = f * lambda = ${(f * lambda).toExponential(4)} m/s | c = 3.00 x 10^8 m/s`;
    }

    App.showResult('waveResult', I18N.get('result'), result);

    App.showFormulaRef('waveFormula',
      'v = f * lambda | c = 3.00 x 10^8 m/s (EM waves in vacuum)',
      'The wave equation relates wave speed (v), frequency (f), and wavelength (lambda). For electromagnetic waves in vacuum, the speed is the speed of light c. This equation is fundamental to understanding all wave phenomena, from sound waves to light, radio waves, and X-rays. It was first established for light by James Clerk Maxwell in the 1860s.'
    );
  },

  clearWave() {
    App.clearInputs('#waveCalc');
    document.getElementById('waveResult').innerHTML = '';
    document.getElementById('waveFormula').innerHTML = '';
  }
};
