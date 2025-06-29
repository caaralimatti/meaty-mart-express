import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Modern Tech Palette - Black & Orange
				'charcoal-black': '#1A1D21',
				'vibrant-orange': '#FF7A00',
				'dark-slate': '#2D333A',
				'off-white': '#F0F2F5',
				
				// Keep existing shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF7A00', // Vibrant Orange
					foreground: '#F0F2F5' // Off White
				},
				secondary: {
					DEFAULT: '#2D333A', // Dark Slate
					foreground: '#F0F2F5' // Off White
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#2D333A', // Dark Slate
					foreground: '#F0F2F5' // Off White
				},
				accent: {
					DEFAULT: '#FF7A00', // Vibrant Orange
					foreground: '#F0F2F5' // Off White
				},
				popover: {
					DEFAULT: '#2D333A', // Dark Slate
					foreground: '#F0F2F5' // Off White
				},
				card: {
					DEFAULT: '#2D333A', // Dark Slate
					foreground: '#F0F2F5' // Off White
				},
				sidebar: {
					DEFAULT: '#1A1D21', // Charcoal Black
					foreground: '#F0F2F5', // Off White
					primary: '#FF7A00', // Vibrant Orange
					'primary-foreground': '#F0F2F5', // Off White
					accent: '#2D333A', // Dark Slate
					'accent-foreground': '#F0F2F5', // Off White
					border: '#2D333A', // Dark Slate
					ring: '#FF7A00' // Vibrant Orange
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
