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
import { t, styled, css, SupersetTheme, } from '@superset-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Alert from 'src/components/Alert';
import cx from 'classnames';
import Button from 'src/components/Button';
import Icons from 'src/components/Icons';
import IndeterminateCheckbox from 'src/components/IndeterminateCheckbox';
import Pagination from 'src/components/Pagination';
import TableCollection from 'src/components/TableCollection';
import BulkTagModal from 'src/features/tags/BulkTagModal';
import CardCollection from './CardCollection';
import FilterControls from './Filters';
import { CardSortSelect } from './CardSortSelect';
import {
  FetchDataConfig,
  Filters,
  SortColumn,
  CardSortSelectOption,
  ViewModeType,
} from './types';
import { ListViewError, useListViewState } from './utils';
import { EmptyStateBig, EmptyStateProps } from '../EmptyState';

const ListViewStyles = styled.div`
  text-align: center;

  .superset-list-view {
    text-align: left;
    //border-radius: 4px 0;
    border-radius: ${({ theme }) => theme.gridUnit * 4}px;
    margin: 0 ${({ theme }) => theme.gridUnit * 4}px;
    border: 1px solid ${({ theme }) => theme.colors.stroke.strokeSoft200};
    .header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: ${({ theme }) => theme.gridUnit * 4}px;
      background-color: ${({ theme }) => theme.colors.background.bgWeak100};
      border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.strokeSoft200}b;
      padding: ${({ theme }) => theme.gridUnit * 3}px ${({ theme }) => theme.gridUnit * 4}px;
      margin-bottom: ${({ theme }) => theme.gridUnit * 2}px;
      border-radius: 16px 16px 0 0;
      & .controls {
        display: flex;
        flex-wrap: wrap;
        column-gap: ${({ theme }) => theme.gridUnit * 6}px;
        row-gap: ${({ theme }) => theme.gridUnit * 4}px;
      }
      .controls-button {
        margin-right: 12px;

        span svg {
          position: relative;
          top: 9px;
          left: 10px;
        }
      }
    }

    .body.empty table {
      margin-bottom: 0;
    }

    .body {
      overflow-x: auto;
      padding: ${({ theme }) => theme.gridUnit * 3}px ${({ theme }) => theme.gridUnit * 4}px;
    }

    .ant-empty {
      .ant-empty-image {
        height: auto;
      }
    }
  }

  .pagination-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.gridUnit * 4}px;
  }

  .row-count-container {
    margin-top: ${({ theme }) => theme.gridUnit * 2}px;
    color: ${({ theme }) => theme.colors.grayscale.base};
  }
`;

const BulkSelectWrapper = styled(Alert)`
  ${({ theme }) => `
    border-radius: 0;
    margin-bottom: 0;
    color: ${theme.colors.grayscale.dark1};
    background-color: ${theme.colors.primary.light4};

    .selectedCopy {
      display: inline-block;
      padding: ${theme.gridUnit * 2}px 0;
    }

    .deselect-all, .tag-btn {
      color: ${theme.colors.primary.base};
      margin-left: ${theme.gridUnit * 4}px;
    }

    .divider {
      margin: ${`${-theme.gridUnit * 2}px 0 ${-theme.gridUnit * 2}px ${
        theme.gridUnit * 4
      }px`};
      width: 1px;
      height: ${theme.gridUnit * 8}px;
      box-shadow: inset -1px 0px 0px ${theme.colors.grayscale.light2};
      display: inline-flex;
      vertical-align: middle;
      position: relative;
    }

    .ant-alert-close-icon {
      margin-top: ${theme.gridUnit * 1.5}px;
    }
  `}
`;
const SidebarStyles = (theme: SupersetTheme) => css`
  
    position: fixed;
    top: 0;
    right: 0;
    width: 396px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    z-index: 1000; 

  .side-panel-content {
    padding: 20px 24px;
    flex-grow: 1;
  }
  .side-panel-icon{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list{
    width: 40px;
    height: 40px;
    background: #F6F8FA;
    border: 6px solid #E2E4E859;
    border-radius: 28px;
    text-align: center;
    span[role='img'] {
      font-size: 20px !important;
      padding: 4px;
    }
  }
  .close {
    //position: absolute;
    color: ${theme.colors.icon.iconSub500};
    //top: 10px;
    //right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .side-panel-header-text{
    position: relative;o
  }
  .side-panel-header-text hr{
    content: "";
    position: relative;
    bottom: 0;
    left: -25px; 
    width: calc(100% + 50px);
    background-color: ${theme.colors.stroke.strokeSoft200}; 
    margin: 24px 0;
  }
  // .controls-button 
  //   margin-right: 12px;
  //   &.button {
  //     padding: 10px 20px;
  //     cursor: pointer;
  //   }
  // }
`;
const bulkSelectColumnConfig = {
  Cell: ({ row }: any) => (
    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} id={row.id} />
  ),
  Header: ({ getToggleAllRowsSelectedProps }: any) => (
    <IndeterminateCheckbox
      {...getToggleAllRowsSelectedProps()}
      id="header-toggle-all"
    />
  ),
  id: 'selection',
  size: 'sm',
};

