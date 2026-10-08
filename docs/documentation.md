# Documentation · IDEC Wiki

============ 页头 ============

Documentation · records

# Lab records and downloads

This page has two parts:
**Lab Notebook**
a chronological record of every computational and wet-lab step, including setbacks and fixes;
**Download**
reports, raw data, computational code and safety documents. The records follow the project's DBTL cycle:
**Design → Build → Test → Learn**
。

Open the Lab Notebook
Jump to downloads
============ Lab Notebook ============
Lab Notebook

## Lab Notebook

Each record answers four questions: what we did, what we observed, what went wrong and what came next. Records 07–09 contain the core data of the paper and the problems they exposed.

Record 01
Responsible: Dry-Lab Group

### Project scoping and literature review

- Defined the target: the SAM-dependent methyltransferase MddH of marine microbial origin, using the reference sequence from *Marinobacter litoralis* SW-45（UE2）。
- Mapped the mechanism: H₂S is methylated to MeSH and then to DMS, with SAM as the methyl donor in both steps.
- Explored the application outlook: DMS is a platform molecule that can be oxidized further to DMSO or used for sulfur-containing chemical synthesis.

Record 02
Responsible: Dry-Lab Group

### Route A: structure prediction and molecular docking

- AlphaFold3 predicted the apo homotetramer of UE2; molecular dynamics simulations identified residues of interest.
- Molecular docking built the MddH–SAM–H₂S ternary complex model and mapped the substrate-binding pocket.
- Working hypothesis: SAM binding in UE2 is over-stabilized (early docking ≈ −7.9 kcal/mol), so weakening cofactor binding might accelerate turnover.
- Boltz-2 affinity ranking → three sites selected: E63Q, E91Q and T108I.

Record 03
Responsible: Dry-Lab Group

### FoldX stability prediction

