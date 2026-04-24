/** @type {{ name: string; code: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[]} */
export const ALL_COURSES = [
  // ── Easy (15) ────────────────────────────────────────────────────────────────
  { name: 'Grade 12 University English',           code: 'ENG4U',  difficulty: 'Easy' },
  { name: 'Grade 11 University English',           code: 'ENG3U',  difficulty: 'Easy' },
  { name: 'Grade 10 Academic English',             code: 'ENG2D',  difficulty: 'Easy' },
  { name: 'Grade 9 Academic English',              code: 'ENG1D',  difficulty: 'Easy' },
  { name: 'Grade 12 Advanced Functions',           code: 'MHF4U',  difficulty: 'Easy' },
  { name: 'Grade 12 Calculus & Vectors',           code: 'MCV4U',  difficulty: 'Easy' },
  { name: 'Grade 11 University Functions',         code: 'MCR3U',  difficulty: 'Easy' },
  { name: 'Grade 10 Academic Mathematics',         code: 'MPM2D',  difficulty: 'Easy' },
  { name: 'Grade 12 University Biology',           code: 'SBI4U',  difficulty: 'Easy' },
  { name: 'Grade 12 University Chemistry',         code: 'SCH4U',  difficulty: 'Easy' },
  { name: 'Grade 12 University Physics',           code: 'SPH4U',  difficulty: 'Easy' },
  { name: 'Grade 10 Academic Science',             code: 'SNC2D',  difficulty: 'Easy' },
  { name: 'Grade 9 Academic Science',              code: 'SNC1D',  difficulty: 'Easy' },
  { name: 'Grade 10 Academic History: Canada',     code: 'CHC2D',  difficulty: 'Easy' },
  { name: 'Grade 12 University Canadian History',  code: 'CHI4U',  difficulty: 'Easy' },

  // ── Medium (15) ──────────────────────────────────────────────────────────────
  { name: 'Grade 12 University Kinesiology',                    code: 'PSK4U',  difficulty: 'Medium' },
  { name: 'Grade 11 Mixed Photography',                         code: 'AWQ3M',  difficulty: 'Medium' },
  { name: 'Grade 12 University Computer Science',               code: 'ICS4U',  difficulty: 'Medium' },
  { name: 'Grade 11 University Computer Science',               code: 'ICS3U',  difficulty: 'Medium' },
  { name: 'Grade 12 Mixed Visual Arts',                         code: 'AVI4M',  difficulty: 'Medium' },
  { name: 'Grade 12 Mixed Music, Grade 12',                     code: 'AMU4M',  difficulty: 'Medium' },
  { name: 'Grade 11 Mixed Drama',                               code: 'ADA3M',  difficulty: 'Medium' },
  { name: 'Grade 12 University Law',                            code: 'CLN4U',  difficulty: 'Medium' },
  { name: 'Grade 12 University Economics',                      code: 'CIA4U',  difficulty: 'Medium' },
  { name: 'Grade 11 Mixed Human Development & Families',        code: 'HHG3M',  difficulty: 'Medium' },
  { name: 'Grade 12 University Philosophy: Questions & Theories', code: 'HZT4U', difficulty: 'Medium' },
  { name: 'Grade 11 University Biology',                        code: 'SBI3U',  difficulty: 'Medium' },
  { name: 'Grade 11 University Chemistry',                      code: 'SCH3U',  difficulty: 'Medium' },
  { name: 'Grade 12 University Data Management',                code: 'MDM4U',  difficulty: 'Medium' },
  { name: 'Grade 11 University Physics',                        code: 'SPH3U',  difficulty: 'Medium' },

  // ── Hard (15) ────────────────────────────────────────────────────────────────
  { name: 'ESL Level C (OSSD)',                                  code: 'ESLCO',  difficulty: 'Hard' },
  { name: 'ESL Level D (OSSD)',                                  code: 'ESLDO',  difficulty: 'Hard' },
  { name: 'ESL Level E (OSSD)',                                  code: 'ESLEO',  difficulty: 'Hard' },
  { name: 'IB Grade 12 University Biology',                      code: 'SBI4UW', difficulty: 'Hard' },
  { name: 'Grade 12 University Earth & Space Science',           code: 'SES4U',  difficulty: 'Hard' },
  { name: 'Grade 10 Applied Mathematics',                        code: 'MFM2P',  difficulty: 'Hard' },
  { name: 'Grade 11 Mixed Instrumental Music',                   code: 'AMI3M',  difficulty: 'Hard' },
  { name: 'Grade 12 College Food & Nutrition Sciences',          code: 'HFA4C',  difficulty: 'Hard' },
  { name: 'Grade 11 University Anthropology, Psychology & Sociology', code: 'HSP3U', difficulty: 'Hard' },
  { name: 'Grade 12 Mixed Technological Design',                 code: 'TDJ4M',  difficulty: 'Hard' },
  { name: 'Grade 9 Academic Canadian Geography',                 code: 'CGC1D',  difficulty: 'Hard' },
  { name: 'Grade 12 University World History',                   code: 'CHW4U',  difficulty: 'Hard' },
  { name: 'Grade 12 University Latin',                           code: 'LVV4U',  difficulty: 'Hard' },
  { name: 'Grade 11 Mixed Financial Accounting Fundamentals',    code: 'BAF3M',  difficulty: 'Hard' },
  { name: 'Grade 10 Open Communications Technology',             code: 'TGJ2O',  difficulty: 'Hard' },
]

export function getCoursesByDifficulty(difficulty) {
  return ALL_COURSES.filter(c => c.difficulty === difficulty)
}

/** Fisher-Yates shuffle, returns a new array */
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