const ViewModeContainer = styled.div`
  //padding-right: ${({ theme }) => theme.gridUnit * 4}px;
  //margin-top: ${({ theme }) => theme.gridUnit * 5 + 1}px;
  white-space: nowrap;
  display: inline-block;

  .toggle-button {
    display: inline-block;
    border-radius: ${({ theme }) => theme.gridUnit / 2}px;
    padding: ${({ theme }) => theme.gridUnit}px;
    padding-bottom: ${({ theme }) => theme.gridUnit * 0.5}px;
    border: 1px solid ${({ theme }) => theme.colors.grayscale.base};

    &:first-of-type {
      margin-right: ${({ theme }) => theme.gridUnit * 2}px;
    }
  }

  .active {
    background-color: ${({ theme }) => theme.colors.grayscale.base};
    border: none;
    svg {
      color: ${({ theme }) => theme.colors.grayscale.light5};
    }
  }
`;

const EmptyWrapper = styled.div`
  padding: ${({ theme }) => theme.gridUnit * 40}px 0;

  &.table {
    background: ${({ theme }) => theme.colors.grayscale.light5};
  }
`;

const ViewModeToggle = ({
  mode,
  setMode,
}: {
  mode: 'table' | 'card';
  setMode: (mode: 'table' | 'card') => void;
}) => (
  <ViewModeContainer>
    <div
      role="button"
      tabIndex={0}
      onClick={e => {
        e.currentTarget.blur();
        setMode('card');
      }}
      className={cx('toggle-button', { active: mode === 'card' })}
    >
      <Icons.CardView />
    </div>
    <div
      role="button"
      tabIndex={0}
      onClick={e => {
        e.currentTarget.blur();
        setMode('table');
      }}
      className={cx('toggle-button', { active: mode === 'table' })}
    >
      <Icons.ListView />
    </div>
  </ViewModeContainer>
);

export interface ListViewProps<T extends object = any> {
  columns: any[];
  data: T[];
  count: number;
  pageSize: number;
  fetchData: (conf: FetchDataConfig) => any;
  refreshData: () => void;
  addSuccessToast: (msg: string) => void;
  addDangerToast: (msg: string) => void;
  loading: boolean;
  className?: string;
  initialSort?: SortColumn[];
  filters?: Filters;
  bulkActions?: Array<{
    key: string;
    name: React.ReactNode;
    onSelect: (rows: any[]) => any;
    type?: 'primary' | 'secondary' | 'danger';
  }>;
  bulkSelectEnabled?: boolean;
  disableBulkSelect?: () => void;
  renderBulkSelectCopy?: (selects: any[]) => React.ReactNode;
  renderCard?: (row: T & { loading: boolean }) => React.ReactNode;
  cardSortSelectOptions?: Array<CardSortSelectOption>;
  defaultViewMode?: ViewModeType;
  highlightRowId?: number;
  showThumbnails?: boolean;
  emptyState?: EmptyStateProps;
  columnsForWrapText?: string[];
  enableBulkTag?: boolean;
  bulkTagResourceName?: string;
}

