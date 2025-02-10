export const colorShades = {
    // Light shades
    ghostWhite: {
        name: 'Ghost White',
        hex: '#F8F8FF',
        tailwind: 'bg-gray-50'
    },
    snow: {
        name: 'Snow',
        hex: '#F9F9F9',
        tailwind: 'bg-gray-100'
    },
    seashell: {
        name: 'Seashell',
        hex: '#F1F1F1',
        tailwind: 'bg-gray-200'
    },
    platinum: {
        name: 'Platinum',
        hex: '#E5E5E5',
        tailwind: 'bg-neutral-200'
    },
    alabaster: {
        name: 'Alabaster',
        hex: '#ECECEC',
        tailwind: 'bg-gray-300'
    },

    // Dark shades
    stormGray: {
        name: 'Storm Gray',
        hex: '#4B5563',
        tailwind: 'bg-gray-400'
    },
    slateGray: {
        name: 'Slate Gray',
        hex: '#374151',
        tailwind: 'bg-gray-500'
    },
    outerSpace: {
        name: 'Outer Space',
        hex: '#2C3A4A',
        tailwind: 'bg-gray-600'
    },
    charcoal: {
        name: 'Charcoal',
        hex: '#202A3A',
        tailwind: 'bg-gray-700'
    },
    gunmetal: {
        name: 'Gunmetal',
        hex: '#1A2332',
        tailwind: 'bg-gray-800'
    }
} as const;

export type ColorShade = keyof typeof colorShades;