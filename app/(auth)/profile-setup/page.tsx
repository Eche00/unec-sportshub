'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Link from 'next/link'
import React, { useState } from 'react'
import { departmentOptionsByFaculty } from './departmentOptionsByFaculty'

const facultyOptions = [
    { label: "Faculty of Agriculture", value: "agriculture" },
    { label: "Faculty of Arts", value: "arts" },
    { label: "Faculty of Biological Sciences", value: "biological-sciences" },
    { label: "Faculty of Biomedical Sciences", value: "biomedical-sciences" },
    { label: "Faculty of Business Administration", value: "business-administration" },
    { label: "Faculty of Dentistry", value: "dentistry" },
    { label: "Faculty of Education", value: "education" },
    { label: "Faculty of Engineering", value: "engineering" },
    { label: "Faculty of Environmental Studies", value: "environmental-studies" },
    { label: "Faculty of Health Sciences", value: "health-sciences" },
    { label: "Faculty of Law", value: "law" },
    { label: "Faculty of Medical Sciences", value: "medical-sciences" },
    { label: "Faculty of Pharmaceutical Sciences", value: "pharmaceutical-sciences" },
    { label: "Faculty of Physical Sciences", value: "physical-sciences" },
    { label: "Faculty of Social Sciences", value: "social-sciences" },
    { label: "Faculty of Veterinary Medicine", value: "veterinary-medicine" },
    { label: "Faculty of Vocational Technical Education", value: "vocational-technical-education" },
];


