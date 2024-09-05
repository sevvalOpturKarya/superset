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
import { Next } from './Next';
import { Prev } from './Prev';
import { Item } from './Item';
import { Ellipsis } from './Ellipsis';

interface PaginationProps {
  children: JSX.Element | JSX.Element[];
}

const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  padding: 0;

  li {
    display: inline;
    margin: 0 4px;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 8px 12px;
      text-decoration: none;
      background-color: ${({ theme }) => theme.colors.grayscale.light5};
      border-radius: ${({ theme }) => theme.borderRadius}px;

      &.number {
        color:background: ${({ theme }) => theme.colors.text.textColor900};
        box-shadow: 0px 1px 2px 0px #E4E5E73D;
        border: 1px solid var(--stroke-soft, ${({ theme }) => theme.colors.stroke.strokeSoft200});
        &:hover{
          background-color: ${({ theme }) => theme.colors.background.bgWeak100};
        }
      }

      &:hover,
      &:focus {
        z-index: 2;
        color: ${({ theme }) => theme.colors.grayscale.dark1};
        border: none;
      }
    }

    &.disabled {
      span {
        background-color: transparent;
        cursor: default;

        &:focus {
          outline: none;
        }
      }
    }
    &.active {
      span {
        z-index: 3;
        color: ${({ theme }) => theme.colors.grayscale.light5};
        cursor: default;
        //background-color: ${({ theme }) => theme.colors.primary.base};

        &.number {
          color: ${({ theme }) => theme.colors.text.textColor900};
          box-shadow: 0px 1px 2px 0px #E4E5E73D;
          background: ${({ theme }) => theme.colors.background.bgWeak100};
          border: 1px solid var(--stroke-soft, ${({ theme }) => theme.colors.stroke.strokeSoft200});
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
`;

function Pagination({ children }: PaginationProps) {
  return <PaginationList role="navigation">{children}</PaginationList>;
}

Pagination.Next = Next;
Pagination.Prev = Prev;
Pagination.Item = Item;
Pagination.Ellipsis = Ellipsis;

export default Pagination;
