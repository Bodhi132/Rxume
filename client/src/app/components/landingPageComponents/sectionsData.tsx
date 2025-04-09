import Features from "./sections/Features";
import Headlines from "./sections/Headlines";
import Hero from "./sections/Hero";
import Login from "./sections/Login";
import Main from "./sections/Main";

import { useTransform } from 'framer-motion';
import { MotionValue } from 'framer-motion';

const getSections = (scrollYProgress: MotionValue<number>) => {


    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    return [
        {
            component: <Main />,
            scale: scale4
        },
        {
            component: <Headlines />,
            scale: scale5
        },
        {
            component: <Hero />,
            scale: scale6
        },
        {
            component: <Features />,
            scale: scale8
        },
        {
            component: <Login />,
            scale: scale9
        },
    ];
};

export default getSections;