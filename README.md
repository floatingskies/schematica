# SCHEMATICA

**Chemistry, Math, Physics & Biology Calculator**

A comprehensive academic tool designed for students and teachers, from high school to university level. Every formula includes its source and a detailed explanation so you learn not just the answer, but **why it works**.

---

## Features

### Chemistry (11 tools and calculation)
| Tool | Formula | Description |
|------|---------|-------------|
| Molar Mass | M = Σ(nᵢ × Mᵢ) | Calculate molar mass from any compound formula (e.g., H₂SO₄, NaCl) |
| Concentration | C = n/V = m/(M×V) | Molarity and g/L from solute mass and solution volume |
| Dilution | C₁V₁ = C₂V₂ | Solve for any missing variable in dilution problems |
| pH Calculator | pH = -log[H⁺] | Calculate pH, pOH, [H⁺], [OH⁻] from any one value |
| Ideal Gas Law | PV = nRT | Solve for P, V, n, or T |
| Limiting Reagent | min(nₐ/a, nᵦ/b) | Identify the limiting reagent in a reaction |
| Percent Yield | %Y = (actual/theoretical) × 100 | Calculate reaction efficiency |
| Gibbs Free Energy | G = H - TS | Determine spontaneity of a process |
| Nernst Equation | E = E₀ - (RT/nF)ln(Q) | Cell potential under non-standard conditions |
| Half-Life | t₁/₂ = ln(2)/k (1st order) | Zero, first, and second order kinetics |
| Gas Laws | Boyle, Charles, Gay-Lussac, Combined | All four gas law calculators |
| Colligative Properties | ΔT = K·m·i | Freezing point depression & boiling point elevation |
| Solubility Product | Ksp = s² (AB type) | Ksp ↔ molar solubility for AB, AB₂, A₂B |
| Empirical Formula | % → moles → ratios | Calculate empirical formula from percent composition |

### Math (10 tools and formulae)
| Tool | Formula | Description |
|------|---------|-------------|
| Quadratic Equation | x = (-b ± √Δ) / 2a | Real and complex roots |
| Statistics | Mean, Median, Mode, σ² | Full descriptive statistics from a data set |
| Logarithms | logₐ(x) = ln(x)/ln(a) | Natural, common, and custom base logarithms |
| Combinations & Permutations | P(n,r), C(n,r) | nPr and nCr calculations |
| Rule of Three | A/B = C/X | Direct and inverse proportion |
| Trigonometry | sin, cos, tan, csc, sec, cot | All 6 trig functions + identity reference |
| Linear System (2×2) | Cramer's Rule | Solve 2×2 systems, detect no/infinite solutions |
| Financial Math | J = P·r·t (simple), M = P(1+r)ᵗ (compound) | Interest and total amount |
| Scientific Notation | a × 10ᵇ | Convert to/from scientific notation |
| Percentage | X% of Y, % change | Three percentage calculation modes |

### Physics (12 tools)
| Tool | Formula | Description |
|------|---------|-------------|
| Newton's 2nd Law | F = ma | Force, mass, acceleration |
| Kinematics | v = v₀ + at, d = v₀t + ½at² | Uniformly accelerated motion (5 variables) |
| Work & Energy | KE = ½mv², PE = mgh | Kinetic and potential energy |
| Ohm's Law | V = IR | Voltage, current, resistance + power |
| Wave Equation | v = fλ | Frequency, wavelength, speed of light |
| Coulomb's Law | F = k|q₁q₂|/r² | Electrostatic force |
| Universal Gravitation | F = Gm₁m₂/r² | Gravitational force |
| Calorimetry | Q = mcΔT | Heat transfer + common specific heats table |
| Torque | τ = rFsin(θ) | Rotational force |
| Doppler Effect | f' = f(v±v_obs)/(v∓v_src) | Frequency shift for moving source/observer |
| Projectile Motion | R = v₀²sin(2θ)/g | Range, max height, flight time |
| Thin Lens Equation | 1/f = 1/dₒ + 1/dᵢ | Focal length, magnification, image type |

