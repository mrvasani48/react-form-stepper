import { Group, Radio } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

const RadioGroupInput = ({
	name,
	label,
	control,
	options,
	isGrayLabel = false,
	disable = false
}) => {
	const {
		formState: { errors }
	} = useFormContext();

	return (
		<div>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value, ref } }) => {
					return (
						<Radio.Group
							label={label}
							ref={ref}
							value={value}
							onBlur={onBlur}
							error={
								errors[name] && (
									<div className="error text-[13px] mt-2">
										{errors[name].message}
									</div>
								)
							}
							key={value}
						>
							<div
								className={'flex flex-row gap-3'
								}
							>
								{options.map((option, i) => {
									return (
										<Group
											mt="xs"
											key={i}
											onChange={() => {
												onChange(option.value);
											}}
										>
											<Radio
												disabled={disable}
												error={!!errors[name]}
												value={option.value}
												label={option.label}
												styles={{
													label: {
														color: isGrayLabel && 'gray !important'
													}
												}}
											/>
										</Group>
									);
								})}
							</div>
						</Radio.Group>
					);
				}}
			/>
		</div>
	);
};

export default RadioGroupInput;
