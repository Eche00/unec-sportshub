'use client'
import React, { useState } from 'react'


export const dummyPlayers = [
    {
        uid: "player_001",
        userId: "player_001",
        playerId: "player_001",
        fullName: "Eche",
        userName: "eche_codes",
        email: "eche@example.com",
        bio: null,
        classId: "400",
        departmentId: "anatomy",
        facultyId: "medical-sciences",
        gender: "male",
        phone: "09130721061",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "LW",
        preferredFoot: "right",
        shirtNumber: 17,
        statistics: {
            matchesPlayed: 24,
            goalsScored: 12,
            assists: 8,
            minutesPlayed: 1860,
            yellowCards: 3,
            redCards: 0,
        },
    },
    {
        uid: "player_002",
        userId: "player_002",
        playerId: "player_002",
        fullName: "David Okafor",
        userName: "david_okafor",
        email: "david@example.com",
        bio: null,
        classId: "300",
        departmentId: "computer-science",
        facultyId: "physical-sciences",
        gender: "male",
        phone: "08012345671",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "ST",
        preferredFoot: "right",
        shirtNumber: 9,
        statistics: {
            matchesPlayed: 21,
            goalsScored: 18,
            assists: 5,
            minutesPlayed: 1750,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_003",
        userId: "player_003",
        playerId: "player_003",
        fullName: "Chiamaka Eze",
        userName: "chiamaka_eze",
        email: "chiamaka@example.com",
        bio: null,
        classId: "200",
        departmentId: "law",
        facultyId: "law",
        gender: "female",
        phone: "08012345672",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CM",
        preferredFoot: "right",
        shirtNumber: 8,
        statistics: {
            matchesPlayed: 19,
            goalsScored: 4,
            assists: 11,
            minutesPlayed: 1620,
            yellowCards: 1,
            redCards: 0,
        },
    },
    {
        uid: "player_004",
        userId: "player_004",
        playerId: "player_004",
        fullName: "Samuel Nwosu",
        userName: "sam_nwosu",
        email: "samuel@example.com",
        bio: null,
        classId: "400",
        departmentId: "economics",
        facultyId: "social-sciences",
        gender: "male",
        phone: "08012345673",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "pending",
        universityId: "unec",
        sports: "football",
        position: "CB",
        preferredFoot: "left",
        shirtNumber: 4,
        statistics: {
            matchesPlayed: 16,
            goalsScored: 1,
            assists: 2,
            minutesPlayed: 1400,
            yellowCards: 4,
            redCards: 1,
        },
    },
    {
        uid: "player_005",
        userId: "player_005",
        playerId: "player_005",
        fullName: "Precious Obi",
        userName: "precious_obi",
        email: "precious@example.com",
        bio: null,
        classId: "100",
        departmentId: "nursing-science",
        facultyId: "medical-sciences",
        gender: "female",
        phone: "08012345674",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "GK",
        preferredFoot: "right",
        shirtNumber: 1,
        statistics: {
            matchesPlayed: 20,
            goalsScored: 0,
            assists: 1,
            minutesPlayed: 1800,
            yellowCards: 1,
            redCards: 0,
        },
    },
    {
        uid: "player_006",
        userId: "player_006",
        playerId: "player_006",
        fullName: "Michael Ugwu",
        userName: "michael_ugwu",
        email: "michael@example.com",
        bio: null,
        classId: "300",
        departmentId: "electrical-engineering",
        facultyId: "engineering",
        gender: "male",
        phone: "08012345675",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "RB",
        preferredFoot: "right",
        shirtNumber: 2,
        statistics: {
            matchesPlayed: 22,
            goalsScored: 2,
            assists: 6,
            minutesPlayed: 1900,
            yellowCards: 3,
            redCards: 0,
        },
    },
    {
        uid: "player_007",
        userId: "player_007",
        playerId: "player_007",
        fullName: "Adaeze Okoro",
        userName: "adaeze_okoro",
        email: "adaeze@example.com",
        bio: null,
        classId: "200",
        departmentId: "mass-communication",
        facultyId: "arts",
        gender: "female",
        phone: "08012345676",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "pending",
        universityId: "unec",
        sports: "football",
        position: "LW",
        preferredFoot: "left",
        shirtNumber: 11,
        statistics: {
            matchesPlayed: 12,
            goalsScored: 6,
            assists: 3,
            minutesPlayed: 900,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_008",
        userId: "player_008",
        playerId: "player_008",
        fullName: "Emmanuel Ofor",
        userName: "emmanuel_ofor",
        email: "emmanuel@example.com",
        bio: null,
        classId: "500",
        departmentId: "medicine",
        facultyId: "medical-sciences",
        gender: "male",
        phone: "08012345677",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CDM",
        preferredFoot: "right",
        shirtNumber: 6,
        statistics: {
            matchesPlayed: 25,
            goalsScored: 3,
            assists: 7,
            minutesPlayed: 2100,
            yellowCards: 5,
            redCards: 0,
        },
    },
    {
        uid: "player_009",
        userId: "player_009",
        playerId: "player_009",
        fullName: "Blessing Onah",
        userName: "blessing_onah",
        email: "blessing@example.com",
        bio: null,
        classId: "300",
        departmentId: "political-science",
        facultyId: "social-sciences",
        gender: "female",
        phone: "08012345678",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "RW",
        preferredFoot: "right",
        shirtNumber: 7,
        statistics: {
            matchesPlayed: 18,
            goalsScored: 9,
            assists: 6,
            minutesPlayed: 1500,
            yellowCards: 1,
            redCards: 0,
        },
    },
    {
        uid: "player_010",
        userId: "player_010",
        playerId: "player_010",
        fullName: "Chinedu Mba",
        userName: "chinedu_mba",
        email: "chinedu@example.com",
        bio: null,
        classId: "400",
        departmentId: "accountancy",
        facultyId: "business-administration",
        gender: "male",
        phone: "08012345679",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "LB",
        preferredFoot: "left",
        shirtNumber: 3,
        statistics: {
            matchesPlayed: 20,
            goalsScored: 1,
            assists: 4,
            minutesPlayed: 1700,
            yellowCards: 3,
            redCards: 0,
        },
    },
    {
        uid: "player_011",
        userId: "player_011",
        playerId: "player_011",
        fullName: "Ngozi Ekwueme",
        userName: "ngozi_ekwueme",
        email: "ngozi@example.com",
        bio: null,
        classId: "100",
        departmentId: "biochemistry",
        facultyId: "biological-sciences",
        gender: "female",
        phone: "08012345680",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CAM",
        preferredFoot: "right",
        shirtNumber: 10,
        statistics: {
            matchesPlayed: 15,
            goalsScored: 7,
            assists: 9,
            minutesPlayed: 1200,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_012",
        userId: "player_012",
        playerId: "player_012",
        fullName: "Daniel Eze",
        userName: "daniel_eze",
        email: "daniel@example.com",
        bio: null,
        classId: "200",
        departmentId: "mathematics",
        facultyId: "physical-sciences",
        gender: "male",
        phone: "08012345681",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "pending",
        universityId: "unec",
        sports: "football",
        position: "CB",
        preferredFoot: "right",
        shirtNumber: 5,
        statistics: {
            matchesPlayed: 14,
            goalsScored: 2,
            assists: 1,
            minutesPlayed: 1250,
            yellowCards: 4,
            redCards: 0,
        },
    },
    {
        uid: "player_013",
        userId: "player_013",
        playerId: "player_013",
        fullName: "Ifeoma Nnamani",
        userName: "ifeoma_nnamani",
        email: "ifeoma@example.com",
        bio: null,
        classId: "400",
        departmentId: "english",
        facultyId: "arts",
        gender: "female",
        phone: "08012345682",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "ST",
        preferredFoot: "right",
        shirtNumber: 9,
        statistics: {
            matchesPlayed: 17,
            goalsScored: 13,
            assists: 4,
            minutesPlayed: 1450,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_014",
        userId: "player_014",
        playerId: "player_014",
        fullName: "Peter Anayo",
        userName: "peter_anayo",
        email: "peter@example.com",
        bio: null,
        classId: "300",
        departmentId: "civil-engineering",
        facultyId: "engineering",
        gender: "male",
        phone: "08012345683",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CB",
        preferredFoot: "right",
        shirtNumber: 15,
        statistics: {
            matchesPlayed: 23,
            goalsScored: 2,
            assists: 2,
            minutesPlayed: 2000,
            yellowCards: 6,
            redCards: 1,
        },
    },
    {
        uid: "player_015",
        userId: "player_015",
        playerId: "player_015",
        fullName: "Amarachi Ibe",
        userName: "amarachi_ibe",
        email: "amarachi@example.com",
        bio: null,
        classId: "200",
        departmentId: "pharmacy",
        facultyId: "pharmaceutical-sciences",
        gender: "female",
        phone: "08012345684",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CM",
        preferredFoot: "left",
        shirtNumber: 14,
        statistics: {
            matchesPlayed: 16,
            goalsScored: 5,
            assists: 8,
            minutesPlayed: 1300,
            yellowCards: 1,
            redCards: 0,
        },
    },
    {
        uid: "player_016",
        userId: "player_016",
        playerId: "player_016",
        fullName: "Victor Chukwu",
        userName: "victor_chukwu",
        email: "victor@example.com",
        bio: null,
        classId: "500",
        departmentId: "computer-science",
        facultyId: "physical-sciences",
        gender: "male",
        phone: "08012345685",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "pending",
        universityId: "unec",
        sports: "football",
        position: "RW",
        preferredFoot: "right",
        shirtNumber: 20,
        statistics: {
            matchesPlayed: 11,
            goalsScored: 4,
            assists: 3,
            minutesPlayed: 850,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_017",
        userId: "player_017",
        playerId: "player_017",
        fullName: "Sarah Onoh",
        userName: "sarah_onoh",
        email: "sarah@example.com",
        bio: null,
        classId: "100",
        departmentId: "nursing-science",
        facultyId: "medical-sciences",
        gender: "female",
        phone: "08012345686",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "GK",
        preferredFoot: "right",
        shirtNumber: 13,
        statistics: {
            matchesPlayed: 13,
            goalsScored: 0,
            assists: 0,
            minutesPlayed: 1170,
            yellowCards: 1,
            redCards: 0,
        },
    },
    {
        uid: "player_018",
        userId: "player_018",
        playerId: "player_018",
        fullName: "Joseph Onu",
        userName: "joseph_onu",
        email: "joseph@example.com",
        bio: null,
        classId: "400",
        departmentId: "law",
        facultyId: "law",
        gender: "male",
        phone: "08012345687",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CAM",
        preferredFoot: "right",
        shirtNumber: 18,
        statistics: {
            matchesPlayed: 19,
            goalsScored: 6,
            assists: 10,
            minutesPlayed: 1550,
            yellowCards: 3,
            redCards: 0,
        },
    },
    {
        uid: "player_019",
        userId: "player_019",
        playerId: "player_019",
        fullName: "Rita Ugwuanyi",
        userName: "rita_ugwuanyi",
        email: "rita@example.com",
        bio: null,
        classId: "300",
        departmentId: "economics",
        facultyId: "social-sciences",
        gender: "female",
        phone: "08012345688",
        phoneVerified: false,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "LW",
        preferredFoot: "left",
        shirtNumber: 19,
        statistics: {
            matchesPlayed: 14,
            goalsScored: 8,
            assists: 5,
            minutesPlayed: 1100,
            yellowCards: 2,
            redCards: 0,
        },
    },
    {
        uid: "player_020",
        userId: "player_020",
        playerId: "player_020",
        fullName: "Franklin Umeh",
        userName: "franklin_umeh",
        email: "franklin@example.com",
        bio: null,
        classId: "500",
        departmentId: "microbiology",
        facultyId: "biological-sciences",
        gender: "male",
        phone: "08012345689",
        phoneVerified: true,
        emailVerified: true,
        profileImage: null,
        coverImage: null,
        registrationType: "player",
        role: "player",
        status: "approved",
        universityId: "unec",
        sports: "football",
        position: "CDM",
        preferredFoot: "right",
        shirtNumber: 16,
        statistics: {
            matchesPlayed: 20,
            goalsScored: 3,
            assists: 4,
            minutesPlayed: 1650,
            yellowCards: 4,
            redCards: 0,
        },
    },
];

function page() {
    const [showTeamMates, setShowTeamMates] = useState(true)
    return (
        <div className='overflow-x-visible font-medium'>
            {/* team mates  */}
            <section className="">
                <div className='w-[90%] mx-auto flex items-center justify-between pb-1'>
                    <p className='text-[var(--muted)] text-[14px] uppercase'>Team Mates</p>
                    <span onClick={() => setShowTeamMates(!showTeamMates)} className={`${showTeamMates ? "rotate-0" : "rotate-180"}`}>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.49997 4C7.49997 4 4.92228 0.500006 3.99997 0.5C3.07766 0.499994 0.5 4 0.5 4" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                        </svg>

                    </span>
                </div>

                <div className='flex items-center gap-[8px] overflow-x-auto w-full px-[20px]'>
                    {showTeamMates && dummyPlayers.map((player) => (
                        <div key={player.uid} className='relative w-[145px] shrink-0 border border-[#18191B] overflow-hidden rounded-xl'>
                            <img src={player?.profileImage || player?.gender === "male" ? '/male.png' : '/female.png'} alt="" className="h-[204px] w-full object-cover " />
                            <div className=' absolute bottom-0 left-0 p-2 w-full flex flex-col gap-[4px]'>
                                <p className='text-white text-[18px] z-20'>{player.shirtNumber}</p>
                                <p className='text-white text-[12px] z-20'>{player.fullName}</p>
                                <span className='text-[var(--muted)] text-[10px] z-20'>{player.position}</span>
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-90% backdrop-blur-xs to-[var(--background)] [mask-image:linear-gradient(to_bottom,transparent,var(--background)_40%)] z-10" />
                            </div>

                        </div>
                    ))}
                </div>
            </section>
            {/* players  */}
            <section className="w-[90%] mx-auto pb-5">
                <div className='sticky top-[70px] bg-[var(--background)] flex items-center justify-between py-5'>
                    <p className='text-[var(--muted)] text-[14px] uppercase'>All players</p>
                    <span className='flex items-center gap-[8px] text-[12px] text-[var(--muted)]'>
                        See more
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7915 7H2.9165" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                            <path d="M7.5835 10.5C7.5835 10.5 11.0835 7.92231 11.0835 7C11.0835 6.07763 7.5835 3.5 7.5835 3.5" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                        </svg>
                    </span>
                </div>
                <div className='flex flex-col gap-[8px] w-full '>
                    {dummyPlayers.map((player) => (
                        <div key={player.uid} className='p-[12px] bg-[#141414] rounded-xl flex items-center justify-between'>
                            <div className=' flex items-center  gap-[8px]'>
                                <img src={player?.profileImage || player?.gender === "male" ? '/male.png' : '/female.png'} alt="" className="w-[32px] h-[32px] object-cover rounded-full" />
                                <p className='text-white text-[18px] '>{player.shirtNumber}</p>
                                <p className='text-white text-[12px] flex flex-col'>{player.fullName}
                                    <span className='text-[var(--muted)] text-[10px] '>{player.position}</span>
                                </p>
                            </div>
                            <div>
                                <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32 4C32 1.79086 33.7909 0 36 0H52C54.2091 0 56 1.79086 56 4V20C56 22.2091 54.2091 24 52 24H36C33.7909 24 32 22.2091 32 20V4Z" fill="#18191B" />
                                    <g clip-path="url(#clip0_682_8994)">
                                        <path d="M43.7152 0.00137463C43.5019 0.00667693 43.1435 0.0260833 42.9447 0.0430507C42.7397 0.0605483 42.3931 0.0978764 42.3563 0.10636L42.3325 0.111768V1.00839L42.1768 1.03235C41.8304 1.08569 41.2593 1.21125 40.8865 1.31603C40.61 1.39376 40.1391 1.5488 39.955 1.62271C39.9376 1.62971 39.9365 1.6033 39.9365 1.15643V0.682614L39.9128 0.689825C39.8406 0.711776 39.408 0.878587 39.2376 0.950486C38.8506 1.11337 38.4508 1.30521 38.0868 1.50267L37.9311 1.58708V3.07204C37.9311 4.33918 37.9333 4.55615 37.9459 4.55138C37.954 4.5482 38.0169 4.50313 38.0857 4.45127C39.001 3.76017 40.1209 3.20195 41.2485 2.87469C42.7794 2.43025 44.4398 2.36726 46.0143 2.69378C47.3978 2.98063 48.7525 3.58955 49.8809 4.43166C49.9717 4.49942 50.049 4.55488 50.0525 4.55488C50.0559 4.55488 50.0588 3.88711 50.0588 3.07098V1.58708L49.9295 1.51539C49.4224 1.23416 48.7518 0.931716 48.1774 0.72535L48.0639 0.684523V1.15621C48.0639 1.41571 48.0618 1.62791 48.0592 1.62791C48.0567 1.62791 47.9771 1.59981 47.8824 1.56555C47.2211 1.32578 46.442 1.12631 45.7814 1.02748L45.6573 1.00892V0.111768L45.6336 0.106466C45.5394 0.085257 44.9616 0.0325521 44.6493 0.0166452C44.419 0.00487414 43.9092 -0.00339744 43.7152 0.00137463ZM51.273 4.59454L51.2735 5.68417L51.3691 5.79021C52.2614 6.78015 52.9695 8 53.3977 9.28442C53.9438 10.9234 54.0541 12.7016 53.7151 14.4061C53.404 15.9709 52.7125 17.452 51.713 18.6941C51.4017 19.0809 50.9374 19.5712 50.5866 19.8834C49.4287 20.9142 48.0895 21.6451 46.6127 22.0526C45.4847 22.3637 44.256 22.4704 43.0715 22.3598C40.5294 22.1226 38.1875 20.912 36.5074 18.9672C35.1443 17.3892 34.3148 15.4348 34.1262 13.3568C34.0748 12.7904 34.0749 12.1074 34.1264 11.5328C34.2906 9.70331 34.9633 7.94729 36.0646 6.47389C36.2281 6.25522 36.4453 5.98926 36.6082 5.80792L36.7068 5.69827V4.60695C36.7068 4.00673 36.7038 3.51563 36.7002 3.51563C36.6965 3.51563 36.6526 3.5502 36.6025 3.59241C36.1571 3.96802 35.6698 4.45223 35.2758 4.91045C33.7206 6.71907 32.7571 8.9981 32.5435 11.3735C32.5076 11.7723 32.5008 11.9428 32.5008 12.4446C32.5008 12.9464 32.5076 13.1169 32.5435 13.5157C32.7446 15.751 33.6053 17.8954 35.0083 19.6556C36.354 21.344 38.122 22.612 40.1383 23.3346C41.8644 23.9531 43.7379 24.1447 45.5835 23.8913C47.692 23.6017 49.7132 22.7044 51.3495 21.3315C51.6362 21.0907 51.8107 20.9294 52.1229 20.6159C52.5229 20.2144 52.8035 19.8953 53.1217 19.4807C54.3874 17.8315 55.1968 15.8195 55.4253 13.7543C55.5214 12.8854 55.5245 12.1324 55.4358 11.2357C55.3405 10.2725 55.0913 9.22716 54.7359 8.29968C54.4966 7.67518 54.1506 6.9704 53.8111 6.41556C53.1759 5.37748 52.3915 4.45552 51.4627 3.65519C51.367 3.57268 51.285 3.50503 51.2806 3.50503C51.2763 3.50503 51.2729 3.99528 51.2731 4.59454M43.1664 4.01532C41.9088 4.14438 40.7462 4.52954 39.6747 5.17207C38.6167 5.80654 37.684 6.69574 36.995 7.72661C35.9103 9.34964 35.4235 11.2808 35.604 13.2451C35.7564 14.9038 36.4115 16.5086 37.4611 17.7945C37.8965 18.3279 38.4066 18.8195 38.9495 19.229C40.1387 20.1257 41.5625 20.6938 43.0343 20.8586C43.1156 20.8677 43.2023 20.8775 43.227 20.8802L43.2718 20.8853V19.2775L43.1531 19.264C43.0877 19.2566 42.9525 19.2367 42.8526 19.2199C40.7207 18.8608 38.8706 17.4893 37.8896 15.5409C37.5068 14.7806 37.274 13.9701 37.1861 13.0913C37.1637 12.8675 37.1547 12.2562 37.1702 12.0202C37.2284 11.1346 37.4308 10.3334 37.7954 9.54403C38.5745 7.85758 40.0329 6.54059 41.7833 5.9426C42.2503 5.78311 42.779 5.66264 43.2007 5.6198L43.2719 5.61258V4.80791C43.2719 4.36527 43.2683 4.00387 43.264 4.00461C43.2597 4.00535 43.2157 4.01012 43.1664 4.01521M44.7074 12.4464V20.882L44.8895 20.8631C45.1419 20.8366 45.4 20.7971 45.6732 20.7428C45.8935 20.699 46.2141 20.6228 46.2738 20.6001L46.3012 20.5896V13.2188H47.135V11.66H46.3012V5.97441L46.325 5.98162C46.4299 6.01365 46.8816 6.20835 47.0586 6.29796C47.1004 6.31906 47.1371 6.33635 47.1402 6.33635C47.1434 6.33635 47.1447 5.94207 47.1432 5.46009L47.1404 4.58383L47.0349 4.54226C46.7194 4.41798 46.2463 4.27524 45.8686 4.1904C45.5263 4.11362 45.0551 4.0377 44.7966 4.01765L44.7075 4.01076V12.4464M48.1483 12.4446V19.8153L48.1826 19.7976C48.255 19.7603 48.4881 19.6153 48.655 19.5038C49.4548 18.9688 50.1403 18.3205 50.7258 17.5454C51.5082 16.5095 52.0466 15.2848 52.2804 14.0095C52.3077 13.8605 52.3702 13.4414 52.3703 13.407C52.3703 13.3895 52.3306 13.3884 51.6845 13.3884H50.9986L50.9939 13.4123C50.9912 13.4254 50.9765 13.5149 50.9613 13.6111C50.8522 14.2996 50.6308 14.9788 50.3011 15.6366C50.1617 15.9148 50.0568 16.0963 49.8755 16.3731L49.737 16.5846L49.7343 14.5146C49.7328 13.3761 49.7328 11.5131 49.7343 10.3747L49.737 8.30488L49.8658 8.50074C50.3317 9.20881 50.652 9.93534 50.8494 10.732C50.8989 10.9317 50.9487 11.1797 50.9752 11.3576L50.9941 11.4849L51.6823 11.4876C52.1426 11.4894 52.3704 11.4868 52.3704 11.4796C52.3704 11.4518 52.3242 11.1368 52.2957 10.9706C52.0582 9.58549 51.4655 8.26628 50.5826 7.1582C50.2493 6.73985 49.8117 6.29096 49.3983 5.94324C49.2006 5.77696 48.9013 5.5514 48.6868 5.40707C48.5222 5.29614 48.2562 5.12976 48.1823 5.09137L48.1485 5.07387V12.4446M43.0813 7.11579C42.7917 7.16637 42.4557 7.25364 42.21 7.34219C42.0562 7.39766 41.8362 7.48726 41.7595 7.52587L41.6984 7.55662L41.7014 11.521L41.7045 15.4855L41.6042 15.3999C41.2761 15.1197 41.0721 14.8958 40.8621 14.5852C40.4591 13.9895 40.2461 13.345 40.2109 12.6147C40.2054 12.5007 40.2007 11.5569 40.2006 10.5172C40.2005 9.46428 40.1964 8.62694 40.1913 8.62694C40.1692 8.62694 39.8699 8.96724 39.7195 9.16321C39.1979 9.84339 38.8333 10.6825 38.6926 11.5273C38.6339 11.8795 38.6226 12.0292 38.6231 12.4499C38.6234 12.8583 38.6334 12.9965 38.6864 13.3248C38.9073 14.6948 39.6548 15.9298 40.7758 16.7765C41.2305 17.1199 41.7402 17.3888 42.2814 17.5707C42.5722 17.6685 42.9903 17.7683 43.2252 17.796L43.2827 17.8028V7.08917L43.2537 7.09002C43.2377 7.09044 43.1602 7.10211 43.0815 7.11579M32.5 12.4446C32.5 12.6517 32.5014 12.7363 32.5032 12.6328C32.5049 12.5293 32.5049 12.3599 32.5032 12.2564C32.5015 12.1529 32.5 12.2375 32.5 12.4446Z" fill-rule="evenodd" clip-rule="evenodd" fill="#FF9D00" />
                                    </g>
                                    <g clip-path="url(#clip1_682_8994)">
                                        <path d="M36.6578 13.4671C36.0672 12.3936 35.8548 11.3044 35.8543 10.2771C35.8536 8.95392 36.2128 7.73718 36.5752 6.85518C36.756 6.4143 36.937 6.05726 37.0717 5.81258C37.1234 5.71828 37.1772 5.62511 37.233 5.53313C37.2521 5.50177 37.2668 5.47836 37.2765 5.46318C37.2814 5.45561 37.2849 5.45014 37.2871 5.44677L37.2894 5.44306L37.5412 5.06348L37.1275 4.87293C36.714 4.68226 36.3816 4.3931 36.1111 4.05459C35.7056 3.54811 35.4489 2.93139 35.3004 2.44332C35.2396 2.24492 35.1889 2.04356 35.1486 1.84001C35.1373 1.78315 35.1272 1.72607 35.1182 1.66881C35.1152 1.64934 35.1131 1.63481 35.1118 1.62575L35.1104 1.61481L35.0593 1.19552L34.6455 1.27935C33.7239 1.46567 32.9261 1.53809 32.242 1.53809C30.9703 1.5378 30.0912 1.28876 29.5344 1.04891C29.2561 0.928778 29.0583 0.810586 28.9333 0.725634C28.8873 0.694636 28.8426 0.661741 28.7994 0.627033C28.7886 0.618229 28.778 0.609186 28.7676 0.599912L28.5008 0.345703L28.2326 0.599971C28.2178 0.609619 27.2198 1.53544 24.7581 1.53815C24.074 1.53815 23.2762 1.46573 22.3545 1.27941L21.9407 1.19569L21.8898 1.61487L21.8894 1.61845C21.8823 1.67552 21.7896 2.32219 21.4849 3.03416C21.3332 3.39033 21.1291 3.76185 20.8635 4.08624C20.5976 4.41116 20.2733 4.68838 19.8727 4.87305L19.459 5.0636L19.7107 5.44318L19.7131 5.44688C19.7844 5.54972 21.1515 7.71323 21.1457 10.2772C21.1453 11.3045 20.9328 12.3937 20.3424 13.4672C19.8157 14.4238 19.5776 15.3415 19.5775 16.1658C19.5767 17.1105 19.8937 17.9327 20.4364 18.5167C20.9772 19.1016 21.7429 19.4401 22.5839 19.4386C22.9323 19.4386 23.293 19.3814 23.6567 19.2645C24.2995 19.0574 24.7518 18.8629 25.0974 18.7296C25.4456 18.5948 25.6682 18.5306 25.8939 18.5309C26.1007 18.531 26.3453 18.5834 26.7269 18.7451C27.1064 18.906 27.6105 19.1732 28.3062 19.5716L28.5001 19.6825L28.6939 19.5716C29.3897 19.1732 29.8937 18.906 30.2732 18.7451C30.6547 18.5834 30.8994 18.531 31.1062 18.5308C31.3319 18.5306 31.5544 18.5947 31.9028 18.7295C32.2483 18.8628 32.7007 19.0574 33.3433 19.2644C33.7072 19.3816 34.068 19.4387 34.4162 19.4387C35.2571 19.4401 36.0228 19.1016 36.5636 18.5167C37.1062 17.9327 37.4233 17.1104 37.4226 16.1658C37.4225 15.3416 37.1844 14.4237 36.6578 13.4673L36.6578 13.4671Z" fill="white" />
                                        <path d="M36.531 13.5364C35.9273 12.4393 35.7099 11.3239 35.7097 10.2768C35.7093 8.92749 36.0743 7.69392 36.4413 6.80004C36.6247 6.35322 36.8081 5.99141 36.945 5.74267C36.9977 5.64653 37.0526 5.55153 37.1094 5.45775C37.129 5.42551 37.1443 5.40121 37.1545 5.38527C37.1647 5.36939 37.1689 5.36309 37.1688 5.36297L37.3274 5.12388L37.0669 5.00393C36.1936 4.60393 35.6609 3.77212 35.3526 3.02009C35.1987 2.64568 35.1013 2.29505 35.0433 2.03996C35.0203 1.93984 35.0002 1.83908 34.9829 1.7378C34.9769 1.70262 34.9716 1.66734 34.9668 1.63197L34.9347 1.36787L34.6741 1.42065C33.7437 1.60879 32.9362 1.68221 32.2419 1.68227C30.9496 1.68215 30.0493 1.42818 29.4749 1.18026C29.1878 1.05619 28.9821 0.933466 28.8503 0.843807C28.8012 0.810587 28.7534 0.775316 28.7072 0.738088C28.6923 0.726027 28.6818 0.716909 28.6756 0.711437L28.6695 0.705907L28.4998 0.543945L28.3304 0.705907C28.2979 0.733264 27.2603 1.68068 24.7578 1.68233C24.0636 1.68233 23.2561 1.60879 22.3258 1.4207L22.0651 1.36799L22.033 1.63197C22.033 1.63197 22.0322 1.63891 22.0295 1.65697C22.0104 1.79187 21.9025 2.45019 21.5868 3.16151C21.2707 3.87531 20.7517 4.62829 19.9329 5.00393L19.6724 5.12388L19.8308 5.36297C19.8309 5.36303 19.835 5.36939 19.8452 5.38527C19.9995 5.62354 21.2932 7.74687 21.29 10.2768C21.2897 11.3239 21.0724 12.4393 20.4687 13.5365C19.952 14.4751 19.7218 15.3691 19.7217 16.1654C19.7213 17.0783 20.0264 17.8629 20.5419 18.418C21.0564 18.9737 21.7808 19.2946 22.5836 19.2937C22.9161 19.2937 23.2619 19.2392 23.6121 19.1266C24.2487 18.9215 24.6953 18.7293 25.0449 18.5944C25.3963 18.4585 25.6386 18.3858 25.8936 18.3861C26.1265 18.3861 26.3921 18.4459 26.783 18.6117C27.1728 18.777 27.68 19.0463 28.3778 19.4458L28.4998 19.5157L28.6219 19.4458C29.3197 19.0464 29.8269 18.777 30.2167 18.6118C30.6076 18.446 30.8731 18.3862 31.1061 18.3862C31.361 18.386 31.6034 18.4586 31.9546 18.5944C32.3043 18.7293 32.7509 18.9215 33.3875 19.1266C33.7378 19.2395 34.0836 19.2938 34.416 19.2938C35.2188 19.2948 35.943 18.9737 36.4576 18.4181C36.9731 17.863 37.2782 17.0784 37.2778 16.1654C37.2778 15.3691 37.0476 14.475 36.531 13.5364Z" fill="#B48D00" />
                                        <path d="M20.3193 17.0034C20.2507 16.7466 20.2136 16.4665 20.2134 16.1656C20.2134 15.4645 20.4164 14.6512 20.8994 13.7737C21.1584 13.304 21.3629 12.8062 21.5087 12.29H26.2081C26.2092 12.3029 26.21 12.3158 26.2113 12.3285L20.3193 17.0034ZM28.3047 18.8394C27.758 18.5322 27.3329 18.3113 26.9752 18.1593C26.5522 17.9795 26.2156 17.8945 25.8936 17.8945C25.5395 17.8946 25.2296 17.9964 24.8679 18.1359C24.5045 18.2763 24.0772 18.4602 23.4616 18.6586C23.157 18.7565 22.8625 18.8022 22.5836 18.8022C22.3895 18.8022 22.1962 18.779 22.0076 18.7331L27.6779 14.2373C27.879 14.3143 28.0901 14.3624 28.3047 14.3802V18.8394Z" fill="white" />
                                        <path d="M28.3049 9.79551C27.192 9.88911 26.3051 10.774 26.2082 11.8858H21.6104C21.7309 11.3379 21.782 10.7976 21.7818 10.2769C21.7791 8.30667 21.0618 6.61204 20.6069 5.7334H28.3049L28.3049 9.79551Z" fill="#DC161B" />
                                        <path d="M20.4521 5.28256C21.3005 4.76885 21.8035 3.93227 22.102 3.20748C22.2675 2.80191 22.3934 2.38127 22.4778 1.95143C23.3348 2.11022 24.0928 2.17446 24.7579 2.17446C26.9113 2.17581 28.0882 1.49755 28.5 1.19922C28.9118 1.49755 30.0887 2.17587 32.242 2.17446C32.9072 2.17446 33.6651 2.11022 34.5222 1.95143C34.6066 2.38126 34.7325 2.8019 34.898 3.20748C35.1965 3.93233 35.6996 4.76885 36.5479 5.28256H20.4521ZM35.3896 11.8863H30.7919C30.7887 11.8502 30.7847 11.8143 30.7799 11.7784L35.5167 8.02274C35.3416 8.70259 35.2193 9.46657 35.2183 10.2774C35.2181 10.7981 35.2691 11.3383 35.3896 11.8863ZM29.2544 9.91445C29.0737 9.85182 28.8858 9.81203 28.6952 9.79602V5.73386H34.5235L29.2544 9.91445Z" fill="white" />
                                        <path d="M36.0977 18.0837C35.6731 18.5399 35.0894 18.8013 34.4165 18.8022C34.1376 18.8022 33.843 18.7567 33.5386 18.6587C32.9229 18.4603 32.4957 18.2763 32.1322 18.136C31.7704 17.9965 31.4605 17.8947 31.1065 17.8946C30.7844 17.8945 30.4479 17.9796 30.025 18.1593C29.6673 18.3113 29.2422 18.5323 28.6954 18.8395V14.3804C29.8082 14.2866 30.6951 13.4016 30.7921 12.29H35.4914C35.6372 12.8063 35.8417 13.3041 36.1007 13.7738L36.1008 13.7738C36.5837 14.6512 36.7867 15.4644 36.7866 16.1655C36.7863 16.9702 36.5212 17.627 36.0977 18.0837ZM29.8737 4.07687H29.5835V3.66882C29.5835 3.52292 29.7305 3.45614 29.7305 3.45614V2.8283H29.6184V3.03156H29.1748C28.9863 3.03156 29.0019 2.84859 29.0019 2.84859V2.5918H27.6487V2.82836H26.613C26.5543 2.82836 26.5613 2.88984 26.5613 2.88984H26.34C26.2566 2.88984 26.2566 2.81994 26.2566 2.81994V2.71387H26.2759V2.67363H26.0485V2.71517H26.0702V2.81936C26.0702 2.91137 25.9902 2.91666 25.9902 2.91666L25.2338 3.00114H24.4606C24.3442 3.00114 24.3497 2.88984 24.3497 2.88984V2.69063H24.3656V2.63639H24.1008V2.69057H24.1185V2.88901C24.1185 3.02515 23.999 3.00756 23.999 3.00756H23.7372V3.02662C23.7372 3.02662 23.6465 3.12416 23.6465 3.39784C23.6465 3.67152 23.7372 3.76312 23.7372 3.76312V3.78889H23.9319V3.86014H23.7372C23.7372 4.0844 23.5653 4.07622 23.5653 4.07622H23.1702V4.11076H22.9258V4.07681H22.8804V4.28843H22.9272V4.25201H23.1706V4.28843H23.3456V4.40391H23.3783C23.3631 4.44309 23.3576 4.48539 23.3624 4.52716C23.3672 4.56893 23.3821 4.60889 23.4058 4.64359C23.4296 4.67829 23.4614 4.70668 23.4986 4.72629C23.5358 4.7459 23.5772 4.75615 23.6192 4.75613C23.6532 4.75612 23.6868 4.74943 23.7182 4.73643C23.7495 4.72343 23.778 4.70437 23.802 4.68036C23.826 4.65634 23.8451 4.62784 23.8581 4.59646C23.8711 4.56509 23.8777 4.53147 23.8777 4.49751C23.8777 4.46445 23.8713 4.43297 23.86 4.40391H24.5824C24.6541 4.6057 24.846 4.75054 25.0722 4.75054C25.2984 4.75054 25.4905 4.6057 25.5622 4.40391H25.7766C25.8483 4.6057 26.0403 4.75054 26.2664 4.75054C26.4928 4.75054 26.6847 4.6057 26.7564 4.40391H26.9885C27.0601 4.6057 27.252 4.75054 27.4784 4.75054C27.7046 4.75054 27.8967 4.6057 27.9684 4.40391H28.3627C28.3627 4.46033 28.3089 4.49951 28.3089 4.49951V4.53634H28.6809V4.49957C28.6386 4.4698 28.6293 4.40397 28.6293 4.40397H28.7949C28.7836 4.43339 28.7777 4.46464 28.7777 4.49616C28.7787 4.56405 28.8064 4.62881 28.8547 4.67646C28.9031 4.72411 28.9683 4.75082 29.0362 4.75082C29.1041 4.75082 29.1693 4.72411 29.2176 4.67646C29.266 4.62881 29.2937 4.56405 29.2947 4.49616C29.2947 4.46464 29.2888 4.4334 29.2775 4.40397H29.5359C29.5844 4.40397 29.5782 4.36108 29.5782 4.36108V4.26148C29.6269 4.26148 29.6189 4.20618 29.6189 4.20618H29.8744V4.22554H29.9087V4.05522H29.8739V4.07687H29.8737ZM28.0624 3.86061C28.0624 3.86061 27.9531 3.50744 27.4717 3.50497C26.9899 3.50744 26.8808 3.86061 26.8808 3.86061H26.8652C26.8652 3.86061 26.7556 3.50744 26.2741 3.50497C25.7925 3.50744 25.6831 3.86061 25.6831 3.86061H25.6672C25.6672 3.86061 25.5576 3.50744 25.0762 3.50497C24.5945 3.50744 24.4852 3.86061 24.4852 3.86061L24.0924 3.86078V3.7866H24.4302C24.4462 3.74489 24.4583 3.72359 24.4583 3.72359C24.4583 3.72359 24.5942 3.42331 25.0762 3.42126C25.5576 3.42331 25.6672 3.71012 25.6672 3.71012H25.6831C25.6831 3.71012 25.7925 3.42349 26.2743 3.42126C26.7557 3.42355 26.8652 3.70665 26.8652 3.70665H26.8808C26.8808 3.70665 26.9899 3.42355 27.4717 3.42126C27.9533 3.42355 28.086 3.72359 28.086 3.72359C28.086 3.72359 28.1121 3.76859 28.1323 3.86014L28.0624 3.86061ZM28.5882 4.38479H28.4043V4.24695H28.5882V4.38479ZM28.5882 4.18935H28.4043V4.05187H28.5882V4.18935ZM28.5882 3.9898H28.4043V3.85237H28.5882V3.9898ZM28.6845 3.23735H28.6031V3.79395H28.3873V3.23794H28.1982C28.1982 3.23794 28.0682 3.24629 28.0682 3.11692V2.96767C28.0682 2.96767 28.0746 2.85748 28.1982 2.85748C28.3217 2.85748 28.6846 2.85907 28.6846 2.85907C28.6846 2.85907 28.8152 2.85907 28.8152 2.96926V3.11686C28.8151 3.11698 28.8135 3.23735 28.6845 3.23735ZM33.5766 4.05457V4.07605H33.2861L33.2859 4.0834V3.29442C33.0577 3.29442 33.0569 3.06703 33.0569 3.06703H30.5093C30.5093 3.29518 30.2815 3.29442 30.2815 3.29442V4.07605H29.999V4.05457H29.9641V4.22489H29.9984V4.20524H30.2539C30.2539 4.20524 30.2478 4.24936 30.2814 4.25866V4.40279H30.5302C30.5302 4.40597 30.5298 4.40897 30.5298 4.41221C30.5297 4.4572 30.5386 4.50176 30.5558 4.54333C30.573 4.5849 30.5982 4.62268 30.63 4.65449C30.6619 4.68631 30.6996 4.71154 30.7412 4.72875C30.7828 4.74596 30.8273 4.7548 30.8723 4.75478C30.9632 4.75481 31.0504 4.71874 31.1147 4.6545C31.179 4.59026 31.2152 4.5031 31.2153 4.41221C31.2153 4.40903 31.2148 4.40597 31.2148 4.40279H31.4445C31.4445 4.40597 31.4441 4.40897 31.4441 4.41221C31.444 4.4572 31.4529 4.50176 31.4701 4.54333C31.4873 4.5849 31.5125 4.62268 31.5443 4.65449C31.5762 4.68631 31.6139 4.71154 31.6555 4.72875C31.6971 4.74596 31.7416 4.7548 31.7866 4.75478C31.8316 4.75479 31.8762 4.74595 31.9178 4.72874C31.9593 4.71153 31.9971 4.6863 32.029 4.65449C32.0608 4.62268 32.086 4.58491 32.1033 4.54333C32.1205 4.50176 32.1294 4.45721 32.1294 4.41221C32.1294 4.40903 32.129 4.40597 32.1289 4.40279H32.3596C32.3596 4.40597 32.3592 4.40897 32.3592 4.41221C32.3591 4.45719 32.368 4.50175 32.3852 4.54332C32.4024 4.58489 32.4276 4.62266 32.4594 4.65447C32.4912 4.68629 32.529 4.71152 32.5706 4.72873C32.6121 4.74594 32.6567 4.75479 32.7017 4.75478C32.7467 4.7548 32.7912 4.74596 32.8328 4.72875C32.8744 4.71154 32.9122 4.68631 32.944 4.65449C32.9758 4.62268 33.001 4.5849 33.0182 4.54333C33.0354 4.50176 33.0443 4.4572 33.0443 4.41221C33.0443 4.40903 33.0438 4.40597 33.0438 4.40279H33.2859V4.25995C33.3286 4.25601 33.3216 4.2053 33.3216 4.2053H33.5772V4.22495H33.6115V4.05463L33.5766 4.05457Z" fill="#DC161B" />
                                        <path d="M31.1761 15.2691L31.3568 14.5683L31.2706 14.5693L31.2632 14.5759C31.2165 14.6179 31.1674 14.6571 31.116 14.6933C31.0719 14.7243 30.94 14.7925 30.726 14.8943L30.7039 14.9048L30.7478 15.0161L30.7729 15.0048C30.8467 14.9719 30.9041 14.9472 30.945 14.9309C30.9655 14.9227 30.9817 14.9167 30.9934 14.9129C30.9993 14.9109 31.0041 14.9095 31.0073 14.9088C31.0105 14.9079 31.0108 14.9082 31.011 14.9079C31.0179 14.9082 31.0172 14.9092 31.0176 14.9092C31.018 14.9095 31.0205 14.9139 31.0204 14.9248C31.021 14.9426 30.9991 15.0559 30.9555 15.2486L30.8221 15.7588C30.7934 15.8662 30.7634 15.9338 30.743 15.9543C30.7296 15.9697 30.6975 15.9859 30.6457 15.9956C30.5895 16.0073 30.54 16.0187 30.4963 16.0306L30.4827 16.0342L30.4435 16.1516L30.4863 16.1451C30.605 16.1265 30.7143 16.1172 30.8152 16.1172C30.8832 16.1172 31.007 16.1265 31.1838 16.1453L31.2037 16.1474L31.2472 16.036L31.216 16.0302C31.1791 16.0234 31.1419 16.0185 31.1045 16.0153C31.0571 16.0111 31.0257 16.0026 31.0213 15.9988C31.0121 15.9926 31.0128 15.9919 31.0123 15.9873C31.012 15.9753 31.0184 15.9407 31.0326 15.8904L31.1761 15.2691ZM32.5493 14.6598C32.4891 14.6072 32.4104 14.5814 32.3184 14.5815C32.1937 14.5813 32.0857 14.6229 31.9993 14.704C31.9127 14.7851 31.8681 14.8853 31.8684 14.9984C31.8683 15.1019 31.9088 15.2025 31.9873 15.2983C31.8507 15.3827 31.7626 15.4428 31.7198 15.483C31.6635 15.5348 31.6213 15.5889 31.5939 15.6456C31.567 15.7018 31.553 15.7581 31.553 15.8137C31.5528 15.897 31.5871 15.9754 31.6525 16.0435C31.7198 16.1143 31.8179 16.1488 31.9405 16.1488H31.9419C32.0928 16.149 32.2238 16.0979 32.3293 15.9976C32.4343 15.8982 32.4895 15.7826 32.4892 15.6553C32.489 15.5292 32.4225 15.4003 32.2959 15.2669C32.408 15.2053 32.4962 15.1356 32.5593 15.0567C32.6126 14.9908 32.6409 14.9207 32.6408 14.8486C32.6411 14.7761 32.609 14.711 32.5493 14.6598ZM32.2009 15.1598C32.1215 15.0703 32.0847 14.9888 32.0849 14.917C32.0851 14.8608 32.1041 14.8154 32.1439 14.775C32.1843 14.7353 32.2301 14.7164 32.2872 14.7162C32.335 14.7163 32.3717 14.7309 32.4031 14.7611C32.4343 14.7922 32.4483 14.8256 32.4486 14.8674C32.4486 14.9019 32.4343 14.9421 32.4014 14.9873C32.3723 15.0279 32.3046 15.0872 32.2009 15.1598ZM32.125 15.9849C32.0813 16.0104 32.038 16.0228 31.9926 16.0228C31.9297 16.0226 31.8798 16.0025 31.8371 15.9604C31.7951 15.9182 31.7749 15.8695 31.7746 15.808C31.7747 15.7425 31.795 15.6791 31.8375 15.6145C31.8767 15.5552 31.9567 15.4806 32.0766 15.395C32.154 15.4809 32.205 15.549 32.2288 15.5967C32.2552 15.6488 32.2676 15.6958 32.2676 15.7374C32.2675 15.7835 32.2547 15.83 32.2283 15.8774C32.202 15.9244 32.1676 15.9598 32.125 15.9849ZM33.8998 14.6116L33.8436 14.6131C33.7149 14.6165 33.5826 14.6182 33.4466 14.6183C33.2469 14.6183 33.1032 14.611 33.0177 14.5977L32.9933 14.5939L32.9879 14.618C32.976 14.672 32.9542 14.7493 32.9232 14.8492C32.9069 14.9002 32.8969 14.9316 32.8933 14.9434L32.8825 14.9777H32.9995L33.0061 14.9608C33.0325 14.8905 33.0583 14.8478 33.0676 14.8422C33.0761 14.8345 33.1091 14.8254 33.1624 14.8259H33.5728L33.4465 14.9822C33.1547 15.3407 32.9673 15.595 32.8829 15.7495C32.8242 15.8564 32.7932 15.9511 32.793 16.0353C32.7928 16.072 32.8046 16.1058 32.8279 16.1322C32.8507 16.1582 32.8815 16.1735 32.9146 16.1732H32.9162C32.9518 16.1732 32.9849 16.1562 33.0063 16.1263C33.0307 16.0933 33.0435 16.037 33.0559 15.9485C33.0672 15.8641 33.0832 15.7992 33.1023 15.7551C33.1438 15.6581 33.2255 15.5179 33.3475 15.3374C33.4163 15.2339 33.5895 15.006 33.865 14.6558L33.8998 14.6116ZM34.7017 14.7206C34.6247 14.6286 34.5219 14.5811 34.4015 14.5816C34.2604 14.5812 34.1405 14.6354 34.05 14.7412C33.9456 14.8614 33.8936 15.0107 33.8939 15.1845C33.8938 15.3117 33.9235 15.4134 33.9869 15.4863C34.0494 15.5582 34.1347 15.5951 34.2352 15.5947C34.2875 15.5947 34.3387 15.5846 34.3888 15.5646C34.4159 15.5537 34.442 15.5405 34.4669 15.525C34.4306 15.623 34.3864 15.7029 34.335 15.7652C34.2711 15.8426 34.1907 15.9048 34.0998 15.9473C34.0079 15.9908 33.8955 16.0158 33.761 16.021L33.7403 16.0218L33.7148 16.1493L33.7476 16.1488H33.7613C33.9574 16.1488 34.134 16.1051 34.2891 16.0173C34.4479 15.9273 34.5761 15.7978 34.6726 15.6304C34.7692 15.463 34.8177 15.2854 34.8177 15.0986C34.8178 14.9405 34.7803 14.8134 34.7017 14.7206ZM34.5488 15.043C34.5488 15.1219 34.5386 15.2232 34.5172 15.3465C34.4781 15.3789 34.4422 15.403 34.4094 15.4191C34.3746 15.4365 34.3439 15.4443 34.3164 15.4443C34.2758 15.4439 34.2427 15.4248 34.2102 15.3769C34.1803 15.3328 34.1622 15.246 34.1625 15.121C34.1624 14.9686 34.1875 14.8557 34.2343 14.7815C34.2696 14.7265 34.3103 14.7031 34.3661 14.7024C34.4171 14.7029 34.4568 14.7248 34.4938 14.7763C34.5287 14.8252 34.5491 14.9147 34.5488 15.043ZM21.1984 18.0874C21.2788 18.1389 21.4542 18.2211 21.5671 18.1321C21.6269 18.0844 21.64 18.0065 21.5772 17.9266C21.52 17.8546 21.443 17.85 21.3457 17.8709L21.3217 17.8762C21.1902 17.9043 21.0326 17.9252 20.929 17.794C20.8196 17.6559 20.8252 17.4683 21.0059 17.3251C21.0417 17.2969 21.0813 17.2737 21.1235 17.2563C21.1559 17.2428 21.1782 17.2327 21.1972 17.2257C21.2395 17.27 21.2951 17.3237 21.3734 17.397L21.3295 17.4457C21.2404 17.3848 21.1315 17.3299 21.0402 17.4017C20.9813 17.4485 20.9776 17.5292 21.024 17.5876C21.073 17.6487 21.1457 17.6487 21.2477 17.6262L21.2824 17.6186C21.4292 17.5859 21.5696 17.5763 21.6831 17.7196C21.802 17.8702 21.7755 18.0705 21.5968 18.2123C21.5542 18.2452 21.5067 18.2714 21.456 18.2897C21.4116 18.3046 21.3795 18.3138 21.3597 18.3172C21.3061 18.2689 21.2389 18.2143 21.1601 18.1433L21.1984 18.0874ZM21.6618 16.9138L21.6289 16.9481C21.5914 16.9878 21.5946 16.999 21.6482 17.0385L22.0829 17.3636L22.0854 17.3616L21.8235 16.7202L21.9042 16.6565L22.4921 17.0398L22.4942 17.0382C22.4287 16.8816 22.3597 16.7263 22.2873 16.5727C22.247 16.4908 22.2331 16.48 22.1785 16.5132L22.1309 16.5431L22.0931 16.4952L22.3686 16.2772L22.4063 16.3251C22.3497 16.386 22.3421 16.3977 22.3883 16.5363C22.3948 16.557 22.5292 16.9086 22.7046 17.32L22.6156 17.3902L22.0529 17.0271L22.0504 17.0285L22.2896 17.6481L22.2009 17.7184L21.4974 17.2295C21.386 17.152 21.3613 17.1638 21.3025 17.1983L21.2647 17.1502L21.6242 16.8661L21.6618 16.9138ZM23.1577 16.6286C23.2624 16.7611 23.2786 16.7621 23.364 16.7068L23.4015 16.7543L23.0284 17.0496L22.9905 17.0018C23.0641 16.932 23.0665 16.916 22.9619 16.7838L22.6422 16.3794C22.5376 16.2472 22.5218 16.246 22.4362 16.3015L22.3986 16.2535L22.7719 15.9581L22.8095 16.0061C22.7359 16.0763 22.7335 16.0923 22.8383 16.2245L23.1577 16.6286ZM24.1653 16.1642L24.0664 16.2427L23.1827 16.0017L23.1803 16.0036L23.3588 16.2289C23.4604 16.3579 23.5182 16.4214 23.5531 16.4556C23.5927 16.494 23.6364 16.4849 23.7154 16.429L23.7533 16.4765L23.4661 16.7035L23.4285 16.6561C23.4773 16.613 23.4935 16.5725 23.4653 16.525C23.4401 16.4833 23.3915 16.4124 23.2896 16.2839L23.1113 16.0585C23.0399 15.9674 23.0249 15.9539 22.9746 15.9377C22.9368 15.9255 22.9014 15.9394 22.8569 15.9689L22.8193 15.9211L23.0738 15.7195L23.8595 15.9247L23.862 15.9227L23.7319 15.7582C23.6301 15.6298 23.5725 15.5662 23.5378 15.5318C23.4979 15.4933 23.4544 15.502 23.3752 15.5589L23.3379 15.5109L23.6314 15.2785L23.6692 15.3266C23.6136 15.3741 23.5973 15.4152 23.6253 15.4623C23.651 15.5042 23.6995 15.5749 23.801 15.7039L24.1653 16.1642ZM24.021 14.9705C24.1628 14.8583 24.3034 14.7948 24.4435 14.8132C24.5414 14.826 24.658 14.8805 24.7413 14.9865C24.9826 15.2909 24.8685 15.5941 24.6024 15.8045L24.305 16.0401L24.2673 15.9922C24.3454 15.9181 24.3479 15.9021 24.2434 15.7702L23.9239 15.3662C23.8191 15.2336 23.8031 15.2325 23.7224 15.2843L23.6846 15.2368L24.021 14.9705ZM24.44 15.6165C24.5263 15.7258 24.5682 15.7258 24.6236 15.6823C24.7226 15.6041 24.7305 15.408 24.5591 15.192C24.3509 14.9282 24.1673 14.9543 24.0694 15.0319C24.0428 15.0527 24.0307 15.0681 24.0265 15.0795C24.0226 15.0863 24.044 15.1155 24.068 15.1459L24.44 15.6165ZM25.6255 14.3325C25.8327 14.5944 25.7944 14.8918 25.5729 15.0669C25.3405 15.2512 25.047 15.1905 24.8687 14.9649C24.7119 14.7665 24.6551 14.4389 24.9305 14.2212C25.1416 14.0544 25.4335 14.0899 25.6255 14.3325ZM25.05 14.7537C25.2254 14.9756 25.4314 15.0751 25.5447 14.9857C25.6436 14.9072 25.6172 14.7629 25.4421 14.5409C25.2475 14.295 25.0569 14.2245 24.9578 14.3033C24.8693 14.3732 24.8804 14.5393 25.05 14.7537ZM26.7131 14.1492L26.6138 14.2275L25.7301 13.9865L25.7281 13.9883L25.9061 14.2137C26.0081 14.3425 26.0659 14.4064 26.1003 14.4403C26.1402 14.4789 26.1839 14.4703 26.2629 14.4136L26.3006 14.4613L26.0136 14.6882L25.9762 14.6405C26.0247 14.598 26.041 14.5574 26.0128 14.5094C25.9874 14.4683 25.9387 14.3972 25.8375 14.2686L25.659 14.0431C25.5872 13.9524 25.5723 13.9385 25.5223 13.9221C25.4846 13.9103 25.449 13.9245 25.4045 13.9534L25.3667 13.9057L25.6214 13.7044L26.4069 13.9091L26.4094 13.9077L26.2794 13.7432C26.1778 13.6146 26.1199 13.5507 26.0855 13.517C26.046 13.4785 26.002 13.4868 25.923 13.5435L25.8853 13.4956L26.1793 13.2634L26.2169 13.311C26.1611 13.3587 26.1447 13.4 26.1729 13.4471C26.1985 13.4888 26.2469 13.5601 26.3487 13.6884L26.7131 14.1492ZM31.0317 10.3758C31.1363 10.5082 31.1527 10.5092 31.2553 10.4403L31.2927 10.4881L30.8896 10.8068L30.8515 10.7592C30.9379 10.6788 30.9407 10.6631 30.8361 10.5306L30.4121 9.99421L30.3922 10.0097C30.3149 10.0707 30.2955 10.1101 30.2943 10.1468C30.2952 10.176 30.3063 10.2189 30.3455 10.2991L30.2978 10.3375C30.2205 10.231 30.1604 10.1409 30.1139 10.0765L30.149 10.0486C30.1887 10.0629 30.2017 10.0563 30.2336 10.0318L30.6928 9.66787C30.7232 9.64422 30.7228 9.63234 30.7228 9.59451L30.7586 9.56627C30.8008 9.61657 30.8884 9.71659 30.9663 9.80242L30.9184 9.84631C30.8429 9.78659 30.8054 9.76459 30.7711 9.75735C30.7341 9.75088 30.6906 9.77353 30.6353 9.81707L30.6074 9.83913L31.0317 10.3758ZM31.8933 9.34995C32.1005 9.61192 32.0617 9.90937 31.8408 10.0843C31.608 10.2685 31.3148 10.2078 31.1363 9.98233C30.9796 9.78359 30.9231 9.45638 31.1982 9.23841C31.409 9.07186 31.7012 9.10739 31.8933 9.34995ZM31.318 9.77095C31.4929 9.99291 31.6992 10.0925 31.8122 10.0032C31.9116 9.92485 31.8853 9.78065 31.7098 9.55851C31.515 9.31247 31.3248 9.24194 31.2252 9.32042C31.1367 9.39072 31.1483 9.55692 31.318 9.77095ZM31.9765 8.73069L31.9431 8.7644C31.9056 8.80423 31.9093 8.81588 31.9623 8.85495L32.3971 9.18005L32.3997 9.17816L32.1382 8.53714L32.2187 8.47337L32.8063 8.85665L32.8089 8.85477C32.7431 8.69821 32.6741 8.54304 32.6019 8.38936C32.5615 8.30764 32.5472 8.29693 32.4929 8.32988L32.4454 8.35971L32.4074 8.31188L32.6833 8.0942L32.7208 8.14197C32.6638 8.20251 32.6568 8.21457 32.7024 8.35341C32.7094 8.374 32.8437 8.72564 33.0186 9.13663L32.93 9.20676L32.3671 8.84353L32.3647 8.84536L32.604 9.46467L32.5152 9.5348L31.8114 9.04579C31.7003 8.96872 31.6756 8.98043 31.6171 9.01497L31.5794 8.96714L31.9383 8.68298L31.9765 8.73069ZM34.035 8.33294L33.936 8.41118L33.0523 8.17015L33.0503 8.17227L33.2284 8.39753C33.3302 8.52626 33.3878 8.58985 33.4224 8.6238C33.4623 8.66245 33.5062 8.65386 33.5853 8.59727L33.6228 8.64509L33.3361 8.87195L33.2978 8.82412C33.3469 8.78176 33.3633 8.7407 33.335 8.69328C33.3094 8.65186 33.2609 8.58085 33.1595 8.45213L32.981 8.22663C32.9094 8.13597 32.8948 8.12215 32.844 8.10573C32.8067 8.09385 32.7708 8.10803 32.7267 8.13727L32.6889 8.08944L32.9432 7.88806L33.7291 8.09303L33.7316 8.09102L33.6016 7.92683C33.4998 7.7981 33.4416 7.73451 33.4073 7.70015C33.368 7.66191 33.3241 7.67032 33.245 7.72668L33.2071 7.67927L33.5009 7.44671L33.5392 7.49454C33.4832 7.54254 33.4666 7.58343 33.4945 7.63108C33.5205 7.67244 33.5686 7.74345 33.6708 7.87206L34.035 8.33294ZM34.3466 7.3577L34.4249 7.29569C34.5241 7.21727 34.5217 7.20715 34.4642 7.11113L34.5149 7.07095L34.7304 7.34287L34.6797 7.38282C34.5914 7.29528 34.5825 7.2908 34.4829 7.36905L34.4046 7.431L34.5394 7.60149C34.6435 7.73374 34.6595 7.73468 34.7606 7.66726L34.7983 7.71539L34.413 8.01966L34.375 7.97183C34.4453 7.90453 34.4485 7.88859 34.3437 7.75633L34.0241 7.35187C33.9193 7.21956 33.9032 7.21838 33.8209 7.27127L33.7834 7.22344L34.3399 6.78315C34.3575 6.80298 34.4338 6.88828 34.5146 6.97747L34.4665 7.02153C34.4058 6.96812 34.3659 6.944 34.3319 6.93911C34.2972 6.93258 34.2529 6.95523 34.192 7.00377L34.1382 7.04666C34.1175 7.06295 34.1149 7.06466 34.1507 7.11008L34.3466 7.3577ZM35.219 6.4687C35.0637 6.34857 34.961 6.36586 34.8795 6.43046C34.741 6.53983 34.7818 6.76633 34.9216 6.94288C35.0992 7.16797 35.3176 7.23074 35.4362 7.13673C35.5362 7.05736 35.54 6.94347 35.4918 6.76203L35.5491 6.73044C35.5915 6.81451 35.6477 6.94182 35.6647 7.00383C35.6421 7.0353 35.5591 7.1432 35.4821 7.20415C35.1722 7.44935 34.8848 7.33781 34.7289 7.14037C34.5287 6.88687 34.5778 6.56536 34.8436 6.35474C34.9397 6.27932 35.0361 6.24261 35.0746 6.22461C35.1365 6.2845 35.1838 6.33498 35.2632 6.42122L35.219 6.4687Z" fill="white" />
                                        <path d="M28.5 14.1758C29.6531 14.1758 30.5879 13.241 30.5879 12.0879C30.5879 10.9348 29.6531 10 28.5 10C27.3469 10 26.4121 10.9348 26.4121 12.0879C26.4121 13.241 27.3469 14.1758 28.5 14.1758Z" fill="white" />
                                        <path d="M29.6776 10.7134C29.7321 10.8248 29.7904 10.9576 29.8303 11.0785C29.5651 10.9902 29.3006 10.9386 29.046 10.9108C29.0442 10.7864 29.0349 10.4794 28.9801 10.2109C29.1793 10.2619 29.3692 10.3444 29.5423 10.4554C29.56 10.4866 29.6158 10.5862 29.6776 10.7134ZM29.5569 13.7121C29.3788 13.8286 29.1826 13.9147 28.9764 13.9669C29.0324 13.7036 29.0464 13.4023 29.05 13.2742C29.304 13.2462 29.5677 13.1945 29.8321 13.1063C29.793 13.2259 29.7369 13.3555 29.6846 13.4645C29.6445 13.5483 29.6019 13.6309 29.5569 13.7121ZM29.9964 12.6882C29.9731 12.7537 29.9464 12.8179 29.9162 12.8805C29.9069 12.8995 29.8994 12.914 29.8935 12.9252C29.4164 13.104 28.9319 13.1525 28.5003 13.1524C28.0688 13.1525 27.5841 13.104 27.107 12.925C27.0762 12.8672 26.9951 12.7004 26.9403 12.4741C27.4777 12.5929 28.019 12.6238 28.5002 12.6238C28.9815 12.6238 29.5229 12.5929 30.0603 12.4741C30.0429 12.5465 30.0216 12.618 29.9964 12.6882ZM27.316 13.4645C27.2637 13.3555 27.2077 13.2258 27.1685 13.1062C27.433 13.1944 27.6967 13.2462 27.9507 13.2742C27.9543 13.4023 27.9683 13.7036 28.0244 13.9668C27.8181 13.9146 27.6219 13.8285 27.4437 13.7121C27.3987 13.6308 27.3561 13.5483 27.316 13.4645ZM30.1133 12.0443C30.1133 12.1378 30.1053 12.2277 30.0923 12.3123C29.5497 12.4399 28.9947 12.4735 28.5003 12.4734C28.0059 12.4735 27.451 12.4399 26.9084 12.3123C26.8946 12.2237 26.8875 12.1341 26.8872 12.0444C26.8872 11.9895 26.8902 11.9335 26.8962 11.8766C27.4418 11.7481 28.0018 11.7135 28.5003 11.7135C28.9988 11.7135 29.5587 11.7481 30.1043 11.8765C30.1103 11.9333 30.1133 11.9895 30.1133 12.0443Z" fill="#B48D00" />
                                        <path d="M28.5003 11.5623C28.0128 11.5624 27.4644 11.5945 26.9219 11.7154C26.9568 11.5544 27.0188 11.4005 27.1053 11.2603C27.583 11.081 28.0681 11.0323 28.5003 11.0324C28.9323 11.0323 29.4175 11.081 29.8953 11.2604C29.9817 11.4006 30.0437 11.5544 30.0786 11.7154C29.536 11.5944 28.9876 11.5624 28.5003 11.5623ZM27.4584 10.4547C27.6315 10.3437 27.8213 10.2612 28.0205 10.2103C27.9657 10.4788 27.9564 10.7857 27.9547 10.9102C27.7 10.9379 27.4355 10.9896 27.1703 11.0779C27.2101 10.957 27.2685 10.8242 27.323 10.7127C27.3655 10.6253 27.4107 10.5393 27.4584 10.4547ZM28.8185 10.1769C28.8793 10.426 28.8927 10.7556 28.8952 10.8964C28.7638 10.8866 28.6321 10.8817 28.5003 10.8819C28.3732 10.8819 28.2409 10.8861 28.1052 10.8964C28.1077 10.7556 28.1211 10.426 28.1821 10.1769C28.2856 10.1597 28.3918 10.1504 28.5003 10.1504C28.6088 10.1504 28.7149 10.1597 28.8185 10.1769Z" fill="#B48D00" />
                                        <path d="M26.5625 12.0882C26.5625 11.553 26.7793 11.0691 27.1299 10.7183C27.1438 10.7044 27.1582 10.6911 27.1725 10.6777C27.1018 10.8256 27.027 11.0038 26.9908 11.1589L26.9907 11.1589C26.8001 11.4586 26.7362 11.7682 26.7363 12.0441C26.7371 12.5771 26.9691 12.9877 26.9881 13.0216C27.0229 13.1722 27.0927 13.3431 27.1596 13.4866C27.1498 13.4772 27.1396 13.468 27.1299 13.4583C26.7792 13.1073 26.5625 12.6235 26.5625 12.0882ZM28.1862 14C28.1469 13.8443 28.1245 13.6557 28.1129 13.5023C28.1075 13.4309 28.1036 13.3594 28.1012 13.2878C28.2338 13.2978 28.3668 13.3028 28.4999 13.3027C28.6281 13.3027 28.7617 13.2982 28.8986 13.2878C28.8962 13.3594 28.8923 13.4309 28.8869 13.5024C28.8752 13.6557 28.8529 13.8443 28.8136 14C28.7114 14.0166 28.6067 14.0256 28.4999 14.0256C28.393 14.0256 28.2884 14.0167 28.1862 14ZM29.8699 13.4582C29.8602 13.4679 29.85 13.477 29.8402 13.4864C29.907 13.343 29.9769 13.1722 30.0117 13.0216C30.0305 12.9881 30.2627 12.5773 30.2634 12.0441C30.2636 11.7682 30.1997 11.4585 30.0091 11.1589C29.9728 11.0037 29.8979 10.8256 29.8273 10.6777C29.8416 10.6912 29.856 10.7044 29.8699 10.7183C30.2206 11.0691 30.4373 11.553 30.4373 12.0882C30.4372 12.6235 30.2206 13.1073 29.8699 13.4582Z" fill="#B48D00" />
                                        <path d="M27.4236 7.05078L27.1843 7.05384C27.0383 7.05396 26.5944 7.19521 26.594 7.19527C26.2565 7.2964 25.6708 7.55155 25.5734 7.59426C25.7287 7.62127 25.9041 7.71651 25.906 7.71687C25.9061 7.71687 25.9277 7.72846 25.9373 7.73393C25.9497 7.74122 26.0118 7.77558 26.0338 7.85088C26.0793 7.87542 26.1158 7.89671 26.1452 7.91554L26.4821 7.5279C26.621 7.45566 27.0931 7.30546 27.0936 7.30517C27.2308 7.29381 27.2598 7.25769 27.2602 7.22898C27.2601 7.21963 27.2572 7.21054 27.2518 7.20286C27.2524 7.16085 27.3047 7.15215 27.3048 7.15203C27.4497 7.12091 27.4661 7.09043 27.4676 7.08802C27.467 7.0499 27.4237 7.05084 27.4236 7.05078ZM23.1239 7.43948C23.1467 7.41795 23.1885 7.39412 23.226 7.37565C23.1523 7.37306 23.124 7.351 23.1207 7.34805C23.0936 7.32099 23.0682 7.31764 23.055 7.31746C23.0491 7.31746 23.0466 7.31811 23.0461 7.31823L22.9735 7.33199C22.7977 7.35623 22.7447 7.42053 22.7275 7.4563L22.931 7.47407C22.9427 7.47603 22.9547 7.47697 22.9671 7.47689C23.0346 7.47731 23.1085 7.44801 23.1234 7.44001L23.1239 7.43948Z" fill="white" />
                                        <path d="M25.6925 8.38928C25.6734 8.38919 25.6543 8.38816 25.6353 8.38622C25.5831 8.40457 25.5041 8.40804 25.4247 8.4084C25.3511 8.40826 25.2774 8.4049 25.204 8.39834C25.1876 8.39896 25.1713 8.39928 25.1552 8.39928C24.7423 8.39892 24.4458 8.20013 24.4429 8.19837C24.4414 8.19613 24.2855 8.09224 24.2835 7.92069H24.3401C24.3393 8.02035 24.4153 8.10183 24.4545 8.13536C24.4669 8.14607 24.4745 8.15136 24.4748 8.1516C24.4755 8.1516 24.5454 8.19884 24.6662 8.24673C24.7873 8.29473 24.958 8.34262 25.1552 8.34262C25.1719 8.34262 25.1885 8.34227 25.2051 8.34156C25.207 8.34165 25.2088 8.34183 25.2107 8.34209L25.2128 8.34233L25.2261 8.34351C25.2922 8.34888 25.3584 8.35166 25.4247 8.35186C25.5046 8.35221 25.5877 8.34574 25.6213 8.33115L25.6287 8.32803L25.6366 8.32927C25.6366 8.32915 25.6534 8.33215 25.693 8.33262C25.7023 8.3327 25.7124 8.33276 25.7231 8.3328C25.846 8.33303 26.0675 8.32327 26.1751 8.28797L26.1815 8.28597L26.1881 8.28697C26.1882 8.28691 26.2494 8.29621 26.3234 8.30544C26.3627 8.31038 26.4057 8.31533 26.4451 8.31891C26.405 8.28247 26.3659 8.24503 26.3278 8.20661C26.3277 8.20661 26.2844 8.15378 26.2657 8.13907C26.2554 8.13771 26.2509 8.13513 26.2391 8.13171C26.2296 8.12851 26.2201 8.12517 26.2106 8.12171L26.2004 8.15472C26.1049 8.12501 25.88 8.09818 25.6822 8.08C25.5866 8.07124 25.4909 8.06348 25.3952 8.0567C25.4017 8.06302 25.4084 8.06969 25.4153 8.07671C25.4575 8.12189 25.5038 8.1776 25.5054 8.24149C25.5064 8.28779 25.4728 8.33074 25.4124 8.35157L25.3927 8.2985C25.441 8.27897 25.4477 8.26202 25.4487 8.24155C25.4503 8.2099 25.4144 8.15636 25.3744 8.11606C25.3499 8.09068 25.3235 8.0671 25.2956 8.04553L25.2202 7.98899L25.3142 7.99464C25.3156 7.99499 25.8319 8.02588 26.1079 8.07588C26.104 8.07306 26.0992 8.06865 26.0965 8.05164C26.0961 8.03488 26.1116 8.02382 26.1173 8.02305C26.124 8.02082 26.1282 8.02082 26.1328 8.02076C26.1421 8.02082 26.1589 8.01846 26.1772 8.01835C26.1806 8.01839 26.1842 8.01852 26.1879 8.01876C26.1839 8.01501 26.1798 8.0114 26.1756 8.00793C26.1453 7.98252 26.0899 7.94569 25.9959 7.89574L25.9842 7.88951L25.9815 7.87656C25.97 7.81967 25.9197 7.78985 25.909 7.78396C25.9008 7.77932 25.879 7.76755 25.879 7.76755C25.879 7.76755 25.821 7.73666 25.7439 7.70566C25.667 7.67448 25.5706 7.64418 25.5011 7.64442C25.4905 7.64442 25.4807 7.64512 25.4717 7.64653L25.4631 7.59053C25.4839 7.58746 25.505 7.58698 25.5259 7.58911L25.5236 7.58759C25.29 7.43257 24.7184 7.24066 24.7049 7.24007H24.7048C24.5434 7.20318 24.2839 7.0677 24.2835 7.06758C23.9948 6.91203 23.7516 6.87885 23.7513 6.87885C23.7258 6.87415 23.6998 6.87188 23.6738 6.87208C23.5097 6.87214 23.3255 6.94774 23.3252 6.94786C23.1548 7.0171 23.067 7.14365 23.0667 7.14406C23.0396 7.18318 23.0161 7.27284 23.01 7.2969L23.0399 7.29119C23.0408 7.29108 23.0461 7.2899 23.0547 7.28978C23.0732 7.28972 23.1078 7.29572 23.1397 7.32791C23.1397 7.32785 23.14 7.32832 23.1432 7.33008C23.1463 7.33191 23.1516 7.33449 23.1594 7.3372C23.175 7.34255 23.201 7.34832 23.2407 7.34832C23.2578 7.34836 23.2778 7.3471 23.3005 7.34455H23.3007L23.3037 7.37256L23.3039 7.37291C23.297 7.37542 23.2902 7.37815 23.2835 7.38109C23.2704 7.38668 23.2533 7.39456 23.2354 7.40344C23.201 7.42045 23.1627 7.44245 23.1456 7.45857C23.1433 7.46345 23.1417 7.46116 23.1409 7.46316C23.1395 7.46416 23.1383 7.4648 23.1368 7.46563C23.133 7.4676 23.1291 7.46942 23.1251 7.4711C23.0919 7.48508 23.0572 7.49513 23.0217 7.50104C23.0259 7.50634 23.0302 7.51075 23.0344 7.5134C23.0466 7.52052 23.0846 7.56699 23.1184 7.61059C23.1355 7.63253 23.1518 7.65389 23.1642 7.66983C23.1764 7.68413 23.1804 7.69266 23.1868 7.69654C23.2843 7.8135 23.2942 7.90927 23.2942 7.94375C23.2942 7.95287 23.2935 7.95746 23.2936 7.95746C23.2855 7.98522 23.2821 8.0164 23.2821 8.04882C23.2821 8.21967 23.3766 8.42457 23.3767 8.42493C23.6399 8.98588 24.1333 9.11731 24.5357 9.11713C24.6449 9.11683 24.7539 9.10784 24.8617 9.09025L24.6035 9.78622L24.5966 9.77951V9.77945C24.5963 9.78069 24.5586 9.81605 24.557 9.84811C24.5569 9.85176 24.5577 9.8554 24.5591 9.85905L24.5476 9.87576C24.5488 9.87488 24.5276 9.89123 24.5253 9.91612C24.5205 9.92024 24.5118 9.92806 24.5081 9.93677C24.5065 9.94089 24.5 9.95748 24.4999 9.9756C24.4999 9.98071 24.5004 9.98613 24.5021 9.99148L24.4417 10.0694L24.4414 10.069C24.437 10.0625 24.4271 10.0629 24.4268 10.0625L24.4114 10.0644L24.3794 10.0687L24.3694 10.074L24.3653 10.0856L24.355 10.0902L24.3359 10.0937L24.2949 10.0976L24.2255 10.1049C24.2259 10.1048 24.1873 10.1035 24.1566 10.1035C24.1379 10.1037 24.1239 10.1035 24.1187 10.1061C24.0736 10.112 24.0575 10.1415 24.0573 10.1421C24.0575 10.1424 24.031 10.1686 24.026 10.1787C23.9964 10.2016 23.9881 10.2326 23.9882 10.2593C23.9882 10.2908 23.9993 10.3167 24.0005 10.3193L24.0005 10.3195L24.0067 10.3168C24.0047 10.3119 24.0037 10.3066 24.0037 10.3013C24.0034 10.277 24.0258 10.2523 24.0494 10.2342C24.0705 10.2176 24.0942 10.2063 24.0983 10.2049C24.1048 10.2083 24.112 10.2101 24.1194 10.21C24.1227 10.2099 24.126 10.2096 24.1293 10.2089C24.1286 10.2101 24.1057 10.24 24.1026 10.2496C24.0936 10.2586 24.0865 10.2692 24.0818 10.281C24.077 10.2927 24.0746 10.3053 24.0748 10.318C24.0748 10.3582 24.0958 10.3917 24.0959 10.3921L24.1017 10.3886C24.0981 10.3823 24.0963 10.3752 24.0964 10.3681C24.0963 10.3442 24.1157 10.3181 24.1361 10.2983C24.1463 10.2885 24.1567 10.2802 24.1648 10.2743C24.1689 10.2714 24.1723 10.2691 24.1749 10.2676C24.1768 10.2663 24.1777 10.2661 24.1781 10.2658C24.1829 10.2677 24.1881 10.2686 24.1933 10.2685C24.2259 10.2683 24.2529 10.2349 24.2533 10.2347L24.3969 10.1878C24.398 10.1907 24.3998 10.1932 24.4023 10.1952L24.3751 10.2072C24.3748 10.2075 24.282 10.2329 24.2739 10.2407C24.2326 10.2605 24.2265 10.2936 24.2265 10.2941C24.2265 10.2942 24.2085 10.3309 24.2075 10.3395C24.1968 10.3551 24.191 10.3736 24.191 10.3925C24.1911 10.4358 24.2193 10.4713 24.2257 10.4788L24.2268 10.4802H24.2269L24.2269 10.4803L24.232 10.476C24.2254 10.468 24.222 10.458 24.2222 10.4477C24.2222 10.4245 24.2371 10.3974 24.2529 10.3765C24.2607 10.3659 24.2688 10.3569 24.2749 10.3506C24.2781 10.3474 24.2815 10.3443 24.2849 10.3413C24.2874 10.3418 24.2899 10.3421 24.2925 10.3421C24.3289 10.3416 24.3528 10.2975 24.3531 10.2975L24.3834 10.2809C24.3855 10.3059 24.3931 10.326 24.3948 10.3296L24.3949 10.3302L24.395 10.3302L24.4011 10.3276C24.3991 10.3227 24.3981 10.3175 24.3981 10.3122C24.3979 10.291 24.4149 10.2699 24.4348 10.2529L24.4984 10.2182C24.5032 10.22 24.5083 10.221 24.5134 10.2211C24.5168 10.221 24.5202 10.2207 24.5236 10.22C24.5231 10.221 24.5002 10.2511 24.4971 10.2607C24.4881 10.2696 24.481 10.2803 24.4762 10.2921C24.4714 10.3039 24.469 10.3166 24.4692 10.3293C24.4692 10.3666 24.4873 10.3982 24.4899 10.4025L24.4901 10.4029V10.403L24.496 10.3997L24.4959 10.3995C24.4925 10.3933 24.4907 10.3864 24.4907 10.3793C24.4907 10.3555 24.5101 10.3293 24.5307 10.3095C24.5397 10.3008 24.5493 10.2927 24.5594 10.2853C24.5636 10.2823 24.568 10.2795 24.5724 10.2769L24.5727 10.2766C24.5775 10.2786 24.5827 10.2796 24.5879 10.2796C24.6205 10.2792 24.6474 10.2462 24.6477 10.246L24.7866 10.2004C24.7892 10.2022 24.792 10.2031 24.7949 10.2039C24.7956 10.2047 24.7961 10.2056 24.7969 10.2063L24.7696 10.2185C24.7694 10.2189 24.6767 10.2439 24.6683 10.2521C24.627 10.2715 24.6209 10.3047 24.6207 10.3053C24.6209 10.305 24.603 10.3418 24.6019 10.3502C24.591 10.3658 24.5853 10.3844 24.5854 10.4035C24.5855 10.4501 24.618 10.4877 24.621 10.4912L24.6212 10.4914L24.6213 10.4915L24.6264 10.4871L24.6263 10.487L24.626 10.4867C24.6197 10.4788 24.6164 10.4689 24.6166 10.4588C24.6165 10.4356 24.6315 10.4085 24.6472 10.3876C24.6551 10.3771 24.663 10.3681 24.6693 10.3618C24.6724 10.3586 24.6758 10.3556 24.6793 10.3528L24.6792 10.3527C24.6816 10.3532 24.6841 10.3534 24.6866 10.3534C24.7231 10.3529 24.7471 10.3088 24.7475 10.3086L24.8523 10.2516C24.8584 10.2642 24.8629 10.2784 24.8629 10.2936C24.863 10.2974 24.8627 10.3011 24.8622 10.3048V10.3049L24.8671 10.3056C24.8671 10.3055 24.8701 10.2868 24.8701 10.2622C24.8701 10.2559 24.8698 10.2491 24.8692 10.2423L24.917 10.2163L24.9521 10.2174L24.9548 10.2175L24.9573 10.2162C24.9574 10.2157 24.9627 10.2127 24.9704 10.2082H24.9735C24.982 10.2074 24.9968 10.1984 24.9972 10.1983L25.0064 10.1885L25.0109 10.1817C25.0134 10.1798 25.0158 10.1779 25.0183 10.1759L25.0207 10.1797L25.0271 10.1855C25.0282 10.1861 25.0324 10.1873 25.0365 10.1874C25.0384 10.1873 25.0403 10.1872 25.042 10.1859C25.0453 10.1836 25.0527 10.1768 25.0545 10.1753L25.0617 10.1706L25.1654 10.1951C25.1653 10.1957 25.1781 10.216 25.1933 10.2165C25.1957 10.2164 25.1981 10.2158 25.2002 10.2147C25.2023 10.2136 25.2042 10.212 25.2057 10.2102C25.2119 10.215 25.2572 10.255 25.2573 10.3045C25.2573 10.3083 25.257 10.3121 25.2566 10.3159V10.316L25.2615 10.3168C25.2615 10.3167 25.2646 10.2978 25.2646 10.2728C25.2645 10.2435 25.2604 10.2057 25.2411 10.1807C25.2392 10.1735 25.2231 10.1457 25.223 10.1452C25.223 10.1456 25.2139 10.1173 25.189 10.1137C25.1885 10.1129 25.1869 10.1131 25.1846 10.113C25.1713 10.113 25.1357 10.1212 25.1356 10.1212L25.1016 10.1186L25.0808 10.1177L25.0706 10.1155L25.0656 10.1101L25.0648 10.1023L25.0594 10.0965L25.0486 10.0951L25.0514 10.052L25.051 10.0505C25.051 10.0505 25.044 10.0243 25.044 9.98795C25.044 9.96436 25.047 9.93689 25.0566 9.91018C25.0562 9.91118 25.0812 9.86364 25.0929 9.83175L25.1305 9.69603L25.3359 9.18091C25.3359 9.1812 25.3468 9.15626 25.3588 9.13084C25.3648 9.11825 25.371 9.10537 25.3761 9.09566C25.3787 9.0909 25.381 9.08678 25.3827 9.08407C25.3832 9.08311 25.3839 9.0822 25.3846 9.08136L25.3847 9.08125C25.3911 9.07714 25.3962 9.07114 25.3991 9.06407L25.5699 9.01612L25.6905 8.78892C25.7736 8.70608 25.7843 8.61831 25.7842 8.57959C25.7842 8.56671 25.783 8.55918 25.783 8.559C25.8012 8.50964 25.83 8.44934 25.8631 8.3861C25.8062 8.38861 25.7494 8.38966 25.6925 8.38928ZM23.629 7.30043C23.5693 7.30043 23.5207 7.25913 23.5207 7.20801C23.5207 7.15671 23.5693 7.11517 23.629 7.11517C23.6886 7.11517 23.737 7.15671 23.737 7.20801C23.737 7.25913 23.6886 7.30043 23.629 7.30043ZM24.9898 9.7924C24.9826 9.80022 24.953 9.83123 24.9517 9.85941C24.9517 9.86309 24.9524 9.86674 24.9538 9.87017L24.9421 9.88682C24.9433 9.886 24.9223 9.90247 24.92 9.92724C24.9152 9.93141 24.9064 9.93924 24.9027 9.94777C24.9012 9.95206 24.8945 9.96854 24.8945 9.98648C24.8945 9.99172 24.895 9.99719 24.8967 10.0026L24.8363 10.0806L24.836 10.0801C24.8314 10.0737 24.8216 10.0743 24.8214 10.0738L24.8062 10.0757L24.7741 10.0796L24.7637 10.0853L24.7599 10.0966L24.7496 10.1011L24.7305 10.1047L24.7025 10.1074L24.6864 10.1067L24.677 10.1042L24.6716 10.0989L24.6706 10.0907L24.6652 10.0851L24.6545 10.0838L24.6573 10.0409L24.657 10.0393C24.6522 10.0189 24.6498 9.99802 24.65 9.97707C24.65 9.95342 24.653 9.92577 24.6627 9.899C24.6623 9.9 24.6871 9.85258 24.6988 9.82046L24.7365 9.68497L24.942 9.16967C24.9419 9.16991 24.9528 9.14508 24.9648 9.11978C24.9707 9.10713 24.977 9.09437 24.9821 9.08466C24.9846 9.07989 24.9869 9.07578 24.9887 9.07307C24.9892 9.07215 24.9898 9.07129 24.9905 9.07048L24.9907 9.0703V9.07025C24.9932 9.06862 24.9955 9.06669 24.9976 9.06448C25.106 9.04018 25.1729 9.01665 25.173 9.01659L25.2232 9.00165L25.2391 9.03365L25.2456 9.04742L25.2571 9.07166L24.9898 9.7924ZM36.8672 20.5565L38.1731 18.4666L37.274 18.9277C37.274 18.9277 37.2668 18.9313 37.2491 18.9401C37.1242 19.0016 36.5363 19.2837 35.5325 19.6388C35.3078 19.7187 34.8242 19.8522 34.4013 19.9846C34.1886 20.0515 33.9902 20.118 33.8327 20.1842C33.7534 20.2179 33.6851 20.25 33.62 20.2922C33.5883 20.3126 33.5589 20.3365 33.5324 20.3633L33.5182 20.3469L33.5165 20.3484H33.5165C33.5001 20.3625 33.4851 20.3779 33.4714 20.3946C33.4411 20.4315 33.4174 20.4734 33.4014 20.5185C33.3833 20.5711 33.3742 20.6265 33.3747 20.6822C33.3758 20.7424 33.3836 20.7973 33.3952 20.8487C32.1928 21.0585 30.5007 21.2221 28.9568 21.2498C29.0151 21.1712 29.078 21.0961 29.1451 21.0249C29.2473 20.9176 29.359 20.8198 29.4788 20.7327C29.4862 20.7409 29.4939 20.7491 29.5019 20.7573C29.6212 20.8809 29.8234 21.0054 30.1137 21.0054H30.1173C30.1999 21.0054 30.2892 20.9958 30.3854 20.9745L30.5431 20.9398L30.4548 20.8047C30.4528 20.8019 30.426 20.7609 30.3779 20.7031C30.5117 20.7877 30.6886 20.8509 30.9126 20.8509H30.9165C30.9998 20.8509 31.0893 20.8426 31.1852 20.8245L31.3438 20.7943L31.2594 20.6565C31.2582 20.6547 31.2456 20.6343 31.2226 20.6019C31.3446 20.6727 31.5023 20.7227 31.6996 20.7227H31.7046C31.7487 20.7227 31.7945 20.7204 31.842 20.7156L32.003 20.6994L31.9575 20.6084C32.0856 20.697 32.2609 20.7638 32.489 20.7638H32.4943C32.5382 20.7638 32.5837 20.7614 32.6309 20.7567L32.792 20.7406L32.7197 20.596C32.7184 20.5937 32.7055 20.5678 32.6815 20.5281C32.7035 20.5301 32.7262 20.5312 32.7495 20.5314H32.7515C32.9255 20.5314 33.1298 20.4728 33.344 20.3153L33.4742 20.2198L33.3389 20.1319C33.3302 20.1282 33.0459 19.9368 32.7064 19.9326C32.7512 19.8763 32.7911 19.8162 32.8254 19.753L32.9034 19.6119L32.7438 19.5888C32.74 19.5882 32.6737 19.5787 32.5748 19.5787C32.452 19.579 32.2788 19.5925 32.1106 19.6627C32.0596 19.6836 32.009 19.7117 31.961 19.746C32.0011 19.6606 32.0311 19.5708 32.0502 19.4783L32.0843 19.3207L31.9247 19.3446C31.9196 19.3454 31.808 19.3622 31.6655 19.4154C31.5715 19.4509 31.463 19.5025 31.3635 19.5791C31.3908 19.5089 31.4141 19.432 31.4313 19.3469L31.464 19.1887L31.3046 19.2142C31.2995 19.215 31.1731 19.2353 31.0123 19.297C30.8521 19.3592 30.6549 19.4617 30.5147 19.6407C30.4993 19.6604 30.485 19.6815 30.4713 19.7032C30.4832 19.6332 30.489 19.5622 30.4885 19.4912C30.4886 19.4415 30.4859 19.3895 30.4804 19.3352L30.4639 19.1747L30.3196 19.2468C30.3142 19.2498 30.1542 19.3294 29.9892 19.4786C29.9132 19.5478 29.8343 19.6338 29.7713 19.7356C29.7588 19.6832 29.7418 19.6289 29.7204 19.5726L29.6628 19.4219L29.5421 19.5291C29.5381 19.5328 29.4452 19.6155 29.35 19.749C29.2557 19.8828 29.155 20.0689 29.154 20.2871C29.1541 20.3681 29.1693 20.4484 29.199 20.5238C29.0932 20.6065 28.9939 20.6971 28.9019 20.7949C28.7693 20.9354 28.6513 21.0891 28.5501 21.2537L28.4995 21.2539C28.4829 21.2539 28.4661 21.2536 28.4494 21.2536C28.3482 21.0891 28.2303 20.9353 28.0977 20.7949C28.0057 20.6971 27.9064 20.6065 27.8006 20.5238C27.8317 20.4443 27.8457 20.364 27.8455 20.2871C27.8446 20.0689 27.7439 19.8827 27.6495 19.749C27.5543 19.6154 27.4614 19.5328 27.4574 19.5291L27.3367 19.4219L27.2791 19.5726C27.2576 19.6289 27.2408 19.6832 27.2282 19.7356C27.1652 19.6338 27.0863 19.5478 27.0103 19.4786C26.8453 19.3294 26.6854 19.2498 26.6799 19.2468L26.5356 19.1747L26.5191 19.3352C26.5137 19.387 26.511 19.4391 26.5109 19.4912C26.5105 19.5623 26.5163 19.6332 26.5283 19.7032C26.5148 19.6816 26.5003 19.6608 26.4848 19.6407C26.3447 19.4617 26.1475 19.3591 25.9872 19.297C25.8265 19.2353 25.7001 19.215 25.6949 19.2142L25.5356 19.1887L25.5682 19.3469C25.5841 19.4261 25.6068 19.5038 25.636 19.5791C25.5366 19.5026 25.4281 19.4509 25.334 19.4154C25.1916 19.3622 25.0799 19.3454 25.0748 19.3446L24.9152 19.3207L24.9493 19.4783C24.9684 19.5708 24.9983 19.6606 25.0385 19.746C24.992 19.7126 24.9418 19.6846 24.8888 19.6627C24.7207 19.5925 24.5475 19.579 24.4247 19.5787C24.3259 19.5787 24.2595 19.5882 24.2556 19.5888L24.0961 19.6119L24.1741 19.753C24.2084 19.8163 24.2482 19.8764 24.2931 19.9326C23.9536 19.9368 23.6693 20.1282 23.6607 20.1319L23.5254 20.2198L23.6556 20.3153C23.8698 20.4728 24.0741 20.5314 24.2481 20.5314H24.25C24.2734 20.5312 24.2961 20.5301 24.3181 20.5281C24.2941 20.5678 24.2811 20.5937 24.2799 20.596L24.2076 20.7406L24.3686 20.7567C24.4159 20.7614 24.4614 20.7638 24.5053 20.7638H24.5106C24.7387 20.7638 24.914 20.697 25.0421 20.6084L24.9967 20.6994L25.1576 20.7156C25.2052 20.7204 25.251 20.7227 25.295 20.7227H25.3001C25.4974 20.7227 25.655 20.6727 25.777 20.6019C25.7541 20.6343 25.7415 20.6547 25.7403 20.6565L25.6558 20.7943L25.8145 20.8245C25.9104 20.8426 25.9999 20.8509 26.0832 20.8509H26.0871C26.3112 20.8509 26.488 20.7877 26.6218 20.7031C26.5738 20.7609 26.5469 20.8019 26.545 20.8047L26.4567 20.9398L26.6143 20.9745C26.7105 20.9958 26.7998 21.0054 26.8824 21.0054H26.886C27.1764 21.0054 27.3786 20.8809 27.4978 20.7573C27.5059 20.7491 27.5135 20.7409 27.5209 20.7327C27.6407 20.8198 27.7524 20.9176 27.8546 21.0249C27.9216 21.096 27.9844 21.1709 28.0426 21.2494C26.7069 21.2255 25.2609 21.1005 24.1158 20.9309C23.9447 20.9057 23.774 20.8783 23.6037 20.8486C23.6154 20.7972 23.6232 20.7423 23.6243 20.6821C23.6247 20.6265 23.6157 20.5712 23.5975 20.5186C23.5781 20.4635 23.5471 20.4132 23.5067 20.3712C23.499 20.3632 23.4909 20.3556 23.4825 20.3484L23.4823 20.3482L23.4679 20.3648C23.4056 20.3019 23.3523 20.2749 23.291 20.2416C23.1782 20.1842 23.0397 20.132 22.88 20.0768C22.6417 19.995 22.3604 19.9112 22.1008 19.8343C21.8423 19.7578 21.6032 19.6872 21.4666 19.6387C20.8929 19.4357 20.4551 19.2567 20.1619 19.1291C20.0511 19.0809 19.941 19.031 19.8317 18.9795C19.795 18.962 19.7678 18.9488 19.7499 18.94C19.7321 18.9312 19.7251 18.9275 19.7249 18.9275L18.8261 18.4667L19.3614 19.3234L20.1318 20.5565L17 20.7441L18.2792 21.2036C18.2799 21.2038 18.5563 21.3031 18.9211 21.4359C19.286 21.5687 19.7387 21.7346 20.088 21.8667C20.2883 21.9425 20.5122 22.0292 20.7406 22.1186C20.7416 22.1872 20.7467 22.2553 20.7571 22.3222L20.7567 22.3259L20.7362 22.5591L20.9018 22.6033C20.9093 22.6095 20.9165 22.6156 20.9234 22.6214C21.0219 22.6939 21.1302 22.7403 21.2763 22.7952C21.7794 22.9783 22.7168 23.1878 23.9719 23.3587C25.2247 23.5285 26.7857 23.6551 28.4997 23.6551C30.5893 23.655 32.451 23.4671 33.805 23.2418C34.4825 23.1289 35.032 23.0069 35.4261 22.8917C35.6238 22.8335 35.7816 22.7782 35.9059 22.7201C35.9686 22.6906 36.0228 22.6614 36.0759 22.6215C36.0828 22.6157 36.0899 22.6097 36.0974 22.6035L36.2632 22.5594L36.2428 22.3259C36.2426 22.3247 36.2425 22.3234 36.2423 22.3222C36.2525 22.2549 36.2579 22.1869 36.2586 22.1187C36.4871 22.0293 36.7111 21.9427 36.9114 21.8668C37.2607 21.7347 37.7134 21.5687 38.0782 21.4361C38.292 21.3582 38.506 21.2807 38.7201 21.2037L40 20.7441L36.8672 20.5565ZM30.9045 20.2625L30.908 20.2694L30.8994 20.2626C30.9011 20.2626 30.9028 20.2626 30.9045 20.2625ZM30.0906 20.4142C30.1008 20.4304 30.1122 20.4473 30.125 20.4649C30.1054 20.4508 30.0849 20.4371 30.0637 20.4239C30.0727 20.4207 30.0814 20.4173 30.0906 20.4142ZM26.092 20.2694L26.0955 20.2625C26.0972 20.2625 26.0989 20.2625 26.1007 20.2626L26.092 20.2694ZM26.875 20.4649C26.8878 20.4473 26.8993 20.4304 26.9095 20.4142C26.9185 20.4174 26.9275 20.4206 26.9363 20.4239C26.9154 20.4368 26.895 20.4505 26.875 20.4649Z" fill="white" />
                                        <path d="M28.0355 20.8538C27.9249 20.7366 27.8037 20.6299 27.6734 20.5351C27.908 20.0793 27.3833 19.6124 27.3833 19.6124C27.2462 19.9714 27.3238 20.2209 27.4291 20.3775C27.3634 20.3401 27.2961 20.3055 27.2275 20.2739C27.3438 19.7037 26.6302 19.3465 26.6302 19.3465C26.5897 19.7443 26.7181 19.9895 26.8641 20.1374C26.7539 20.1047 26.6419 20.0784 26.5286 20.0588C26.4924 19.4546 25.6777 19.3242 25.6777 19.3242C25.7608 19.7262 25.9653 19.9211 26.1532 20.0156C26.0344 20.0086 25.9154 20.0074 25.7965 20.012C25.7003 19.5511 25.0586 19.4548 25.0586 19.4548C25.1299 19.7846 25.2939 19.9531 25.4505 20.0393C25.3558 20.0503 25.2614 20.0642 25.1675 20.0809C24.9753 19.5978 24.2719 19.6991 24.2719 19.6991C24.4418 20.0067 24.6577 20.1178 24.8368 20.1504C24.7875 20.1623 24.7374 20.1753 24.6869 20.1888C24.3094 19.8433 23.7217 20.2254 23.7217 20.2254C24.1507 20.5399 24.4864 20.4021 24.6392 20.302L24.6402 20.3058C24.4736 20.4584 24.3798 20.6458 24.3798 20.6458C24.9177 20.7004 25.1359 20.401 25.2137 20.2389C25.3131 20.2215 25.413 20.2073 25.5133 20.1964C25.2945 20.3538 25.1689 20.6046 25.1689 20.6046C25.7341 20.6623 25.9464 20.3289 26.0136 20.1746C26.1601 20.1778 26.2985 20.1891 26.4286 20.2086C26.0727 20.3282 25.8355 20.7148 25.8355 20.7148C26.4811 20.8375 26.7557 20.4705 26.8453 20.3031C26.9614 20.3389 27.0749 20.3828 27.1849 20.4347C26.8628 20.5231 26.6385 20.8657 26.6385 20.8657C27.1186 20.9718 27.3698 20.7565 27.4836 20.6024C27.6415 20.7066 27.7869 20.8286 27.9169 20.966C28.0013 21.0554 28.0791 21.1507 28.1498 21.2512C28.2162 21.2521 28.2822 21.2528 28.3479 21.2531C28.2563 21.1107 28.1517 20.977 28.0355 20.8538ZM29.0828 20.966C29.2129 20.8287 29.3583 20.7067 29.5161 20.6024C29.6299 20.7565 29.8812 20.9718 30.3612 20.8657C30.3612 20.8657 30.1369 20.5231 29.8148 20.4347C29.9247 20.3828 30.0382 20.3389 30.1544 20.3031C30.244 20.4705 30.5186 20.8375 31.1642 20.7148C31.1642 20.7148 30.927 20.3282 30.5711 20.2086C30.7011 20.1892 30.8395 20.1778 30.9861 20.1746C31.0533 20.3289 31.2655 20.6624 31.8308 20.6046C31.8308 20.6046 31.7052 20.3538 31.4863 20.1964C31.5866 20.2072 31.6866 20.2214 31.7859 20.2389C31.8638 20.4009 32.082 20.7004 32.6199 20.6458C32.6199 20.6458 32.5261 20.4584 32.3595 20.3058L32.3605 20.302C32.5133 20.4021 32.849 20.5398 33.2781 20.2254C33.2781 20.2254 32.6903 19.8433 32.3128 20.1888C32.2624 20.1753 32.2123 20.1623 32.163 20.1504C32.3421 20.1178 32.5579 20.0067 32.7279 19.6991C32.7279 19.6991 32.0246 19.5978 31.8323 20.0809C31.7384 20.0642 31.644 20.0503 31.5493 20.0393C31.7059 19.9531 31.87 19.7846 31.9413 19.4548C31.9413 19.4548 31.2995 19.5511 31.2033 20.012C31.155 20.0102 31.1074 20.0093 31.0606 20.0093C30.9892 20.0093 30.9179 20.0114 30.8466 20.0156C31.0346 19.9211 31.2391 19.7262 31.3221 19.3242C31.3221 19.3242 30.5073 19.4546 30.4712 20.0588C30.358 20.0785 30.2459 20.1048 30.1356 20.1374C30.2817 19.9895 30.4101 19.7443 30.3696 19.3465C30.3696 19.3465 29.656 19.7037 29.7723 20.2739C29.7036 20.3055 29.6364 20.3401 29.5707 20.3775C29.6759 20.2209 29.7535 19.9714 29.6164 19.6124C29.6164 19.6124 29.0917 20.0793 29.3263 20.5351C29.196 20.6299 29.0748 20.7366 28.9642 20.8538C28.8478 20.977 28.7432 21.1108 28.6516 21.2535C28.7173 21.253 28.7834 21.2523 28.8498 21.2513C28.914 21.1601 28.991 21.0631 29.0828 20.966Z" fill="#B48D00" />
                                        <path d="M36.5908 20.6989L37.7336 18.8701L37.3463 19.0688C37.3463 19.0688 37.31 19.0874 37.2354 19.1229C37.0113 19.2292 36.4513 19.482 35.5855 19.7883C35.3496 19.872 34.8687 20.0044 34.4488 20.136C34.2383 20.2021 34.0427 20.2679 33.8944 20.3304C33.8201 20.3618 33.7578 20.3918 33.707 20.4248C33.6816 20.4418 33.6585 20.4591 33.6369 20.4833C33.6239 20.4978 33.6132 20.5142 33.605 20.5319C33.5741 20.578 33.563 20.6326 33.5635 20.6822C33.5642 20.7672 33.5888 20.8541 33.6203 20.9387C33.2142 21.0149 32.7427 21.0865 32.2361 21.1477C31.075 21.2893 29.7202 21.3827 28.4996 21.3827C27.0367 21.3827 25.3812 21.2482 24.0972 21.0582C23.857 21.0229 23.6175 20.9831 23.3788 20.9387C23.4104 20.8541 23.435 20.7672 23.4357 20.6822C23.4361 20.6327 23.4251 20.5784 23.3943 20.5323C23.3861 20.5145 23.3753 20.498 23.3624 20.4833C23.3218 20.4392 23.2763 20.4132 23.2189 20.383C23.0217 20.2827 22.6751 20.1729 22.3198 20.0653C21.9662 19.9587 21.6069 19.8569 21.4139 19.7885C20.8366 19.5842 20.3953 19.4037 20.0988 19.2747C19.9864 19.2259 19.8748 19.1753 19.764 19.123C19.6893 19.0876 19.6531 19.0689 19.653 19.0689L19.2661 18.8706L19.4963 19.2393L20.4085 20.699L17.7827 20.8563L18.333 21.0542C18.3336 21.0545 18.6102 21.1538 18.9755 21.2868C19.3407 21.4196 19.7937 21.5857 20.1443 21.7183C20.3669 21.8026 20.6183 21.9 20.8723 21.9998C20.8701 22.0319 20.8689 22.0642 20.8688 22.0964C20.8688 22.1905 20.8779 22.2826 20.8968 22.3713C20.9176 22.4525 20.9618 22.4865 21.0012 22.5191C21.0785 22.5765 21.1806 22.6224 21.3206 22.6744C21.806 22.8516 22.7409 23.0617 23.9892 23.2313C25.2364 23.4004 26.792 23.5264 28.4997 23.5265C30.5815 23.5265 32.437 23.3392 33.7839 23.115C34.4574 23.0026 35.0033 22.8815 35.39 22.7683C35.5836 22.7114 35.737 22.6571 35.8514 22.6037C35.9089 22.5767 35.9566 22.5505 35.9981 22.5191C36.0378 22.4866 36.0819 22.4526 36.1026 22.3713C36.1215 22.2809 36.1309 22.1888 36.1306 22.0965C36.1305 22.0643 36.1293 22.0321 36.127 21.9999C36.3692 21.9046 36.6119 21.8108 36.8552 21.7184C37.2058 21.5859 37.6588 21.4197 38.024 21.287C38.3892 21.154 38.6659 21.0547 38.6666 21.0544L39.2179 20.8564L36.5908 20.6989Z" fill="#B48D00" />
                                        <path d="M21.7583 20.4295C21.7606 20.4272 21.7629 20.4243 21.7653 20.4225C21.7879 20.404 21.8091 20.3963 21.8297 20.3903C21.8709 20.3792 21.9141 20.3766 21.9657 20.3764C22.1352 20.3767 22.3915 20.413 22.6402 20.4486C22.6949 20.4565 22.7492 20.4644 22.802 20.4719C22.6948 20.4344 22.5869 20.3988 22.4784 20.365C22.063 20.2346 21.5863 20.104 21.3337 20.0146C20.6912 19.7873 20.2144 19.5888 19.915 19.4561L20.8263 20.9144L18.9619 21.026C19.3414 21.1639 19.8454 21.3483 20.2291 21.4934C20.4376 21.5723 20.6705 21.6625 20.9072 21.7552C21.0054 21.2994 21.2929 20.8227 21.7583 20.4295ZM38.0373 21.0261L36.1729 20.9145L37.0842 19.4561C36.7849 19.5888 36.3081 19.7873 35.6656 20.0147C35.4577 20.0882 35.1007 20.1889 34.7488 20.2951C34.5535 20.3538 34.3589 20.4149 34.197 20.472C34.2498 20.4645 34.3042 20.4566 34.3589 20.4487C34.6076 20.4131 34.8638 20.3768 35.0333 20.3765C35.0718 20.3766 35.1062 20.3784 35.138 20.3836C35.1696 20.3896 35.1997 20.3956 35.2336 20.4225C35.2356 20.424 35.2375 20.4264 35.2395 20.4283C35.7056 20.8216 35.9936 21.2989 36.0919 21.7553C36.3175 21.6668 36.5435 21.5795 36.7701 21.4935C37.1538 21.3483 37.6577 21.1639 38.0373 21.0261Z" fill="#DC161B" />
                                        <path d="M22.5244 20.743C22.7119 20.7975 22.9402 20.8515 23.1998 20.9037C23.2298 20.8275 23.2517 20.7515 23.2553 20.6986C23.2487 20.6988 23.242 20.6989 23.2354 20.6989C23.0994 20.6985 22.8632 20.6622 22.6147 20.6267C22.4134 20.5975 22.2054 20.569 22.0566 20.5596C22.068 20.5669 22.0803 20.5744 22.0951 20.5823C22.1854 20.6315 22.3341 20.6881 22.5244 20.743ZM34.9423 20.5596C34.7937 20.5691 34.5858 20.5976 34.3847 20.6267C34.1362 20.6622 33.9001 20.6985 33.764 20.6989C33.7572 20.6989 33.7506 20.6988 33.7442 20.6986C33.7477 20.7515 33.7697 20.8274 33.7996 20.9036C34.2381 20.8155 34.5861 20.7223 34.7985 20.6322C34.8486 20.6124 34.8967 20.5881 34.9423 20.5596Z" fill="#DC161B" />
                                        <path d="M35.8141 22.2814C35.7879 22.3002 35.7174 22.3387 35.6192 22.3755C35.2025 22.5375 34.2761 22.7537 33.0332 22.9246C31.7888 23.0963 30.2215 23.2257 28.4997 23.2257C26.436 23.2257 24.5944 23.0397 23.2648 22.8182C22.6003 22.7076 22.0632 22.5878 21.6938 22.4795C21.5093 22.4256 21.3664 22.3741 21.2753 22.3312C21.2322 22.3112 21.2008 22.2927 21.185 22.281C21.1741 22.2199 21.1687 22.158 21.169 22.0959C21.1676 21.6944 21.3847 21.1902 21.831 20.7666C21.9094 20.8316 22.0095 20.8794 22.1364 20.93C22.6508 21.1296 23.6249 21.3128 24.7862 21.4526C25.9458 21.5915 27.2846 21.6825 28.4995 21.6827C29.9805 21.6826 31.6455 21.5472 32.9459 21.3549C33.5964 21.2585 34.1548 21.1484 34.5585 21.0313C34.7608 20.9723 34.9239 20.9127 35.0472 20.8462C35.0923 20.8215 35.1326 20.7962 35.1682 20.7667C35.6144 21.1902 35.8316 21.6944 35.8302 22.0959C35.8302 22.1607 35.8247 22.2227 35.8141 22.2814Z" fill="#DC161B" />
                                        <path d="M22.5299 21.546C22.5377 21.5597 22.5418 21.5756 22.5418 21.5943C22.5418 21.6054 22.5404 21.6174 22.5374 21.6303C22.5313 21.6559 22.5193 21.6947 22.5015 21.7455L22.4942 21.7662L22.5718 21.7844L22.5777 21.768C22.6083 21.6853 22.63 21.6304 22.6423 21.604C22.6546 21.5775 22.67 21.5497 22.6882 21.5203L22.701 21.4997L22.6783 21.4913C22.6606 21.4848 22.6393 21.4758 22.6148 21.4648C22.5711 21.4444 22.5327 21.4299 22.4996 21.4224C22.4695 21.415 22.4387 21.4113 22.4077 21.4111C22.376 21.4111 22.3445 21.4155 22.3141 21.4243C22.257 21.4402 22.2045 21.4697 22.1614 21.5104C22.118 21.5513 22.0893 21.5967 22.0776 21.6466C22.0716 21.6717 22.0699 21.6977 22.0723 21.7233C22.0747 21.7501 22.0813 21.7773 22.0922 21.8049C22.1007 21.8259 22.1208 21.8608 22.1535 21.9132C22.1862 21.966 22.2067 22.0026 22.2142 22.0204C22.2257 22.0482 22.2319 22.0717 22.2338 22.0903C22.2344 22.0963 22.2347 22.1021 22.2347 22.1079C22.2347 22.1208 22.2332 22.1335 22.2303 22.1458C22.2179 22.1982 22.1836 22.2402 22.1221 22.2741C22.0833 22.2961 22.0395 22.3077 21.9949 22.3078C21.9742 22.3079 21.953 22.3054 21.9314 22.3004C21.9113 22.2957 21.8924 22.2867 21.8761 22.2739C21.8622 22.2628 21.8509 22.2486 21.8433 22.2325C21.8372 22.219 21.8331 22.1943 21.8332 22.1598C21.8324 22.1285 21.831 22.1083 21.8228 22.0917C21.8168 22.079 21.8074 22.0682 21.7955 22.0607C21.7836 22.0532 21.7698 22.0493 21.7557 22.0494C21.7387 22.0493 21.7222 22.0555 21.7076 22.0658C21.6872 22.0808 21.6731 22.1029 21.668 22.1278C21.6656 22.1373 21.6645 22.147 21.6646 22.1568C21.6646 22.1973 21.6834 22.2381 21.7173 22.2789C21.7603 22.331 21.8202 22.3661 21.8945 22.3834C21.9687 22.4011 22.046 22.401 22.1201 22.3831C22.1952 22.3648 22.2575 22.3331 22.3055 22.288C22.3531 22.2431 22.3845 22.1911 22.3983 22.1324C22.4021 22.1157 22.4041 22.0985 22.4041 22.0809C22.4041 22.0551 22.4 22.0284 22.3919 22.0006C22.378 21.9527 22.3438 21.8874 22.2892 21.8009C22.2603 21.7545 22.2433 21.7192 22.2384 21.6991C22.2357 21.6887 22.2344 21.6779 22.2344 21.6671C22.2344 21.656 22.2358 21.6445 22.2386 21.6325C22.2492 21.5886 22.2758 21.5539 22.3226 21.5256C22.3552 21.5061 22.3878 21.4969 22.4217 21.4967C22.436 21.4967 22.4508 21.4985 22.4659 21.5021C22.4977 21.5098 22.517 21.5239 22.5299 21.546ZM23.1046 22.3172C23.0735 22.3378 23.0402 22.3545 23.0053 22.3672C22.9901 22.3728 22.979 22.375 22.9751 22.3748L22.9746 22.3747C22.9747 22.3735 22.9749 22.3722 22.9752 22.371C22.9773 22.3588 22.9897 22.3244 23.011 22.2735C23.0505 22.1785 23.0888 22.0956 23.126 22.0246L23.2354 21.8154L23.1417 21.8168L23.136 21.8231L23.1207 21.8398C23.0766 21.8271 23.0309 21.8204 22.985 21.8201C22.9583 21.8201 22.9336 21.8229 22.9108 21.8284C22.8499 21.8443 22.7894 21.8749 22.7293 21.9201C22.6697 21.965 22.6178 22.0193 22.5757 22.0808C22.5334 22.1423 22.506 22.2012 22.495 22.2578C22.4916 22.274 22.4899 22.2905 22.4899 22.307C22.4899 22.3356 22.4957 22.3621 22.5073 22.3856C22.5209 22.415 22.5486 22.4341 22.5824 22.4403C22.5924 22.4422 22.6026 22.4431 22.6128 22.4431C22.6403 22.4431 22.6697 22.4367 22.7012 22.4246C22.7434 22.4085 22.783 22.3889 22.8201 22.3659L22.8072 22.3905C22.8003 22.4032 22.7955 22.4146 22.7933 22.4257C22.7923 22.4301 22.7919 22.4345 22.792 22.439C22.7918 22.45 22.7952 22.4606 22.8017 22.4694C22.8111 22.482 22.8254 22.4886 22.8412 22.4917C22.8519 22.4937 22.8628 22.4948 22.8739 22.4948C22.8843 22.4948 22.895 22.494 22.9059 22.4923C22.9427 22.486 22.9785 22.4751 23.0126 22.46C23.0334 22.4508 23.0761 22.4261 23.1438 22.3848L23.1597 22.375L23.1224 22.3057L23.1046 22.3172ZM23.0073 21.9441L22.9079 22.1483C22.8764 22.2132 22.8389 22.258 22.7956 22.2857C22.759 22.3085 22.7279 22.3187 22.703 22.3187C22.6973 22.3187 22.692 22.3182 22.6871 22.3172C22.674 22.3143 22.6669 22.3089 22.6602 22.2961C22.6563 22.2871 22.6545 22.2773 22.6549 22.2675C22.6549 22.2574 22.6563 22.2454 22.659 22.2316C22.6709 22.1697 22.6969 22.1108 22.7372 22.0537C22.7775 21.9961 22.8161 21.96 22.8498 21.9439C22.8731 21.9327 22.8975 21.9274 22.9238 21.9274C22.9366 21.9273 22.9498 21.9287 22.9635 21.9313C22.9758 21.9336 22.9904 21.9378 23.0073 21.9441ZM23.5245 22.3658C23.4765 22.3988 23.4299 22.425 23.3852 22.4432C23.367 22.4506 23.3531 22.4538 23.3469 22.4536H23.3462C23.3462 22.4525 23.3464 22.4511 23.3467 22.4494C23.3505 22.4369 23.3836 22.3563 23.444 22.2132L23.5732 21.9079C23.6193 21.7979 23.6518 21.7242 23.6697 21.6882C23.6873 21.6528 23.7046 21.632 23.7148 21.6267C23.7208 21.6234 23.7275 21.6219 23.7343 21.6224C23.739 21.6224 23.7446 21.6229 23.751 21.624C23.7705 21.6274 23.7917 21.6327 23.8141 21.6407C23.8417 21.6505 23.8632 21.6572 23.8811 21.66C23.8892 21.6615 23.8973 21.6622 23.9055 21.6623C23.9216 21.6623 23.9369 21.6589 23.9499 21.6511C23.9607 21.6448 23.9696 21.6358 23.9758 21.625C23.982 21.6142 23.9852 21.6019 23.9852 21.5895C23.9849 21.5727 23.9788 21.5567 23.9678 21.5441C23.953 21.527 23.9321 21.5174 23.9074 21.5129C23.887 21.5093 23.8663 21.5076 23.8455 21.5076C23.7978 21.5077 23.7506 21.5169 23.7063 21.5347C23.6394 21.5607 23.5816 21.6057 23.5397 21.664C23.5105 21.7044 23.4718 21.7809 23.4212 21.8971L23.2826 22.2163C23.2294 22.3393 23.1993 22.4203 23.1915 22.465C23.1903 22.4721 23.1897 22.4792 23.1897 22.4863C23.1896 22.502 23.1933 22.517 23.2009 22.5299C23.2112 22.5477 23.2293 22.5605 23.2503 22.5636C23.2575 22.5648 23.2651 22.5654 23.273 22.5654C23.31 22.5653 23.353 22.5529 23.4043 22.5298C23.4632 22.5032 23.5186 22.4694 23.5692 22.4291L23.5833 22.4178L23.5408 22.3545L23.5245 22.3658Z" fill="white" />
                                        <path d="M24.2106 22.3113L24.3315 22.0321L24.1828 22.0107L24.1768 22.0246L24.0481 22.3248C24.0247 22.3787 23.9854 22.4241 23.9291 22.4616C23.877 22.4965 23.8374 22.5122 23.8172 22.5117C23.8152 22.5117 23.8131 22.5116 23.8111 22.5114C23.8096 22.511 23.8077 22.5106 23.8039 22.5053C23.8024 22.5031 23.8014 22.5006 23.8009 22.4979C23.8003 22.4953 23.8003 22.4926 23.8009 22.49C23.8019 22.4796 23.8286 22.4084 23.8791 22.2909C23.9358 22.1583 23.9667 22.0761 23.973 22.0359C23.9739 22.0293 23.9744 22.023 23.9744 22.0169C23.9744 22.0031 23.9717 21.9903 23.9648 21.9793C23.9603 21.9719 23.9542 21.9657 23.9469 21.9611C23.9396 21.9565 23.9314 21.9536 23.9228 21.9526C23.9175 21.9518 23.9121 21.9514 23.9067 21.9515C23.8827 21.9515 23.8555 21.958 23.823 21.9696C23.7813 21.9844 23.723 22.0174 23.6455 22.0689L23.626 22.0817L23.6833 22.1427L23.6972 22.1329C23.7399 22.103 23.7703 22.0844 23.7843 22.0787C23.7952 22.0739 23.8036 22.0719 23.8088 22.0713L23.8086 22.0727C23.8064 22.0906 23.7786 22.1637 23.727 22.2802C23.6858 22.3727 23.6595 22.4349 23.648 22.4669C23.6401 22.4885 23.6343 22.5109 23.6309 22.5336C23.6295 22.5418 23.6288 22.55 23.6288 22.5583C23.6288 22.5757 23.6323 22.5916 23.6405 22.6049C23.6523 22.6234 23.672 22.6343 23.6937 22.6375C23.7012 22.6385 23.7085 22.639 23.7163 22.639C23.7485 22.639 23.7845 22.6304 23.8249 22.6143C23.8735 22.5947 23.92 22.57 23.9634 22.5407C23.9589 22.5551 23.9555 22.5699 23.9532 22.5848C23.9522 22.5911 23.9517 22.5975 23.9518 22.6039C23.9513 22.6216 23.9562 22.639 23.9658 22.6539C23.9778 22.6721 23.9968 22.6845 24.0184 22.6872C24.0227 22.6878 24.0272 22.6882 24.0321 22.6882C24.0921 22.6872 24.1712 22.6422 24.2818 22.5571L24.2962 22.5459L24.2539 22.4814L24.2371 22.494C24.1839 22.5339 24.1473 22.559 24.1322 22.566C24.1263 22.5692 24.1199 22.5711 24.1132 22.5716L24.1119 22.5715L24.1107 22.5702C24.1106 22.5699 24.11 22.5691 24.11 22.5654C24.11 22.5638 24.1102 22.5623 24.1103 22.5607C24.112 22.5465 24.1464 22.4586 24.2106 22.3113ZM24.8074 21.7944C24.8222 21.7748 24.8352 21.7683 24.8503 21.7681C24.8521 21.7681 24.8539 21.7683 24.8557 21.7686C24.8683 21.7698 24.8833 21.7735 24.9006 21.7789C24.9416 21.7916 24.9703 21.7991 24.9897 21.8016C24.9959 21.8022 25.0016 21.8027 25.0074 21.8027C25.0256 21.8027 25.0423 21.7987 25.0564 21.7901C25.0652 21.7845 25.0727 21.7771 25.0782 21.7683C25.0838 21.7595 25.0873 21.7496 25.0885 21.7392C25.0888 21.7362 25.089 21.7332 25.089 21.7299C25.0891 21.7205 25.0871 21.7112 25.0833 21.7026C25.0795 21.694 25.0739 21.6863 25.0669 21.68C25.0495 21.6636 25.0247 21.6563 24.9938 21.6524C24.9835 21.651 24.9731 21.6504 24.9627 21.6504C24.919 21.6504 24.873 21.6613 24.8244 21.6816C24.7648 21.7065 24.7122 21.7456 24.6713 21.7956C24.6299 21.8461 24.5927 21.92 24.5584 22.0176L24.4197 22.4111C24.3982 22.4729 24.3852 22.5221 24.3805 22.5596C24.3794 22.5677 24.3789 22.5759 24.379 22.5841C24.3784 22.6212 24.3907 22.6574 24.414 22.6863C24.4421 22.7216 24.4839 22.7424 24.5344 22.7483C24.544 22.7494 24.5536 22.7499 24.5633 22.7499C24.6148 22.7499 24.6682 22.7341 24.7232 22.7036C24.7896 22.6669 24.8476 22.6092 24.8977 22.5319C24.948 22.4541 24.9787 22.3716 24.9891 22.2851C24.9909 22.2696 24.9919 22.2541 24.992 22.2385C24.992 22.1996 24.9853 22.1665 24.9699 22.1399C24.9603 22.1225 24.9466 22.1077 24.93 22.0968C24.9134 22.0858 24.8944 22.079 24.8747 22.0769C24.8682 22.0762 24.8617 22.0758 24.8552 22.0758C24.8253 22.0758 24.7921 22.0829 24.7557 22.097C24.7257 22.109 24.6972 22.1244 24.6709 22.143L24.7422 21.9467C24.7726 21.8626 24.7959 21.8098 24.8074 21.7944ZM24.785 22.1722L24.7827 22.1918C24.7972 22.1939 24.8048 22.1992 24.8124 22.2129C24.8209 22.2298 24.8256 22.2505 24.8256 22.2754C24.8256 22.2842 24.825 22.2935 24.8238 22.3033C24.8135 22.3885 24.782 22.4721 24.7285 22.5539C24.6788 22.6299 24.6312 22.6623 24.5899 22.6618C24.5864 22.6618 24.583 22.6616 24.5797 22.6613C24.5616 22.6588 24.5479 22.6508 24.5351 22.6339C24.5251 22.6205 24.5198 22.6042 24.5199 22.5875C24.5199 22.5836 24.5202 22.5797 24.5207 22.5755C24.5294 22.5049 24.5526 22.4343 24.5912 22.364C24.6302 22.2926 24.668 22.2458 24.7017 22.2229C24.7337 22.2006 24.7594 22.1913 24.7765 22.1913H24.7769C24.7789 22.1913 24.7808 22.1914 24.7827 22.1916L24.785 22.1722ZM25.8231 22.6562C25.7644 22.7041 25.7192 22.7306 25.7064 22.7355C25.7062 22.7346 25.7061 22.7337 25.706 22.7328L25.7061 22.7313C25.7084 22.7002 25.7446 22.5912 25.8144 22.4151C25.8573 22.3057 25.879 22.2481 25.8817 22.2252C25.8817 22.2231 25.8819 22.2215 25.8819 22.2193C25.882 22.2119 25.8806 22.2046 25.8778 22.1977C25.875 22.1908 25.8709 22.1846 25.8656 22.1793C25.8527 22.1668 25.8355 22.1613 25.8166 22.1597C25.8127 22.1592 25.8089 22.159 25.8051 22.1591C25.7729 22.1592 25.7368 22.1692 25.6958 22.1879C25.6731 22.1987 25.6514 22.2115 25.6309 22.226C25.6422 22.2148 25.6497 22.2002 25.6511 22.1841C25.6513 22.1816 25.6515 22.1795 25.6515 22.177C25.6513 22.1609 25.6454 22.1454 25.6348 22.1332C25.6223 22.1184 25.6043 22.1091 25.5849 22.1075C25.5825 22.1069 25.5797 22.1071 25.578 22.107C25.5503 22.1073 25.522 22.121 25.489 22.1445C25.4418 22.179 25.3979 22.2178 25.3577 22.2603L25.3703 22.2242C25.38 22.1953 25.3851 22.1792 25.3866 22.168C25.3868 22.166 25.3868 22.1652 25.3868 22.1636C25.3867 22.1581 25.3856 22.1527 25.3834 22.1477C25.3812 22.1427 25.3781 22.1381 25.3741 22.1343C25.3652 22.1258 25.3535 22.1207 25.3411 22.1202C25.3375 22.1197 25.3339 22.1195 25.3304 22.1196C25.2998 22.1197 25.2627 22.1303 25.2155 22.15C25.1617 22.1723 25.1072 22.2082 25.0515 22.2569L25.038 22.2686L25.0816 22.3294L25.098 22.3162C25.1431 22.2794 25.1745 22.2564 25.1885 22.249C25.1986 22.2434 25.2069 22.2405 25.2111 22.2395C25.2082 22.2515 25.2049 22.2634 25.2011 22.2752C25.1708 22.3693 25.1386 22.4628 25.1044 22.5556L25.0213 22.7799L25.1763 22.7957L25.1814 22.7809L25.2309 22.6359C25.2635 22.5386 25.2871 22.4767 25.2998 22.4533C25.3124 22.4295 25.3345 22.4004 25.3657 22.3672C25.397 22.3342 25.4248 22.3105 25.448 22.2966C25.4712 22.2823 25.5016 22.2708 25.5392 22.2619C25.5729 22.2542 25.5963 22.2473 25.6132 22.2385C25.5899 22.2558 25.5658 22.2757 25.5403 22.2991L25.5246 22.3135L25.5844 22.369L25.5977 22.358C25.6458 22.3182 25.6778 22.2945 25.6881 22.2894C25.6958 22.2854 25.7021 22.2833 25.7071 22.2826C25.7062 22.2884 25.7042 22.295 25.7011 22.3027C25.6028 22.5457 25.5507 22.6972 25.5442 22.7673C25.5439 22.7707 25.5438 22.774 25.5438 22.7774C25.5433 22.7961 25.5491 22.8143 25.5603 22.8292C25.5729 22.846 25.5932 22.8558 25.6154 22.8573C25.618 22.8575 25.6208 22.8576 25.6238 22.8576C25.6481 22.8575 25.675 22.8492 25.7066 22.8348C25.7435 22.8174 25.7985 22.7793 25.8749 22.719L25.8911 22.7061L25.8379 22.6445L25.8231 22.6562ZM26.0005 21.9231C26.0007 21.9204 26.0008 21.9178 26.0008 21.9153C26.001 21.898 25.9951 21.8811 25.9842 21.8676C25.978 21.86 25.9702 21.8538 25.9615 21.8492C25.9528 21.8447 25.9433 21.8419 25.9334 21.8411C25.9205 21.84 25.9075 21.8416 25.8953 21.846C25.8831 21.8503 25.872 21.8573 25.8627 21.8663C25.8519 21.8761 25.8432 21.8882 25.8374 21.9016C25.8316 21.915 25.8286 21.9295 25.8288 21.9441C25.8287 21.962 25.834 21.9794 25.845 21.9931C25.8574 22.0086 25.8758 22.0183 25.896 22.0199C25.8986 22.02 25.9003 22.0202 25.903 22.0202H25.9033C25.9259 22.0202 25.9477 22.0104 25.9657 21.9933C25.986 21.975 25.9983 21.9504 26.0005 21.9231ZM26.1661 22.5779L26.2473 22.3398L26.4067 22.351L26.4348 22.2588L26.2764 22.2475L26.3512 22.0244L26.1794 22.0763L26.1762 22.086L26.126 22.2363L26.0023 22.2275L25.9717 22.3197L26.0961 22.3288L26.0032 22.6046C25.9782 22.6798 25.9638 22.7361 25.9609 22.7762C25.9604 22.7822 25.9602 22.7882 25.9602 22.7942C25.9602 22.8195 25.9645 22.8407 25.9759 22.8576C25.9888 22.8773 26.0106 22.8891 26.0346 22.8901C26.0369 22.8901 26.0392 22.8904 26.0422 22.8904C26.0686 22.8903 26.0996 22.882 26.1367 22.8668C26.179 22.8495 26.2573 22.8031 26.3759 22.7261L26.3933 22.7148L26.3433 22.6451L26.3274 22.6562C26.2869 22.6844 26.2448 22.7093 26.201 22.7309C26.1706 22.7458 26.1475 22.7524 26.1379 22.7521L26.1362 22.752C26.1293 22.7512 26.128 22.75 26.1268 22.7486C26.1255 22.7472 26.124 22.7446 26.1239 22.7364C26.1239 22.7351 26.124 22.7335 26.1241 22.7316C26.1258 22.7056 26.1397 22.6529 26.1661 22.5779ZM27.6263 22.2906C27.5976 22.2684 27.5587 22.2581 27.5106 22.2563C27.506 22.2561 27.5016 22.256 27.4976 22.256C27.4365 22.2559 27.3825 22.2744 27.3396 22.3118C27.2943 22.3507 27.2691 22.4 27.2673 22.4557L27.2672 22.4629C27.2672 22.5222 27.2946 22.5826 27.3455 22.6437C27.3822 22.6872 27.4056 22.7186 27.4143 22.7348C27.4226 22.7501 27.4263 22.7642 27.4263 22.7775V22.7808C27.4258 22.7957 27.4207 22.8107 27.4098 22.8272C27.3995 22.8427 27.386 22.8537 27.3679 22.8613C27.3499 22.8681 27.3307 22.8716 27.3114 22.8713L27.3024 22.8711C27.2813 22.8703 27.268 22.865 27.2591 22.8567C27.2485 22.8472 27.2454 22.8398 27.2452 22.8294V22.8285C27.2454 22.8238 27.2457 22.819 27.2465 22.813C27.2476 22.8057 27.2485 22.7983 27.2489 22.7909V22.7887C27.2489 22.7801 27.2471 22.7716 27.2437 22.7636C27.2404 22.7557 27.2354 22.7485 27.2293 22.7425C27.2161 22.7293 27.1983 22.7215 27.1796 22.721C27.1788 22.7209 27.178 22.7209 27.1772 22.7209H27.1763C27.1562 22.7209 27.1369 22.7287 27.1225 22.7428C27.1128 22.7524 27.1058 22.7644 27.1021 22.7775L27.0563 22.7149L27.0401 22.7289C27.012 22.7534 26.9812 22.7746 26.9483 22.7922C26.9392 22.7974 26.9294 22.8015 26.9192 22.8041L26.9191 22.8015C26.9191 22.8011 26.9191 22.8006 26.9192 22.8C26.9198 22.7878 26.9273 22.7519 26.9412 22.6987C26.9671 22.5989 26.9935 22.5117 27.0207 22.4362L27.0999 22.2135L27.0074 22.2283L27.0027 22.2352L26.9898 22.2538C26.9767 22.2519 26.9636 22.2505 26.9505 22.2496C26.9389 22.2491 26.9278 22.2488 26.9173 22.2488C26.8644 22.2488 26.8186 22.2561 26.78 22.2717C26.722 22.2958 26.6665 22.3346 26.6134 22.3875C26.5603 22.4408 26.517 22.5009 26.4833 22.5679C26.45 22.6348 26.4311 22.6969 26.4281 22.7545C26.4277 22.7599 26.4275 22.7652 26.4276 22.7705C26.4276 22.8125 26.4373 22.8495 26.4576 22.8794C26.4757 22.9064 26.5055 22.922 26.5399 22.9231C26.5424 22.9232 26.5446 22.9233 26.5473 22.9233C26.5814 22.9232 26.6172 22.9119 26.6551 22.891C26.6947 22.8693 26.7313 22.8444 26.7647 22.8165L26.7556 22.8424C26.7509 22.8542 26.7479 22.8665 26.7467 22.8791C26.7465 22.8804 26.7466 22.8824 26.7466 22.8836C26.7463 22.8906 26.7475 22.8976 26.75 22.9041C26.7525 22.9106 26.7562 22.9166 26.7611 22.9217C26.7721 22.9327 26.7871 22.9372 26.8032 22.9381C26.8062 22.9382 26.8091 22.9383 26.8121 22.9383C26.8303 22.9382 26.8488 22.9354 26.8675 22.9297C26.9031 22.9184 26.9371 22.9025 26.9687 22.8825C26.9881 22.871 27.0265 22.8407 27.0882 22.7904L27.1014 22.7797C27.0994 22.7864 27.0983 22.7934 27.098 22.8005L27.098 22.8054C27.0977 22.8453 27.1147 22.8814 27.1458 22.9093C27.18 22.9399 27.2296 22.9544 27.2932 22.9568L27.3073 22.957H27.3077C27.3779 22.957 27.4388 22.9374 27.4872 22.8979C27.5385 22.8563 27.567 22.8029 27.569 22.743L27.5691 22.7361C27.569 22.6765 27.5396 22.6159 27.485 22.5538C27.4456 22.5088 27.4215 22.4758 27.4137 22.4594C27.4064 22.4444 27.4026 22.4278 27.4025 22.4111L27.4026 22.4073C27.4033 22.3874 27.4099 22.3736 27.4228 22.3612C27.4358 22.3492 27.4483 22.3442 27.4631 22.344L27.4654 22.3442C27.4803 22.3445 27.5002 22.3564 27.5227 22.3885C27.5362 22.4077 27.5462 22.4197 27.5575 22.4274C27.5678 22.4346 27.5802 22.4378 27.5928 22.4384H27.5943L27.5955 22.4383L27.5961 22.4384C27.6144 22.4386 27.6321 22.4317 27.6455 22.4193C27.6596 22.4065 27.6686 22.3888 27.6691 22.3698V22.3666C27.6694 22.337 27.6528 22.3106 27.6263 22.2906ZM26.5969 22.7695C26.5908 22.7609 26.5861 22.7442 26.5862 22.7191C26.5862 22.7148 26.5863 22.7102 26.5866 22.7054C26.5901 22.6427 26.6074 22.5804 26.6394 22.5186C26.6714 22.4558 26.7044 22.4147 26.7357 22.3942C26.7648 22.375 26.7973 22.3657 26.835 22.3656C26.8389 22.3656 26.8428 22.3657 26.8467 22.3658C26.859 22.3667 26.8743 22.3689 26.8919 22.3727L26.8217 22.589C26.7996 22.6571 26.7684 22.7071 26.7295 22.7399C26.6912 22.7724 26.658 22.7866 26.6309 22.7865L26.6261 22.7864C26.6202 22.7863 26.6145 22.7846 26.6094 22.7817C26.6043 22.7787 26.6 22.7746 26.5969 22.7695ZM26.9177 22.8039H26.9175L26.9178 22.8038L26.9177 22.8039ZM28.7813 22.019L28.772 22.019L28.5076 22.0178L28.5033 22.0177C28.3461 22.0177 28.2219 22.0612 28.1363 22.1505C28.051 22.2387 28.0072 22.341 28.0068 22.4538V22.4573C28.0068 22.5083 28.0156 22.5505 28.0351 22.5835C28.0485 22.6076 28.0723 22.6238 28.0995 22.6236C28.1175 22.6238 28.1351 22.6178 28.1481 22.6053C28.1606 22.5942 28.169 22.5782 28.1688 22.561C28.1687 22.544 28.1625 22.5272 28.152 22.5076C28.1373 22.4787 28.1281 22.4563 28.1245 22.4426C28.1206 22.4266 28.1188 22.4102 28.119 22.3938L28.1191 22.39C28.1193 22.3418 28.1333 22.2967 28.1627 22.2526C28.1917 22.2088 28.232 22.1731 28.2845 22.1452C28.3279 22.1222 28.3758 22.1086 28.4248 22.1054C28.3875 22.252 28.3489 22.3982 28.309 22.5442C28.2693 22.6901 28.2366 22.7878 28.2133 22.8335C28.2068 22.847 28.1996 22.856 28.192 22.8615C28.1881 22.8651 28.1507 22.8792 28.0913 22.8951L28.0806 22.8979L28.0565 22.9791L28.0862 22.9758C28.184 22.9646 28.2697 22.959 28.3431 22.959H28.3502C28.4071 22.9594 28.4907 22.9657 28.6008 22.9786C28.6513 22.9844 28.6934 22.988 28.7279 22.988H28.7285C28.7938 22.988 28.8496 22.971 28.892 22.9347C28.9339 22.8996 28.9568 22.8549 28.9568 22.8054V22.8031C28.9567 22.7802 28.9505 22.7591 28.9365 22.7429C28.9299 22.7349 28.9216 22.7284 28.9121 22.724C28.9027 22.7196 28.8925 22.7173 28.8821 22.7174C28.8642 22.7172 28.847 22.7241 28.8342 22.7365C28.8279 22.7422 28.8229 22.749 28.8194 22.7566C28.8159 22.7643 28.814 22.7725 28.8138 22.7809C28.8136 22.7832 28.8139 22.7839 28.8138 22.7839C28.8138 22.7972 28.8163 22.8107 28.8205 22.8245C28.8273 22.8427 28.8298 22.8553 28.8296 22.8586C28.8293 22.8664 28.8268 22.8724 28.8159 22.8815C28.8061 22.8893 28.7937 22.8936 28.7747 22.8937L28.7728 22.8938C28.7592 22.8937 28.7273 22.8884 28.6817 22.8778C28.5914 22.8576 28.5149 22.8472 28.4513 22.8467C28.4206 22.8471 28.3901 22.8509 28.3602 22.8581C28.4028 22.7648 28.4438 22.645 28.4836 22.4984L28.6262 22.4991C28.6549 22.4993 28.6757 22.5006 28.6873 22.503C28.6916 22.5037 28.6944 22.5044 28.6957 22.505L28.6959 22.5047C28.6988 22.5083 28.7008 22.511 28.7016 22.5127L28.7022 22.5129C28.702 22.525 28.7004 22.5435 28.698 22.5672L28.6959 22.5887L28.7734 22.5892L28.7763 22.5728C28.7893 22.499 28.8043 22.4314 28.8208 22.3698L28.8273 22.3451L28.7412 22.3447L28.7383 22.3612C28.7342 22.3887 28.7246 22.4029 28.7222 22.4033C28.7205 22.4058 28.6915 22.4118 28.6471 22.4111H28.6397L28.5058 22.4104L28.5829 22.1096H28.6803C28.7909 22.1099 28.8593 22.1149 28.8674 22.1191C28.8772 22.1237 28.8794 22.1259 28.8805 22.141C28.8798 22.1609 28.8777 22.1808 28.8742 22.2003L28.8705 22.2231L28.9515 22.2235L28.9541 22.2066C28.9595 22.172 28.9728 22.1119 28.9936 22.0267L29.0015 21.9943L28.9693 22.003C28.9304 22.0135 28.8669 22.019 28.7813 22.019ZM29.2795 22.6538L29.3395 22.4091L29.4992 22.4064L29.5188 22.3119L29.3605 22.3146L29.4151 22.0857L29.2485 22.1528L29.2461 22.1628L29.2095 22.3172L29.0856 22.3192L29.0631 22.4138L29.1878 22.4118L29.1195 22.6948C29.1013 22.7701 29.0923 22.8271 29.0921 22.867L29.0922 22.8704C29.0932 22.9034 29.099 22.9298 29.1146 22.9492C29.1289 22.967 29.151 22.9768 29.1744 22.9765L29.1753 22.9766C29.204 22.976 29.2365 22.9647 29.2755 22.9444C29.3159 22.923 29.39 22.8699 29.5014 22.7832L29.5177 22.7705L29.4619 22.7046L29.447 22.7175C29.4095 22.7492 29.3696 22.7779 29.3276 22.8033C29.2965 22.8223 29.2733 22.8305 29.2653 22.83H29.2633C29.2575 22.8297 29.2571 22.829 29.2553 22.8274C29.2542 22.8266 29.2513 22.8222 29.251 22.8103L29.2471 22.809L29.251 22.8091C29.2509 22.7825 29.2602 22.7291 29.2795 22.6538ZM30.5458 22.0366L30.5691 21.9505L30.5378 21.957C30.5003 21.9646 30.444 21.9713 30.3698 21.9768C30.2904 21.982 30.2397 21.9863 30.2159 21.99C30.1927 21.9935 30.1697 21.9987 30.1473 22.0056L30.1372 22.0087L30.1117 22.095L30.1454 22.0864C30.1783 22.0776 30.2118 22.0715 30.2456 22.0682C30.2224 22.188 30.1984 22.3076 30.1736 22.4271C30.1302 22.6296 30.1044 22.7459 30.0972 22.7726C30.0897 22.7998 30.0819 22.8181 30.0779 22.8228C30.0752 22.8262 30.0718 22.8291 30.0679 22.8311C30.042 22.8448 30.0011 22.8579 29.9464 22.869L29.9331 22.8715L29.9181 22.9551L29.9471 22.9486C29.9995 22.9367 30.0583 22.9294 30.1224 22.9264C30.1495 22.9252 30.1747 22.9246 30.1979 22.9246C30.2144 22.9246 30.2299 22.925 30.2444 22.9257C30.2761 22.9271 30.3014 22.9278 30.3201 22.9278C30.3306 22.9278 30.339 22.9277 30.3456 22.9273L30.3596 22.9263L30.3812 22.8485L30.3533 22.8505C30.3383 22.8516 30.3241 22.8522 30.3109 22.8522C30.2847 22.8522 30.2614 22.8501 30.2411 22.846C30.2905 22.5933 30.3212 22.4377 30.3338 22.3805C30.3727 22.2023 30.398 22.0998 30.4045 22.087C30.4106 22.0755 30.4181 22.0673 30.4269 22.0616C30.439 22.0537 30.4764 22.0439 30.5327 22.038L30.5458 22.0366ZM31.219 22.6635C31.1972 22.6826 31.1755 22.7034 31.1539 22.7258C31.1307 22.751 31.1105 22.7639 31.1029 22.7668C31.102 22.7633 31.1014 22.7597 31.1012 22.7561C31.1009 22.7539 31.1008 22.7513 31.1009 22.7482C31.1008 22.715 31.1124 22.6478 31.1362 22.5507C31.1638 22.4365 31.1806 22.3627 31.1868 22.3276C31.1894 22.3102 31.1908 22.2945 31.1908 22.2799C31.1908 22.2764 31.1908 22.2728 31.1906 22.2688C31.1886 22.2418 31.1809 22.2185 31.1641 22.2016C31.1567 22.1944 31.1479 22.1888 31.1382 22.185C31.1286 22.1812 31.1183 22.1794 31.1079 22.1796C31.1055 22.1795 31.1031 22.1797 31.1006 22.1799C31.0672 22.182 31.0311 22.1998 30.9893 22.2297C30.9373 22.2672 30.889 22.3094 30.8448 22.3558L30.8585 22.2669C30.8602 22.2564 30.8611 22.2485 30.8613 22.2415L30.8612 22.2379C30.8606 22.2315 30.8585 22.2254 30.8551 22.22C30.8517 22.2146 30.8471 22.2101 30.8416 22.2068C30.8323 22.2009 30.8214 22.198 30.8104 22.1983C30.808 22.1983 30.8057 22.1985 30.8034 22.1987C30.7715 22.2009 30.7366 22.2149 30.6971 22.2389C30.6566 22.2638 30.6065 22.3094 30.5443 22.377L30.5309 22.3915L30.589 22.4443L30.6022 22.428C30.6256 22.3983 30.6526 22.3716 30.6825 22.3485C30.691 22.3415 30.6979 22.3377 30.702 22.3358V22.337C30.702 22.3407 30.7014 22.3477 30.7002 22.3572L30.6508 22.6531C30.6388 22.7278 30.6251 22.8023 30.6095 22.8764L30.6042 22.9017L30.7599 22.8914L30.8074 22.6041C30.8171 22.5438 30.8314 22.5008 30.8474 22.4757C30.8768 22.4315 30.9136 22.3926 30.9561 22.3607C30.9852 22.3381 31.0091 22.3278 31.0224 22.3274C31.0237 22.3273 31.0242 22.3272 31.0252 22.3272C31.0295 22.3272 31.0306 22.3279 31.031 22.3281L31.0314 22.3301V22.3316C31.0316 22.3402 31.0255 22.3791 31.013 22.4404C30.9707 22.6146 30.9495 22.7265 30.9493 22.7815C30.9493 22.7849 30.9494 22.7883 30.9496 22.7917C30.9521 22.8255 30.9588 22.852 30.9753 22.8711C30.9892 22.8873 31.0101 22.8964 31.0322 22.8961L31.0378 22.896C31.0655 22.894 31.0938 22.8799 31.1263 22.8561C31.1766 22.8198 31.2241 22.7733 31.2687 22.7166L31.2785 22.7041L31.2344 22.6502L31.219 22.6635ZM31.9112 22.6044C31.8651 22.6472 31.8329 22.6745 31.8186 22.6846C31.8121 22.6893 31.8047 22.6924 31.7968 22.6938H31.7956V22.6943C31.7941 22.6912 31.7933 22.6879 31.7932 22.6845C31.7929 22.6817 31.7928 22.6789 31.7929 22.6761C31.7929 22.6579 31.7962 22.6248 31.8026 22.5783L31.87 22.1054C31.8884 21.9795 31.9005 21.9038 31.906 21.8822C31.9145 21.8462 31.9257 21.8236 31.9332 21.8172C31.9422 21.8083 31.9541 21.803 31.9668 21.8021C31.9705 21.8016 31.9765 21.8014 31.9841 21.8014C31.9968 21.8014 32.014 21.8021 32.0357 21.8034C32.0581 21.8045 32.076 21.8052 32.0902 21.8052C32.0984 21.8052 32.1052 21.8051 32.1113 21.8044C32.1335 21.8028 32.1537 21.7944 32.1681 21.7793C32.175 21.772 32.1803 21.7632 32.1835 21.7536C32.1868 21.744 32.1878 21.7338 32.1867 21.7238C32.1859 21.7132 32.1828 21.703 32.1777 21.6939C32.1725 21.6847 32.1654 21.6767 32.1568 21.6706C32.1414 21.6597 32.1229 21.6541 32.1041 21.6546C32.1003 21.6546 32.0965 21.6547 32.0926 21.6551C32.0508 21.6589 32.0073 21.6726 31.9625 21.6956C31.9171 21.7191 31.8777 21.75 31.8442 21.7882C31.8104 21.8272 31.7839 21.872 31.766 21.9204C31.7483 21.9675 31.7328 22.0373 31.7182 22.1309C31.7112 22.1306 31.7042 22.1304 31.6972 22.1303C31.6915 22.1304 31.6866 22.1306 31.6825 22.1309C31.6255 22.1363 31.5685 22.1665 31.5092 22.2189C31.4492 22.2723 31.3987 22.3497 31.3563 22.4503C31.3196 22.5375 31.3012 22.6158 31.3012 22.6851C31.3012 22.6958 31.3017 22.7065 31.3026 22.7169C31.3068 22.7657 31.3201 22.8042 31.3449 22.831C31.3659 22.8542 31.3935 22.8671 31.4229 22.8671H31.4238C31.4261 22.8671 31.4289 22.8671 31.4322 22.867C31.4702 22.8633 31.5085 22.8463 31.5494 22.8181C31.5781 22.7978 31.6099 22.7674 31.6452 22.7268L31.6415 22.7462C31.6385 22.7602 31.6368 22.7743 31.6364 22.7886C31.6364 22.7913 31.6365 22.7938 31.6367 22.7958C31.6375 22.8031 31.6399 22.81 31.6436 22.8162C31.6474 22.8225 31.6524 22.8278 31.6585 22.8318C31.6684 22.8397 31.6819 22.8437 31.6957 22.8436C31.6972 22.8436 31.6994 22.8436 31.7021 22.8435C31.7355 22.8402 31.7721 22.822 31.8173 22.7909C31.851 22.7678 31.8986 22.7243 31.9625 22.6601L31.9756 22.6469L31.9258 22.5909L31.9112 22.6044ZM31.7041 22.2546L31.6854 22.3922C31.6711 22.493 31.6575 22.5579 31.6475 22.5797C31.6292 22.6199 31.6022 22.6554 31.5686 22.6839C31.5446 22.7037 31.5241 22.7131 31.5086 22.7143L31.5045 22.7144C31.495 22.7143 31.4856 22.7105 31.4739 22.6992C31.4621 22.6876 31.455 22.6721 31.4529 22.6495C31.4519 22.6394 31.4514 22.6292 31.4514 22.619C31.4514 22.5711 31.4608 22.5151 31.4797 22.4508C31.5026 22.3725 31.5295 22.3203 31.5555 22.2948C31.5833 22.2674 31.6115 22.2537 31.6402 22.2511C31.6429 22.2508 31.6466 22.2507 31.6511 22.2507C31.6637 22.2505 31.6814 22.2518 31.7041 22.2546Z" fill="white" />
                                        <path d="M32.6703 22.5154C32.6292 22.5677 32.6003 22.6012 32.5872 22.6124C32.5822 22.617 32.5762 22.6205 32.5697 22.6226L32.5696 22.6226C32.5695 22.6226 32.5692 22.6226 32.5677 22.6213C32.5675 22.6212 32.5659 22.6199 32.5652 22.6128C32.565 22.6108 32.5648 22.6088 32.5648 22.6067C32.5647 22.5788 32.5758 22.4898 32.5979 22.3459L32.6428 22.045L32.4935 22.0624L32.4914 22.0774L32.4441 22.4007C32.4353 22.4584 32.4092 22.5122 32.3644 22.5635C32.3198 22.6141 32.2834 22.6389 32.2647 22.6414C32.263 22.6414 32.2627 22.6415 32.2627 22.6414C32.261 22.6413 32.2588 22.6411 32.2542 22.6373C32.2504 22.6336 32.2487 22.6305 32.2474 22.623L32.2473 22.6203C32.2473 22.5989 32.2554 22.5276 32.2721 22.4111C32.2895 22.2918 32.2986 22.2106 32.2986 22.1643C32.2986 22.1551 32.2982 22.1472 32.2974 22.1403C32.2948 22.119 32.2887 22.1007 32.2747 22.0877C32.2642 22.0776 32.2501 22.072 32.2355 22.0723C32.2329 22.0723 32.2303 22.0724 32.2276 22.0728C32.2002 22.0759 32.1706 22.0906 32.1354 22.1146C32.099 22.1399 32.0512 22.1866 31.9891 22.2563L31.9736 22.2736L32.0446 22.3184L32.0557 22.3053C32.0895 22.2651 32.1141 22.2392 32.1259 22.2305C32.1351 22.2232 32.1429 22.2189 32.1478 22.2169L32.1479 22.2182C32.1482 22.2202 32.1484 22.2233 32.1484 22.2277C32.1485 22.2575 32.1398 22.3295 32.1226 22.4397C32.1067 22.5401 32.0969 22.6063 32.0941 22.6408C32.0919 22.6636 32.092 22.6867 32.0945 22.7095C32.0982 22.7376 32.1059 22.76 32.1221 22.7756C32.1354 22.7881 32.153 22.7942 32.1708 22.7942H32.1715C32.1747 22.7943 32.1783 22.7941 32.1824 22.7937C32.2203 22.7889 32.2598 22.7699 32.3028 22.7375C32.3448 22.7061 32.3834 22.6703 32.4179 22.6308L32.4177 22.6436C32.4177 22.6554 32.4184 22.6662 32.4196 22.676C32.4222 22.7021 32.4318 22.7247 32.4495 22.7398C32.4574 22.7469 32.4667 22.7522 32.4768 22.7554C32.487 22.7587 32.4977 22.7597 32.5082 22.7585C32.5702 22.7494 32.6378 22.684 32.7299 22.5649L32.7409 22.5503L32.6833 22.4989L32.6703 22.5154ZM33.1786 21.9761C33.1563 21.9647 33.13 21.9593 33.1004 21.9593C33.087 21.9593 33.073 21.9604 33.0583 21.9625C32.9925 21.9715 32.9384 21.9998 32.9002 22.0471C32.8686 22.0858 32.852 22.1291 32.8521 22.1746C32.8521 22.1835 32.8527 22.1924 32.854 22.2015C32.8626 22.2624 32.9006 22.3195 32.9643 22.373C33.0078 22.4095 33.0362 22.4363 33.0478 22.4507C33.0594 22.4653 33.0657 22.4794 33.0675 22.4936C33.068 22.4973 33.0682 22.5008 33.0682 22.5043C33.0682 22.5157 33.0655 22.5283 33.0595 22.5423C33.0523 22.5591 33.04 22.5733 33.0244 22.5829C33.0076 22.5935 32.9865 22.6007 32.9613 22.6044C32.9565 22.605 32.9517 22.6054 32.9469 22.6054C32.9359 22.6058 32.9251 22.6031 32.9156 22.5976C32.9038 22.59 32.8992 22.5827 32.8974 22.5717C32.8968 22.5666 32.8963 22.5616 32.896 22.5565C32.8961 22.5491 32.8956 22.5417 32.8946 22.5344C32.8933 22.5255 32.8901 22.5169 32.8853 22.5093C32.8804 22.5017 32.8739 22.4953 32.8663 22.4904C32.8511 22.4796 32.8324 22.4752 32.814 22.4779C32.8036 22.4792 32.7936 22.4827 32.7846 22.4881C32.7756 22.4935 32.7678 22.5007 32.7618 22.5093C32.7518 22.523 32.7465 22.5397 32.7468 22.5567C32.7468 22.5612 32.7471 22.5657 32.7478 22.5701C32.7534 22.6116 32.7767 22.6465 32.8142 22.6691C32.8411 22.6862 32.8753 22.6941 32.9153 22.6941C32.9315 22.6941 32.9488 22.6928 32.9672 22.6902C33.0431 22.6798 33.1045 22.6488 33.148 22.5982C33.184 22.5557 33.2033 22.5087 33.2033 22.4591C33.2032 22.4499 33.2026 22.4406 33.2013 22.4313C33.193 22.3701 33.1527 22.3137 33.0857 22.2597C33.039 22.2224 33.0091 22.1942 32.9991 22.1796C32.9861 22.1616 32.9788 22.1401 32.978 22.1179C32.9779 22.1046 32.9823 22.0916 32.9906 22.0811C33.002 22.0663 33.0139 22.0593 33.0295 22.057C33.0313 22.0567 33.033 22.0565 33.0348 22.0565C33.0487 22.0563 33.0694 22.0659 33.094 22.0906C33.1104 22.1066 33.122 22.117 33.1353 22.1228C33.1467 22.1274 33.159 22.129 33.1712 22.1273C33.1914 22.1247 33.2086 22.1142 33.2201 22.0991C33.2317 22.0843 33.237 22.0655 33.2349 22.0468C33.2306 22.016 33.2093 21.9916 33.1786 21.9761ZM33.6901 22.3219C33.6577 22.3587 33.6223 22.3928 33.5844 22.4239C33.5565 22.4471 33.5343 22.4587 33.5261 22.4594C33.5247 22.4596 33.5232 22.4597 33.5217 22.4598C33.5195 22.4599 33.5173 22.4593 33.5155 22.458C33.5149 22.4576 33.5115 22.4533 33.5098 22.4424C33.5079 22.4289 33.5071 22.4153 33.5073 22.4017C33.5073 22.3723 33.5098 22.3325 33.5152 22.2829L33.5397 22.0321L33.6975 22.0067L33.7036 21.9102L33.5468 21.9355L33.5681 21.7012L33.4129 21.7913L33.4121 21.8015L33.3978 21.9597L33.2752 21.9793L33.2669 22.076L33.3896 22.0563L33.3629 22.3465C33.3591 22.3834 33.3571 22.4205 33.3568 22.4576C33.3568 22.4835 33.3582 22.5053 33.3613 22.5234C33.3668 22.556 33.3758 22.5817 33.3947 22.5992C33.4078 22.6112 33.4252 22.6183 33.4436 22.6183H33.4442C33.4489 22.6183 33.4537 22.6179 33.4588 22.6171C33.4869 22.6125 33.5173 22.5965 33.5531 22.5709C33.5903 22.5441 33.6558 22.4809 33.7537 22.3789L33.7679 22.364L33.703 22.3071L33.6901 22.3219ZM34.4356 21.5377C34.4475 21.5458 34.4615 21.5504 34.4758 21.5504H34.4762C34.4812 21.5504 34.4864 21.5499 34.4917 21.5489C34.517 21.5438 34.5375 21.527 34.5513 21.5035C34.5611 21.4862 34.5667 21.4675 34.5667 21.4483C34.5667 21.441 34.5659 21.4337 34.5644 21.4263C34.5627 21.4165 34.5589 21.4071 34.5535 21.3987C34.548 21.3903 34.541 21.3831 34.5327 21.3775C34.521 21.3695 34.5071 21.3652 34.493 21.3652C34.4873 21.3653 34.4818 21.3659 34.4763 21.367C34.4637 21.3695 34.4518 21.3748 34.4414 21.3823C34.4309 21.3898 34.4222 21.3995 34.4159 21.4107C34.4062 21.4266 34.4012 21.4448 34.4013 21.4634C34.4014 21.4714 34.4022 21.4794 34.4039 21.4874C34.4078 21.508 34.4189 21.5263 34.4356 21.5377ZM34.604 22.1797C34.5839 22.2091 34.5623 22.2375 34.5394 22.2648C34.531 22.2743 34.5241 22.2813 34.5188 22.2858C34.5176 22.2868 34.5164 22.2877 34.5151 22.2886C34.5144 22.2872 34.5139 22.2857 34.5135 22.2842C34.5117 22.2758 34.5103 22.257 34.5104 22.2306C34.5104 22.1736 34.516 22.08 34.527 21.951C34.5346 21.8618 34.5385 21.8028 34.5386 21.7721C34.5389 21.7646 34.5384 21.7571 34.5373 21.7498C34.5357 21.7413 34.5323 21.7334 34.5272 21.7265C34.5221 21.7197 34.5155 21.7141 34.5079 21.7102C34.4985 21.7055 34.488 21.7031 34.4774 21.7033C34.4704 21.7033 34.4632 21.7043 34.456 21.7057C34.4215 21.7128 34.3862 21.7336 34.3482 21.7673C34.334 21.7802 34.3207 21.794 34.3084 21.8086C34.3115 21.7984 34.3122 21.7875 34.3103 21.7769C34.3085 21.7679 34.305 21.7593 34.2998 21.7517C34.2947 21.7441 34.2881 21.7376 34.2803 21.7326C34.2724 21.727 34.2634 21.7232 34.2539 21.7213C34.2444 21.7194 34.2346 21.7195 34.2251 21.7215C34.1959 21.7276 34.1708 21.7495 34.1434 21.7841C34.1077 21.8304 34.0763 21.8798 34.0497 21.9318L34.0517 21.8937C34.0523 21.8784 34.0526 21.8664 34.0526 21.8569C34.0526 21.8474 34.0525 21.8411 34.0514 21.835C34.0504 21.8287 34.0478 21.8227 34.0439 21.8177C34.04 21.8126 34.035 21.8086 34.0291 21.8059C34.0223 21.8021 34.0146 21.8003 34.0068 21.8006C34.0028 21.8006 33.9989 21.801 33.995 21.8018C33.9627 21.8082 33.9272 21.8298 33.8823 21.8652C33.8368 21.9021 33.7942 21.9517 33.7546 22.014L33.745 22.029L33.8039 22.0753L33.8159 22.058C33.8488 22.01 33.8726 21.9793 33.884 21.9683C33.8897 21.9625 33.8961 21.9574 33.9031 21.9531C33.9032 21.9558 33.9035 21.9616 33.9035 21.9688L33.9033 21.99C33.9006 22.0888 33.8958 22.1876 33.8888 22.2862L33.8714 22.5251L34.0251 22.497L34.0258 22.4813L34.0326 22.3279C34.0369 22.2256 34.0427 22.1598 34.0483 22.1336C34.0536 22.1071 34.0667 22.0733 34.0876 22.0321C34.1081 21.992 34.1284 21.9614 34.1466 21.9416C34.1653 21.9213 34.1907 21.9016 34.2246 21.8831C34.2458 21.8711 34.262 21.8612 34.2749 21.8517C34.2603 21.8719 34.2458 21.8937 34.231 21.9186L34.2201 21.937L34.2933 21.9727L34.303 21.9584C34.3378 21.9063 34.3617 21.8745 34.3702 21.8664C34.376 21.861 34.3815 21.8572 34.3861 21.8549C34.3865 21.8583 34.3866 21.8621 34.3866 21.8662C34.3866 21.8695 34.3866 21.8729 34.3864 21.8764C34.3701 22.0463 34.3619 22.1747 34.3619 22.2616C34.3619 22.3074 34.3641 22.3416 34.3692 22.3658C34.3737 22.3888 34.3846 22.4084 34.4022 22.4207C34.4145 22.4292 34.4291 22.4337 34.4445 22.4337C34.4503 22.4337 34.4564 22.4331 34.4627 22.4318C34.4888 22.4262 34.5148 22.4097 34.5439 22.3842C34.5744 22.357 34.616 22.3046 34.6718 22.2248L34.6836 22.2078L34.6147 22.1642L34.604 22.1797ZM35.2839 22.0008L35.2725 22.019C35.2528 22.0506 35.2293 22.0797 35.2026 22.1056C35.1954 22.1134 35.1871 22.12 35.178 22.1254C35.1777 22.1245 35.1773 22.1232 35.1767 22.1214C35.1739 22.1097 35.171 22.0734 35.1693 22.018C35.1678 21.976 35.167 21.934 35.167 21.8921C35.167 21.8389 35.1684 21.7895 35.1711 21.7439L35.1839 21.5077L35.0992 21.5478L35.0965 21.5559L35.0894 21.5774C35.0764 21.5793 35.0634 21.5818 35.0506 21.5847C34.985 21.6004 34.9327 21.6233 34.8936 21.6542C34.8446 21.6936 34.8023 21.7468 34.7665 21.8125C34.7311 21.8781 34.7063 21.9489 34.693 22.0223C34.6863 22.0568 34.6829 22.0918 34.6827 22.127C34.6827 22.1593 34.6861 22.1894 34.6929 22.2174C34.7038 22.2646 34.725 22.3026 34.7566 22.3285C34.774 22.3428 34.7955 22.3507 34.8184 22.3507H34.8192C34.8284 22.3507 34.8378 22.3496 34.8474 22.3474C34.8829 22.3386 34.9166 22.317 34.9492 22.2837C34.9806 22.2523 35.0088 22.2179 35.0335 22.181L35.0321 22.2085C35.0309 22.2212 35.0315 22.234 35.0337 22.2465C35.0373 22.2611 35.0454 22.275 35.0592 22.2828C35.0672 22.2873 35.0763 22.2897 35.0854 22.2894C35.0917 22.2893 35.098 22.2886 35.1044 22.2872C35.1253 22.2819 35.145 22.2731 35.1642 22.2604C35.1923 22.2421 35.2201 22.2174 35.2477 22.1869C35.2632 22.1699 35.2914 22.1301 35.3364 22.0642L35.3469 22.0487L35.2839 22.0008ZM35.0294 21.7194L35.0233 21.9468C35.0217 22.0186 35.006 22.0749 34.9781 22.1179C34.9489 22.1623 34.9197 22.1853 34.8924 22.1916C34.8865 22.1931 34.8805 22.1932 34.8746 22.1918C34.8687 22.1904 34.8633 22.1877 34.8588 22.1838C34.8493 22.1764 34.8384 22.1573 34.831 22.1251C34.8232 22.0922 34.8193 22.0585 34.8193 22.0247C34.8193 21.9943 34.8224 21.9631 34.8284 21.931C34.8415 21.8618 34.8618 21.8128 34.8859 21.7843C34.9107 21.755 34.9428 21.736 34.9842 21.7258C34.9965 21.723 35.0116 21.7207 35.0294 21.7194Z" fill="white" />
                                    </g>
                                    <g clip-path="url(#clip2_682_8994)">
                                        <path d="M22 2.88277C19.6026 1.61405 13.635 0.035625 11.6138 0.000307336C9.59519 -0.0241434 4.16001 1.41573 2 2.38561C2 13.1086 6.52058 19.895 11.6138 24C16.707 19.895 22 13.6058 22 2.88277Z" fill="white" />
                                        <path d="M10.2957 0.111328C7.81529 0.459072 3.79209 1.58924 2 2.38524C2 8.8837 3.66159 13.9287 6.10544 17.8055C6.4635 17.8191 6.81896 17.8951 7.16404 17.8951C9.54849 17.8951 11.8266 17.3219 13.7751 16.2895C16.1258 14.8116 18.7126 12.4263 19.3068 9.09561C19.4599 8.27515 20.15 7.04446 20.7312 6.65869C21.2294 6.34898 19.6026 5.83823 18.9851 5.80291C18.819 5.78933 18.6426 5.77846 18.4532 5.77846C17.2882 5.77846 16.3749 6.39788 15.4486 7.02001C13.718 2.94489 11.8266 1.23063 9.90395 0.18468C10.0337 0.160229 10.166 0.135779 10.2957 0.111328Z" fill="white" />
                                        <path d="M11.4113 0C11.0066 0.010867 10.485 0.073352 9.90385 0.173872C11.8264 1.2171 13.7179 2.94495 15.4485 7.02007C16.3748 6.39794 17.2881 5.77852 18.4531 5.77852C18.6425 5.77852 18.8189 5.78938 18.985 5.80297C15.7806 8.29966 13.8347 11.682 13.7854 16.3276C11.8368 17.36 9.56914 17.9332 7.1847 17.9332C6.83962 17.9332 6.47378 17.8572 6.11572 17.8436C7.70622 20.4299 9.60806 22.3778 11.6137 23.9997C16.7069 19.8947 21.9999 13.6055 21.9999 2.88247C19.6025 1.61375 13.6349 0.0353177 11.6137 0H11.4113Z" fill="#DE2229" />
                                        <path d="M3.17484 5.19435C6.3208 4.80857 8.80124 5.57741 11.113 6.63423C10.9366 4.38476 10.2231 2.2983 9.38243 0.260742C6.91237 0.719872 3.5783 1.67617 2 2.38524C2 7.95185 3.21038 12.4372 5.09614 16.0532C8.20708 15.9038 9.38243 14.0917 10.7238 12.4127C9.42914 9.1445 6.80599 6.82168 3.17484 5.19435Z" fill="#DE2229" />
                                        <path d="M11.4115 0C11.0068 0.010867 10.4852 0.0869355 9.90406 0.184738C11.8267 1.23069 13.7181 2.94495 15.4487 7.02007C16.3153 6.43597 17.1715 5.85187 18.2379 5.78938C18.3106 5.77852 18.3806 5.77852 18.4533 5.77852H18.6297C18.666 5.77852 18.7024 5.77852 18.7257 5.78938H18.8554C18.8918 5.78938 18.9385 5.80297 18.9852 5.80297C19.7091 5.8899 20.3162 6.15071 20.9078 6.56094C19.9841 7.18036 19.6624 8.44908 19.2836 9.63086C17.4907 15.1594 12.6595 17.8925 7.17453 17.8925C6.98513 17.8925 6.78275 17.8545 6.58037 17.8191C6.43766 17.8191 6.28458 17.8191 6.12891 17.8055C6.42729 18.2783 6.72307 18.7374 7.03183 19.1476C8.41994 21.1363 9.98708 22.6278 11.6139 23.9997C13.0513 22.8859 14.4991 21.5085 15.8405 20.017C15.9832 19.7698 16.1389 19.6448 16.2816 19.3976C16.4217 19.2726 16.5774 19.1476 16.7201 18.9004C17.0055 18.5391 17.2779 18.1669 17.5504 17.7675C19.5923 14.8497 21.1828 11.2337 21.764 6.69678C21.7874 6.56094 21.7977 6.41152 21.8237 6.2621V6.24851C21.8341 6.10181 21.847 5.95239 21.8704 5.80297C21.8704 5.78938 21.8574 5.78938 21.8704 5.78938C21.8808 5.6291 21.8937 5.47967 21.9067 5.33025V5.31667C21.9171 5.15638 21.9301 5.00696 21.9404 4.85754V4.84667C21.9534 4.68367 21.9638 4.53425 21.9638 4.37396V4.36038C21.9768 4.20009 21.9768 4.03708 21.9897 3.8768C21.9897 3.71379 22.0001 3.5535 22.0001 3.3905V2.89333C21.9301 2.84443 21.847 2.8064 21.764 2.77108C19.2343 1.52681 13.5754 0.0353177 11.6139 0H11.4115Z" fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_682_8994">
                                            <rect width="23" height="24" fill="white" transform="translate(32.5)" />
                                        </clipPath>
                                        <clipPath id="clip1_682_8994">
                                            <rect width="23" height="23.3089" fill="white" transform="translate(17 0.345703)" />
                                        </clipPath>
                                        <clipPath id="clip2_682_8994">
                                            <rect width="20" height="24" fill="white" transform="translate(2)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page