function ListView<T extends object = any>({
  columns,
  data,
  count,
  pageSize: initialPageSize,
  fetchData,
  refreshData,
  loading,
  initialSort = [],
  className = '',
  filters = [],
  bulkActions = [],
  bulkSelectEnabled = false,
  disableBulkSelect = () => {},
  renderBulkSelectCopy = selected => t('%s Selected', selected.length),
  renderCard,
  showThumbnails,
  cardSortSelectOptions,
  defaultViewMode = 'card',
  highlightRowId,
  emptyState,
  columnsForWrapText,
  enableBulkTag = false,
  bulkTagResourceName,
  addSuccessToast,
  addDangerToast,
}: ListViewProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageCount = 1,
    gotoPage,
    applyFilterValue,
    setSortBy,
    selectedFlatRows,
    toggleAllRowsSelected,
    setViewMode,
    state: { pageIndex, pageSize, internalFilters, sortBy, viewMode },
    query,
  } = useListViewState({
    bulkSelectColumnConfig,
    bulkSelectMode: bulkSelectEnabled && Boolean(bulkActions.length),
    columns,
    count,
    data,
    fetchData,
    initialPageSize,
    initialSort,
    initialFilters: filters,
    renderCard: Boolean(renderCard),
    defaultViewMode,
  });
  const allowBulkTagActions = bulkTagResourceName && enableBulkTag;
  const filterable = Boolean(filters.length);
  if (filterable) {
    const columnAccessors = columns.reduce(
      (acc, col) => ({ ...acc, [col.id || col.accessor]: true }),
      {},
    );
    filters.forEach(f => {
      if (!columnAccessors[f.id]) {
        throw new ListViewError(
          `Invalid filter config, ${f.id} is not present in columns`,
        );
      }
    });
  }

  const filterControlsRef = useRef<{ clearFilters: () => void }>(null);

  const handleClearFilterControls = useCallback(() => {
    if (query.filters) {
      filterControlsRef.current?.clearFilters();
    }
  }, [query.filters]);

  const cardViewEnabled = Boolean(renderCard);
  const [showBulkTagModal, setShowBulkTagModal] = useState<boolean>(false);

  const [showPanel, setShowPanel] = useState(false);
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  useEffect(() => {
    // discard selections if bulk select is disabled
    if (!bulkSelectEnabled) toggleAllRowsSelected(false);
  }, [bulkSelectEnabled, toggleAllRowsSelected]);

  useEffect(() => {
    if (!loading && pageIndex > pageCount - 1 && pageCount > 0) {
      gotoPage(0);
    }
  }, [gotoPage, loading, pageCount, pageIndex]);

  return (
    <ListViewStyles>
      {allowBulkTagActions && (
        <BulkTagModal
          show={showBulkTagModal}
          selected={selectedFlatRows}
          refreshData={refreshData}
          resourceName={bulkTagResourceName}
          addSuccessToast={addSuccessToast}
          addDangerToast={addDangerToast}
          onHide={() => setShowBulkTagModal(false)}
        />
      )}
      <div data-test={className} className={`superset-list-view ${className}`}>
        <div className="header">
          <div className="controls-button">
            <Button onClick={togglePanel} buttonStyle={'neutral-stroke'}>
              <Icons.FilterAbra /> {t('Filtrele')}
            </Button>
          </div>
          {cardViewEnabled && (
            <ViewModeToggle mode={viewMode} setMode={setViewMode} />
          )}
          {showPanel && (
            <div className="side-panel" css={SidebarStyles}>
              <div className="side-panel-content">
                <div className="side-panel-header">
                  <div className="side-panel-icon">
                    <span className="list"><Icons.List/></span>
                    <span className="close" onClick={togglePanel}><Icons.Close/></span>
                  </div>
                </div>
                <div className="side-panel-header-text">
                  <h4>Filtrele</h4>
                  <p>Please insert modal description here.</p>
                  <hr/>
                </div>
                <div className="controls">
                  {filterable && (
                    <FilterControls
                      ref={filterControlsRef}
                      filters={filters}
                      internalFilters={internalFilters}
                      updateFilterValue={applyFilterValue}
                    />
                  )}
                  {viewMode === 'card' && cardSortSelectOptions && (
                    <CardSortSelect
                      initialSort={sortBy}
                      onChange={(value: SortColumn[]) => setSortBy(value)}
                      options={cardSortSelectOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={`body ${rows.length === 0 ? 'empty' : ''}`}>
          {bulkSelectEnabled && (
            <BulkSelectWrapper
              data-test="bulk-select-controls"
              type="info"
              closable
              showIcon={false}
              onClose={disableBulkSelect}
              message={
                <>
                  <div className="selectedCopy" data-test="bulk-select-copy">
                    {renderBulkSelectCopy(selectedFlatRows)}
                  </div>
                  {Boolean(selectedFlatRows.length) && (
                    <>
                      <span
                        data-test="bulk-select-deselect-all"
                        role="button"
                        tabIndex={0}
                        className="deselect-all"
                        onClick={() => toggleAllRowsSelected(false)}
                      >
                        {t('Deselect all')}
                      </span>
                      <div className="divider" />
                      {bulkActions.map(action => (
                        <Button
                          data-test="bulk-select-action"
                          key={action.key}
                          buttonStyle={action.type}
                          cta
                          onClick={() =>
                            action.onSelect(
                              selectedFlatRows.map(r => r.original),
                            )
                          }
                        >
                          {action.name}
                        </Button>
                      ))}
                      {enableBulkTag && (
                        <span
                          data-test="bulk-select-tag-btn"
                          role="button"
                          tabIndex={0}
                          className="tag-btn"
                          onClick={() => setShowBulkTagModal(true)}
                        >
                          {t('Add Tag')}
                        </span>
                      )}
                    </>
                  )}
                </>
              }
            />
          )}
          {viewMode === 'card' && (
            <CardCollection
              bulkSelectEnabled={bulkSelectEnabled}
              prepareRow={prepareRow}
              renderCard={renderCard}
              rows={rows}
              loading={loading}
              showThumbnails={showThumbnails}
            />
          )}
          {viewMode === 'table' && (
            <TableCollection
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              prepareRow={prepareRow}
              headerGroups={headerGroups}
              rows={rows}
              columns={columns}
              loading={loading}
              highlightRowId={highlightRowId}
              columnsForWrapText={columnsForWrapText}
            />
          )}
          {!loading && rows.length === 0 && (
            <EmptyWrapper className={viewMode}>
              {query.filters ? (
                <EmptyStateBig
                  title={t('No results match your filter criteria')}
                  description={t('Try different criteria to display results.')}
                  image="filter-results.svg"
                  buttonAction={() => handleClearFilterControls()}
                  buttonText={t('clear all filters')}
                />
              ) : (
                <EmptyStateBig
                  {...emptyState}
                  title={emptyState?.title || t('No Data')}
                  image={emptyState?.image || 'filter-results.svg'}
                />
              )}
            </EmptyWrapper>
          )}
        </div>
      </div>
      {rows.length > 0 && (
        <div className="pagination-container">
          <Pagination
            totalPages={pageCount || 0}
            currentPage={pageCount && pageIndex < pageCount ? pageIndex + 1 : 0}
            onChange={(p: number) => gotoPage(p - 1)}
            hideFirstAndLastPageLinks
          />
          <div className="row-count-container">
            {!loading &&
              t(
                '%s-%s of %s',
                pageSize * pageIndex + (rows.length && 1),
                pageSize * pageIndex + rows.length,
                count,
              )}
          </div>
        </div>
      )}
    </ListViewStyles>
  );
}

export default ListView;
