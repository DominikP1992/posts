import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoadingImg from '../../assets/img/loading.png';

// constants
export const rowHeight = 190;
export const rowWidth = 150;
export const scrollWidth = 470;

const RowWrapper = styled.div`
  height: ${rowHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WarningText = styled.p`
  background-color: #f2dede;
`;

const ImageWrapper = styled.div`
  background-image: url(${LoadingImg});
  width: ${rowWidth}px;
  height: ${rowWidth}px;
  box-sizing: border-box;
  background-size: 100%;
  background-position: center;
`;

const RowImg = styled.img`
  background-color: blue;
`;

export const Row = ({ items, showLink }) => (
  <RowWrapper>
    {items.map(item => (
      <ImageWrapper key={item.id}>
        <RowImg src={item.url} />
        {console.log('showLink', showLink)}
        {showLink && <Link to={item.owner}>Show User Photos</Link>}
      </ImageWrapper>
    ))}
  </RowWrapper>
);
