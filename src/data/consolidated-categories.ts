export interface ConsolidatedCategory {
  slug: string;
  name: string;
  description: string;
  sourceCategories: string[];
  featuredProducts: string[];
  sortOrder: number;
}

export const consolidatedCategories: ConsolidatedCategory[] = [
  {
    slug: 'weight-management',
    name: 'Weight Management',
    description: 'GLP-1 agonists, fat-loss compounds, and metabolic peptides for body composition and appetite regulation.',
    sourceCategories: ['GLP-1 / Weight Management', 'Fat Loss', 'Metabolic Health'],
    featuredProducts: ['Semaglutide', 'Tirzepatide', 'Retatrutide', 'AOD-9604'],
    sortOrder: 1,
  },
  {
    slug: 'growth-hormone',
    name: 'Growth Hormone',
    description: 'HGH, secretagogues, and growth factors that support natural growth hormone release, repair, and recovery.',
    sourceCategories: ['Growth Hormone', 'Growth Hormone Secretagogue', 'Growth & Repair'],
    featuredProducts: ['HGH 191AA (Somatropin)', 'Sermorelin Acetate', 'Ipamorelin', 'CJC-1295 With DAC'],
    sortOrder: 2,
  },
  {
    slug: 'brain-sleep-wellness',
    name: 'Brain, Sleep & Wellness',
    description: 'Nootropics, sleep peptides, immune modulators, and antioxidants for cognitive clarity and whole-body wellness.',
    sourceCategories: ['Cognitive / Neuro', 'Sleep & Recovery', 'Immune Support', 'Performance', 'Antioxidant / Detox'],
    featuredProducts: ['Cerebrolysin', 'Selank', 'LL-37', 'DSIP (Delta Sleep-Inducing Peptide)'],
    sortOrder: 3,
  },
  {
    slug: 'anti-aging-skin',
    name: 'Anti-Aging & Skin',
    description: 'Senolytics, telomere support, copper peptides, and skin-rejuvenation compounds for longevity and appearance.',
    sourceCategories: ['Anti-Aging / Longevity', 'Skin & Anti-Aging', 'Tanning / Skin'],
    featuredProducts: ['NAD+', 'Epithalon', 'GHK-Cu', 'Melanotan 2 (MT-2)'],
    sortOrder: 4,
  },
  {
    slug: 'hormonal-health',
    name: 'Hormonal Health',
    description: 'Gonadotropins, reproductive peptides, and hormonal support compounds for balance and fertility.',
    sourceCategories: ['Hormonal Support', 'Sexual Health'],
    featuredProducts: ['HCG', 'Gonadorelin Acetate', 'PT-141 (Bremelanotide)'],
    sortOrder: 5,
  },
  {
    slug: 'healing-recovery',
    name: 'Healing & Recovery',
    description: 'Tissue-repair peptides and anti-inflammatory compounds for accelerated healing of muscles, tendons, and gut.',
    sourceCategories: ['Healing & Recovery', 'Anti-Inflammatory'],
    featuredProducts: ['BPC-157', 'TB-500 (Thymosin Beta-4 Acetate)', 'KPV'],
    sortOrder: 6,
  },
  {
    slug: 'specialty-blends-research',
    name: 'Specialty Blends & Research',
    description: 'Multi-peptide blends for targeted protocols and research-grade compounds for investigation.',
    sourceCategories: ['Blend / Combo', 'Research'],
    featuredProducts: ['BBG70 (GLOW Blend)', 'Super Human Blend', 'Dermorphin'],
    sortOrder: 7,
  },
  {
    slug: 'supplies-essentials',
    name: 'Supplies & Essentials',
    description: 'Bacteriostatic water, reconstitution acids, and essential vitamins for peptide preparation.',
    sourceCategories: ['Supplies', 'Vitamins'],
    featuredProducts: ['Bacteriostatic Water', 'B12', 'Acetic Acid 0.6%'],
    sortOrder: 8,
  },
];
