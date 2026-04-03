import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = 'linear-gradient(90deg, #0ea5e9, #f8fafc, #0ea5e9)',
      gradientAnimationDuration = 1.4,
      hoverEffect = false,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: '0 0',
      },
      animate: {
        backgroundPosition: '100% 0',
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    };

    return (
      <div ref={ref} className={cn('flex items-center py-1', className)} {...props}>
        <motion.h2
          className={cn('text-3xl sm:text-4xl md:text-5xl font-bold leading-tight', textClassName)}
          style={{
            background: gradientColors,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.25)' : 'none',
          }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.h2>
      </div>
    );
  }
);

AnimatedText.displayName = 'AnimatedText';

export { AnimatedText };