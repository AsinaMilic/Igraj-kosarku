import * as React from 'react';
import ProductPictures from './modules/views/ProductPictures';
import ProductQuestions from './modules/views/ProductQuestions';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductStars from './modules/views/ProductStars';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import ScrollToTop from "react-scroll-to-top";

function Index() {
  
  return ( 
    <>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductPictures />
      <ProductHowItWorks />
      <ProductStars />
      <ProductQuestions />
      <AppFooter />
      <ScrollToTop smooth color='red' />
    </>
  );
}

export default withRoot(Index)