### Biology (7 tools for your arsenal)
| Tool | Formula | Description |
|------|---------|-------------|
| Punnett Square | Mendel's Laws | Genetic cross with visual grid + phenotype ratios |
| Hardy-Weinberg | p² + 2pq + q² = 1 | Allele and genotype frequencies |
| Population Growth | N(t) = N₀eʳᵗ (exp), logistic | Exponential and logistic growth models |
| Chi-Square Test | X² = Σ(O-E)²/E | Goodness of fit with critical values table |
| DNA/RNA Transcription | A→U, T→A, G→C, C→G | Transcription, complement, and amino acid translation |
| Blood Types | ABO/Rh compatibility | Donor/receiver compatibility for all 8 types |
| BMI Calculator | BMI = weight/height² | Body mass index with category classification |

### Converters (12 tools if you are a nerd)
| Converter | Units |
|-----------|-------|
| Temperature | °C, °F, K |
| Pressure | atm, mmHg, kPa, torr, bar, psi |
| Volume | L, mL, cm³, m³, gal |
| Mass | g, kg, mg, μg, lb, oz |
| Concentration | mol/L, g/L, mmol/L, mg/L, ppm |
| Energy | J, kJ, cal, kcal, eV, kWh, BTU |
| Length | m, km, cm, mm, μm, nm, mi, yd, ft, in |
| Time | s, min, h, day, week, month, year |
| Speed | m/s, km/h, mph, kn, ft/s, Mach |
| Density | kg/m³, g/cm³, g/mL, lb/ft³, lb/gal |
| Area | m², km², cm², ha, acre, ft², in² |
| Power | W, kW, hp, BTU/h, cal/s |

### Periodic Table
- Interactive table with all 118 elements
- Click any element for detailed info (atomic mass, group, period, category)
- Color-coded by element category (alkali metals, noble gases, etc.)

---

## Also you can switch languages instantly using the EN/PT/ES buttons in the header (desktop) or sidebar (mobile).

---

## The design itself

**Neo-Brutalist** aesthetic with:
- Bold 3px borders with offset box shadows
- Raw, high-contrast color palette
- Space Grotesk + Space Mono + JetBrains Mono typography
- Monospace result displays with terminal-style `>` prefix
- Purple formula reference boxes with shadow
- Sticky sidebar navigation with search

---

## Our tech Stack

- **HTML5**, Semantic structure
- **CSS3**, Custom properties, Grid, Flexbox, responsive media queries
- **Vanilla JavaScript**, Zero frameworks, zero dependencies
- **Google Fonts**, Space Grotesk, Space Mono, JetBrains Mono

---

## Project Structure

```
schematica/
├── index.html                          # Main SPA shell (all pages)
├── assets/
│   └── favicon.svg                     # Neo-brutalist favicon
├── css/
│   ├── styles.css                      # Design system + components
│   └── layout.css                      # Layout + responsive
├── js/
│   ├── core/
│   │   ├── app.js                      # Router, navigation, utilities
│   │   ├── i18n.js                     # Internationalization (EN/PT/ES)
│   │   └── periodic-table.js           # Element data + parser
│   ├── chemistry/
│   │   ├── molar-mass.js               # Molar mass calculator
│   │   ├── solutions.js                # Concentration, dilution, pH
│   │   ├── stoichiometry.js            # Ideal gas, limiting reagent, yield
│   │   ├── thermochemistry.js          # Gibbs free energy
│   │   ├── electrochemistry.js         # Nernst equation
│   │   ├── kinetics.js                 # Half-life calculator
│   │   ├── organic.js                  # Functional groups + acid/base refs
│   │   └── chemistry-advanced.js       # Gas laws, colligative, Ksp, empirical
│   ├── math/
│   │   ├── calculator.js               # Quadratic, stats, logs, comb, rule of 3
│   │   └── math-advanced.js            # Trig, linear system, financial, sci notation, %
│   ├── physics/
│   │   ├── physics.js                  # Newton, kinematics, work, Ohm, waves
│   │   └── physics-advanced.js         # Coulomb, gravitation, calorimetry, torque, Doppler, projectile, lenses
│   ├── biology/
│   │   ├── biology.js                  # Punnett, Hardy-Weinberg, population
│   │   └── biology-advanced.js         # Chi-square, DNA/RNA, blood types, BMI
│   └── converters/
│       ├── converters.js               # Temperature, pressure, volume, mass, concentration, energy
│       └── converters-advanced.js      # Length, time, speed, density, area, power
```
---
## License
GPL, Free and open source.
