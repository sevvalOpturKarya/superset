/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { styled } from '@superset-ui/core';
import { CheckboxChecked, CheckboxUnchecked } from 'src/components/Checkbox';

export interface CheckboxProps {
  checked: boolean;
  onChange: (val?: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

const Styles = styled.span<{ checked: boolean; disabled: boolean }>`
  display: inline-block;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 2px;

  &,
  & svg {
    vertical-align: top;
  }

`;

export default function Checkbox({
  checked,
  onChange,
  style,
  className,
  disabled = false,
}: CheckboxProps) {
  return (
    <Styles
      style={style}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      aria-label="Checkbox"
      aria-disabled={disabled}
      className={className || ''}
      checked={checked}
      disabled={disabled}
    >
      {checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
    </Styles>
  );
}
