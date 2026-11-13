
'use client'

import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import NoTeam from '@/components/ui/NoTeam'
import { useUserInfo } from '@/utils/logics/userinfo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()
    const { userInfo, isLoading } = useUserInfo()

    if (isLoading) return <Loader />

    return (
        <div className='min-h-screen flex flex-col font-medium'>

            {/*  cover section  */}
            <section className='relative w-full h-[267px]'>
                <img src={userInfo?.coverImage || "/default-cover.png"} alt="" className='absolute inset-0 w-full h-[267px] object-cover' />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent backdrop-blur-xs to-[var(--background)] [mask-image:linear-gradient(to_bottom,transparent,var(--background)_40%)]" />

                {/* navigation */}
                <div className="relative w-[90%] h-[130px] mx-auto flex items-center justify-between overflow-hidden z-20">

                    {/* Back Button */}
                    <Link href="/">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <foreignObject x="-50" y="-50" width="140" height="140"><div style={{ backdropFilter: "blur(25px)", clipPath: "url(#bgblur_0_480_69723_clip_path)", height: "100%", width: "100%" }}></div></foreignObject>
                            <g data-figma-bg-blur-radius="50">
                                <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#0B0B0B" fill-opacity="0.1" />
                                <path d="M13.5 20.002H27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                                <path d="M18.9999 26.002C18.9999 26.002 13 21.583 13 20.0019C13 18.4208 19 14.002 19 14.002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="white" />
                            </g>
                            <defs>
                                <clipPath id="bgblur_0_480_69723_clip_path" transform="translate(50 50)">
                                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>

                    {/* Settings Button */}
                    <Link href="">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <foreignObject x="-50" y="-50" width="140" height="140"><div style={{ backdropFilter: "blur(25px)", clipPath: "url(#bgblur_0_480_69723_clip_path)", height: "100%", width: "100%" }}></div></foreignObject>
                            <g data-figma-bg-blur-radius="50">
                                <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#0B0B0B" fill-opacity="0.1" />
                                <path d="M23.5 20C23.5 21.933 21.933 23.5 20 23.5C18.067 23.5 16.5 21.933 16.5 20C16.5 18.067 18.067 16.5 20 16.5C21.933 16.5 23.5 18.067 23.5 20Z" stroke-width="1.5" stroke="white" />
                                <path d="M29.011 22.0968C29.5329 21.9561 29.7939 21.8857 29.8969 21.7511C30 21.6166 30 21.4001 30 20.9672V19.0335C30 18.6006 30 18.3841 29.8969 18.2496C29.7938 18.115 29.5329 18.0446 29.011 17.9039C27.0606 17.3779 25.8399 15.3388 26.3433 13.4012C26.4817 12.8683 26.5509 12.6019 26.4848 12.4456C26.4187 12.2893 26.2291 12.1817 25.8497 11.9663L24.125 10.987C23.7528 10.7757 23.5667 10.67 23.3997 10.6925C23.2326 10.715 23.0442 10.903 22.6672 11.279C21.208 12.7348 18.7936 12.7347 17.3343 11.279C16.9574 10.9029 16.769 10.7149 16.6019 10.6924C16.4349 10.6699 16.2488 10.7756 15.8765 10.9869L14.1518 11.9662C13.7725 12.1815 13.5829 12.2892 13.5168 12.4455C13.4507 12.6017 13.5199 12.8682 13.6582 13.4011C14.1614 15.3388 12.9397 17.3779 10.989 17.9039C10.4671 18.0446 10.2062 18.115 10.1031 18.2495C10 18.3841 10 18.6006 10.1031 18.7511C10.2062 21.8857 10.4671 21.9561 10.989 22.0968C12.9394 22.6228 14.1601 24.6619 13.6567 26.5995C13.5183 27.1324 13.4491 27.3988 13.5152 27.5551C13.5813 27.7114 13.7709 27.8191 14.1502 28.0344L15.8749 29.0137C16.2472 29.225 16.4333 29.3307 16.6004 29.3082C16.7675 29.2857 16.9559 29.0976 17.3327 28.7216C18.7927 27.2647 21.2088 27.2646 22.6689 28.7215C23.0457 29.0976 23.2341 29.2856 23.4012 29.3081C23.5682 29.3306 23.7544 29.2249 24.1266 29.0136L25.8513 28.0343C26.2307 27.819 26.4204 27.7113 26.4864 27.555C26.5525 27.3987 26.4833 27.1323 26.3448 26.5994C25.8412 24.6619 27.0609 22.6229 29.011 22.0968Z" stroke-width="1.5" stroke-linecap="round" stroke="white" />
                            </g>
                            <defs>
                                <clipPath id="bgblur_0_69725_clip_path" transform="translate(50 50)">
                                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                </div>

                {/*  profile information  */}
                <section className='absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center border-b border-[#141414] w-[90%] mx-auto py-[24px]'>

                    {/* profile image */}
                    <img src={userInfo?.profileImage || userInfo?.gender === "male" ? '/male.png' : '/female.png'} alt="" className='w-[80px] h-[80px] rounded-full object-cover bg-[var(--background)] mb-[8px]' />

                    {/* full name and verification status */}
                    <p className='flex items-center justify-center gap-[8px] text-[18px] text-nowrap'>
                        {userInfo?.fullName || "player"}

                        {userInfo?.status === "pending" ? (
                            <span className='flex items-center justify-center gap-[8px] text-[12px] font-medium text-[#339933] bg-[#00800033] px-[8px] py-[2px] rounded-full'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99756 2V4" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M7.99756 12V14" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M13.9976 8H11.9976" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M3.99756 8H1.99756" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M12.2399 3.75781L10.8257 5.17203" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M5.16958 10.8281L3.75537 12.2423" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M12.2399 12.2423L10.8257 10.8281" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                    <path d="M5.16958 5.17203L3.75537 3.75781" stroke-width="1.5" stroke-linecap="round" stroke="#339933" />
                                </svg>
                                Verification pending
                            </span>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8.00033L7.33333 9.33366L10 6.66699" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#54AA54" />
                                <path d="M9.5963 2.00023L9.43223 1.86044C8.60703 1.1572 7.3933 1.1572 6.56809 1.86044L6.40406 2.00023C5.97695 2.3642 5.44591 2.58417 4.88654 2.62881L4.6717 2.64595C3.59092 2.7322 2.73268 3.59043 2.64644 4.67122L2.6293 4.88605C2.58466 5.44542 2.36469 5.97646 2.00072 6.40357L1.86093 6.5676C1.15768 7.39281 1.15768 8.60654 1.86093 9.43174L2.00072 9.59581C2.36469 10.0229 2.58466 10.5539 2.6293 11.1133L2.64644 11.3281C2.73268 12.4089 3.59092 13.2671 4.6717 13.3534L4.88654 13.3705C5.44591 13.4152 5.97695 13.6351 6.40406 13.9991L6.56808 14.1389C7.3933 14.8421 8.60703 14.8421 9.43223 14.1389L9.5963 13.9991C10.0234 13.6351 10.5544 13.4152 11.1138 13.3705L11.3286 13.3534C12.4094 13.2671 13.2676 12.4089 13.3539 11.3281L13.371 11.1133C13.4157 10.5539 13.6356 10.0229 13.9996 9.59581L14.1394 9.43174C14.8426 8.60654 14.8426 7.39281 14.1394 6.5676L13.9996 6.40357C13.6356 6.0229 13.4157 5.44542 13.371 4.88605L13.3539 4.67122C13.2676 3.59043 12.4094 3.2671 11.3286 2.64595L11.1138 2.62881C10.5544 2.58417 10.0234 2.3642 9.5963 2.00023Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#54AA54" />
                            </svg>
                        )}
                    </p>

                    {/* username */}
                    <p className='text-[12px] text-[var(--muted)]'>@{userInfo?.userName || "player"}</p>

                    {/* department and class */}
                    <p className='flex items-center gap-[10px] text-[14px] text-[var(--muted)] capitalize'>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.33317 1.16699V3.50033M4.6665 1.16699V3.50033" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                <path d="M7.58333 2.33301H6.41667C4.21678 2.33301 3.11684 2.33301 2.43342 3.01642C1.75 3.69985 1.75 4.79978 1.75 6.99967V8.16634C1.75 10.3662 1.75 11.4662 2.43342 12.1496C3.11684 12.833 4.21678 12.833 6.41667 12.833H7.58333C9.7832 12.833 10.8832 12.833 11.5666 12.1496C12.25 11.4662 12.25 10.3662 12.25 8.16634V6.99967C12.25 4.79978 12.25 3.69985 11.5666 3.01642C10.8832 2.33301 9.7832 2.33301 7.58333 2.33301Z" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                <path d="M1.75 5.83301H12.25" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                                <path d="M6.4165 8.16699H9.33317M4.6665 8.16699H4.67174M7.58317 10.5003H4.6665M9.33317 10.5003H9.32792" stroke-linecap="round" stroke-linejoin="round" stroke="#B5B5B5" />
                            </svg>
                        </span>
                        {userInfo?.departmentId} • {userInfo?.classId}
                    </p>

                    {/* user information badges */}
                    <div className='flex flex-wrap w-full items-center justify-center pt-[8px] gap-[12px] text-[12px]'>

                        {/* role */}
                        <p className='bg-[#FFFFFF0D] backdrop-blur-md w-[87px] h-[32px] rounded-full flex items-center justify-center gap-[8px]'>
                            <span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33341 4.08333C9.33341 5.372 8.28875 6.41667 7.00008 6.41667C5.71142 6.41667 4.66675 5.372 4.66675 4.08333C4.66675 2.79467 5.71142 1.75 7.00008 1.75C8.28875 1.75 9.33341 2.79467 9.33341 4.08333Z" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                                    <path d="M6.99992 8.16699C4.08325 8.16699 2.33325 9.62533 2.33325 11.0837C2.33325 11.728 2.85559 12.2503 3.49992 12.2503H10.4999C11.1443 12.2503 11.6666 11.728 11.6666 11.0837C11.6666 9.62533 9.91659 8.16699 6.99992 8.16699Z" stroke-linecap="round" stroke-linejoin="round" stroke="var(--primary)" />
                                </svg>
                            </span>
                            {userInfo?.role}
                        </p>

                        {/* sport */}
                        <p className='bg-[#FFFFFF0D] backdrop-blur-md w-[87px] h-[32px] rounded-full flex items-center justify-center gap-[8px]'>
                            <img src="/football.png" alt="" className='w-[16px] h-[16px]' />Football
                        </p>

                        {/* gender */}
                        <p className='bg-[#FFFFFF0D] backdrop-blur-md w-[87px] h-[32px] rounded-full flex items-center justify-center gap-[8px]'>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 7.45521V5.51987C14 4.42653 14 3.87986 13.7306 3.5232C13.4612 3.16653 12.8521 2.99338 11.6338 2.64707C10.8015 2.41047 10.0677 2.12543 9.48153 1.8652C8.68227 1.51041 8.28267 1.33301 8 1.33301C7.71733 1.33301 7.31773 1.51041 6.51847 1.8652C5.93226 2.12543 5.19856 2.41047 4.36622 2.64707C3.14795 2.99338 2.53881 3.16653 2.26941 3.5232C2 3.87986 2 4.42653 2 5.51987V7.45521C2 11.2053 5.37518 13.4553 7.06267 14.3459C7.4674 14.5595 7.66973 14.6663 8 14.6663C8.33027 14.6663 8.5326 14.5595 8.93733 14.3459C10.6248 13.4553 14 11.2053 14 7.45521Z" stroke-width="1.5" stroke-linecap="round" stroke="var(--primary)" />
                                </svg>
                            </span>
                            {userInfo?.gender}
                        </p>
                    </div>
                </section>
            </section>

            {/* team details section  */}
            <section className='w-[90%] mx-auto h-full flex-1 flex items-center justify-center'>
                <NoTeam />
            </section>

            {/*  home button  */}
            <Button type="button" variant="primary" onClick={() => router.push('/')} className="fixed bottom-4 left-1/2 -translate-x-1/2 !w-[90%] mx-auto py-3 flex items-center justify-center gap-2">
                Go Back to Homescreen
            </Button>

        </div>
    )
}

export default page
