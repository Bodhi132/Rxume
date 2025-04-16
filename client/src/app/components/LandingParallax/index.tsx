import styles from './styles.module.scss';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

import Features from '../landingPageComponents/sections/Features';
import Headlines from '../landingPageComponents/sections/Headlines';
import Hero from '../landingPageComponents/sections/Hero';
import Tech from '../landingPageComponents/sections/Tech';
import Main from '../landingPageComponents/sections/Main';

export default function Index() {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const sections = [
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
      component: <Tech />,
      scale: scale9
    },
  ]

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {
          sections.map(({ component, scale }, index) => {
            return <motion.div key={index} style={{ scale,zIndex:index?0:600 }} className={styles.el}>
              <div className={styles.sectionContainer}>
                <div className={styles.section}>
                  {component}
                </div>
              </div>
            </motion.div>
          })
        }
      </div>
    </div>
  )
}