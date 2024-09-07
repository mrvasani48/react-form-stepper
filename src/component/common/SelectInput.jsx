import { Icon } from '@iconify/react';
import  { useState } from 'react';
import { Select } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';


const SelectInput = ({
	label,
	name,
	data,
	required = false,
	disabled,
	props,
	placeholder,
	handleChange,
	loading,
	clearable = false,
}) => {
	const {
		formState: { errors },
		control
	} = useFormContext();
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const handleDropdownToggle = () => {
		setDropdownOpen(prevOpen => !prevOpen);
	};
	return (
		<div>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<Select
						style={{
							rightSection: {
								pointerEvents: 'none',
								transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(360deg)',
								transition: 'transform 0.4s ease-in-out'
							}
						}}
						ref={ref}
						label={label}
						data={data}
						value={value}
						placeholder={placeholder ? placeholder : `Enter ${label}`}
						required={required}
						disabled={disabled}
						onChange={newValue => {
							onChange(newValue ? newValue : '');
							handleChange && handleChange(newValue ? newValue : '');
						}}
						onBlur={onBlur}
						error={
							errors[name] && (
								<div className="error text-[13px] mt-2">
									{errors[name].message}
								</div>
							)
						}
						rightSection={
							!clearable ? (
								!loading ? (
									<Icon icon="bi:chevron-down" />
								) : (
									<div className="flex">
										<p isLoading={loading} size="20" ></p>
									</div>
								)
							) : (
								false
							)
						}
						clearable={clearable}
						onDropdownOpen={handleDropdownToggle}
						onDropdownClose={handleDropdownToggle}
						{...props}
					/>
				)}
			/>
		</div>
	);
};

export default SelectInput;
