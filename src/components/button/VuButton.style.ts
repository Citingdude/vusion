import { tv } from 'tailwind-variants'

export const buttonStyle = tv({
  slots: {
    base: `
      flex gap-2 items-center text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5
      focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-black dark:focus-visible:outline-white
      hover:brightness-90 active:scale-95
    dark:bg-white dark:text-black w-fit
      transition duration-100
    `,
    label: 'max-w-xs overflow-ellipsis overflow-hidden text-nowrap',
  },
  variants: {
    disabled: {
      true: {
        base: 'opacity-50 pointer-events-none',
      },
      false: {
        base: '',
      },
    },
  },
})
