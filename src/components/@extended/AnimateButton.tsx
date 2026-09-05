import { ReactNode } from 'react';

// third-party
import { domAnimation, LazyMotion, m, useCycle, useReducedMotion } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

type ScaleProps = {
  hover: number | string | undefined;
  tap: number | string | undefined;
};

interface Props {
  children?: ReactNode;
  type?: 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  scale?: ScaleProps;
}

export default function AnimateButton({
  children,
  type = 'scale',
  direction = 'right',
  offset = 10,
  scale = { hover: 1.05, tap: 0.954 }
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  let offset1: number;
  let offset2: number;
  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  switch (type) {
    case 'rotate':
      return (
        <LazyMotion features={domAnimation}>
          <m.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 0
            }}
          >
            {children}
          </m.div>
        </LazyMotion>
      );
    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <LazyMotion features={domAnimation}>
            <m.div animate={{ y: y !== undefined ? y : '' }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}>
              {children}
            </m.div>
          </LazyMotion>
        );
      }
      return (
        <LazyMotion features={domAnimation}>
          <m.div animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
            {children}
          </m.div>
        </LazyMotion>
      );

    case 'scale':
    default: {
      const scaleValues =
        typeof scale === 'number'
          ? {
              hover: scale,
              tap: scale
            }
          : scale;

      return (
        <LazyMotion features={domAnimation}>
          <m.div whileHover={{ scale: scaleValues?.hover }} whileTap={{ scale: scaleValues?.tap }}>
            {children}
          </m.div>
        </LazyMotion>
      );
    }
  }
}
