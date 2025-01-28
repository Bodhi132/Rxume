import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axiosInstance from '@/app/lib/axiosInstance';

const GoogleCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const { code } = router.query;
        if (code) {
            const exchangeCodeForToken = async () => {
                try {
                    const res = await axiosInstance.post('/api/auth/google', { code });
                    if (res.status === 200) {
                        const { access_token } = res.data;
                        localStorage.setItem('token', access_token);
                        router.push('/resumebuilder');
                    }
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                }
            };

            exchangeCodeForToken();
        }
    }, [router.query]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
