import React from 'react';
import { InputProps, Input } from 'react-native-elements';
import { createField } from './util';
import { FieldConfig } from 'formik';

export const FiledInput = createField<InputProps & FieldConfig>((props: InputProps) => {
  const { field, form, ...otherProps } = props as any;
  return (
    <Input
      {...otherProps}
      onChangeText={form.handleChange(field.name)}
      errorMessage={form.errors[field.name]}
    />
  );
});
