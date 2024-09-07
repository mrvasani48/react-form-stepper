import { Icon } from '@iconify/react';
import { DateTimePicker } from '@mantine/dates';
import { Controller, useFormContext } from 'react-hook-form';

const DateTimePickerInput = ({
	label,
	placeholder,
	name,
	control,
	props
}) => {
	const {
		formState: { errors }
	} = useFormContext();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<DateTimePicker
					ref={ref}
					onBlur={onBlur}
					placeholder={placeholder}
					label={label}
					defaultValue={value || null}
					clearable
					onChange={newValue => {
						onChange(newValue);
					}}
					rightSection={<Icon icon="simple-line-icons:calender" />}
					error={
						errors[name] && (
							<div className="error text-[13px] mt-2">
								{errors[name].message}
							</div>
						)
					}
					{...props}
				/>
			)}
		/>
	);
};

export default DateTimePickerInput;