- Used the FoldX plugin in YASARA-Structure to calculate ΔΔG (ΔG mutant − ΔG wild-type ）。
- E63Q +0.79 and E91Q +0.82 (mildly destabilizing); T108I +0.098 (nearly neutral).
- Double mutant E63Q/E91Q +1.66 (approximately additive); triple mutant +1.53 (weak epistatic compensation by T108I).

Record 04
Responsible: Wet-Lab Group

### Variant construction and sequencing validation

- Five variants (E63Q, E91Q, T108I, E63Q/E91Q and E63Q/E91Q/T108I) were synthesized by Sangon Biotech (Shanghai).
- Transformed into *E. coli* BL21(DE3); single colonies were sequenced to confirm that the mutations had been introduced correctly.
- Issue: one batch of PCR products gave weak bands; after adjusting the annealing temperature and extension time and purifying the DNA, normal bands returned.

Record 05
Responsible: Wet-Lab Group

### Expression and crude-lysate preparation

- Seed culture was inoculated into fresh LB, grown at 37 °C for 2.5 h, then held at 4 °C for 0.5 h.
- Induction with IPTG at a final concentration of 0.1 mM, 16 °C for 18 h.
- Cells were harvested at 4 °C, 8000 rpm, resuspended in PBS and sonicated on ice (5 s on / 10 s off, 1 min per cycle, up to 3 cycles); the supernatant after centrifugation was used as the crude lysate.

Record 06
Responsible: Wet-Lab Group

### Setting up the HS-GC assay

- 200 μL reaction: crude lysate + SAM (1 mM) + MeSH (1 mM), incubated at 28 °C for 3 h.
- The supernatant was transferred into a sealed headspace vial and analysed on an Agilent 8860B GC (N₂ carrier gas), integrating the DMS and MeSH peak areas.
- Calibration curve: √peak area = 3.1854C − 25.261, used to convert peak areas into absolute yields (nmol).

Record 07
Responsible: Wet-Lab Group

### Round-one activity results (crude lysates)

- Wild-type UE-2: 336.4 ± 2.6 nmol (100%, CV 0.8%).
- E91Q：353.5 ± 7.3 nmol（105.1%，P = 0.0045）；T108I：344.7 ± 7.9 nmol（102.5%，P = 0.199，ns）。
- E63Q: 16.4 ± 0.4 nmol (4.9%); E63Q/E91Q: 10.1 ± 2.7 nmol (3.0%); triple mutant: 29.2 ± 3.8 nmol (8.7%); all three P < 0.0001.
- One-way ANOVA: F(5,12) = 3979.5, P < 0.0001.

Record 08
Responsible: Wet-Lab / Dry-Lab Group

### Mechanistic clues from the product profile

- No DMS peak was detectable for E63Q and its combinatorial variants, whereas MeSH output was comparable to wild type → suggesting that the second step (MeSH → DMS) may be impaired.
- Note: the no-enzyme control in this batch also gave high MeSH peaks (1.24–1.77×10⁷), indicating considerable background interference.
- Quantitative confirmation requires stricter controls (heat-inactivated enzyme, SAM omission), so this is currently only a mechanistic clue.

Record 09
Responsible: Wet-Lab Group

### Reproducibility problems in the whole-cell batch

- Within the same whole-cell batch, the three wild-type replicates differed almost 20-fold in DMS peak area (CV 90.6%) and one value looked like a recording or transcription error.
- Assessment: the current whole-cell system still lacks adequate control of cell density, induction level and headspace sampling consistency.
- Action: quantitative conclusions rest on the crude-lysate data and whole-cell data are used qualitatively only; next we switch to standardized initial-rate kinetics.

Record 10
Responsible: Dry-Lab Group

### Route B: upgrading to a multidimensional consensus strategy

- Abandoned the single affinity metric in favour of three zero-shot predictors (ProtSSN, ProSST, TranceptEVE) plus the PLACER ligand-conformational gate.
- Added a ThermoMPNN stability red line (ΔΔG > +1 kcal/mol rejected outright) and sequence sanity checks (to avoid numbering errors).
- Saturation scanning of 45 residues within 8 Å of the round-one hits generated 855 single-point candidates (not yet built as a physical library).
- Consensus ranking produced the next-generation priority list: I46L, E91Q, S65T, S44T, V40I, plus E91A/D/N for mechanistic studies.

Record 11
Responsible: whole team

### Review and next-stage planning

- Conclusions: E91Q raised DMS production significantly (~5%); T108I essentially maintained wild-type activity; E63 is indispensable for catalysis; stacking substitutions gave no clear gain.
- Next 1: build and validate the Route B next-generation variants, all read out by standardized initial-rate kinetics.
- Next 2: feed the kinetic data back into the active-learning module, which nominates the next 16–32 variants, closing the DBTL loop.
- Next 3: co-express with the monooxygenase Tmm to explore the H₂S → MeSH → DMS → DMSO cascade and assess waste-sulfur valorization performance.

============ Download ============
Download

## Download reports and materials

All files live in
**assets/files/**
with filenames matching the paths below — the buttons download them directly. If a click does nothing, your browser is blocking local downloads: open the file straight from the
**assets/files/**
folder instead.

PDF

### Project report

The complete background, design, results and discussion — suitable as the main review document.

assets/files/idec-report.pdf
[Download](assets/files/idec-report.pdf)
XLSX

### HS-GC raw data table

Variant names, DMS and MeSH peak areas, and converted yields (nmol).

assets/files/idec-data.xlsx
[Download](assets/files/idec-data.xlsx)
ZIP

### Computational code and candidate rankings

Route A/B prediction pipelines, consensus scores and candidate lists (to be released on GitHub).

assets/files/idec-model.zip
[Download](assets/files/idec-model.zip)
PDF

### Laboratory protocol

Full parameters from template preparation, PCR and gel electrophoresis through expression, lysis and HS-GC.

assets/files/idec-protocol.pdf
[Download](assets/files/idec-protocol.pdf)
PDF

### Safety and ethics forms

H₂S / methanethiol risk control, plus strain and waste-handling records.

assets/files/idec-safety.pdf
[Download](assets/files/idec-safety.pdf)
**Data availability**
Wet-lab raw data are stored in
`Wet-lab HS-GC data.xlsx`
(variant names, DMS/MeSH peak areas and yields);The computational code and data are currently available for download via this Wiki, and will be subsequently released on GitHub.
