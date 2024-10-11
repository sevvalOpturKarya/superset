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
import { styled } from '@superset-ui/core';
import { Input as AntdInput, InputNumber as AntdInputNumber } from 'antd';

export const Input = styled(AntdInput)`
  border: 1px solid ${({ theme }) => theme.colors.stroke.strokeSoft200} !important;
  border-radius: ${({ theme }) => theme.borderRadius * 2}px;
  &:hover {
    background: ${({ theme }) => theme.colors.background.bgWeak100};
    box-shadow: 0px 1px 2px 0px #E4E5E73D;
  }
`;

export const InputNumber = styled(AntdInputNumber)`
  border: 1px solid ${({ theme }) => theme.colors.stroke.strokeSoft200} !important;
  border-radius: ${({ theme }) => theme.borderRadius * 2}px;
`;

export const TextArea = styled(AntdInput.TextArea)`
  border: 1px solid ${({ theme }) => theme.colors.stroke.strokeSoft200} !important;
  border-radius: ${({ theme }) => theme.borderRadius * 2}px;
  box-shadow: 0px 1px 2px 0px #E4E5E73D;
  background: ${({ theme }) => theme.colors.background.bgWhite0};
  &:hover {
    background: ${({ theme }) => theme.colors.background.bgWeak100};
    border: none;
  }
  &:focus {
    box-shadow: 0px 0px 0px 3px #0A0D1433;
    box-shadow: 0px 0px 0px 2px #FFFFFF;
    box-shadow: 0px 0px 0px 1px #0A0D14;
    box-shadow: 0px 1px 2px 0px #0A0D143D;
  }
`;
