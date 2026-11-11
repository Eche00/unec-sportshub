'use client'

import Button from '@/components/ui/Button'
import NoTeam from '@/components/ui/NoTeam'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()
    return (
        <div className='min-h-screen flex flex-col'>
            {/* top  */}
            <section className='relative w-full h-[267px] '>
                <img src="/home1.jpg" alt="" className=' absolute inset-0 h-[267px]' />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent backdrop-blur-md to-[var(--background)] [mask-image:linear-gradient(to_bottom,transparent,var(--background)_40%)]" />

            </section>
            {/* bottom  */}

            <section className='w-[90%] mx-auto h-full flex-1 flex items-center justify-center '>
                <NoTeam />
            </section>

            <Button
                type="button"
                variant="primary"
                onClick={() => router.push('/')}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 !w-[90%] mx-auto py-3 flex items-center justify-center gap-2"
            >
                Go Back to Homescreen
            </Button>
        </div>
    )
}

export default page