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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// GoldenPulse custom colors
				"golden-purple": "#7E69AB",
				"golden-orange": "#FEC6A1",
				"golden-pink": "#FFDEE2",
				"golden-peach": "#FDE1D3",
				"golden-yellow": "#FEF7CD",
				"golden-dark": "#1A1F2C",
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
				},
				// Add animations for the app
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				// Golden-blink animation
				'golden-blink': {
					'0%': { color: '#1A1F2C', opacity: '0.7' },
					'50%': { color: '#FEC6A1', opacity: '1' },
					'100%': { color: '#1A1F2C', opacity: '0.7' }
				},
				// Enhanced golden-sparkle animation with more vibrant colors
				'golden-sparkle': {
					'0%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0.4' },
					'50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1', filter: 'brightness(1.5)' },
					'100%': { transform: 'scale(0.8) rotate(360deg)', opacity: '0.4' }
				},
				// Enhanced party-burst animation (renamed from celebration-pop)
				'party-burst': {
					'0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7', filter: 'brightness(1)' },
					'25%': { transform: 'scale(1.4) rotate(-20deg)', opacity: '1', filter: 'brightness(1.5)' },
					'50%': { transform: 'scale(1.1) rotate(0deg)', opacity: '0.9', filter: 'brightness(1.2)' },
					'75%': { transform: 'scale(1.4) rotate(20deg)', opacity: '1', filter: 'brightness(1.5)' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7', filter: 'brightness(1)' }
				},
				// New sparkle-burst animation for more dynamic sparkles
				'sparkle-burst': {
					'0%': { transform: 'scale(0.5) translate(0, 0)', opacity: '0.3' },
					'30%': { transform: 'scale(1.3) translate(3px, -3px)', opacity: '1', filter: 'brightness(1.5)' },
					'60%': { transform: 'scale(0.8) translate(-2px, 2px)', opacity: '0.7', filter: 'brightness(1.2)' },
					'100%': { transform: 'scale(0.5) translate(0, 0)', opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards'
			},
			fontSize: {
				'senior-base': '18px',
				'senior-lg': '20px',
				'senior-xl': '22px',
				'senior-2xl': '24px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
