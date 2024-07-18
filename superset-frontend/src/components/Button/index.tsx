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
import React, { Children, ReactElement, ReactNode } from 'react';
import { mix } from 'polished';
import cx from 'classnames';
import { AntdButton } from 'src/components';
import { useTheme } from '@superset-ui/core';
import { Tooltip } from 'src/components/Tooltip';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import { TooltipProps } from 'antd/lib/tooltip';

export type OnClickHandler = React.MouseEventHandler<HTMLElement>;

export type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'danger-stroke'
  | 'neutral'
  | 'neutral-stroke'
  | 'default'
  | 'link'
  | 'dashed'
  | 'link-black'
  | 'link-gray'
  | 'link-error'
  | 'icon-buton';

export type ButtonSize = 'default' | 'small' | 'xsmall';

export type ButtonProps = Omit<AntdButtonProps, 'css'> &
  Pick<TooltipProps, 'placement'> & {
    tooltip?: ReactNode;
    className?: string;
    buttonSize?: ButtonSize;
    buttonStyle?: ButtonStyle;
    cta?: boolean;
    showMarginRight?: boolean;
  };

export default function Button(props: ButtonProps) {
  const {
    tooltip,
    placement,
    disabled = false,
    buttonSize,
    buttonStyle,
    className,
    cta,
    children,
    href,
    showMarginRight = true,
    ...restProps
  } = props;

  const theme = useTheme();
  const { colors, transitionTiming, borderRadius, typography } = theme;
  const { primary, grayscale, success, warning, error, background, neutral, text } = colors;

  let height = 40;
  let padding = 10;
  if (buttonSize === 'xsmall') {
    height = 32;
    padding = 6;
  } else if (buttonSize === 'small') {
    height = 36;
    padding = 8;
  }

  let backgroundColor = background.bgWhite0;
  let backgroundColorHover = mix(0.1, primary.base, primary.lighter);
  let backgroundColorActive = mix(0.25, primary.base, background.bgWhite0);
  let backgroundColorDisabled = background.bgWeak100;
  let color = primary.base;
  let colorHover = color;
  let colorActive = color;
  let borderWidth = 0;
  let borderStyle = 'none';
  let borderColor = 'transparent';
  let borderColorHover = 'transparent';
  let borderColorDisabled = 'transparent';

  if (buttonStyle === 'primary') {
    backgroundColor = primary.base;
    backgroundColorHover = primary.dark;
    backgroundColorActive = mix(0.2, grayscale.dark2, primary.dark);
    backgroundColorDisabled = background.bgWeak100;
    color = text.textWhite0;
    colorHover = color;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'tertiary' || buttonStyle === 'dashed') {
    backgroundColor = grayscale.light5;
    backgroundColorHover = primary.lighter;
    backgroundColorActive = grayscale.light5;
    backgroundColorDisabled = background.bgWeak100;
    borderWidth = 2;
    borderStyle = buttonStyle === 'dashed' ? 'dashed' : 'solid';
    borderColor = primary.base;
    borderColorHover = background.bgStrong900;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'danger' || buttonStyle === 'danger-stroke') {
    backgroundColor = buttonStyle === 'danger' ? error.base : grayscale.light5;
    backgroundColorHover = buttonStyle === 'danger' ? error.dark : grayscale.light5;
    backgroundColorActive = buttonStyle === 'danger' ? error.base : error.lighter;
    backgroundColorDisabled = background.bgWeak100;
    color = buttonStyle === 'danger' ? grayscale.light5 : error.base;
    colorHover = color;
    borderWidth = 2;
    borderStyle = 'dashed';
    borderColor = buttonStyle === 'danger' ? 'none' : error.base;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'warning') {
    backgroundColor = warning.base;
    backgroundColorHover = mix(0.1, grayscale.dark2, warning.base);
    backgroundColorActive = mix(0.2, grayscale.dark2, warning.base);
    backgroundColorDisabled = background.bgWeak100;
    color = grayscale.light5;
    colorHover = color;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'success') {
    backgroundColor = success.base;
    backgroundColorHover = mix(0.1, grayscale.light5, success.base);
    backgroundColorActive = mix(0.2, grayscale.dark2, success.base);
    backgroundColorDisabled = background.bgWeak100;
    color = grayscale.light5;
    colorHover = color;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'neutral' || buttonStyle === 'neutral-stroke') {
    backgroundColor = buttonStyle === 'neutral' ? neutral.blueBlack900 : background.bgWhite0;
    backgroundColorHover = buttonStyle === 'neutral' ? neutral.blueBlack800 : background.bgWeak100;
    backgroundColorActive = buttonStyle === 'neutral' ? neutral.blueBlack900 : neutral.blueBlack100;
    backgroundColorDisabled = background.bgWeak100;
    color = buttonStyle === 'neutral' ? grayscale.light5 : text.textSub500;
    colorHover = buttonStyle === 'neutral' ? grayscale.light5 : neutral.blueBlack900;
    borderWidth = 2;
    borderStyle = 'dashed';
    borderColor = buttonStyle === 'neutral' ? 'none' : neutral.blueBlack900;
    borderColorDisabled = background.bgWeak100;
  } else if (buttonStyle === 'link') {
    backgroundColor = 'transparent';
    backgroundColorHover = 'transparent';
    backgroundColorActive = 'transparent';
    color = primary.base;
    colorHover = primary.dark;
  } else if (buttonStyle === 'link-black') {
    backgroundColor = 'transparent';
    backgroundColorHover = 'transparent';
    backgroundColorActive = 'transparent';
    color = text.textColor900;
    colorHover = color;
  } else if (buttonStyle === 'link-gray') {
    backgroundColor = 'transparent';
    backgroundColorHover = 'transparent';
    backgroundColorActive = 'transparent';
    color = text.textSub500;
    colorHover = color;
    colorActive = text.textColor900;
  } else if (buttonStyle === 'link-error') {
    backgroundColor = 'transparent';
    backgroundColorHover = 'transparent';
    backgroundColorActive = 'transparent';
    color = error.base;
    colorHover = error.dark;
  } else if (buttonStyle === 'icon-buton') {
    backgroundColor = primary.base;
    backgroundColorHover = primary.dark;
    backgroundColorActive = primary.base;
    backgroundColorDisabled = background.bgWeak100;
    color = text.textWhite0;
    colorHover = text.textWhite0;
  }

  const element = children as ReactElement;

  let renderedChildren = [];
  if (element && element.type === React.Fragment) {
    renderedChildren = Children.toArray(element.props.children);
  } else {
    renderedChildren = Children.toArray(children);
  }
  const firstChildMargin =
    showMarginRight && renderedChildren.length > 1 ? theme.gridUnit * 2 : 0;

  const button = (
    <AntdButton
      href={disabled ? undefined : href}
      disabled={disabled}
      className={cx(
        className,
        'superset-button',
        // A static class name containing the button style is available to
        // support customizing button styles in embedded dashboards.
        `superset-button-${buttonStyle}`,
        { cta: !!cta },
      )}
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1.5715,
        fontSize: typography.sizes.m,
        fontWeight: typography.weights.medium,
        height,
        textTransform: 'capitalize',
        textDecoration: 'none',
        padding: `${padding}px ${padding}px`,
        transition: `all ${transitionTiming}s`,
        minWidth: cta ? theme.gridUnit * 36 : undefined,
        minHeight: cta ? theme.gridUnit * 8 : undefined,
        boxShadow: 'none',
        borderWidth,
        borderStyle,
        borderColor,
        borderRadius,
        color,
        backgroundColor,
        '&:hover': {
          color: colorHover,
          backgroundColor: backgroundColorHover,
          borderColor: borderColorHover,
          textDecoration: 
            buttonStyle === 'link-error' || 
            buttonStyle === 'link-black' || 
            buttonStyle === 'link-gray' 
              ? 'underline' 
              : 'none',
        },
        '&:active': {
          color,
          backgroundColor: backgroundColorActive,
        },
        '&:focus': {
          color: colorActive,
          backgroundColor,
          borderColor,
          textDecoration: 
            buttonStyle === 'link-error' || 
            buttonStyle === 'link-black' || 
            buttonStyle === 'link-gray' 
              ? 'underline' 
              : 'none',
        },
        '&[disabled], &[disabled]:hover': {
          color: text.textDisabled300,
          backgroundColor:
            buttonStyle === 'link' ? 'transparent' : backgroundColorDisabled,
          borderColor:
            buttonStyle === 'link' ? 'transparent' : borderColorDisabled,
          pointerEvents: 'none',
        },
        marginLeft: 0,
        '& + .superset-button': {
          marginLeft: theme.gridUnit * 2,
        },
        '& > :first-of-type': {
          marginRight: firstChildMargin,
        },
      }}
      {...restProps}
    >
      {children}
    </AntdButton>
  );

  if (tooltip) {
    return (
      <Tooltip placement={placement} title={tooltip}>
        {/* wrap the button in a span so that the tooltip shows up
        when the button is disabled. */}
        {disabled ? (
          <span
            css={{
              cursor: 'not-allowed',
              '& > .superset-button': {
                marginLeft: theme.gridUnit * 2,
              },
            }}
          >
            {button}
          </span>
        ) : (
          button
        )}
      </Tooltip>
    );
  }

  return button;
}
