# IDEC Wiki · Semi-rational Engineering of the Marine Sulfur-Cycle Enzyme MddH

============ HERO ============
IDEC Wiki

# A new enzyme from the sea engineered to do more

**MddH**
is an SAM-dependent methyltransferase of marine microbial origin that performs two successive methylations on waste-gas-derived
**hydrogen sulfide (H₂S)**
to give
**methanethiol (MeSH)**
, and then the organosulfur platform molecule
**dimethyl sulfide (DMS)**
. It is further converted into the organosulfur platform molecule
**dimethyl sulfide (DMS)**
. Wild-type MddH has low affinity for H₂S and suffers severe substrate inhibition at high sulfide concentrations; through semi-rational design and an iterative dry-lab / wet-lab loop we successfully enhanced its catalytic performance.

[View Project](project.html)
**Key enzyme**
MddH (SAM-dependent methyltransferase)
**Reaction**
H₂S → MeSH → DMS
**Strategy**
Semi-rational design + DBTL loop
**Best variant**
E91Q · DMS +5.1%
Scroll
**
============ 挑战赛指路（醒目入口） ============
iDEC 2026 Challenge

## Fitting pRK24 conjugation with a tunable “throttle”

Beyond engineering MddH, we also took part in the iDEC 2026 Challenge: using
**the pRK24 conjugation system**
as our target, we designed a candidate-regulator matrix, a standardized three-day protocol and the seven required controls, and evaluated regulation through conjugation efficiency and composite performance scores. The full design, protocols and scoring tables live on a dedicated page.

**System**
pRK24 / RK2 conjugation system
**Control**
KorA · KorB · TrbA candidate regulators
**Protocol**
Three-day standardized protocol + 7 required controls
**Readout**
Conjugation efficiency and composite score S
[Open the Challenge page](挑战赛.html)
[View scoring metrics & summary table](挑战赛.html#scoring)
============ ABOUT ============
About the project

## Handing waste-gas sulfur to a marine enzyme

H₂S is a common inorganic sulfur pollutant in industrial waste gas, whereas DMS is a platform molecule linking inorganic sulfur to organosulfur chemicals. Our goal is to let MddH of marine microbial origin convert the former efficiently into the latter — and the first step is to understand why it is not fast enough yet.

Question

### What we set out to answer

Which residues in the substrate-binding pocket govern MddH catalysis, and can replacing them improve the efficiency of H₂S → MeSH → DMS conversion?

Keywords: ternary complex model · binding pocket · stability ΔΔG · DBTL loop

Methods

### How we do it

- Homology alignment plus molecular docking to build the MddH–SAM–H₂S ternary complex model
- AlphaFold3 structure prediction, molecular dynamics simulation and FoldX ΔΔG calculations to filter out destabilizing substitutions
- Site-directed mutagenesis to build single and combinatorial variants, expressed in *E. coli* BL21(DE3)
- Crude-lysate catalysis and headspace GC quantification of MeSH and DMS
- Wet-lab results fed back to the dry-lab team, whose multidimensional consensus strategy nominates the next-generation candidates

Why it matters

### Why it matters

DMS can be further oxidized to DMSO, or serve as a methyl/sulfur donor precursor for the biosynthesis of methionine and sulfur-containing fine chemicals — it links inorganic and organic sulfur.

In other words: engineering this single enzyme provides a promising biological part for valorizing industrial waste sulfur.

**Data sources**
The numbers on this page come from the project's formal paper: crude-lysate activity of five variants (n = 3), FoldX stability predictions and the Route B consensus ranking.
**3**
Key residues (E63 / E91 / T108)
**5**
Site-directed variants characterized
**855**
Pocket saturation-scan candidates (in silico,Waiting for verification)
**5.1%**
Relative DMS-activity gain of E91Q
============ 长卷：从浑浊到生机 ============

01 · Scientific question

### Waste-gas sulfur and one marine enzyme

H₂S is a toxic inorganic sulfur species in industrial waste gas; DMS is a platform molecule with downstream value. MddH of marine microbial origin methylates it in two successive steps to reach DMS, yet the wild-type enzyme binds gaseous H₂S poorly and is strongly inhibited at high sulfide levels.

02 · Computational design

### Compute first, then pipette

Homology alignment plus molecular docking to build the MddH–SAM–H₂S ternary complex model; AlphaFold3 structures, molecular dynamics to validate binding poses and FoldX ΔΔG calculations that discard destabilizing substitutions first pointed to three sites: E63, E91 and T108.

03 · Wet-lab validation

### Let the data speak

Five variants were built and expressed in
*E. coli*
, then assayed with crude lysates and headspace GC. The result was unambiguous: E91Q raised DMS production by 5.1% (P = 0.0045), whereas mutating E63 dropped activity below 10% of wild type.

04 · Closing the loop

### Turning setbacks into inputs

The lessons of round one were written back into the model: three-predictor consensus + a stability red line + a ligand conformational gate, which generated 855 candidates. Next we will validate the next-generation candidates and co-express them with the monooxygenase Tmm, exploring the potential of the H₂S → MeSH → DMS → DMSO cascade.

Progress

Scroll down · from wild type to engineered variant

============ 环境保护意义 ============
Why we care

## Why this matters for the environment and for industry

The marine sulfur cycle is not an abstract term: it links marine microbes, atmospheric chemistry and industrially emitted sulfur along a single pathway.

### Atmospheric chemistry & climate

DMS is one of the main forms in which the ocean delivers sulfur to the atmosphere; its oxidation product, sulfate aerosol, can act as cloud condensation nuclei and thus affect cloud albedo and the surface radiation budget.

Understanding the MddH route also sharpens our picture of where marine DMS comes from.

### Marine microbial resources

MddH comes from marine microorganisms and is one sample of marine genetic resources; clarifying its function and structural mechanism builds the groundwork for developing functional enzymes from the ocean.

From “finding a strain” to “actually using an enzyme part”.

### Waste-sulfur valorization

Waste-gas H₂S is traditionally desulfurized rather than converted into valuable products. Turning H₂S into a platform molecule such as DMS means that engineering this enzyme supplies a promising biological part for valorizing industrial waste sulfur.

The next-stage goal is to extend the cascade to DMSO: H₂S → MeSH → DMS → DMSO.

Predict, validate, improve —

turning every setback into an input for the next design round.

— from the first page of our lab notebook

============ 快捷入口 ============
Explore the wiki

## Five sections, one story

[01 · Team Photo wall Click a portrait to flip it and meet another side of the team.](team.html)
[02 · Project The full project Background & hypothesis · Design · Results · Supplement · Protocols](project.html)
[03 · Documentation Records & downloads Lab notebook and downloadable report files.](documentation.html)
04 · Story The scroll: from wild type to engineered variant Replay the scrolling scene that runs from waste-gas H₂S to the platform molecule DMS.
[05 · Challenge Challenge: pRK24 conjugation control Design, protocols and scoring tables of the iDEC 2026 Challenge.](挑战赛.html)
