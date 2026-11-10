export const departmentOptionsByFaculty: Record<
    string,
    { label: string; value: string }[]
> = {
    agriculture: [
        { label: "Agricultural Economics", value: "agricultural-economics" },
        { label: "Agricultural Extension", value: "agricultural-extension" },
        { label: "Animal Science", value: "animal-science" },
        { label: "Crop Science", value: "crop-science" },
        { label: "Food Science and Technology", value: "food-science-and-technology" },
        { label: "Home Science and Management", value: "home-science-and-management" },
        { label: "Nutrition and Dietetics", value: "nutrition-and-dietetics" },
        { label: "Soil Science", value: "soil-science" },
    ],

    arts: [
        { label: "Archaeology and Tourism", value: "archaeology-and-tourism" },
        { label: "English and Literary Studies", value: "english-and-literary-studies" },
        { label: "Fine and Applied Arts", value: "fine-and-applied-arts" },
        { label: "Foreign Languages and Literature", value: "foreign-languages-and-literature" },
        { label: "History and International Studies", value: "history-and-international-studies" },
        { label: "Linguistics, Igbo and Other Nigerian Languages", value: "linguistics-igbo-and-other-nigerian-languages" },
        { label: "Mass Communication", value: "mass-communication" },
        { label: "Music", value: "music" },
        { label: "Theatre and Film Studies", value: "theatre-and-film-studies" },
    ],

    "biological-sciences": [
        { label: "Biochemistry", value: "biochemistry" },
        { label: "Genetics and Biotechnology", value: "genetics-and-biotechnology" },
        { label: "Microbiology", value: "microbiology" },
        { label: "Plant Science and Biotechnology", value: "plant-science-and-biotechnology" },
        { label: "Zoology and Environmental Biology", value: "zoology-and-environmental-biology" },
    ],

    "biomedical-sciences": [
        { label: "Anatomy", value: "anatomy" },
        { label: "Medical Biochemistry", value: "medical-biochemistry" },
        { label: "Physiology", value: "physiology" },
    ],

    "business-administration": [
        { label: "Accountancy", value: "accountancy" },
        { label: "Banking and Finance", value: "banking-and-finance" },
        { label: "Management", value: "management" },
        { label: "Marketing", value: "marketing" },
    ],

    dentistry: [
        { label: "Child Dental Health", value: "child-dental-health" },
        { label: "Oral and Maxillofacial Surgery", value: "oral-and-maxillofacial-surgery" },
        { label: "Preventive Dentistry", value: "preventive-dentistry" },
        { label: "Restorative Dentistry", value: "restorative-dentistry" },
    ],

    education: [
        { label: "Adult Education", value: "adult-education" },
        { label: "Arts Education", value: "arts-education" },
        { label: "Computer Education", value: "computer-education" },
        { label: "Educational Foundations", value: "educational-foundations" },
        { label: "Human Kinetics and Health Education", value: "human-kinetics-and-health-education" },
        { label: "Library and Information Science", value: "library-and-information-science" },
        { label: "Science Education", value: "science-education" },
        { label: "Social Science Education", value: "social-science-education" },
        { label: "Vocational Teacher Education", value: "vocational-teacher-education" },
    ],

    engineering: [
        { label: "Agricultural and Bioresources Engineering", value: "agricultural-and-bioresources-engineering" },
        { label: "Biomedical Engineering", value: "biomedical-engineering" },
        { label: "Civil Engineering", value: "civil-engineering" },
        { label: "Electrical Engineering", value: "electrical-engineering" },
        { label: "Electronic Engineering", value: "electronic-engineering" },
        { label: "Mechanical Engineering", value: "mechanical-engineering" },
        { label: "Mechatronic Engineering", value: "mechatronic-engineering" },
        { label: "Metallurgical and Materials Engineering", value: "metallurgical-and-materials-engineering" },
    ],

    "environmental-studies": [
        { label: "Architecture", value: "architecture" },
        { label: "Estate Management", value: "estate-management" },
        { label: "Geoinformatics and Surveying", value: "geoinformatics-and-surveying" },
        { label: "Urban and Regional Planning", value: "urban-and-regional-planning" },
    ],

    "health-sciences": [
        { label: "Health Administration and Management", value: "health-administration-and-management" },
        { label: "Medical Laboratory Sciences", value: "medical-laboratory-sciences" },
        { label: "Medical Radiography and Radiological Sciences", value: "medical-radiography-and-radiological-sciences" },
        { label: "Medical Rehabilitation", value: "medical-rehabilitation" },
        { label: "Nursing Sciences", value: "nursing-sciences" },
    ],

    law: [
        { label: "Commercial and Corporate Law", value: "commercial-and-corporate-law" },
        { label: "Customary and Indigenous Law", value: "customary-and-indigenous-law" },
        { label: "International and Comparative Law", value: "international-and-comparative-law" },
        { label: "Jurisprudence and Legal Theory", value: "jurisprudence-and-legal-theory" },
        { label: "Property Law", value: "property-law" },
        { label: "Public Law", value: "public-law" },
    ],

    "medical-sciences": [
        { label: "Anaesthesia", value: "anaesthesia" },
        { label: "Anatomy", value: "anatomy" },
        { label: "Chemical Pathology", value: "chemical-pathology" },
        { label: "Community Medicine", value: "community-medicine" },
        { label: "Dermatology", value: "dermatology" },
        { label: "Haematology and Immunology", value: "haematology-and-immunology" },
        { label: "Medical Biochemistry", value: "medical-biochemistry" },
        { label: "Medical Microbiology", value: "medical-microbiology" },
        { label: "Morbid Anatomy", value: "morbid-anatomy" },
        { label: "Obstetrics and Gynaecology", value: "obstetrics-and-gynaecology" },
        { label: "Ophthalmology", value: "ophthalmology" },
        { label: "Otolaryngology", value: "otolaryngology" },
        { label: "Paediatrics", value: "paediatrics" },
        { label: "Paediatric Surgery", value: "paediatric-surgery" },
        { label: "Pharmacology and Therapeutics", value: "pharmacology-and-therapeutics" },
        { label: "Physiology", value: "physiology" },
        { label: "Radiation Medicine", value: "radiation-medicine" },
        { label: "Surgery", value: "surgery" },
    ],

    "pharmaceutical-sciences": [
        { label: "Clinical Pharmacy and Pharmacy Management", value: "clinical-pharmacy-and-pharmacy-management" },
        { label: "Pharmaceutical and Medicinal Chemistry", value: "pharmaceutical-and-medicinal-chemistry" },
        { label: "Pharmaceutical Microbiology and Biotechnology", value: "pharmaceutical-microbiology-and-biotechnology" },
        { label: "Pharmaceutical Technology and Industrial Pharmacy", value: "pharmaceutical-technology-and-industrial-pharmacy" },
        { label: "Pharmacognosy and Environmental Medicines", value: "pharmacognosy-and-environmental-medicines" },
        { label: "Pharmacology and Toxicology", value: "pharmacology-and-toxicology" },
        { label: "Pharmaceutics", value: "pharmaceutics" },
    ],

    "physical-sciences": [
        { label: "Computer Science", value: "computer-science" },
        { label: "Geology", value: "geology" },
        { label: "Mathematics", value: "mathematics" },
        { label: "Physics and Astronomy", value: "physics-and-astronomy" },
        { label: "Pure and Industrial Chemistry", value: "pure-and-industrial-chemistry" },
        { label: "Science Laboratory Technology", value: "science-laboratory-technology" },
        { label: "Statistics", value: "statistics" },
    ],

    "social-sciences": [
        { label: "Economics", value: "economics" },
        { label: "Geography", value: "geography" },
        { label: "Philosophy", value: "philosophy" },
        { label: "Political Science", value: "political-science" },
        { label: "Psychology", value: "psychology" },
        { label: "Public Administration and Local Government", value: "public-administration-and-local-government" },
        { label: "Religion and Cultural Studies", value: "religion-and-cultural-studies" },
        { label: "Social Work", value: "social-work" },
        { label: "Sociology and Anthropology", value: "sociology-and-anthropology" },
    ],

    "veterinary-medicine": [
        { label: "Veterinary Anatomy", value: "veterinary-anatomy" },
        { label: "Veterinary Medicine", value: "veterinary-medicine" },
        { label: "Veterinary Obstetrics and Reproductive Diseases", value: "veterinary-obstetrics-and-reproductive-diseases" },
        { label: "Veterinary Parasitology and Entomology", value: "veterinary-parasitology-and-entomology" },
        { label: "Veterinary Pathology and Microbiology", value: "veterinary-pathology-and-microbiology" },
        { label: "Veterinary Physiology and Pharmacology", value: "veterinary-physiology-and-pharmacology" },
        { label: "Veterinary Public Health and Preventive Medicine", value: "veterinary-public-health-and-preventive-medicine" },
        { label: "Veterinary Surgery", value: "veterinary-surgery" },
    ],

    "vocational-technical-education": [
        { label: "Agricultural Education", value: "agricultural-education" },
        { label: "Business Education", value: "business-education" },
        { label: "Computer Education", value: "computer-education" },
        { label: "Home Economics and Hospitality Management Education", value: "home-economics-and-hospitality-management-education" },
        { label: "Industrial Technical Education", value: "industrial-technical-education" },
    ],
};