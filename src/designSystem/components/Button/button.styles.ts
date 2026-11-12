/**
 * Button sizes on Tailwind's default spacing scale (NIRNA keeps the default 4px step):
 * 16px × 12px padding, 8px gap, 12px radius; icons 16 → 20 → 24px. The original design-system
 * values, converted from its custom spacing scale.
 */
export const buttonSizes = {
  xl: [
    '[&_svg]:size-4 px-4 py-3 text-[14px] leading-[16px] gap-2 rounded-xl',
    'md:[&_svg]:size-5 md:text-[16px] md:leading-[18px]',
    'lg:[&_svg]:size-6 lg:text-[18px] lg:leading-[20px]',
  ],

  lg: [
    '[&_svg]:size-4 px-4 py-3 text-[14px] leading-[16px] gap-2 rounded-xl',
    'md:[&_svg]:size-5 md:text-[16px] md:leading-[18px]',
    'lg:[&_svg]:size-6 lg:text-[18px] lg:leading-[20px]',
  ],

  md: [
    '[&_svg]:size-4 px-4 py-3 text-[14px] leading-[16px] gap-2 rounded-xl',
    'md:[&_svg]:size-5 md:text-[16px] md:leading-[18px]',
  ],

  sm: ['[&_svg]:size-4 px-4 py-3 text-[14px] leading-[16px] gap-2 rounded-xl'],
}
