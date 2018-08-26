import React from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { Row, rowHeight, scrollWidth, WarningText } from './index';
import Spinner from '../generic/Spinner';

export default ({
  hasNextPage,
  isNextPageLoading,
  list,
  loadNextPage,
  fetchError,
  showLink,
}) => {
  const rowCount = hasNextPage ? list.length + 1 : list.length;

  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

  const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

  const rowRenderer = ({ index, key, style }) => {
    let content;
    if (!list[index]) {
      content = fetchError ? (
        <WarningText>{fetchError}</WarningText>
      ) : (
        <Spinner />
      );
    } else {
      content = <Row showLink={showLink} items={list[index]} />;
    }
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          rowCount={rowCount}
          height={600}
          width={scrollWidth}
          rowHeight={rowHeight}
        />
      )}
    </InfiniteLoader>
  );
};
