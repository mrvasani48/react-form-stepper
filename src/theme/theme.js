import { Button, Input, Select, TextInput } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";

const theme = {
  fontFamily: 'Open Sans, sans-serif',
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  primaryColor: 'cyan',
  colors: {
    cyan: ['#E0FCFF', '#BEF8FD', '#87EAF2', '#54D1DB', '#38BEC9', '#2CB1BC', '#14919B', '#0E7C86', '#0A6C74', '#044E54'],
    gray: ['#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827'],
  },
  headings: {
    fontFamily: 'Poppins, sans-serif',
    sizes: {
      h1: { fontSize: 30 },
      h2: { fontSize: 26 },
      h3: { fontSize: 22 },
      h4: { fontSize: 18 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  compocomponents: {
		Button: Button.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				label: {
					fontSize: 'small',
					fontWeight: 500
				}
			}
		}),
		TextInput: TextInput.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				label: {
					fontSize: 'small',
					marginBottom: 5,
					fontWeight: 500
				},
				input: {
					fontSize: 'small',
					'::placeholder': {
						fontSize: 'small'
					}
				}
			}
		}),
		Input: Input.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				// label: {
				// 	fontSize: 'small',
				// 	marginBottom: 5,
				// 	fontWeight: 500
				// },
				input: {
					fontSize: 'small',
					//borderColor: 'var(--colors-gray-200)',
					'::placeholder': {
						fontSize: 'small'
					}
				}
			}
		}),
		Select: Select.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				label: {
					fontSize: 'small',
					fontWeight: 500,
					marginBottom: 5
				},
				input: {
					fontSize: 'small'
					//borderColor: 'var(--colors-gray-200)'
				}
				// item: {
				// 	fontSize: 'small'
				// }
			}
		}),
		DatePickerInput: DatePickerInput.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				label: {
					fontSize: 'small',
					marginBottom: 5,
					fontWeight: 500
				},
				input: {
					fontSize: 'small'
					//borderColor: 'var(--colors-gray-200)'
				}
				// item: {
				// 	fontSize: 'small'
				// }
			}
		}),
		DateTimePicker: DateTimePicker.extend({
			defaultProps: {
				size: 'lg'
			},
			styles: {
				label: {
					fontSize: 'small',
					marginBottom: 5,
					fontWeight: 500
				},
				input: {
					fontSize: 'small'
					//borderColor: 'var(--colors-gray-200)'
				}
				// item: {
				// 	fontSize: 'small'
				// }
			}
		}),
	},
};

export default theme