export interface WeightOption {
  label: string
  class: string
  value: string
}

export const fontWeights: WeightOption[] = [
  {
    label: 'Regular',
    class: 'font-normal',
    value: '400',
  },
  {
    label: 'Medium',
    class: 'font-medium',
    value: '500',
  },
  {
    label: 'Semibold',
    class: 'font-semibold',
    value: '600',
  },
  {
    label: 'Bold',
    class: 'font-bold',
    value: '700',
  },
]

export const getWeightByClass = (className: string): WeightOption | undefined =>
  fontWeights.find((weight) => weight.class === className)

export const getWeightByValue = (value: string): WeightOption | undefined =>
  fontWeights.find((weight) => weight.value === value)
