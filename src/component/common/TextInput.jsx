import { useEffect, useRef } from 'react';
import { TextInput as MantineInput } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';


const TextInput = ({
  disabled,
  name,
  placeholder,
  label,
  props,
  customClass,
  icon
}) => {
  const {
    formState: { errors },
    control
  } = useFormContext();
  
  const inputRef = useRef(null);

  const hasError = name.includes('.')
    ? name.includes('[')
      ? errors[name.split('[')[0]]?.[parseInt(name.split('[')[1], 10)]?.[name.split('.')[1]]
      : errors[name.split('.')[0]]?.[name.split('.')[1]]
    : errors[name];

  useEffect(() => {
    if (errors[name] && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [errors, name]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <MantineInput
          className={customClass}
          disabled={disabled}
          ref={inputRef}
          label={label}
          onBlur={onBlur}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          error={
            hasError && (
              <div className="error text-[13px] mt-2">
                {hasError?.message}
              </div>
            )
          }
          leftSection={icon}
          autoComplete="off"
          {...props}
        />
      )}
    />
  );
};

export default TextInput;
