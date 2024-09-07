import { Checkbox, Group } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

const CheckboxInput = ({
  name,
  label,
  options = [], 
  isGrayLabel = false,
  ...props
}) => {
  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className='flex flex-col gap-2'>
          <label >{label}</label>
          <Checkbox.Group
            value={value || []}
            onChange={onChange}
            {...props}
          >
            <Group mt="xs" gap={20}>
              {options.map(option => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  styles={{
                    label: {
                      color: isGrayLabel ? 'gray !important' : undefined
                    }
                  }}
                />
              ))}
            </Group>
          </Checkbox.Group>
          {errors[name] && (
            <div className="error text-[13px] mt-2">
              {errors[name].message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxInput;
