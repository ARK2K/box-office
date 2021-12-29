/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => (
  <div>
    <Title
      title="Box Office"
      subtitle="Are you looking for a movie or an actor?"
    />
    <Navs />

    {children}
  </div>
);

export default MainPageLayout;
