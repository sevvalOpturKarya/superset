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
/* ant-menu-item > a
 &:after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 50%;
        width: 0;
        height: 3px;
        opacity: 0;
        transform: translateX(-50%);
        transition: all ${({ theme }) => theme.transitionTiming}s;
        background-color: ${({ theme }) => theme.colors.primary.base};
      }*/
import { styled } from '@superset-ui/core';
import { Menu as AntdMenu } from 'antd';
import { MenuProps as AntdMenuProps } from 'antd/lib/menu';

export type MenuProps = AntdMenuProps;

export enum MenuItemKeyEnum {
  MenuItem = 'menu-item',
  SubMenu = 'submenu',
  SubMenuItem = 'submenu-item',
}

export type AntdMenuTypeRef = { current: { props: { parentMenu: AntdMenu } } };

export type AntdMenuItemType = React.ReactElement & {
  ref: AntdMenuTypeRef;
  type: { displayName: string; isSubMenu: number };
};

export type MenuItemChildType = AntdMenuItemType;

export const isAntdMenuItemRef = (
  ref: AntdMenuTypeRef,
): ref is AntdMenuTypeRef =>
  (ref as AntdMenuTypeRef)?.current?.props?.parentMenu !== undefined;

export const isAntdMenuItem = (child: MenuItemChildType) =>
  child?.type?.displayName === 'Styled(MenuItem)';

export const isAntdMenuSubmenu = (child: MenuItemChildType) =>
  child?.type?.isSubMenu === 1;

export const isSubMenuOrItemType = (type: string) =>
  type === MenuItemKeyEnum.SubMenu || type === MenuItemKeyEnum.SubMenuItem;

const MenuItem = styled(AntdMenu.Item)`
  > a {
    text-decoration: none;
  }

  &.ant-menu-item {
    height: ${({ theme }) => theme.gridUnit * 8}px;
    line-height: ${({ theme }) => theme.gridUnit * 8}px;
    &:active{
      background: ${({ theme }) => theme.colors.background.bgWeak100} !important;
    }
    &:hover{
      background-color: ${({ theme }) => theme.colors.background.bgWeak100};
    }
    a {
      color: ${({ theme }) => theme.colors.text.textSub500};
      border-bottom: none;
      transition: background-color ${({ theme }) => theme.transitionTiming}s;
      font-size: ${({ theme }) => theme.typography.sizes.m}px;
      font-weight: ${({ theme }) => theme.typography.weights.medium};
      &:focus {
        color: ${({ theme }) => theme.colors.text.textColor900};
        border-bottom: none;
        //background-color: transparent;
        background-color: ${({ theme }) => theme.colors.background.bgWeak100} !important;
        @media (max-width: 767px) {
          background-color: ${({ theme }) => theme.colors.primary.light5};
        }
      }
    }
  }

  &.ant-menu-item,
  &.ant-dropdown-menu-item {
    span[role='button'] {
      display: inline-block;
      width: 100%;
    }
    transition-duration: 0s;
  }
`;

const StyledNav = styled(AntdMenu)`
  line-height: 20px;
  border: none;

  & > .ant-menu-item,
  & > .ant-menu-submenu {
    vertical-align: inherit;
    // border: 1px solid #CDCDD3;
    // background: #fff;
    // border-radius: 8px;
    // margin: 0px 12px !important;
    // padding: 10px !important;
    // //padding: 8px 12px;
    // //margin-right: 4px;
    &:hover {
      color: ${({ theme }) => theme.colors.grayscale.dark1};
    }
  }

  &:not(.ant-menu-dark) > .ant-menu-submenu,
  &:not(.ant-menu-dark) > .ant-menu-item {
    &:hover {
      border-bottom: none;
    }
  }

  &:not(.ant-menu-dark) > .ant-menu-submenu,
  &:not(.ant-menu-dark) > .ant-menu-item {
    margin: 0px;
  }

  & > .ant-menu-item > a {
    display: flex;
    align-items: center;
    padding: 0px ${({ theme }) => theme.gridUnit * 4}px!important;
    
  }
`;

const StyledSubMenu = styled(AntdMenu.SubMenu)`
  color: ${({ theme }) => theme.colors.grayscale.dark1};
  border-bottom: none;
  .ant-menu-submenu-open,
  .ant-menu-submenu-active {
    background-color: ${({ theme }) => theme.colors.background.bgWeak100};
        padding: 10px 0 0 0;
    .ant-menu-submenu-title {
      color: ${({ theme }) => theme.colors.grayscale.dark1};
      background-color: ${({ theme }) => theme.colors.background.bgWeak100};
      border-bottom: none;
      margin: 0;
      &:after {
        opacity: 1;
        width: calc(100% - 1);
      }
      &:hover{
        background-color: ${({ theme }) => theme.colors.background.bgWeak100} !important;
      }
      &:active,
      &:focus{
        background: ${({ theme }) => theme.colors.background.bgWeak100} !important;
      }
    }
  }
  .ant-menu-submenu-title {
    //position: relative;
    //top: ${({ theme }) => -theme.gridUnit - 3}px;
    //margin: 0 4px;
    // &:after {
    //   content: '';
    //   position: absolute;
    //   bottom: -3px;
    //   left: 50%;
    //   width: 0;
    //   height: 3px;
    //   opacity: 0;
    //   transform: translateX(-50%);
    //   transition: all ${({ theme }) => theme.transitionTiming}s;
    //   background-color: ${({ theme }) => theme.colors.primary.base};
    // }
  }
  .ant-menu-submenu-arrow {
    //top: 67%;
  }
  & > .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    // padding: 0 ${({ theme }) => theme.gridUnit * 6}px 0
    //   ${({ theme }) => theme.gridUnit * 3}px !important;
    span[role='img'] {
      // position: absolute;
      // right: ${({ theme }) => -theme.gridUnit + -2}px;
      // top: ${({ theme }) => theme.gridUnit * 5.25}px;
      svg {
        font-size: ${({ theme }) => theme.gridUnit * 5}px;
        color: ${({ theme }) => theme.colors.grayscale.base};
      }
    }
    & > span {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.text.textColor900};
    }
  }
`;

export declare type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

export const Menu = Object.assign(AntdMenu, {
  Item: MenuItem,
});

export const MainNav = Object.assign(StyledNav, {
  Item: MenuItem,
  SubMenu: StyledSubMenu,
  Divider: AntdMenu.Divider,
  ItemGroup: AntdMenu.ItemGroup,
});
