import gsap, { Elastic, Power4 } from 'gsap';
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props<T extends HTMLElement = HTMLElement>
  extends React.ComponentPropsWithoutRef<'div'> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  speed?: number;
  tollerance?: number;
  scale?: number;
  debug?: boolean;
  borderRadius?: number;
  [key: string]: any;
}

const MagneticDiv = ({
  //   onClick,
  children,
  className = '',
  speed = 1,
  tollerance = 0.8,
  scale = 1.2,
  debug = false,
  borderRadius = 0,
  ...props
}: Props) => {
  const $root = useRef<HTMLDivElement>(null!)!;
  const $item = useRef<HTMLSpanElement>(null!)!;
  const $hover = useRef<HTMLSpanElement>(null!)!;
  const rootBound = useRef<DOMRect | null>(null);
  const itemBound = useRef<DOMRect | null>(null);
  const diffBound = useRef({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    gsap.killTweensOf($item.current);
    gsap.set($hover.current, {
      scale: scale,
      borderRadius,
      background: debug ? 'rgba(0, 125, 255, .4)' : 'transparent',
    });

    rootBound.current = $root.current.getBoundingClientRect();
    itemBound.current = $item.current.getBoundingClientRect();
    diffBound.current.x =
      (rootBound.current.width * scale - rootBound.current.width) / 2;
    diffBound.current.y =
      (rootBound.current.height * scale - rootBound.current.height) / 2;
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: Elastic.easeOut,
      duration: 1.6,
    });
    gsap.set($hover.current, {
      scale: 1,
    });
  };

  const handleMouseMoveDesktop: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    const x = e.clientX;
    const y = e.clientY;

    const maxX =
      ((rootBound.current!.width - itemBound.current!.width) / 2) * tollerance;

    const maxY =
      ((rootBound.current!.height - itemBound.current!.height) / 2) *
      tollerance;

    const newX = gsap.utils.mapRange(
      0,
      rootBound.current!.width * scale,
      -maxX,
      maxX,
      x - rootBound.current!.x + diffBound.current!.x
    );

    const newY = gsap.utils.mapRange(
      0,
      rootBound.current!.height * scale,
      -maxY,
      maxY,
      y - rootBound.current!.y + diffBound.current!.y
    );

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: newX,
      y: newY,
      ease: Power4.easeOut,
      duration: speed,
    });
  };

  const handleMouseMoveMobile: React.TouchEventHandler<HTMLDivElement> = (
    e
  ) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const maxX =
      ((rootBound.current!.width - itemBound.current!.width) / 2) * tollerance;
    const maxY =
      ((rootBound.current!.height - itemBound.current!.height) / 2) *
      tollerance;

    const newX = gsap.utils.mapRange(
      0,
      rootBound.current!.width * scale,
      -maxX,
      maxX,
      x - rootBound.current!.x + diffBound.current!.x
    );

    const newY = gsap.utils.mapRange(
      0,
      rootBound.current!.width * scale,
      -maxY,
      maxY,
      y - rootBound.current!.y + diffBound.current!.y
    );

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: newX,
      y: newY,
      ease: Power4.easeOut,
      duration: speed,
    });
  };

  return (
    <div
      ref={$root}
      // onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMoveDesktop}
      onTouchMove={handleMouseMoveMobile}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onMouseLeave={handleMouseLeave}
      className={twMerge([
        'group relative touch-none capitalize cursor-pointer hover:text-primary transition-all duration-150',
        className,
      ])}
      {...props}
    >
      <span ref={$item} className='inline-block'>
        {children}
      </span>
      <span
        ref={$hover}
        className='inline-block content-[""] absolute -z-[1] left-0 top-0 w-full h-full'
      />
    </div>
  );
};

export default MagneticDiv;