export const classOptions = [
    { label: "100 Level", value: "100" },
    { label: "200 Level", value: "200" },
    { label: "300 Level", value: "300" },
    { label: "400 Level", value: "400" },
    { label: "500 Level", value: "500" },
    { label: "600 Level", value: "600" },
];
function page() {
    const [step, setStep] = useState(0)
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const departmentOptions =
        departmentOptionsByFaculty[selectedFaculty] || [];
    return (
        <div className=' bg-linear-to-b from-[var(--primary)] via-[var(--background)] via-15% to-[var(--background)] py-10'>
            {/* header */}
            <div className="text-center relative">
                <button onClick={() => setStep(step - 1)} disabled={step === 0} className="absolute top-0 left-0 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 12.002H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                        <path d="M10.9999 18.002C10.9999 18.002 5.00001 13.583 5 12.0019C4.99999 10.4208 11 6.00195 11 6.00195" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                    </svg>

                </button>

                <h2 className="text-[24px] font-medium tracking-tight text-[var(--foreground)]">
                    {step === 0 && "Personal"}
                    {step === 1 && "Academic"}
                    {step === 2 && "Sports"}
                </h2>
                <Link href="/get-started" aria-label="Back to get started" className="absolute top-0 right-0 z-30 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer touch-manipulation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77537 13.0944 4.52064 10.8606 4.01122L10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                        <path d="M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                    </svg>
                </Link>
            </div>

            <div className='flex items-center justify-center'>
                <div className="flex items-center justify-center gap-3 py-2">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className={`rounded-full transition-all duration-300 ${step === item
                                ? "w-[32px] h-[8px] bg-white"
                                : "w-[8px] h-[8px] bg-white/30"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* step 0 */}
            {step === 0 && (
                <section className="w-[90%] mx-auto">
                    <section className=" space-y-5 pt-5">
                        <div className="flex flex-col items-center ">
                            <span className=' bg-[#141414] w-[120px] h-[120px] rounded-full flex items-center justify-center'>
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M53.3334 56.0003C52.5681 46.0507 44.6105 38.1736 34.6534 37.5099L32.0001 37.3331C31.0523 37.3589 30.1691 37.3933 29.3355 37.4341C19.4667 37.9179 11.4245 46.1485 10.6667 56.0003" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                    <path d="M42.6666 18.6664C42.6666 24.5574 37.891 29.333 31.9999 29.333C26.1089 29.333 21.3333 24.5574 21.3333 18.6664C21.3333 12.7753 26.1089 7.99969 31.9999 7.99969C37.891 7.99969 42.6666 12.7753 42.6666 18.6664Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                </svg>

                            </span>
                        </div>
                        {/* username */}
                        <div className="flex flex-col items-start gap-2">
                            <label className="text-white text-[14px] font-medium">Username</label>
                            <Input type="text" name="name" placeholder="@john_doe" required />

                        </div>
                        {/* phone */}
                        <div className="flex flex-col items-start gap-2">
                            <label className="text-white text-[14px] font-medium">Phone</label>
                            <Input type="number" name="phone" placeholder="09123456789" required />

                        </div>
                        {/* gender */}
                        <div className="flex flex-col items-start gap-2">
                            <Select
                                label="Gender"
                                name="gender"
                                // value={formData.gender}
                                // onChange={handleChange}
                                placeholder="Select your gender"
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                ]}
                            />
                        </div>
                    </section>


                </section>
            )}
            {/* step 1 */}
            {step === 1 && (
                <section className="w-[90%] mx-auto">
                    <section className=" space-y-5 pt-5">
                        {/* faculty */}
                        <div className="flex flex-col items-start gap-2">
                            <Select
                                label="Faculty"
                                name="facultyId"
                                placeholder="Select your faculty"
                                options={facultyOptions}
                                value={selectedFaculty}
                                onChange={(e) => setSelectedFaculty(e.target.value)}
                            />
                        </div>
                        {/* departments */}
                        <Select
                            label="Department"
                            name="departmentId"
                            placeholder="Select your department"
                            options={departmentOptions}
                            disabled={!selectedFaculty}
                        />
                        {/* password */}
                        <div className="flex flex-col items-start gap-2">
                            <Select
                                label="Current Level"
                                name="classId"
                                placeholder="Select your level"
                                options={classOptions}
                            />
                        </div>


                    </section>


                </section>
            )}
            {/* step 2 */}
            {step === 2 && (
                <section className="w-[90%] mx-auto">
                    <section className=" space-y-5 pt-5">
                        {/* sports */}
                        <div className="flex flex-col items-start gap-2">
                            <Select
                                label="Sports"
                                name="sports"
                                // value={formData.gender}
                                // onChange={handleChange}
                                placeholder="Pick a sports"
                                options={[
                                    { label: "Football", value: "football" },
                                ]}
                            />

                        </div>
                        {/* position */}
                        <div className="flex flex-col items-start gap-2">
                            <div className="relative w-full">
                                <Select
                                    label="Position"
                                    name="position"
                                    // value={formData.gender}
                                    // onChange={handleChange}
                                    placeholder="Pick a sports"
                                    options={[
                                        { label: "Goalkeeper (GK)", value: "GK" },
                                        { label: "Right Back (RB)", value: "RB" },
                                        { label: "Left Back (LB)", value: "LB" },
                                        { label: "Centre Back (CB)", value: "CB" },
                                        { label: "Sweeper (SW)", value: "SW" },
                                        { label: "Right Wing Back (RWB)", value: "RWB" },
                                        { label: "Left Wing Back (LWB)", value: "LWB" },
                                        { label: "Defensive Midfielder (CDM)", value: "CDM" },
                                        { label: "Central Midfielder (CM)", value: "CM" },
                                        { label: "Attacking Midfielder (CAM)", value: "CAM" },
                                        { label: "Right Midfielder (RM)", value: "RM" },
                                        { label: "Left Midfielder (LM)", value: "LM" },
                                        { label: "Right Winger (RW)", value: "RW" },
                                        { label: "Left Winger (LW)", value: "LW" },
                                        { label: "Centre Forward (CF)", value: "CF" },
                                        { label: "Striker (ST)", value: "ST" },
                                        { label: "Second Striker (SS)", value: "SS" },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div className="flex flex-col items-start gap-2">
                            <Select
                                label="Shirt Number"
                                name="shirtNumber"
                                placeholder="Select your shirt number"
                                options={Array.from({ length: 22 }, (_, i) => ({
                                    label: `Number ${i + 1}`,
                                    value: String(i + 1),
                                }))}
                            />
                        </div>


                    </section>


                </section>
            )}

            {/* submit */}
            {step >= 2 ? <Button type="submit" variant="primary" onClick={() => setStep(step + 1)} className=" fixed bottom-4 left-1/2 -translate-x-1/2 !w-[90%] mx-auto py-3 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                {/* {loading ? ( */}
                {/* <div className="w-5 h-5 border-t-2 border-[var(--primary-foreground)] rounded-full animate-spin" /> */}
                {/* ) : ( */}
                <span className="flex items-center gap-2">Save</span>
                {/* )} */}
            </Button>
                : <Button type="submit" variant="primary" onClick={() => setStep(step + 1)} className=" fixed bottom-4 left-1/2 -translate-x-1/2 !w-[90%] mx-auto py-3 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                    Continue
                </Button>}
        </div>
    )
}

export default page




