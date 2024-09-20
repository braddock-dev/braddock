import styles from './SkeletonLoader.module.scss';

export enum SKELETON_SHAPE {
  CIRCLE = 'circle',
}

export enum ANIMATION_TYPE {
  SHINE = 'shine',
  PULSE = 'pulse',
}

interface ISkeletonLoaderProps {
  shape?: SKELETON_SHAPE;
  animation?: ANIMATION_TYPE;
}

export default function SkeletonLoader({ shape, animation }: ISkeletonLoaderProps) {
  return (
    <div
      className={`${styles.skeletonContainer} ${shape && styles[shape]} ${styles[animation || ANIMATION_TYPE.SHINE]}`}
    ></div>
  );
}
